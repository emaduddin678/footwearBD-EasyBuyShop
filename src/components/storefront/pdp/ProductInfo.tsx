"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { addToCart } from "@/lib/store/cartSlice"
import { toggleWishlist } from "@/lib/store/wishlistSlice"
import { SizeSelector } from "./SizeSelector"
import type { PlpProduct } from "@/lib/data/products"

const COLOR_HEX: Record<string, string> = {
  Black: "#000000",
  White: "#F5F5F5",
  Brown: "#8B4513",
  Navy: "#1A2B5E",
  Red: "#DC2626",
  Tan: "#D2B48C",
  Grey: "#9CA3AF",
  Pink: "#EC4899",
  Purple: "#7C3AED",
}

function starStr(rating: number) {
  const r = Math.round(rating)
  return "★".repeat(r) + "☆".repeat(5 - r)
}

function Toast({
  product,
  size,
  qty,
  onDismiss,
}: {
  product: PlpProduct
  size: number
  qty: number
  onDismiss: () => void
}) {
  const router = useRouter()

  useEffect(() => {
    const t = setTimeout(onDismiss, 4000)
    return () => clearTimeout(t)
  }, [onDismiss])

  return (
    <div className="fixed top-4 right-4 z-[70] bg-white rounded-xl shadow-2xl border border-gray-100 p-4 w-72 animate-in slide-in-from-right-4 duration-300">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
          <svg
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#16a34a"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-gray-800 text-sm truncate">
            {product.name} added to cart
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            Size {size} · Qty {qty} · {product.price}
          </p>
          <button
            onClick={() => router.push("/cart")}
            className="mt-2 text-xs font-bold text-[#1A2B5E] hover:text-[#D4A017] transition-colors"
          >
            View Cart →
          </button>
        </div>
        <button
          onClick={onDismiss}
          className="text-gray-300 hover:text-gray-500 flex-shrink-0"
          aria-label="Dismiss"
        >
          <svg
            width="14"
            height="14"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3002"

export function ProductInfo({ product }: { product: PlpProduct }) {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const sizeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (product._id) {
      fetch(`${API_URL}/api/products/${product._id}/view`, { method: "PATCH" }).catch(() => {})
    }
  }, [product._id])

  const [selectedSize, setSelectedSize] = useState<number | null>(null)
  const [selectedColor, setSelectedColor] = useState<string>(product.color)
  const [qty, setQty] = useState(1)
  const [sizeError, setSizeError] = useState(false)
  const [showToast, setShowToast] = useState(false)

  const isWishlisted = useAppSelector((s) =>
    s.wishlist.items.some((i) => i.id === product.id),
  )

  const unavailableSizes = product.unavailableSizes ?? []
  const colorVariants: string[] = product.extraColors ?? [product.color]

  const discount =
    product.originalPriceNum
      ? Math.round(
          ((product.originalPriceNum - product.priceNum) / product.originalPriceNum) * 100,
        )
      : 0

  const doDispatch = () => {
    if (!selectedSize) return
    for (let i = 0; i < qty; i++) {
      dispatch(
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          size: String(selectedSize),
          imgBg: product.imgBg,
          imgFg: product.imgFg,
          imgText: product.imgText,
        }),
      )
    }
  }

  const validateSize = () => {
    if (!selectedSize) {
      setSizeError(true)
      sizeRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
      return false
    }
    return true
  }

  const handleAddToCart = () => {
    if (!validateSize()) return
    setSizeError(false)
    doDispatch()
    setShowToast(true)
  }

  const handleBuyNow = () => {
    if (!validateSize()) return
    setSizeError(false)
    doDispatch()
    router.push("/cart")
  }

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
      {/* Brand */}
      <p className="text-sm font-bold text-[#D4A017] uppercase tracking-widest">
        {product.brand}
      </p>

      {/* Name */}
      <h1 className="text-2xl font-bold text-[#1A2B5E] leading-snug">{product.name}</h1>

      {/* Category pill */}
      <span className="inline-block self-start bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">
        {product.cat}
      </span>

      {/* Rating row */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-amber-400 text-base tracking-widest">{starStr(product.rating)}</span>
        <span className="font-semibold text-[#1A2B5E] text-sm">{product.rating.toFixed(1)}</span>
        <a
          href="#reviews"
          className="text-sm text-gray-400 hover:text-[#1A2B5E] transition-colors"
        >
          ({product.reviews} reviews)
        </a>
        <span className="text-gray-200">|</span>
        <span
          className={cn(
            "text-xs font-bold px-2.5 py-1 rounded-full",
            product.inStock
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-600",
          )}
        >
          {product.inStock ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      {/* Price */}
      <div className="flex items-end gap-3 flex-wrap">
        <span className="text-3xl font-extrabold text-[#1A2B5E]">{product.price}</span>
        {product.old && (
          <>
            <span className="text-xl text-gray-400 line-through leading-none">{product.old}</span>
            <span className="text-sm font-semibold text-green-600">
              Save ৳{(product.originalPriceNum! - product.priceNum).toLocaleString()} ({discount}% off)
            </span>
          </>
        )}
      </div>

      <hr className="border-gray-100" />

      {/* Size Selector */}
      <div ref={sizeRef}>
        <SizeSelector
          sizes={product.sizes}
          unavailableSizes={unavailableSizes}
          selectedSize={selectedSize}
          onSizeChange={(size) => {
            setSelectedSize(size)
            setSizeError(false)
          }}
          error={sizeError}
        />
      </div>

      {/* Color */}
      {colorVariants.length > 1 && (
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">
            Color:{" "}
            <span className="font-semibold text-[#1A2B5E]">{selectedColor}</span>
          </p>
          <div className="flex gap-2">
            {colorVariants.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedColor(c)}
                title={c}
                aria-label={c}
                className={cn(
                  "w-7 h-7 rounded-full border-2 transition-all hover:scale-110",
                  selectedColor === c
                    ? "border-[#D4A017] scale-110 shadow-md"
                    : "border-gray-200",
                )}
                style={{ background: COLOR_HEX[c] ?? "#ccc" }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Quantity</p>
        <div className="flex items-center">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            disabled={qty <= 1}
            className="w-9 h-9 rounded-l-lg border border-r-0 border-gray-200 flex items-center justify-center text-[#1A2B5E] font-bold text-lg hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            −
          </button>
          <div className="w-12 h-9 border-t border-b border-gray-200 flex items-center justify-center font-semibold text-sm">
            {qty}
          </div>
          <button
            onClick={() => setQty((q) => Math.min(10, q + 1))}
            disabled={qty >= 10}
            className="w-9 h-9 rounded-r-lg border border-l-0 border-gray-200 flex items-center justify-center text-[#1A2B5E] font-bold text-lg hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 mt-1">
        <button
          onClick={handleAddToCart}
          className="w-full py-3.5 rounded-xl bg-[#1A2B5E] text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#243d84] hover:scale-[1.01] transition-all"
        >
          🛒 Add to Cart
        </button>
        <button
          onClick={handleBuyNow}
          className="w-full py-3.5 rounded-xl bg-[#D4A017] text-[#1A2B5E] font-bold text-sm hover:bg-[#b8890f] transition-colors"
        >
          Buy Now
        </button>
        <button
          onClick={handleWishlist}
          className="w-full py-3 rounded-xl bg-white border border-[#1A2B5E] text-[#1A2B5E] font-medium text-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
        >
          <svg
            width="16"
            height="16"
            fill={isWishlisted ? "#ef4444" : "none"}
            viewBox="0 0 24 24"
            stroke={isWishlisted ? "#ef4444" : "#1A2B5E"}
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        </button>
      </div>

      {/* Delivery Info */}
      <div className="bg-[#F8F9FA] rounded-xl p-4 flex flex-col gap-3 mt-1">
        {[
          { icon: "🚚", label: "Free Delivery", desc: "On orders above ৳2,000" },
          { icon: "🔄", label: "Easy Returns", desc: "7-day hassle-free returns" },
          { icon: "✅", label: "Authentic Products", desc: "100% genuine guarantee" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <span className="text-xl leading-none">{item.icon}</span>
            <div className="text-sm">
              <span className="font-bold text-gray-800">{item.label}</span>
              <span className="text-gray-400"> — {item.desc}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Share */}
      <div className="flex items-center gap-3 text-sm flex-wrap">
        <span className="font-medium text-gray-500">Share:</span>
        <a
          href={`https://wa.me/?text=${encodeURIComponent(`Check out ${product.name} — ${product.price} on FootwearBD`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-green-600 hover:text-green-700 transition-colors"
        >
          WhatsApp
        </a>
        <button
          onClick={() => {
            if (typeof window !== "undefined") {
              navigator.clipboard.writeText(window.location.href).catch(() => {})
            }
          }}
          className="font-medium text-[#1A2B5E] hover:text-[#D4A017] transition-colors"
        >
          Copy Link
        </button>
      </div>

      {/* Toast */}
      {showToast && selectedSize && (
        <Toast
          product={product}
          size={selectedSize}
          qty={qty}
          onDismiss={() => setShowToast(false)}
        />
      )}
    </div>
  )
}
