"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { ReviewSection } from "./ReviewSection"
import type { PlpProduct } from "@/lib/data/products"

const SIZE_GUIDE = [
  { bd: 36, eu: 36, uk: "3.5", us: "4.5", cm: 22.5 },
  { bd: 37, eu: 37, uk: "4", us: "5", cm: 23.0 },
  { bd: 38, eu: 38, uk: "5", us: "6", cm: 23.5 },
  { bd: 39, eu: 39, uk: "6", us: "7", cm: 24.5 },
  { bd: 40, eu: 40, uk: "6.5", us: "7.5", cm: 25.0 },
  { bd: 41, eu: 41, uk: "7.5", us: "8.5", cm: 25.5 },
  { bd: 42, eu: 42, uk: "8", us: "9", cm: 26.0 },
  { bd: 43, eu: 43, uk: "9", us: "10", cm: 26.5 },
  { bd: 44, eu: 44, uk: "9.5", us: "10.5", cm: 27.0 },
  { bd: 45, eu: 45, uk: "10.5", us: "11.5", cm: 28.0 },
]

type Tab = "description" | "size-guide" | "reviews"

export function PDPTabs({ product }: { product: PlpProduct }) {
  const [activeTab, setActiveTab] = useState<Tab>("description")

  const description =
    product.description ??
    `The ${product.name} by ${product.brand} is crafted for those who value both style and comfort. Built with premium materials, this ${product.category} delivers exceptional durability for everyday wear. Perfect for the modern ${product.gender === "men" || product.gender === "women" ? product.gender.charAt(0).toUpperCase() + product.gender.slice(1) : "wearer"} on the go.`

  const tabs: { id: Tab; label: string }[] = [
    { id: "description", label: "Description" },
    { id: "size-guide", label: "Size Guide" },
    { id: "reviews", label: `Reviews (${product.reviews})` },
  ]

  return (
    <div id="reviews" className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Tab headers */}
        <div className="flex border-b border-gray-200 mb-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-6 py-3 font-semibold text-sm border-b-2 -mb-px transition-colors whitespace-nowrap flex-shrink-0",
                activeTab === tab.id
                  ? "border-[#1A2B5E] text-[#1A2B5E]"
                  : "border-transparent text-gray-400 hover:text-gray-700",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Description tab */}
        {activeTab === "description" && (
          <div className="max-w-3xl animate-in fade-in duration-200">
            <p className="text-gray-600 leading-relaxed mb-6">{description}</p>

            <h3 className="font-bold text-[#1A2B5E] text-lg mb-3">Key Features</h3>
            <ul className="flex flex-col gap-2 mb-8">
              {[
                "Genuine leather upper for premium durability",
                "Cushioned insole for all-day comfort",
                "Anti-slip rubber outsole for secure footing",
                "Breathable mesh lining to keep feet cool",
                "Available in multiple widths for a perfect fit",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-[#D4A017] font-bold mt-0.5">•</span>
                  {f}
                </li>
              ))}
            </ul>

            <h3 className="font-bold text-[#1A2B5E] text-lg mb-3">Specifications</h3>
            <table className="w-full border-collapse">
              <tbody>
                {[
                  ["Material", "Genuine Leather"],
                  ["Sole", "Rubber"],
                  ["Closure", "Lace-up"],
                  ["Weight", "380g per shoe"],
                  ["Origin", "Bangladesh"],
                ].map(([k, v]) => (
                  <tr key={k} className="border-b border-gray-100">
                    <td className="py-2.5 pr-8 font-medium text-gray-700 text-sm w-36">{k}</td>
                    <td className="py-2.5 text-gray-500 text-sm">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Size Guide tab */}
        {activeTab === "size-guide" && (
          <div id="size-guide" className="max-w-2xl animate-in fade-in duration-200">
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#1A2B5E] text-white">
                    {["BD Size", "EU Size", "UK Size", "US Size", "Foot (cm)"].map((h) => (
                      <th key={h} className="px-4 py-3 text-center font-semibold text-xs">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SIZE_GUIDE.map((row, i) => (
                    <tr key={row.bd} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-4 py-2.5 text-center font-semibold text-[#1A2B5E]">
                        {row.bd}
                      </td>
                      <td className="px-4 py-2.5 text-center text-gray-600">{row.eu}</td>
                      <td className="px-4 py-2.5 text-center text-gray-600">{row.uk}</td>
                      <td className="px-4 py-2.5 text-center text-gray-600">{row.us}</td>
                      <td className="px-4 py-2.5 text-center text-gray-600">{row.cm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-3 italic">
              Tip: Measure your foot in the evening when feet are at their largest for the best
              fit.
            </p>
          </div>
        )}

        {/* Reviews tab */}
        {activeTab === "reviews" && (
          <div className="animate-in fade-in duration-200">
            <ReviewSection
              productId={product._id!}
              rating={product.rating}
              reviewCount={product.reviews}
            />
          </div>
        )}
      </div>
    </div>
  )
}
