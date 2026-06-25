import Link from "next/link"
import { ProductCard } from "./ProductCard"
import { newArrivals } from "@/lib/data/products"

export function NewArrivals() {
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
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
