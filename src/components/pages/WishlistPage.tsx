"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { Heart } from "lucide-react"
import { useAppSelector } from "@/lib/store/hooks"
import { WishlistGrid } from "@/components/storefront/wishlist/WishlistGrid"
import { WishlistSummary } from "@/components/storefront/wishlist/WishlistSummary"
import { EmptyWishlist } from "@/components/storefront/wishlist/EmptyWishlist"
import { ProductCard } from "@/components/storefront/ProductCard"
import { bestSellers } from "@/lib/data/products"

interface Toast {
  id: string
  message: string
  undoFn?: () => void
}

export function WishlistPage() {
  const wishlistItems = useAppSelector((s) => s.wishlist.items)
  const [toasts, setToasts] = useState<Toast[]>([])
  const timerRefs = useRef<Record<string, ReturnType<typeof setTimeout>>>({})

  function dismissToast(id: string) {
    setToasts((prev) => prev.filter((t) => t.id !== id))
    clearTimeout(timerRefs.current[id])
    delete timerRefs.current[id]
  }

  function showToast(message: string, undoFn?: () => void) {
    const id = `toast-${Date.now()}-${Math.random()}`
    setToasts((prev) => [...prev, { id, message, undoFn }])
    timerRefs.current[id] = setTimeout(() => dismissToast(id), 4000)
  }

  function handleAddedToCart(name: string) {
    showToast(`✓ ${name} added to cart!`)
  }

  /* "You Might Also Like" logic: show best sellers not already in wishlist */
  const wishlistIds = new Set(wishlistItems.map((i) => i.id))
  const suggestions = bestSellers
    .filter((p) => !wishlistIds.has(p.id))
    .slice(0, 4)
  const suggestionsLabel =
    wishlistItems.length > 0 ? "Based on your wishlist" : "Popular picks"

  const ToastStack = (
    <div className="fixed bottom-6 left-4 right-4 lg:right-auto z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="bg-gray-900 text-white text-sm px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 pointer-events-auto max-w-sm"
        >
          <span className="flex-1 leading-snug">{t.message}</span>
          {t.undoFn && (
            <button
              onClick={() => {
                t.undoFn?.()
                dismissToast(t.id)
              }}
              className="font-bold text-[#D4A017] hover:text-amber-300 whitespace-nowrap"
            >
              Undo
            </button>
          )}
          <button
            onClick={() => dismissToast(t.id)}
            className="text-gray-500 hover:text-white text-lg leading-none"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )

  return (
    <>
      {/* ── Breadcrumb ── */}
      <div className="bg-[#F8F9FA] w-full py-3 border-b">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="text-[#1A2B5E] hover:underline font-medium">
              Home
            </Link>
            <span>›</span>
            <span>Wishlist</span>
          </nav>
        </div>
      </div>

      {/* ── Page header ── */}
      <div className="bg-white py-6 border-b">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Heart size={24} fill="#D4A017" className="text-[#D4A017]" />
            <h1 className="font-bold text-2xl text-[#1A2B5E]">My Wishlist</h1>
          </div>
          {wishlistItems.length > 0 && (
            <p className="text-sm text-gray-500">
              {wishlistItems.length} item{wishlistItems.length !== 1 ? "s" : ""} saved
            </p>
          )}
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {wishlistItems.length === 0 ? (
          <EmptyWishlist />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left: wishlist grid */}
            <div className="lg:col-span-2">
              <WishlistGrid
                items={wishlistItems}
                onToast={showToast}
                onAddedToCart={handleAddedToCart}
              />
            </div>
            {/* Right: summary sidebar */}
            <div className="lg:col-span-1">
              <WishlistSummary items={wishlistItems} onToast={showToast} />
            </div>
          </div>
        )}
      </div>

      {/* ── You Might Also Like ── */}
      <section className="bg-[#F8F9FA] py-10 w-full">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#1A2B5E]">You Might Also Like</h2>
            <p className="text-sm text-gray-500 mt-1">{suggestionsLabel}</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {suggestions.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/men"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#1A2B5E] hover:text-[#D4A017] transition-colors"
            >
              View All →
            </Link>
          </div>
        </div>
      </section>

      {ToastStack}
    </>
  )
}
