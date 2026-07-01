"use client"

import { useState, useEffect, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import { Package, Copy, Check, Truck } from "lucide-react"
import { TrackingSearch } from "@/components/storefront/tracking/TrackingSearch"
import { TrackingTimeline } from "@/components/storefront/tracking/TrackingTimeline"
import { TrackingOrderSummary } from "@/components/storefront/tracking/TrackingOrderSummary"
import { TrackingMap } from "@/components/storefront/tracking/TrackingMap"
import { TrackingFAQ } from "@/components/storefront/tracking/TrackingFAQ"
import { trackOrder, type TrackOrderResult } from "@/lib/api/orders"

/* ─── Types ─────────────────────────────────────────── */

interface TimelineStep {
  status: string
  label: string
  description: string
  timestamp: string | null
  expectedDate?: string
  completed: boolean
  active?: boolean
}

interface MockOrder {
  orderId: string
  status: string
  placedAt: string
  estimatedDelivery: string
  customer: { name: string; phone: string; address: string; city: string }
  delivery: { type: string; speed: string; charge: number; agentName: string; agentPhone: string }
  payment: { method: string; amount: number }
  items: { id: number; name: string; brand: string; size: number; quantity: number; price: number; image: string }[]
  pricing: { subtotal: number; delivery: number; discount: number; total: number }
  timeline: TimelineStep[]
}

/* ─── Map backend TrackOrderResult → display MockOrder ─── */

// Backend statuses: pending | confirmed | processing | shipped | delivered | cancelled | refunded
// Frontend STATUS_CONFIG keys: order_placed | payment_confirmed | being_packed | shipped | out_for_delivery | delivered | cancelled
const BACKEND_TO_DISPLAY_STATUS: Record<string, string> = {
  pending: "order_placed",
  confirmed: "order_placed",
  processing: "being_packed",
  shipped: "shipped",
  delivered: "delivered",
  cancelled: "cancelled",
  refunded: "cancelled",
}

const ALL_STEPS: { status: string; label: string; description: string }[] = [
  { status: "order_placed",      label: "Order Placed",      description: "Your order has been confirmed" },
  { status: "being_packed",      label: "Being Packed",      description: "Our team is carefully packing your order" },
  { status: "shipped",           label: "Shipped",           description: "Handed to delivery partner" },
  { status: "out_for_delivery",  label: "Out for Delivery",  description: "Delivery agent will contact you" },
  { status: "delivered",         label: "Delivered",         description: "Order delivered successfully" },
]

const STEP_ORDER = ALL_STEPS.map((s) => s.status)

function buildTimeline(displayStatus: string, backendTimeline: TrackOrderResult["timeline"]): TimelineStep[] {
  const currentIdx = STEP_ORDER.indexOf(displayStatus)

  // Index last real event timestamps from the backend timeline
  const timestampByStep: Record<string, string> = {}
  for (const entry of backendTimeline) {
    const action = entry.action.toLowerCase()
    if (action.includes("creat") || action.includes("placed")) timestampByStep["order_placed"] = entry.at
    if (action.includes("pack") || action.includes("process")) timestampByStep["being_packed"] = entry.at
    if (action.includes("ship") || action.includes("despatch")) timestampByStep["shipped"] = entry.at
    if (action.includes("out for delivery")) timestampByStep["out_for_delivery"] = entry.at
    if (action.includes("deliver")) timestampByStep["delivered"] = entry.at
  }

  return ALL_STEPS.map((step, idx) => {
    const completed = idx < currentIdx || displayStatus === "delivered"
    const active = step.status === displayStatus && displayStatus !== "delivered"
    return {
      status: step.status,
      label: step.label,
      description: step.description,
      timestamp: timestampByStep[step.status] ?? null,
      completed,
      active,
    }
  })
}

function mapToMockOrder(result: TrackOrderResult): MockOrder {
  const displayStatus = BACKEND_TO_DISPLAY_STATUS[result.status] ?? "order_placed"
  const timeline = buildTimeline(displayStatus, result.timeline)

  const estimatedDelivery =
    result.shipping?.estimatedDelivery ??
    new Date(Date.now() + 5 * 86_400_000).toISOString().split("T")[0]

  return {
    orderId: result.orderId,
    status: displayStatus,
    placedAt: result.createdAt,
    estimatedDelivery,
    customer: { name: "—", phone: "—", address: "—", city: "—" },
    delivery: {
      type: "home",
      speed: "standard",
      charge: 0,
      agentName: "—",
      agentPhone: "—",
    },
    payment: { method: "—", amount: 0 },
    items: result.items.map((it, i) => ({
      id: i,
      name: it.productName,
      brand: "",
      size: parseInt(it.variant?.size ?? "0") || 0,
      quantity: it.quantity,
      price: 0,
      image: "https://placehold.co/56x56/f5f5f5/cccccc?text=%F0%9F%91%9F",
    })),
    pricing: { subtotal: 0, delivery: 0, discount: 0, total: 0 },
    timeline,
  }
}

/* ─── Status config ──────────────────────────────────── */

const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string; progress: number }> = {
  order_placed:      { label: "Order Confirmed",   bg: "bg-[#1A2B5E]",  text: "text-white",        progress: 20  },
  payment_confirmed: { label: "Payment Confirmed", bg: "bg-[#1A2B5E]",  text: "text-white",        progress: 30  },
  being_packed:      { label: "Being Packed",      bg: "bg-amber-500",  text: "text-white",        progress: 40  },
  shipped:           { label: "Shipped",           bg: "bg-blue-500",   text: "text-white",        progress: 60  },
  out_for_delivery:  { label: "Out for Delivery",  bg: "bg-[#D4A017]",  text: "text-[#1A2B5E]",   progress: 80  },
  delivered:         { label: "Delivered",         bg: "bg-green-500",  text: "text-white",        progress: 100 },
  cancelled:         { label: "Cancelled",         bg: "bg-red-500",    text: "text-white",        progress: 0   },
}

