import type { MetadataRoute } from "next"

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://footwearbd.com").replace(/\/$/, "")
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3002"

type ChangeFreq = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>

const STATIC_ROUTES: { path: string; changeFrequency: ChangeFreq; priority: number }[] = [
  { path: "/", changeFrequency: "daily", priority: 1 },
  { path: "/men", changeFrequency: "daily", priority: 0.9 },
  { path: "/women", changeFrequency: "daily", priority: 0.9 },
  { path: "/kids", changeFrequency: "daily", priority: 0.9 },
  { path: "/newborn", changeFrequency: "daily", priority: 0.8 },
  { path: "/sale", changeFrequency: "daily", priority: 0.9 },
  { path: "/new-arrivals", changeFrequency: "daily", priority: 0.9 },
  { path: "/best-sellers", changeFrequency: "weekly", priority: 0.7 },
  { path: "/brands", changeFrequency: "weekly", priority: 0.6 },
  { path: "/lookbook", changeFrequency: "weekly", priority: 0.5 },
  { path: "/eid-special", changeFrequency: "weekly", priority: 0.6 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.5 },
  { path: "/about", changeFrequency: "monthly", priority: 0.4 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.4 },
  { path: "/delivery", changeFrequency: "monthly", priority: 0.4 },
  { path: "/returns", changeFrequency: "monthly", priority: 0.4 },
  { path: "/payment", changeFrequency: "monthly", priority: 0.4 },
  { path: "/size-guide", changeFrequency: "monthly", priority: 0.4 },
  { path: "/track", changeFrequency: "monthly", priority: 0.3 },
  { path: "/affiliates", changeFrequency: "monthly", priority: 0.3 },
  { path: "/careers", changeFrequency: "monthly", priority: 0.3 },
  { path: "/press", changeFrequency: "monthly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.2 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.2 },
]

interface SitemapProduct {
  _id: string
  updatedAt?: string
}

async function fetchProductEntries(): Promise<MetadataRoute.Sitemap> {
  try {
    const res = await fetch(`${API_URL}/api/products?status=active&limit=500`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) return []
    const data = await res.json()
    const items: SitemapProduct[] = data.payload?.items ?? []
    return items.map((p) => ({
      url: `${SITE_URL}/product/${p._id}`,
      lastModified: p.updatedAt ? new Date(p.updatedAt) : undefined,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }))
  } catch {
    // backend unavailable at build/request time — sitemap still serves static routes
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: new Date(),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }))

  const productEntries = await fetchProductEntries()

  return [...staticEntries, ...productEntries]
}
