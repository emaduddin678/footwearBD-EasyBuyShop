import type { MetadataRoute } from "next"

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://footwearbd.com").replace(/\/$/, "")

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/account/", "/cart", "/checkout", "/order-confirm", "/wishlist"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