/* ─── Date helpers ───────────────────────────────────── */

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
}

function formatEstimatedDelivery(iso: string) {
  const d = new Date(iso)
  const end = new Date(d)
  end.setDate(end.getDate() + 2)
  const opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "long" }
  const endOpts: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" }
  return `${d.toLocaleDateString("en-GB", opts)} – ${end.toLocaleDateString("en-GB", endOpts)}`
}

/* ─── Status Header ──────────────────────────────────── */

function StatusHeader({ order }: { order: MockOrder }) {
  const [copied, setCopied] = useState(false)
  const sc = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.order_placed

  function copyOrderId() {
    navigator.clipboard.writeText(order.orderId).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
      {/* Top row */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Order ID:</span>
            <span className="font-bold text-[#1A2B5E] text-sm">{order.orderId}</span>
            <button
              onClick={copyOrderId}
              title="Copy order ID"
              className="relative text-gray-400 hover:text-[#1A2B5E] transition-colors"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              {copied && (
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs bg-gray-800 text-white px-2 py-0.5 rounded whitespace-nowrap">
                  Copied!
                </span>
              )}
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">Placed on {formatDate(order.placedAt)}</p>
        </div>

        <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold ${sc.bg} ${sc.text}`}>
          {sc.label}
        </span>
      </div>

      {/* Estimated delivery */}
      <div className="border-t border-gray-100 mt-4 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#1A2B5E]" />
              <span className="font-medium text-[#1A2B5E] text-sm">
                Estimated Delivery: {formatEstimatedDelivery(order.estimatedDelivery)}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5 ml-6">Standard Delivery · 3-5 business days</p>
          </div>
          <span className="text-sm font-semibold text-[#1A2B5E]">{sc.progress}% Complete</span>
        </div>

        {/* Progress bar */}
        <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#1A2B5E] rounded-full transition-all duration-700"
            style={{ width: `${sc.progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}

/* ─── Delivery Details ───────────────────────────────── */

function DeliveryDetails({ order }: { order: MockOrder }) {
  const isOutForDelivery = order.status === "out_for_delivery"
  const agentWa = encodeURIComponent(`Hi, I'm waiting for my order ${order.orderId}`)

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
      <h2 className="font-semibold text-[#1A2B5E] mb-4">Delivery Details</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Deliver to */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[#1A2B5E]">📍</span>
            <span className="text-xs font-semibold uppercase text-gray-400 tracking-wide">Deliver To</span>
          </div>
          <p className="font-medium text-[#1A2B5E] text-sm">{order.customer.name}</p>
          <p className="text-sm text-gray-600">{order.customer.address}</p>
          <p className="text-sm text-gray-600">{order.customer.city}</p>
          <p className="text-sm text-gray-600">{order.customer.phone}</p>
        </div>

        {/* Delivery method */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[#1A2B5E]">🚚</span>
            <span className="text-xs font-semibold uppercase text-gray-400 tracking-wide">Delivery Method</span>
          </div>
          <p className="font-medium text-[#1A2B5E] text-sm">Standard Delivery</p>
          <p className="text-sm text-gray-600">3-5 business days</p>
          <p className="text-sm text-gray-600">
            {order.delivery.charge === 0 ? "FREE" : `৳${order.delivery.charge}`}
          </p>
        </div>
      </div>

      {/* Agent contact — only when out for delivery */}
      {isOutForDelivery && (
        <div className="mt-4 bg-[#F0FDF4] border border-green-200 rounded-lg p-4">
          <p className="text-sm font-medium text-green-800 mb-1">🚴 Your delivery agent is on the way!</p>
          <p className="text-sm text-green-700 mb-3">Agent: {order.delivery.agentName}</p>
          <div className="flex gap-2">
            <a
              href={`tel:${order.delivery.agentPhone}`}
              className="flex items-center gap-1.5 border border-green-500 text-green-700 font-semibold text-xs px-4 py-2 rounded-lg hover:bg-green-50 transition-colors"
            >
              📞 Call Agent
            </a>
            <a
              href={`https://wa.me/${order.delivery.agentPhone.replace(/\D/g, "")}?text=${agentWa}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white font-semibold text-xs px-4 py-2 rounded-lg transition-colors"
            >
              💬 WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

/* ─── Main Page Component ────────────────────────────── */

export default function OrderTrackingPage() {
  const searchParams = useSearchParams()
  const urlOrderId = searchParams.get("orderId") ?? ""

  const [order, setOrder] = useState<MockOrder | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [searched, setSearched] = useState(false)

  const doSearch = useCallback(async (orderId: string, _phone: string) => {
    if (!orderId.trim()) return
    setLoading(true)
    setError(false)
    setSearched(true)

    try {
      const result = await trackOrder(orderId.trim())
      setOrder(mapToMockOrder(result.payload))
      setError(false)
    } catch {
      setOrder(null)
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [])

  // Auto-search when orderId is in URL
  useEffect(() => {
    if (urlOrderId) {
      doSearch(urlOrderId, "")
    }
  }, [urlOrderId, doSearch])

  const showResults = !loading && order !== null && searched

  return (
    <div className="min-h-screen bg-[#f4f5f9]">
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="bg-[#1A2B5E] py-14 text-center">
        <Package className="w-12 h-12 text-white mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-white">Track Your Order</h1>
        <p className="text-white/70 text-base mt-2 max-w-lg mx-auto px-4">
          Enter your order ID and phone number to get real-time updates on your delivery
        </p>
      </section>

      {/* ── Search Form ──────────────────────────────────── */}
      <TrackingSearch
        initialOrderId={urlOrderId}
        onSearch={doSearch}
        loading={loading}
        error={error && searched}
      />

      {/* ── Results ──────────────────────────────────────── */}
      {showResults && order && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          {/* Status header — full width */}
          <StatusHeader order={order} />

          {/* Two-column grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT col-span-2 */}
            <div className="lg:col-span-2">
              <TrackingMap status={order.status} />
              <TrackingTimeline timeline={order.timeline} />
              <DeliveryDetails order={order} />
            </div>

            {/* RIGHT sidebar */}
            <div className="lg:col-span-1">
              <TrackingOrderSummary
                orderId={order.orderId}
                items={order.items}
                pricing={order.pricing}
                payment={order.payment}
              />
            </div>
          </div>
        </section>
      )}

      {/* Empty state — no search yet and no URL param */}
      {!searched && !urlOrderId && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 text-center">
          <p className="text-gray-400 text-sm">Enter your Order ID above to see tracking details.</p>
        </div>
      )}

      {/* ── FAQ ──────────────────────────────────────────── */}
      <div className="mt-10">
        <TrackingFAQ />
      </div>
    </div>
  )
}
