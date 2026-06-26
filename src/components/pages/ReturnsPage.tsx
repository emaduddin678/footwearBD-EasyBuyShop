"use client"

import { useState } from "react"
import { SupportPageLayout } from "@/components/storefront/support/SupportPageLayout"
import { RefreshCw, Truck, Zap, Check, X, Smartphone, Package, Car, Banknote, MessageCircle } from "lucide-react"

const refundTable = [
  { method: "bKash", refundTo: "bKash wallet", timeline: "1-3 business days" },
  { method: "Nagad", refundTo: "Nagad wallet", timeline: "1-3 business days" },
  { method: "Rocket", refundTo: "Rocket wallet", timeline: "1-3 business days" },
  { method: "VISA/MasterCard", refundTo: "Original card", timeline: "5-7 business days" },
  { method: "Cash on Delivery", refundTo: "bKash/Nagad", timeline: "3-5 business days" },
]

const returnSteps = [
  { icon: Smartphone, label: "Contact Us", desc: "WhatsApp us with your Order ID and reason for return within 7 days of delivery", action: true },
  { icon: Package, label: "Pack Your Item", desc: "Place the item back in original packaging with all tags attached and box intact", action: false },
  { icon: Car, label: "Free Pickup", desc: "Our courier will collect from your address within 1-2 business days — completely free", action: false },
  { icon: Banknote, label: "Get Refund", desc: "Refund processed in 3-5 business days to your original payment method", action: false },
]

const reasons = ["Wrong size received", "Product is defective", "Wrong item delivered", "Changed my mind", "Product not as described", "Other"]

