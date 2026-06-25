"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { addToCart } from "@/lib/store/cartSlice"
import { toggleWishlist } from "@/lib/store/wishlistSlice"
import type { PlpProduct } from "@/lib/data/products"

interface QuickViewModalProps {
  product: PlpProduct | null
  onClose: () => void
}

function starStr(rating: number) {
  const r = Math.round(rating)
  return "★".repeat(r) + "☆".repeat(5 - r)
}

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const dispatch = useAppDispatch()
  const [selectedSize, setSelectedSize] = useState<number | null>(null)
  const [added, setAdded] = useState(false)

  const isWishlisted = useAppSelector((s) =>
    product ? s.wishlist.items.some((i) => i.id === product.id) : false
  )

  useEffect(() => {
    if (!product) return
    setSelectedSize(null)
    setAdded(false)
  }, [product?.id])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = product ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [product])

  if (!product) return null

  const handleAddToCart = () => {
    if (!selectedSize) return
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      size: String(selectedSize),
      imgBg: product.imgBg,
      imgFg: product.imgFg,
      imgText: product.imgText,
    }))
    setAdded(true)
    setTimeout(() => { setAdded(false); setSelectedSize(null) }, 1500)
  }

  const handleWishlist = () => {
    dispatch(toggleWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      imgBg: product.imgBg,
      imgFg: product.imgFg,
      imgText: product.imgText,
    }))
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl flex overflow-hidden max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          aria-label="Close quick view"
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Left: Image 60% */}
        <div className="hidden sm:flex w-[60%] flex-shrink-0 bg-gray-50 items-center justify-center">
          <img
            src="https://placehold.co/600x600/f5f5f5/cccccc?text=Shoe"
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: Details 40% */}
        <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4 min-h-0">
          {/* Badge */}
          {product.badge && (
            <span
              className="self-start text-white text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-[0.6px]"
              style={{ background: product.badgeColor ?? "#888" }}
            >
              {product.badge}
            </span>
          )}

          {/* Brand */}
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest -mb-2">
            {product.brand}
          </p>

          {/* Name */}
          <h2 className="text-xl font-bold text-[#1A2B5E] leading-snug">
            {product.name}
          </h2>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-2xl font-extrabold text-[#D4A017]">{product.price}</span>
            {product.old && (
              <span className="text-sm text-gray-400 line-through">{product.old}</span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <span className="text-amber-400 text-sm tracking-widest">{starStr(product.rating)}</span>
            <span className="text-xs text-gray-400">
              {product.rating.toFixed(1)} ({product.reviews} reviews)
            </span>
          </div>

          {/* Sizes */}
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              Select Size
            </p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg border text-sm font-semibold transition-all",
                    selectedSize === size
                      ? "border-[#1A2B5E] bg-[#1A2B5E] text-white"
                      : "border-gray-200 text-gray-700 hover:border-[#1A2B5E]"
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={!selectedSize}
            className={cn(
              "w-full py-3 rounded-lg font-bold text-sm transition-colors mt-2",
              added
                ? "bg-green-500 text-white"
                : selectedSize
                ? "bg-[#1A2B5E] text-white hover:bg-[#D4A017]"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            )}
          >
            {added ? "✓ Added to Cart!" : selectedSize ? "Add to Cart" : "Select a Size"}
          </button>

          {/* Add to Wishlist */}
          <button
            onClick={handleWishlist}
            className={cn(
              "text-sm font-medium underline-offset-2 hover:underline transition-colors",
              isWishlisted ? "text-red-500" : "text-[#1A2B5E] hover:text-[#D4A017]"
            )}
          >
            {isWishlisted ? "♥ Remove from Wishlist" : "♡ Add to Wishlist"}
          </button>
        </div>
      </div>
    </div>
  )
}
