import Link from "next/link"
import { ProductCard } from "./ProductCard"
import { fetchNewArrivals, normalizeProduct } from "@/lib/api/products"
import { newArrivals } from "@/lib/data/products"

// ── Skeleton ──────────────────────────────────────────────────────────────────

export function NewArrivalsSkeleton() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-[1440px] mx-auto px-16">
        <div className="flex items-end justify-between mb-11">
          <div>
            <div className="h-6 w-28 bg-gray-200 rounded-full mb-2.5 animate-pulse" />
            <div className="h-9 w-44 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="h-10 w-28 bg-gray-200 rounded-[9px] animate-pulse" />
        </div>
        <div className="grid grid-cols-4 gap-[22px]">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-[14px] overflow-hidden shadow-sm border border-gray-100">
              <div className="h-60 bg-gray-100 animate-pulse" />
              <div className="p-4 space-y-3">
                <div className="h-3 w-20 bg-gray-100 rounded animate-pulse" />
                <div className="h-5 w-40 bg-gray-100 rounded animate-pulse" />
                <div className="h-6 w-24 bg-gray-100 rounded animate-pulse" />
                <div className="h-10 bg-gray-100 rounded-lg animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Component ─────────────────────────────────────────────────────────────────

export async function NewArrivals() {
  let products = newArrivals

  try {
    const apiProducts = await fetchNewArrivals(8)
    if (apiProducts.length > 0) {
      products = apiProducts.map((p, i) => normalizeProduct(p, i))
    }
  } catch {
    // silently fall back to mock data when backend is unavailable
  }

  return (
    <section className="bg-white py-20">
      <div className="max-w-[1440px] mx-auto px-16">
        {/* Header */}
        <div className="flex items-end justify-between mb-11">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#f0fdf4] rounded-full px-3.5 py-1 mb-2.5">
              <span className="text-sm leading-none">✨</span>
              <span className="text-[11px] font-bold text-green-600 uppercase tracking-[1.2px]">
                Just Dropped
              </span>
            </div>
            <h2 className="text-[36px] font-extrabold text-brand-navy m-0 tracking-[-0.8px]">
              New Arrivals
            </h2>
          </div>
          <Link
            href="/new-arrivals"
            className="text-sm font-bold text-brand-navy px-[26px] py-3 border-2 border-brand-navy rounded-[9px] inline-flex items-center gap-1.5 hover:bg-brand-navy hover:text-white transition-all"
          >
            View All →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-4 gap-[22px]">
          {products.map((product, i) => (
            <ProductCard key={product.id ?? i} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
