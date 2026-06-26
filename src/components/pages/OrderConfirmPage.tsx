"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ProductCard } from "@/components/storefront/ProductCard"
import { bestSellers } from "@/lib/data/products"

interface OrderData {
  orderId: string
  customer: { firstName: string; lastName: string; email: string; phone: string }
  delivery: {
    type: "home" | "pickup"
    address: string; area: string; city: string; postalCode: string
    speed: "standard" | "express"
    charge: number
  }
  payment: { method: string; accountNumber: string | null }
  pricing: { subtotal: number; discount: number; deliveryCharge: number; total: number }
  placedAt: string
  items: { id: number; name: string; price: string; size: string; quantity: number }[]
}

function fmt(n: number) {
  return n.toLocaleString()
}

function formatName(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
}

const METHOD_LABELS: Record<string, string> = {
  bkash: "bKash", nagad: "Nagad", rocket: "Rocket", card: "Card Payment", cod: "Cash on Delivery",
}

/* Add business days to a date (skips Fri/Sat for Bangladesh) */
function addBusinessDays(date: Date, days: number): Date {
  const result = new Date(date)
  let added = 0
  while (added < days) {
    result.setDate(result.getDate() + 1)
    const dow = result.getDay()
    if (dow !== 5 && dow !== 6) added++ // skip Fri=5, Sat=6
  }
  return result
}

function formatDateRange(start: Date, end: Date): string {
  const opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "long" }
  const endOpts: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" }
  if (start.getMonth() === end.getMonth()) {
    return `${start.getDate()} – ${end.toLocaleDateString("en-GB", endOpts)}`
  }
  return `${start.toLocaleDateString("en-GB", opts)} – ${end.toLocaleDateString("en-GB", endOpts)}`
}

function getEstimatedDelivery(speed: "standard" | "express" | undefined, type: "home" | "pickup"): string {
  if (type === "pickup") return "Ready in 2–4 hours"
  const now = new Date()
  if (speed === "express") {
    const d = addBusinessDays(now, 1)
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
  }
  const start = addBusinessDays(now, 3)
  const end = addBusinessDays(now, 5)
  return formatDateRange(start, end)
}