export default function ReturnsPage() {
  const [showExchangeForm, setShowExchangeForm] = useState(false)
  const [exchangeSubmitted, setExchangeSubmitted] = useState(false)
  const [form, setForm] = useState({ orderId: "", product: "", currentSize: "", desiredSize: "", reason: "" })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setExchangeSubmitted(true)
  }

  return (
    <SupportPageLayout
      title="Returns & Exchanges"
      description="Easy, free returns within 7 days — no questions asked"
    >
      {/* Policy highlights */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { icon: RefreshCw, title: "7-Day Returns", desc: "Free returns within 7 days of delivery" },
          { icon: Truck, title: "Free Pickup", desc: "We collect from your doorstep" },
          { icon: Zap, title: "Quick Refund", desc: "Refund in 3-5 business days" },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="bg-white rounded-xl shadow-md p-5 text-center">
            <Icon size={28} className="text-[#1A2B5E] mx-auto mb-2" />
            <p className="font-bold text-[#1A2B5E] text-sm">{title}</p>
            <p className="text-gray-500 text-xs mt-1">{desc}</p>
          </div>
        ))}
      </div>

      {/* Return policy */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="font-semibold text-[#1A2B5E] mb-4">Our Return Policy</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm font-semibold text-green-700 mb-3">You CAN return if:</p>
            <ul className="space-y-2">
              {[
                "Item received within last 7 days",
                "Product is unworn and unused",
                "Original tags still attached",
                "Original box/packaging intact",
                "Product is defective or damaged",
                "Wrong item or size delivered",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                  <Check size={16} className="text-green-500 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-red-600 mb-3">You CANNOT return if:</p>
            <ul className="space-y-2">
              {[
                "More than 7 days since delivery",
                "Item has been worn outdoors",
                "Tags removed or packaging damaged",
                "Custom or personalized items",
                "Items marked \"Final Sale\"",
                "Innersoles or socks (hygiene)",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                  <X size={16} className="text-red-500 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* How to return steps */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="font-semibold text-[#1A2B5E] mb-6">How to Return Your Order</h2>
        <div className="grid grid-cols-4 gap-4 relative">
          {returnSteps.map(({ icon: Icon, label, desc, action }, i) => (
            <div key={label} className="relative">
              {i < returnSteps.length - 1 && (
                <div className="hidden md:block absolute top-7 left-full w-full h-0.5 bg-gray-200 z-0 -translate-y-1/2" style={{ width: "calc(100% - 2rem)" }} />
              )}
              <div className="bg-white border border-gray-200 rounded-xl p-5 text-center relative z-10">
                <div className="w-14 h-14 rounded-full bg-[#f4f5f9] flex items-center justify-center mx-auto mb-3">
                  <Icon size={24} className="text-[#1A2B5E]" />
                </div>
                <span className="text-xs font-bold text-[#D4A017] mb-1 block">Step {i + 1}</span>
                <p className="font-semibold text-[#1A2B5E] text-sm mb-2">{label}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                {action && (
                  <a
                    href="https://wa.me/8801712345678?text=Hi, I want to return order"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 block bg-green-500 text-white text-xs font-semibold py-1.5 px-3 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    WhatsApp Us →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Refund timeline table */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="font-semibold text-[#1A2B5E] mb-4">Refund Timeline by Payment Method</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                {["Payment Method", "Refund Method", "Timeline"].map((h) => (
                  <th key={h} className="bg-[#1A2B5E] text-white py-3 px-4 text-left font-medium first:rounded-tl-lg last:rounded-tr-lg">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {refundTable.map((row, i) => (
                <tr key={row.method} className={`border-b border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                  <td className="py-3 px-4 font-medium text-[#1A2B5E]">{row.method}</td>
                  <td className="py-3 px-4 text-gray-600">{row.refundTo}</td>
                  <td className="py-3 px-4 text-gray-600">{row.timeline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-3 italic">
          Refund processing starts after we receive and quality-check the returned item (1 business day)
        </p>
      </div>

      {/* Exchange section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="font-semibold text-[#1A2B5E] mb-2">Size Exchange</h2>
        <p className="text-sm text-gray-500 mb-5">Want a different size? We make it easy:</p>

        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="bg-[#f4f5f9] rounded-xl p-4">
            <p className="text-sm font-medium text-[#1A2B5E] mb-1">Exchange is FREE</p>
            <p className="text-xs text-gray-500">No extra charges for size exchanges within 7 days</p>
          </div>
          <div className="bg-[#f4f5f9] rounded-xl p-4">
            <p className="text-sm font-medium text-[#1A2B5E] mb-1">Simultaneous Pickup & Delivery</p>
            <p className="text-xs text-gray-500">We pick up old size and deliver new size together</p>
          </div>
        </div>

        <button
          onClick={() => setShowExchangeForm(!showExchangeForm)}
          className="text-sm font-semibold text-[#1A2B5E] underline underline-offset-2 hover:text-[#D4A017] transition-colors"
        >
          {showExchangeForm ? "▲ Hide form" : "▼ Request an Exchange"}
        </button>

        {showExchangeForm && (
          <div className="mt-4 border border-gray-200 rounded-xl p-5">
            {exchangeSubmitted ? (
              <div className="text-center py-4">
                <p className="text-green-600 font-semibold text-sm">
                  ✓ Exchange request submitted! We&apos;ll contact you on WhatsApp within 2 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Order ID</label>
                    <input
                      required
                      value={form.orderId}
                      onChange={(e) => setForm({ ...form, orderId: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#1A2B5E]"
                      placeholder="e.g. FBD-12345"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Product Name</label>
                    <input
                      required
                      value={form.product}
                      onChange={(e) => setForm({ ...form, product: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#1A2B5E]"
                      placeholder="e.g. Bata Comfit Loafer"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Current Size</label>
                    <input
                      required
                      value={form.currentSize}
                      onChange={(e) => setForm({ ...form, currentSize: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#1A2B5E]"
                      placeholder="e.g. 40"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Desired Size</label>
                    <input
                      required
                      value={form.desiredSize}
                      onChange={(e) => setForm({ ...form, desiredSize: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#1A2B5E]"
                      placeholder="e.g. 41"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Reason</label>
                  <select
                    required
                    value={form.reason}
                    onChange={(e) => setForm({ ...form, reason: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#1A2B5E] bg-white"
                  >
                    <option value="">Select a reason</option>
                    {reasons.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <button
                  type="submit"
                  className="bg-[#1A2B5E] text-white text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-[#0d1733] transition-colors"
                >
                  Submit Exchange Request →
                </button>
              </form>
            )}
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="bg-[#1A2B5E] rounded-2xl p-8 text-center">
        <h2 className="text-white text-xl font-bold">Ready to Return?</h2>
        <p className="text-white/70 text-sm mt-2">Contact our team and we&apos;ll handle everything for you</p>
        <a
          href="https://wa.me/8801712345678?text=Hi, I want to return order"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 bg-[#D4A017] text-[#1A2B5E] font-bold text-sm px-6 py-3 rounded-xl hover:bg-[#b8881a] transition-colors"
        >
          <MessageCircle size={18} />
          Start Return on WhatsApp →
        </a>
      </div>
    </SupportPageLayout>
  )
}
