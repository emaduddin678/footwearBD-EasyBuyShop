"use client"

import { useState } from "react"
import { SupportPageLayout } from "@/components/storefront/support/SupportPageLayout"
import { Truck, Zap } from "lucide-react"
import Link from "next/link"

const divisions = [
  { name: "Dhaka Division", days: "1-3 days", fast: true },
  { name: "Chattogram Division", days: "2-4 days", fast: true },
  { name: "Sylhet Division", days: "2-4 days", fast: true },
  { name: "Rajshahi Division", days: "3-5 days", fast: false },
  { name: "Khulna Division", days: "3-5 days", fast: false },
  { name: "Barishal Division", days: "3-5 days", fast: false },
  { name: "Rangpur Division", days: "4-6 days", fast: false },
  { name: "Mymensingh Division", days: "3-5 days", fast: false },
]

const timeline = [
  { label: "Order Placed", sub: "You receive SMS + email confirmation", icon: "✓", time: "Hour 0" },
  { label: "Payment Verified", sub: "Your payment is confirmed", icon: "✓", time: "Hour 2" },
  { label: "Order Packed", sub: "Team carefully packs your order", icon: "📦", time: "Day 1" },
  { label: "Dispatched", sub: "Handed to delivery partner", icon: "🚗", time: "Day 2" },
  { label: "Out for Delivery", sub: "Agent calls before arriving", icon: "🚚", time: "Day 3-5" },
  { label: "Delivered!", sub: "Enjoy your new footwear!", icon: "🎉", time: "Done" },
]

const partners = ["Pathao Courier", "Steadfast", "Redx"]

const notes = [
  "Please ensure someone is available at the delivery address",
  "Our agent will call you 30-60 minutes before arriving",
  "For COD orders, please keep exact change ready",
  "Delivery attempts: 3 maximum. After that, order returns to us",
  "Delivery times exclude public holidays and hartal days",
]

export default function DeliveryPage() {
  const [orderTotal, setOrderTotal] = useState("")

  const amount = parseFloat(orderTotal)
  const remaining = 2000 - amount
  const qualifiesFree = !isNaN(amount) && amount >= 2000

  return (
    <SupportPageLayout
      title="Delivery Information"
      description="Fast, reliable delivery across all 64 districts of Bangladesh"
    >
      {/* Delivery options */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Standard */}
        <div className="bg-white rounded-xl shadow-md p-6 relative">
          <Truck size={40} className="text-[#1A2B5E] mb-3" />
          <h2 className="text-xl font-bold text-[#1A2B5E]">Standard Delivery</h2>
          <p className="text-sm text-[#D4A017] font-medium mt-1">3-5 Business Days</p>
          <p className="text-sm text-gray-600 mt-3">
            <span className="font-semibold text-[#1A2B5E]">FREE</span> on orders above ৳2,000 | ৳120 otherwise
          </p>
          <p className="text-xs text-gray-400 mt-2">Available across all 64 districts</p>
        </div>

        {/* Express */}
        <div className="bg-white rounded-xl shadow-md p-6 relative overflow-hidden">
          <span className="absolute top-3 right-3 bg-[#D4A017] text-[#1A2B5E] text-xs font-bold px-2 py-0.5 rounded-full">
            Fast
          </span>
          <Zap size={40} className="text-[#D4A017] mb-3" />
          <h2 className="text-xl font-bold text-[#1A2B5E]">Express Delivery</h2>
          <p className="text-sm text-[#D4A017] font-medium mt-1">Next Business Day</p>
          <p className="text-sm text-gray-600 mt-3">
            <span className="font-semibold text-[#1A2B5E]">৳250</span> flat rate
          </p>
          <p className="text-xs text-gray-400 mt-2">Dhaka, Chattogram, Sylhet only</p>
        </div>
      </div>

      {/* Coverage map */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="font-semibold text-[#1A2B5E] mb-4">Delivery Coverage</h2>
        <div className="grid grid-cols-2 gap-3">
          {divisions.map(({ name, days, fast }) => (
            <div
              key={name}
              className={`flex items-center justify-between rounded-lg px-4 py-2.5 text-sm ${
                fast ? "bg-[#1A2B5E] text-white" : "bg-gray-100 text-gray-700"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={fast ? "text-[#D4A017]" : "text-green-500"}>✓</span>
                {name}
              </div>
              <span className={`text-xs font-medium ${fast ? "text-white/70" : "text-gray-500"}`}>{days}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-4">
          🏝️ Remote/char areas and islands may take 1-2 extra days
        </p>
      </div>

      {/* Delivery process timeline */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="font-semibold text-[#1A2B5E] mb-6">What Happens After You Order?</h2>
        <div className="relative">
          <div className="absolute left-[2.35rem] top-0 bottom-0 w-0.5 bg-gray-100" />
          <div className="space-y-4">
            {timeline.map(({ label, sub, icon, time }, i) => (
              <div key={label} className="flex items-start gap-4 relative">
                <div className="w-12 h-12 shrink-0 rounded-full bg-[#f4f5f9] border-2 border-[#1A2B5E] flex items-center justify-center text-lg z-10">
                  {icon}
                </div>
                <div className="pt-2">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-[#1A2B5E] text-sm">{label}</p>
                    <span className="text-xs text-[#D4A017] font-medium">{time}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Delivery partners */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="font-semibold text-[#1A2B5E] mb-2">Our Delivery Partners</h2>
        <p className="text-sm text-gray-500 mb-4">We work with trusted courier partners for reliable delivery</p>
        <div className="flex gap-4">
          {partners.map((p) => (
            <div key={p} className="bg-white border border-gray-200 rounded-xl p-4 text-center flex-1">
              <img
                src={`https://placehold.co/80x40/f5f5f5/999?text=${encodeURIComponent(p)}`}
                alt={p}
                className="mx-auto mb-2"
              />
              <p className="text-xs text-gray-600 font-medium">{p}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Important notes */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
        <p className="font-semibold text-amber-800 mb-3">📌 Important Delivery Notes</p>
        <ul className="space-y-1.5">
          {notes.map((note) => (
            <li key={note} className="flex items-start gap-2 text-sm text-amber-700">
              <span className="mt-0.5">•</span>
              {note}
            </li>
          ))}
        </ul>
      </div>

      {/* Free delivery calculator */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-semibold text-[#1A2B5E] mb-3">Check Your Delivery Cost</h2>
        <p className="text-sm text-gray-500 mb-3">Enter your order total (৳)</p>
        <input
          type="number"
          value={orderTotal}
          onChange={(e) => setOrderTotal(e.target.value)}
          placeholder="e.g. 1500"
          className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm w-48 focus:outline-none focus:border-[#1A2B5E] transition-colors"
        />
        {orderTotal && !isNaN(amount) && (
          <div className="mt-4 space-y-1">
            {qualifiesFree ? (
              <p className="text-green-600 font-semibold text-sm">🎉 You qualify for FREE delivery!</p>
            ) : (
              <>
                <p className="text-amber-600 text-sm font-medium">
                  Add ৳{remaining.toFixed(0)} more for FREE delivery
                </p>
                <p className="text-gray-400 text-xs">Current delivery charge: ৳120</p>
              </>
            )}
          </div>
        )}
        <Link
          href="/men"
          className="mt-5 inline-block bg-[#1A2B5E] text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#0d1733] transition-colors"
        >
          Shop Now →
        </Link>
      </div>
    </SupportPageLayout>
  )
}
