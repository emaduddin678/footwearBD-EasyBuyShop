import { apiFetch } from "./client"
import type { Product } from "@/lib/data/products"

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
  mainCategory: BackendCategory | null
  subCategory: BackendCategory | null
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

function buildBadge(p: BackendProduct): { badge: string | null; badgeColor: string | null } {
  const discount = p.discountPercent ?? 0
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
    id: index + 1,
    name: p.title,
    cat: buildCat(p),
    price: formatTaka(p.sellingPrice),
    old: hasDiscount ? formatTaka(p.regularPrice) : null,
    rating: 4.2,
    reviews: p.viewCount ?? 0,
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
