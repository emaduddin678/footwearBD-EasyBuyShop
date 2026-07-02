import { apiFetch } from "./client"
import type { Product, PlpProduct } from "@/lib/data/products"

// ── Backend response shapes ────────────────────────────────────────────────────

interface BackendVariant {
  sku: string
  size: string
  color: string
  stock: number
}

interface BackendCategory {
  _id: string
  name: string
  slug: string
}

export interface BackendProduct {
  _id: string
  title: string
  slug: string
  shortDescription: string
  longDescription?: string
  features?: string[]
  brand?: string
  purchasePrice: number
  regularPrice: number
  sellingPrice: number
  primaryImage: string
  additionalImages: string[]
  status: "active" | "draft" | "archived"
  isActive: boolean
  isFeatured: boolean
  variants: BackendVariant[]
  totalStock: number
  discountPercent: number
  ratingAverage?: number
  reviewCount?: number
  mainCategory: BackendCategory | null
  subCategory: BackendCategory | null
  childCategory?: BackendCategory | null
  keywords: string[]
  viewCount: number
  createdAt: string
  updatedAt: string
}

interface ApiListResponse {
  success: boolean
  message: string
  payload: {
    items: BackendProduct[]
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

interface ApiSingleProductResponse {
  success: boolean
  message: string
  payload: BackendProduct
}

export interface BackendReview {
  _id: string
  userId: string
  userName: string
  rating: number
  title?: string
  comment: string
  isVerifiedPurchase: boolean
  helpfulCount: number
  createdAt: string
}

interface ApiReviewsResponse {
  success: boolean
  message: string
  payload: {
    reviews: BackendReview[]
    total: number
    page: number
    totalPages: number
    averageRating: number
    ratingDistribution: Record<string, number>
  }
}

// ── Palette for products without a real image ─────────────────────────────────

const PALETTES = [
  { imgBg: "e8eaf6", imgFg: "1A2B5E" },
  { imgBg: "dcfce7", imgFg: "166534" },
  { imgBg: "fff7ed", imgFg: "92400e" },
  { imgBg: "f0fdf4", imgFg: "166534" },
  { imgBg: "fdf2f8", imgFg: "86198f" },
  { imgBg: "eff6ff", imgFg: "1d4ed8" },
  { imgBg: "fdf4ff", imgFg: "7c3aed" },
  { imgBg: "f5f5f5", imgFg: "374151" },
]

function palette(index: number) {
  return PALETTES[index % PALETTES.length]
}

function formatTaka(amount: number): string {
  return `৳${amount.toLocaleString("en-IN")}`
}

/** `p.discountPercent` comes back null on every live product even when
 *  regularPrice > sellingPrice (confirmed against the running backend) —
 *  computed here instead of trusted, so the SALE badge actually fires. */
function computeDiscountPercent(p: BackendProduct): number {
  if (p.regularPrice <= p.sellingPrice || p.regularPrice <= 0) return 0
  return Math.round(((p.regularPrice - p.sellingPrice) / p.regularPrice) * 100)
}

function buildBadge(p: BackendProduct): { badge: string | null; badgeColor: string | null } {
  const discount = computeDiscountPercent(p)
  if (discount >= 10) {
    return { badge: `SALE ${discount}%`, badgeColor: "#ef4444" }
  }
  if (p.isFeatured) {
    return { badge: "Best Seller", badgeColor: "#D4A017" }
  }
  const ageMs = Date.now() - new Date(p.createdAt).getTime()
  const ageDays = ageMs / 86_400_000
  if (ageDays <= 14) {
    return { badge: "New", badgeColor: "#16a34a" }
  }
  return { badge: null, badgeColor: null }
}

function buildCat(p: BackendProduct): string {
  const main = p.mainCategory?.name ?? "General"
  const sub = p.subCategory?.name
  return sub ? `${main} · ${sub}` : main
}

// ── Normalizer: BackendProduct → Product (ProductCard-compatible) ─────────────

export function normalizeProduct(p: BackendProduct, index = 0): Product {
  const pal = palette(index)
  const { badge, badgeColor } = buildBadge(p)

  const hasDiscount = p.regularPrice > p.sellingPrice
  const imgText = p.title.split(" ")[0]

  return {
    _id: p._id,
    primaryImage: p.primaryImage || undefined,
    additionalImages: p.additionalImages?.filter(Boolean) || [],
    id: index + 1,
    name: p.title,
    cat: buildCat(p),
    price: formatTaka(p.sellingPrice),
    old: hasDiscount ? formatTaka(p.regularPrice) : null,
    rating: p.ratingAverage || 4.2,
    reviews: p.reviewCount ?? p.viewCount ?? 0,
    badge,
    badgeColor,
    imgBg: pal.imgBg,
    imgFg: pal.imgFg,
    imgText,
  }
}

// ── API calls ─────────────────────────────────────────────────────────────────

/** Featured / best-seller products for the homepage BestSellers section. */
export async function fetchFeaturedProducts(limit = 8): Promise<BackendProduct[]> {
  const data = await apiFetch<ApiListResponse>("/api/products", {
    query: { status: "active", isFeatured: true, limit, sortBy: "createdAt", sortOrder: "desc" },
  })
  return data.payload.items
}

/** Newest active products for the NewArrivals section. */
export async function fetchNewArrivals(limit = 8): Promise<BackendProduct[]> {
  const data = await apiFetch<ApiListResponse>("/api/products", {
    query: { status: "active", limit, sortBy: "createdAt", sortOrder: "desc" },
  })
  return data.payload.items
}

/** Products with the highest discount for the FlashSale section. */
export async function fetchFlashSaleProducts(limit = 4): Promise<BackendProduct[]> {
  const data = await apiFetch<ApiListResponse>("/api/products", {
    query: { status: "active", limit, sortBy: "price", sortOrder: "asc" },
  })
  // Filter to only products that actually have a discount, prefer deepest discounts
  const withDiscount = data.payload.items.filter((p) => p.regularPrice > p.sellingPrice)
  if (withDiscount.length >= limit) return withDiscount.slice(0, limit)
  // If not enough discounted items, pad with any active products
  return data.payload.items.slice(0, limit)
}

/** Fetch a single product by its MongoDB _id. Returns null on any error. */
export async function fetchProductById(id: string): Promise<BackendProduct | null> {
  try {
    const data = await apiFetch<ApiSingleProductResponse>(`/api/products/${id}`)
    return data.payload
  } catch {
    return null
  }
}

/**
 * Fetch active products from the same main category as a given product,
 * excluding the current product. Used for "Related Products" on the PDP.
 */
export async function fetchRelatedProducts(
  mainCategoryId: string,
  excludeId: string,
  limit = 4,
): Promise<BackendProduct[]> {
  try {
    const data = await apiFetch<ApiListResponse>("/api/products", {
      query: {
        status: "active",
        mainCategory: mainCategoryId,
        limit: limit + 2,
        sortBy: "createdAt",
        sortOrder: "desc",
      },
    })
    return data.payload.items.filter((p) => p._id !== excludeId).slice(0, limit)
  } catch {
    return []
  }
}

/** Fetch paginated reviews for a product. */
export async function fetchProductReviews(
  productId: string,
  params: Record<string, string | number> = {},
): Promise<ApiReviewsResponse["payload"]> {
  const qs = new URLSearchParams(
    Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)])),
  ).toString()
  const data = await apiFetch<ApiReviewsResponse>(
    `/api/products/${productId}/reviews${qs ? `?${qs}` : ""}`,
  )
  return data.payload
}

