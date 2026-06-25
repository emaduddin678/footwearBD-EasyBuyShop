"use client"

import { useState, useEffect } from "react"
import { ProductCard } from "@/components/storefront/ProductCard"
import { allPlpProducts, type PlpProduct } from "@/lib/data/products"

const STORAGE_KEY = "recentlyViewed"
const MAX_ITEMS = 6

export function RecentlyViewedPDP({ currentProductId }: { currentProductId: number }) {
  const [products, setProducts] = useState<PlpProduct[]>([])

  useEffect(() => {
    try {
      const existing: number[] = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]")
      const updated = [
        currentProductId,
        ...existing.filter((id) => id !== currentProductId),
      ].slice(0, MAX_ITEMS)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))

      const others = updated
        .filter((id) => id !== currentProductId)
        .map((id) => allPlpProducts.find((p) => p.id === id))
        .filter((p): p is PlpProduct => p !== undefined)

      setProducts(others)
    } catch {
      // localStorage not available (SSR guard)
    }
  }, [currentProductId])

  if (products.length === 0) return null

  return (
    <section className="bg-white py-8 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-xl font-bold text-[#1A2B5E] mb-6">Recently Viewed</h2>
        <div className="flex gap-4 overflow-x-auto pb-3 [scrollbar-width:thin] [scrollbar-color:#1A2B5E_#e5e7eb]">
          {products.map((p) => (
            <div key={p.id} className="flex-shrink-0 w-[220px]">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