/* ── 3-step stepper at step 3 ── */
function CheckoutStepper() {
  const steps = ["Cart", "Checkout", "Confirmation"]
  return (
    <div className="flex items-center justify-center mb-10">
      {steps.map((label, i) => {
        const s = i + 1
        const done = s < 3
        const active = s === 3
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-extrabold transition-colors ${
                active ? "bg-[#D4A017] text-white ring-4 ring-amber-100"
                  : done ? "bg-[#1A2B5E] text-white"
                  : "bg-gray-200 text-gray-400"
              }`}>
                {done ? (
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                ) : s}
              </div>
              <span className={`text-xs font-semibold mt-1.5 whitespace-nowrap ${
                active ? "text-[#D4A017]" : done ? "text-[#1A2B5E]" : "text-gray-400"
              }`}>{label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-20 sm:w-32 h-0.5 mx-3 mb-5 rounded-full ${done ? "bg-[#1A2B5E]" : "bg-gray-200"}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default function OrderConfirmPage() {
  const [order, setOrder] = useState<OrderData | null>(null)

  useEffect(() => {
    const raw = sessionStorage.getItem("lastOrder")
    if (raw) {
      try { setOrder(JSON.parse(raw)) } catch { /* ignore */ }
    }
  }, [])

  if (!order) {
    return (
      <div className="py-24 text-center">
        <CheckoutStepper />
        <p className="text-gray-500 mb-6">No order found.</p>
        <Link href="/" className="bg-[#1A2B5E] text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-[#D4A017] transition-colors">
          Back to Home
        </Link>
      </div>
    )
  }

  const placedDate = new Date(order.placedAt).toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  })

  const estimatedDelivery = getEstimatedDelivery(order.delivery.speed, order.delivery.type)
  const expressDate = order.delivery.type !== "pickup"
    ? addBusinessDays(new Date(order.placedAt), order.delivery.speed === "express" ? 1 : 5)
    : null

  const waMessage = encodeURIComponent(`Hi, my order is ${order.orderId}`)

  return (
    <div className="pb-16">
      <CheckoutStepper />

      {/* ── Success banner ── */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 mb-6 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-[#1A2B5E] mb-1">Order Placed Successfully!</h1>
        <p className="text-gray-500 text-sm mb-4">
          Thank you, {formatName(order.customer.firstName)}! Your order has been confirmed.
        </p>
        <div className="inline-flex items-center gap-2 bg-[#F0F4FF] border border-[#1A2B5E]/20 rounded-lg px-4 py-2 mb-2">
          <span className="text-xs text-gray-500">Order ID</span>
          <span className="font-bold text-[#1A2B5E] text-sm">{order.orderId}</span>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Estimated delivery: <span className="font-medium text-gray-700">{estimatedDelivery}</span>
        </p>
        <p className="text-xs text-gray-400 mt-1">Placed on {placedDate}</p>
      </div>

      {/* ── WhatsApp support ── */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 max-w-lg mx-auto mb-6 flex flex-col sm:flex-row items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
          <svg viewBox="0 0 24 24" width="26" height="26" fill="#25d366">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </div>
        <div className="flex-1 text-center sm:text-left">
          <p className="font-medium text-gray-900 text-sm">Need help with your order?</p>
          <p className="text-xs text-gray-500 mt-0.5">Chat with us on WhatsApp for instant support</p>
        </div>
        <a
          href={`https://wa.me/8801712345678?text=${waMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 bg-[#25d366] hover:bg-green-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors whitespace-nowrap"
        >
          Chat on WhatsApp →
        </a>
      </div>

      {/* ── What happens next — visual timeline ── */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-8">
        <h2 className="font-semibold text-[#1A2B5E] text-center mb-6">What Happens Next?</h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-0">

          {/* Step 1 — Done */}
          <div className="flex sm:flex-col items-center sm:items-center gap-4 sm:gap-2 flex-1">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-xl flex-shrink-0">📧</div>
            <div className="sm:text-center">
              <p className="font-semibold text-sm text-green-700">Order Confirmed</p>
              <p className="text-xs text-gray-500 mt-0.5">Confirmation sent to your email</p>
              <span className="inline-block mt-1 text-[10px] font-bold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">DONE</span>
            </div>
          </div>

          {/* connector */}
          <div className="hidden sm:block h-0.5 w-12 bg-amber-200 flex-shrink-0" />

          {/* Step 2 — In progress */}
          <div className="flex sm:flex-col items-center sm:items-center gap-4 sm:gap-2 flex-1">
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-xl flex-shrink-0">📦</div>
            <div className="sm:text-center">
              <p className="font-semibold text-sm text-amber-700">Being Packed</p>
              <p className="text-xs text-gray-500 mt-0.5">We&apos;re preparing your order</p>
              <span className="inline-block mt-1 text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">IN PROGRESS</span>
            </div>
          </div>

          {/* connector */}
          <div className="hidden sm:block h-0.5 w-12 bg-gray-200 flex-shrink-0" />

          {/* Step 3 — Pending */}
          <div className="flex sm:flex-col items-center sm:items-center gap-4 sm:gap-2 flex-1">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-xl flex-shrink-0">🚚</div>
            <div className="sm:text-center">
              <p className="font-semibold text-sm text-gray-500">Out for Delivery</p>
              <p className="text-xs text-gray-400 mt-0.5">
                Expected{" "}
                {expressDate
                  ? expressDate.toLocaleDateString("en-GB", { day: "numeric", month: "long" })
                  : "soon"}
              </p>
              <span className="inline-block mt-1 text-[10px] font-bold text-gray-400 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-full">PENDING</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {/* Left: order details */}
        <div className="lg:col-span-2 space-y-4">

          {/* Items ordered */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="font-semibold text-[#1A2B5E] mb-4">Items Ordered</h2>
            <div className="divide-y divide-gray-100">
              {order.items.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://placehold.co/64x64/f5f5f5/cccccc?text=%F0%9F%91%9F"
                    alt={item.name}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-gray-900 truncate">{item.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Size: {item.size} · Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery info */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="font-semibold text-[#1A2B5E] mb-4">Delivery Details</h2>
            {order.delivery.type === "pickup" ? (
              <p className="text-sm text-gray-600">🏪 Store Pickup — Dhaka, Chattogram or Sylhet</p>
            ) : (
              <div className="text-sm text-gray-600 space-y-1">
                <p>{order.delivery.address}</p>
                <p>{order.delivery.area}, {order.delivery.city} {order.delivery.postalCode}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {order.delivery.speed === "express" ? "⚡ Express Delivery — Next business day" : "🚚 Standard Delivery — 3-5 business days"}
                </p>
              </div>
            )}
          </div>

          {/* Payment */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="font-semibold text-[#1A2B5E] mb-4">Payment</h2>
            <p className="text-sm text-gray-600">{METHOD_LABELS[order.payment.method] ?? order.payment.method}</p>
            {order.payment.accountNumber && (
              <p className="text-xs text-gray-400 mt-1">{order.payment.accountNumber}</p>
            )}
          </div>
        </div>

        {/* Right: price summary + actions */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 h-fit">
          <h2 className="font-semibold text-[#1A2B5E] mb-4 pb-3 border-b border-gray-100">Order Summary</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal</span>
              <span>৳{fmt(order.pricing.subtotal)}</span>
            </div>
            {order.pricing.discount > 0 && (
              <div className="flex justify-between text-green-600 font-semibold">
                <span>Discount</span>
                <span>−৳{fmt(order.pricing.discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-500">Delivery</span>
              {order.pricing.deliveryCharge === 0 ? (
                <span className="text-green-600 font-bold">FREE</span>
              ) : (
                <span>৳{fmt(order.pricing.deliveryCharge)}</span>
              )}
            </div>
            <div className="border-t border-gray-100 pt-3 flex justify-between font-bold">
              <span>Total</span>
              <span className="text-[#1A2B5E] text-lg">৳{fmt(order.pricing.total)}</span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <Link
              href="/"
              className="block w-full bg-[#1A2B5E] hover:bg-[#D4A017] text-white font-bold py-3 rounded-xl text-sm text-center transition-colors"
            >
              Continue Shopping
            </Link>
            <Link
              href={`/track?orderId=${order.orderId}`}
              className="block w-full border border-[#1A2B5E] text-[#1A2B5E] font-semibold py-3 rounded-xl text-sm text-center hover:bg-[#1A2B5E] hover:text-white transition-colors"
            >
              Track Order
            </Link>
          </div>
        </div>
      </div>

      {/* ── Product recommendations ── */}
      <section className="bg-gray-100 rounded-2xl py-10 px-6">
        <h2 className="text-xl font-extrabold text-gray-800 mb-6 text-center">Customers Also Bought</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {bestSellers.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}
