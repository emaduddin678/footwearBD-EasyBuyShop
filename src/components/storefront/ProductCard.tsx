"use client"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { addToCart } from "@/lib/store/cartSlice"
import { toggleWishlist } from "@/lib/store/wishlistSlice"
import type { Product } from "@/lib/data/products"

interface ProductCardProps {
  product: Product
  priceColor?: "gold" | "red"
  ctaLabel?: string
  onQuickView?: (product: Product) => void
}

const SIZES = ["38", "39", "40", "41"]

function starStr(rating: number) {
  const r = Math.round(rating)
  return "★".repeat(r) + "☆".repeat(5 - r)
}

export function ProductCard({
  product,
  priceColor = "gold",
  ctaLabel = "Add to Cart",
  onQuickView,
}: ProductCardProps) {
  const dispatch = useAppDispatch()
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [added, setAdded] = useState(false)

  const wishlistKey = product._id ?? product.id
  const isWishlisted = useAppSelector((s) =>
    s.wishlist.items.some((i) => String(i.id) === String(wishlistKey)),
  )

  const imgUrl = product.primaryImage || "https://placehold.co/300x300/f5f5f5/cccccc?text=👟"
  const hoverImgUrl = product.primaryImage || "https://placehold.co/300x300/f5f5f5/cccccc?text=👟"
  const productHref = `/product/${product._id ?? product.id}`

  const handleAddToCart = (size?: string) => {
    const sz = size ?? selectedSize ?? "38"
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        size: sz,
        imgBg: product.imgBg,
        imgFg: product.imgFg,
        imgText: product.imgText,
      }),
    )
    setAdded(true)
    setTimeout(() => {
      setAdded(false)
      setSelectedSize(null)
    }, 1500)
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(
      toggleWishlist({
        id: wishlistKey,
        name: product.name,
        brand: ("brand" in product ? (product as { brand: string }).brand : "") as string,
        category: ("category" in product ? (product as { category: string }).category : product.cat) as string,
        gender: ("gender" in product ? (product as { gender: string }).gender : "") as string,
        price: ("priceNum" in product ? (product as { priceNum: number }).priceNum : parseInt(product.price.replace(/[৳,\s]/g, ""), 10)) as number,
        originalPrice: ("originalPriceNum" in product && (product as { originalPriceNum: number | null }).originalPriceNum != null
          ? (product as { originalPriceNum: number }).originalPriceNum
          : parseInt(product.price.replace(/[৳,\s]/g, ""), 10)) as number,
        image: "",
        sizes: ("sizes" in product ? (product as { sizes: number[] }).sizes : []) as number[],
        unavailableSizes: ("unavailableSizes" in product ? (product as { unavailableSizes: number[] }).unavailableSizes : []) as number[],
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
    <div className="group bg-white rounded-[14px] overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_48px_rgba(26,43,94,0.2)] hover:-translate-y-2 transition-all duration-300">
      {/* ── Image (links to PDP) ── */}
      <Link href={productHref} className="block relative overflow-hidden bg-gray-50">
        <img
          src={imgUrl}
          alt={product.name}
          className="w-full h-60 object-cover transition-opacity duration-500 group-hover:opacity-0"
        />
        <img
          src={hoverImgUrl}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-60 object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />

        {/* Badge */}
        {product.badge && (
          <span
            className="absolute top-3 left-3 text-white text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-[0.6px] z-10"
            style={{ background: product.badgeColor ?? "#888" }}
          >
            {product.badge}
          </span>
        )}

        {/* Wishlist btn */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 w-[34px] h-[34px] bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-pink-50 hover:scale-110 transition-all z-10"
          aria-label="Toggle wishlist"
        >
          <svg
            width="15"
            height="15"
            fill={isWishlisted ? "#ef4444" : "none"}
            viewBox="0 0 24 24"
            stroke={isWishlisted ? "#ef4444" : "#374151"}
            strokeWidth="2.2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {/* Quick-add overlay (slides up on hover) */}
        <div
          className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-black/75 backdrop-blur-sm p-3"
          onClick={(e) => e.preventDefault()}
        >
          <div className="text-[10px] font-bold text-white/50 uppercase tracking-[1.2px] mb-2">
            Select Size
          </div>
          <div className="flex items-center gap-1.5">
            {SIZES.map((sz) => (
              <button
                key={sz}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setSelectedSize(sz)
                }}
                className={cn(
                  "h-8 w-[38px] rounded-md text-xs font-bold transition-all",
                  selectedSize === sz
                    ? "bg-white text-brand-navy shadow-md scale-105"
                    : "bg-white/10 text-white/80 hover:bg-white/25",
                )}
              >
                {sz}
              </button>
            ))}
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                if (selectedSize) handleAddToCart(selectedSize)
              }}
              className={cn(
                "flex-1 h-8 rounded-md text-xs font-bold transition-all",
                added
                  ? "bg-green-500 text-white"
                  : selectedSize
                  ? "bg-brand-gold text-white hover:bg-brand-gold-dark"
                  : "bg-white/10 text-white/40 cursor-not-allowed",
              )}
            >
              {added ? "✓ Added!" : selectedSize ? "Add →" : "Pick Size"}
            </button>
          </div>
        </div>
      </Link>

      {/* ── Card body ── */}
      <div className="p-4 pb-[18px]">
        {/* Name + category link to PDP */}
        <Link href={productHref} className="block group/name mb-2.5">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
            {product.cat}
          </div>
          <div className="text-base font-bold text-gray-900 leading-snug group-hover/name:text-[#1A2B5E] transition-colors">
            {product.name}
          </div>
        </Link>

        <div className="flex items-center gap-2 mb-2.5">
          <span
            className={cn(
              "text-xl font-extrabold tracking-tight",
              priceColor === "red" ? "text-red-500" : "text-brand-gold",
            )}
          >
            {product.price}
          </span>
          {product.old && (
            <span className="text-[13px] text-gray-400 line-through font-medium">
              {product.old}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5 mb-4">
          <span className="text-amber-400 text-[13px] tracking-widest">
            {starStr(product.rating)}
          </span>
          <span className="text-xs text-gray-400 font-medium">
            {product.rating.toFixed(1)} ({product.reviews})
          </span>
        </div>

        <button
          onClick={() => handleAddToCart()}
          className={cn(
            "w-full text-white rounded-lg py-3 text-sm font-bold transition-colors flex items-center justify-center gap-2",
            added
              ? "bg-green-500"
              : priceColor === "red"
              ? "bg-red-500 hover:bg-red-600"
              : "bg-brand-navy hover:bg-brand-gold",
          )}
        >
          <svg
            width="15"
            height="15"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          {added ? "✓ Added to Cart!" : ctaLabel}
        </button>
      </div>
    </div>
  )
}
