"use client"

import { useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { toggleWishlist } from "@/lib/store/wishlistSlice"
import type { PlpProduct } from "@/lib/data/products"

const PLACEHOLDER = "https://placehold.co/600x600/f5f5f5/cccccc?text=👟"

export function ImageGallery({ product }: { product: PlpProduct }) {
  const allImages = [
    product.primaryImage,
    ...(product.additionalImages ?? []),
  ].filter(Boolean) as string[]

  const images = allImages.length > 0 ? allImages : [PLACEHOLDER]

  const [activeIndex, setActiveIndex] = useState(0)
  const dispatch = useAppDispatch()

  const isWishlisted = useAppSelector((s) =>
    s.wishlist.items.some((i) => i.id === product.id),
  )

  const handleWishlist = () => {
    dispatch(
      toggleWishlist({
        id: product.id,
        name: product.name,
        brand: product.brand,
        category: product.category,
        gender: product.gender,
        price: product.priceNum,
        originalPrice: product.originalPriceNum ?? product.priceNum,
        image: images[0] ?? "",
        sizes: product.sizes,
        unavailableSizes: product.unavailableSizes ?? [],
        rating: product.rating,
        reviewCount: product.reviews,
        badge: product.badge,
        addedAt: new Date().toISOString(),
        imgBg: product.imgBg,
        imgFg: product.imgFg,
        imgText: product.imgText,
      }),
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 group">
        <img
          src={images[activeIndex]}
          alt={product.name}
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badge */}
        {product.badge && (
          <span
            className="absolute top-4 left-4 text-white text-[11px] font-bold px-3 py-1.5 rounded uppercase tracking-[0.6px] z-10"
            style={{ background: product.badgeColor ?? "#888" }}
          >
            {product.badge}
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={handleWishlist}
          className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-pink-50 hover:scale-110 transition-all z-10"
          aria-label="Toggle wishlist"
        >
          <svg
            width="18"
            height="18"
            fill={isWishlisted ? "#ef4444" : "none"}
            viewBox="0 0 24 24"
            stroke={isWishlisted ? "#ef4444" : "#374151"}
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {/* Prev/Next arrows (only when multiple images) */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setActiveIndex((i) => (i - 1 + images.length) % images.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 rounded-full flex items-center justify-center shadow hover:bg-white transition-colors z-10"
              aria-label="Previous image"
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={() => setActiveIndex((i) => (i + 1) % images.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 rounded-full flex items-center justify-center shadow hover:bg-white transition-colors z-10"
              aria-label="Next image"
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-20 h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all hover:scale-105 ${
                activeIndex === i
                  ? "border-[#1A2B5E] shadow-md"
                  : "border-gray-200 hover:border-gray-400"
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <img
                src={img}
                alt={`${product.name} view ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
