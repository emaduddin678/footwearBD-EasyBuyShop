"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  type CartItem,
} from "@/lib/store/cartSlice"
import { toggleWishlist } from "@/lib/store/wishlistSlice"
import { ProductCard } from "@/components/storefront/ProductCard"
import { bestSellers } from "@/lib/data/products"

const FREE_DELIVERY_THRESHOLD = 2000
const DELIVERY_FEE = 120

type PromoResult = { type: "percent"; value: number } | { type: "freeship" }

const COUPON_CODES: Record<string, PromoResult> = {
  EID20: { type: "percent", value: 20 },
  WELCOME10: { type: "percent", value: 10 },
  FREESHIP: { type: "freeship" },
}

interface Toast {
  id: string
  message: string
  undoFn?: () => void
}

function parsePrice(p: string) {
  return parseInt(p.replace(/[৳,\s]/g, ""), 10) || 0
}

function fmt(n: number) {
  return n.toLocaleString()
}

/* ── 3-step checkout stepper ── */
function CheckoutStepper({ step }: { step: 1 | 2 | 3 }) {
  const steps = ["Cart", "Checkout", "Confirmation"]
  return (
    <div className="flex items-center justify-center mb-10">
      {steps.map((label, i) => {
        const s = (i + 1) as 1 | 2 | 3
        const active = s === step
        const done = s < step
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-extrabold transition-colors ${
                  active
                    ? "bg-[#D4A017] text-white ring-4 ring-amber-100"
                    : done
                    ? "bg-[#1A2B5E] text-white"
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                {done ? (
                  <svg
                    width="13"
                    height="13"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  s
                )}
              </div>
              <span
                className={`text-xs font-semibold mt-1.5 whitespace-nowrap ${
                  active ? "text-[#D4A017]" : done ? "text-[#1A2B5E]" : "text-gray-400"
                }`}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`w-20 sm:w-32 h-0.5 mx-3 mb-5 rounded-full transition-colors ${
                  done ? "bg-[#1A2B5E]" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

export function CartPage() {
  const dispatch = useAppDispatch()
  const items = useAppSelector((s) => s.cart.items)
  const wishlistItems = useAppSelector((s) => s.wishlist.items)

  const [coupon, setCoupon] = useState("")
  const [appliedPromo, setAppliedPromo] = useState<PromoResult | null>(null)
  const [couponError, setCouponError] = useState("")
  const [couponSuccess, setCouponSuccess] = useState("")
  const [toasts, setToasts] = useState<Toast[]>([])
  const timerRefs = useRef<Record<string, ReturnType<typeof setTimeout>>>({})

  useEffect(() => {
    const refs = timerRefs.current
    return () => Object.values(refs).forEach(clearTimeout)
  }, [])

  function dismissToast(id: string) {
    setToasts((prev) => prev.filter((t) => t.id !== id))
    clearTimeout(timerRefs.current[id])
    delete timerRefs.current[id]
  }

  function showToast(id: string, message: string, undoFn?: () => void) {
    setToasts((prev) => [...prev.filter((t) => t.id !== id), { id, message, undoFn }])
    timerRefs.current[id] = setTimeout(() => dismissToast(id), 4000)
  }

  function handleRemoveItem(item: CartItem) {
    const snap = { ...item }
    dispatch(removeFromCart({ id: snap.id, size: snap.size }))
    const tid = `rm-${snap.id}-${snap.size}-${Date.now()}`
    showToast(tid, `"${snap.name}" removed from cart.`, () => {
      dispatch(
        addToCart({
          id: snap.id,
          name: snap.name,
          price: snap.price,
          size: snap.size,
          imgBg: snap.imgBg,
          imgFg: snap.imgFg,
          imgText: snap.imgText,
        }),
      )
      for (let i = 1; i < snap.quantity; i++) {
        dispatch(incrementQuantity({ id: snap.id, size: snap.size }))
      }
      dismissToast(tid)
    })
  }

  function handleSaveForLater(item: CartItem) {
    dispatch(removeFromCart({ id: item.id, size: item.size }))
    if (!wishlistItems.some((w) => w.id === item.id)) {
      dispatch(
        toggleWishlist({
          id: item.id,
          name: item.name,
          brand: "",
          category: "",
          gender: "",
          price: parseInt(item.price.replace(/[৳,\s]/g, ""), 10) || 0,
          originalPrice: parseInt(item.price.replace(/[৳,\s]/g, ""), 10) || 0,
          image: "",
          sizes: [],
          unavailableSizes: [],
          rating: 0,
          reviewCount: 0,
          badge: null,
          addedAt: new Date().toISOString(),
          imgBg: item.imgBg,
          imgFg: item.imgFg,
          imgText: item.imgText,
        }),
      )
    }
    showToast(`wl-${item.id}-${Date.now()}`, "Moved to Wishlist ♡")
  }

  function handleApplyCoupon() {
    const code = coupon.trim().toUpperCase()
    const promo = COUPON_CODES[code]
    if (promo) {
      setAppliedPromo(promo)
      setCouponSuccess(
        promo.type === "percent"
          ? `${promo.value}% discount applied!`
          : "Free shipping applied!",
      )
      setCouponError("")
    } else {
      setCouponError("Invalid promo code. Try EID20")
      setCouponSuccess("")
      setAppliedPromo(null)
    }
  }

  /* ── Derived totals ── */
  const subtotal = items.reduce((s, i) => s + parsePrice(i.price) * i.quantity, 0)
  const totalQty = items.reduce((s, i) => s + i.quantity, 0)
  const discountPct = appliedPromo?.type === "percent" ? appliedPromo.value : 0
  const discountAmount = Math.round((subtotal * discountPct) / 100)
  const afterDiscount = subtotal - discountAmount
  const freeShip = appliedPromo?.type === "freeship"
  const deliveryFee = afterDiscount >= FREE_DELIVERY_THRESHOLD || freeShip ? 0 : DELIVERY_FEE
  const total = afterDiscount + deliveryFee
  const deliveryPct = Math.min((subtotal / FREE_DELIVERY_THRESHOLD) * 100, 100)
  const remaining = Math.max(FREE_DELIVERY_THRESHOLD - subtotal, 0)

  /* ── Toast overlay ── */
  const ToastStack = (
    <div className="fixed bottom-20 lg:bottom-6 left-4 right-4 lg:right-auto z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="bg-gray-900 text-white text-sm px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 pointer-events-auto max-w-sm"
        >
          <span className="flex-1 leading-snug">{t.message}</span>
          {t.undoFn && (
            <button
              onClick={t.undoFn}
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

  /* ── Empty state ── */
  if (items.length === 0) {
    return (
      <>
        <CheckoutStepper step={1} />
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="mb-8 text-gray-300">
            <svg
              width="80"
              height="80"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </div>
          <h2 className="text-2xl font-extrabold text-[#1A2B5E] mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-400 text-sm mb-8 max-w-xs leading-relaxed">
            Looks like you haven&apos;t added anything yet.
          </p>
          <div className="flex gap-3 mb-6">
            <Link
              href="/men"
              className="bg-[#1A2B5E] text-white px-7 py-3 rounded-xl font-bold text-sm hover:bg-[#D4A017] transition-colors"
            >
              Shop Men&apos;s
            </Link>
            <Link
              href="/women"
              className="border-2 border-[#1A2B5E] text-[#1A2B5E] px-7 py-3 rounded-xl font-bold text-sm hover:bg-[#1A2B5E] hover:text-white transition-colors"
            >
              Shop Women&apos;s
            </Link>
          </div>
          <Link
            href="/wishlist"
            className="text-sm font-semibold text-[#D4A017] hover:underline"
          >
            Or check your Wishlist →
          </Link>
        </div>
        {ToastStack}
      </>
    )
  }

  /* ── Filled cart ── */
  return (
    <div className="pb-24 lg:pb-0">
      <CheckoutStepper step={1} />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
        {/* ── Left: Cart items ── */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-extrabold text-gray-800">
              {totalQty} {totalQty === 1 ? "item" : "items"} in your cart
            </h2>
            <button
              onClick={() => dispatch(clearCart())}
              className="text-sm text-red-400 hover:text-red-600 font-semibold transition-colors"
            >
              Clear all
            </button>
          </div>

          <div className="space-y-3">
            {items.map((item) => {
              const lineTotal = parsePrice(item.price) * item.quantity
              return (
                <div
                  key={`${item.id}-${item.size}`}
                  className="bg-white rounded-2xl p-5 flex gap-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Product image */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://placehold.co/96x96/f5f5f5/1A2B5E?text=%F0%9F%91%9F"
                    alt={item.name}
                    width={88}
                    height={88}
                    className="w-[88px] h-[88px] rounded-xl flex-shrink-0 object-cover"
                  />

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-bold text-gray-900 text-[15px] leading-snug">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">Size: EU {item.size}</p>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item)}
                        className="text-gray-300 hover:text-red-500 transition-colors p-1 -mt-0.5 flex-shrink-0"
                        aria-label="Remove item"
                      >
                        <svg
                          width="15"
                          height="15"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                        </svg>
                      </button>
                    </div>

                    <button
                      onClick={() => handleSaveForLater(item)}
                      className="text-xs text-[#1A2B5E] hover:text-[#D4A017] font-semibold mt-1 transition-colors"
                    >
                      ♡ Save for later
                    </button>

                    <div className="flex items-center justify-between mt-3">
                      {/* Qty stepper */}
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() =>
                            dispatch(decrementQuantity({ id: item.id, size: item.size }))
                          }
                          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors text-lg font-light"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="w-9 h-8 flex items-center justify-center text-sm font-bold text-gray-800 border-x border-gray-200">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            dispatch(incrementQuantity({ id: item.id, size: item.size }))
                          }
                          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors text-lg font-light"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      {/* Line total */}
                      <div className="text-right">
                        <p className="text-lg font-extrabold text-[#1A2B5E]">
                          ৳{fmt(lineTotal)}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-[11px] text-gray-400">{item.price} each</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 mt-6 text-sm font-semibold text-[#1A2B5E] hover:text-[#D4A017] transition-colors"
          >
            <svg
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Continue Shopping
          </Link>
        </div>

        {/* ── Right: Order summary ── */}
        <div className="space-y-4 lg:sticky lg:top-[140px]">
          {/* Summary card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-extrabold text-gray-800 mb-5">Order Summary</h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">
                  Subtotal ({totalQty} {totalQty === 1 ? "item" : "items"})
                </span>
                <span className="font-semibold">৳{fmt(subtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-green-600 font-semibold">
                  <span>Promo discount ({discountPct}%)</span>
                  <span>−৳{fmt(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-gray-500">Delivery</span>
                {deliveryFee === 0 ? (
                  <span className="text-green-600 font-bold">FREE</span>
                ) : (
                  <span className="font-semibold">৳{DELIVERY_FEE}</span>
                )}
              </div>

              {/* Free delivery progress bar */}
              <div className="pt-1">
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-2 bg-[#1A2B5E] rounded-full transition-all duration-500"
                    style={{ width: `${deliveryPct}%` }}
                  />
                </div>
                {remaining > 0 ? (
                  <p className="text-[11px] text-gray-500 mt-1.5">
                    Add ৳{fmt(remaining)} more for free delivery
                  </p>
                ) : (
                  <p className="text-[11px] text-green-600 mt-1.5 font-semibold">
                    🎉 You have free delivery!
                  </p>
                )}
              </div>
            </div>

            <div className="border-t border-gray-100 my-4" />

            <div className="flex justify-between items-center">
              <span className="text-base font-extrabold text-gray-900">Total</span>
              <span className="text-2xl font-extrabold text-[#1A2B5E]">৳{fmt(total)}</span>
            </div>
            <p className="text-[11px] text-gray-400 mt-1 text-right">Including VAT</p>
          </div>

          {/* Promo code */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-gray-700 mb-3">Promo Code</h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={coupon}
                onChange={(e) => {
                  setCoupon(e.target.value)
                  setCouponError("")
                  setCouponSuccess("")
                }}
                onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                placeholder="Enter promo code"
                className="flex-1 h-10 border border-gray-200 rounded-lg px-3 text-sm outline-none focus:border-[#1A2B5E] transition-colors"
              />
              <button
                onClick={handleApplyCoupon}
                className="h-10 px-4 bg-[#1A2B5E] text-white rounded-lg text-sm font-bold hover:bg-[#D4A017] transition-colors whitespace-nowrap"
              >
                Apply
              </button>
            </div>
            {couponError && (
              <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
                <span>✕</span> {couponError}
              </p>
            )}
            {couponSuccess && (
              <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                <span>✓</span> {couponSuccess}
              </p>
            )}
          </div>

          {/* Payment badges */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
              We Accept
            </p>
            <div className="flex flex-wrap gap-2">
              {["bKash", "Nagad", "Rocket", "VISA", "MasterCard", "COD"].map((m) => (
                <span
                  key={m}
                  className="px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-xs font-semibold text-gray-600"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>

          {/* Checkout CTA */}
          <Link
            href="/checkout"
            className="flex items-center justify-center gap-2 w-full bg-[#1A2B5E] hover:bg-[#D4A017] text-white font-extrabold py-4 rounded-xl transition-colors text-[15px] tracking-wide"
          >
            Proceed to Checkout
            <svg
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>

          <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400 pb-1">
            <svg
              width="13"
              height="13"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Secure checkout — 100% safe &amp; encrypted
          </div>
        </div>
      </div>

      {/* ── You May Also Like ── */}
      <section className="mt-16 bg-gray-100 rounded-2xl p-6">
        <h2 className="text-xl font-extrabold text-gray-800 mb-6">You May Also Like</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {bestSellers.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ── Mobile sticky checkout bar ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white border-t border-gray-200 px-4 py-3 flex items-center justify-between shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
        <div>
          <p className="text-[11px] text-gray-400 font-medium">Total</p>
          <p className="text-lg font-extrabold text-[#1A2B5E]">৳{fmt(total)}</p>
        </div>
        <Link
          href="/checkout"
          className="bg-[#D4A017] hover:bg-amber-600 text-white font-extrabold px-6 py-3 rounded-xl text-sm transition-colors"
        >
          Checkout →
        </Link>
      </div>

      {ToastStack}
    </div>
  )
}