// ── PLP helpers ───────────────────────────────────────────────────────────────

/** Derive a gender label from category slugs and keyword tags. */
function inferGender(p: BackendProduct): PlpProduct["gender"] {
  const text = [
    p.mainCategory?.slug ?? "",
    p.subCategory?.slug ?? "",
    ...(p.keywords ?? []),
  ]
    .join(" ")
    .toLowerCase()

  if (/\bnewborn\b|\bbaby\b|\binfant\b/.test(text)) return "newborn"
  if (/\bkid\b|\bchildren\b|\bchild\b/.test(text)) return "kids"
  if (/\bwomen\b|\bwoman\b|\bfemale\b|\bgirl\b|\bladies\b/.test(text)) return "women"
  if (/\bmen\b|\bmale\b|\bgentleman\b/.test(text)) return "men"
  return "unisex"
}

/**
 * Normalizes a BackendProduct to a PlpProduct — the richer shape used by the
 * category listing page (includes gender, sizes, priceNum, etc.).
 */
export function normalizePlpProduct(p: BackendProduct, index = 0): PlpProduct {
  const sizes = p.variants
    .map((v) => Number(v.size))
    .filter((s) => !isNaN(s) && s > 0)

  const hasDiscount = p.regularPrice > p.sellingPrice
  const isNew = (Date.now() - new Date(p.createdAt).getTime()) / 86_400_000 <= 14

  return {
    // inherit all Product fields (image, badge, price string, etc.)
    ...normalizeProduct(p, index),
    brand: p.mainCategory?.name ?? "FootwearBD",
    category: p.subCategory?.slug ?? p.mainCategory?.slug ?? "general",
    gender: inferGender(p),
    priceNum: p.sellingPrice,
    originalPriceNum: hasDiscount ? p.regularPrice : null,
    sizes: sizes.length > 0 ? sizes : [38, 39, 40, 41],
    color: p.variants[0]?.color ?? "Black",
    sales: p.viewCount ?? 0,
    isNew,
    inStock: p.totalStock > 0,
    description: p.shortDescription || undefined,
  }
}

/**
 * Fetches active products for a PLP category page.
 *
 * The backend `mainCategory` filter expects a Mongo ObjectId, so we fetch all
 * active products and apply category-specific post-filtering client-side.
 * Gender-based filtering is handled by `normalizePlpProduct` + the PLP component.
 */
export async function fetchProductsByCategory(
  category: string,
  limit = 50,
): Promise<BackendProduct[]> {
  const data = await apiFetch<ApiListResponse>("/api/products", {
    query: { status: "active", limit, sortBy: "createdAt", sortOrder: "desc" },
  })
  const items = data.payload.items

  if (category === "sale") return items.filter((p) => p.regularPrice > p.sellingPrice)
  // "new-arrivals" and gender categories: return all — the component filters by isNew / gender
  return items
}
