"use client"

import Link from "next/link"
import { ProductCard } from "@/components/storefront/ProductCard"
import type { PlpProduct } from "@/lib/data/products"

interface RelatedProductsProps {
  currentProduct: PlpProduct
  relatedProducts: PlpProduct[]
}

export function RelatedProducts({ currentProduct, relatedProducts }: RelatedProductsProps) {
  if (relatedProducts.length === 0) return null

  const genderPath = currentProduct.gender === "unisex" ? "men" : currentProduct.gender

  return (
    <section className="bg-[#F8F9FA] py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
          <div>
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-3.5 py-1 mb-2.5">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-[1.2px]">
                More Like This
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-[#1A2B5E] tracking-tight">
              You May Also Like
            </h2>
          </div>
          <Link
            href={`/${genderPath}`}
            className="px-4 py-2 border border-[#1A2B5E] text-[#1A2B5E] rounded-lg text-sm font-semibold hover:bg-[#1A2B5E] hover:text-white transition-colors"
          >
            View More →
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
