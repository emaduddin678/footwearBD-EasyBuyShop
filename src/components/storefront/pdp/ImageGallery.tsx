"use client"

import { useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { toggleWishlist } from "@/lib/store/wishlistSlice"
import type { PlpProduct } from "@/lib/data/products"

const THUMBNAILS = [
  "https://placehold.co/600x600/f5f5f5/cccccc?text=Shoe",
  "https://placehold.co/600x600/e8f0fe/1A2B5E?text=Shoe",
  "https://placehold.co/600x600/fff3e0/D4A017?text=Shoe",
  "https://placehold.co/600x600/fce4ec/c62828?text=Shoe",
]

export function ImageGallery({ product }: { product: PlpProduct }) {
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
        image: "",
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
          src={THUMBNAILS[activeIndex]}
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
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-3">
        {THUMBNAILS.map((thumb, i) => (
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
              src={thumb}
              alt={`Product view ${i + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
