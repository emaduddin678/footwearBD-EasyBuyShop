"use client"

import { useState } from "react"
import { SupportPageLayout } from "@/components/storefront/support/SupportPageLayout"
import { ChevronDown, ChevronUp } from "lucide-react"

const tabs = ["Men's", "Women's", "Kids'", "Newborn"]

const mensData = [
  { eu: "36", uk: "3.5", us: "4.5", length: "22.5", width: "8.5" },
  { eu: "37", uk: "4", us: "5", length: "23.0", width: "8.8" },
  { eu: "38", uk: "5", us: "6", length: "23.5", width: "9.0" },
  { eu: "39", uk: "6", us: "7", length: "24.5", width: "9.3" },
  { eu: "40", uk: "6.5", us: "7.5", length: "25.0", width: "9.5" },
  { eu: "41", uk: "7.5", us: "8.5", length: "25.5", width: "9.8" },
  { eu: "42", uk: "8", us: "9", length: "26.0", width: "10.0" },
  { eu: "43", uk: "9", us: "10", length: "26.5", width: "10.2" },
  { eu: "44", uk: "9.5", us: "10.5", length: "27.0", width: "10.5" },
  { eu: "45", uk: "10.5", us: "11.5", length: "28.0", width: "10.8" },
]

const womensData = [
  { eu: "35", uk: "2.5", us: "5", length: "22.0" },
  { eu: "36", uk: "3", us: "5.5", length: "22.5" },
  { eu: "37", uk: "4", us: "6.5", length: "23.0" },
  { eu: "38", uk: "5", us: "7", length: "23.5" },
  { eu: "39", uk: "6", us: "7.5", length: "24.0" },
  { eu: "40", uk: "6.5", us: "8", length: "24.5" },
  { eu: "41", uk: "7", us: "8.5", length: "25.0" },
]

const kidsData = [
  { eu: "28", uk: "10", us: "11", age: "3-4 yrs", length: "17.5cm" },
  { eu: "29", uk: "11", us: "12", age: "4-5 yrs", length: "18.0cm" },
  { eu: "30", uk: "12", us: "13", age: "5-6 yrs", length: "18.5cm" },
  { eu: "31", uk: "13", us: "1", age: "6-7 yrs", length: "19.5cm" },
  { eu: "32", uk: "1", us: "2", age: "7-8 yrs", length: "20.0cm" },
  { eu: "33", uk: "2", us: "3", age: "8-9 yrs", length: "21.0cm" },
  { eu: "34", uk: "2.5", us: "3.5", age: "9-10 yrs", length: "21.5cm" },
  { eu: "35", uk: "3", us: "4", age: "10-11 yrs", length: "22.0cm" },
]

const newbornData = [
  { eu: "16", uk: "0.5", us: "1", age: "0-3 mo", length: "9.5cm" },
  { eu: "17", uk: "1", us: "1.5", age: "3-6 mo", length: "10.0cm" },
  { eu: "18", uk: "2", us: "2.5", age: "6-9 mo", length: "11.0cm" },
  { eu: "19", uk: "3", us: "4", age: "9-12 mo", length: "11.5cm" },
  { eu: "20", uk: "4", us: "5", age: "12-18 mo", length: "12.5cm" },
  { eu: "21", uk: "4.5", us: "5.5", age: "18-24 mo", length: "13.0cm" },
  { eu: "22", uk: "5", us: "6", age: "2 yrs", length: "13.5cm" },
  { eu: "23", uk: "6", us: "7", age: "2-3 yrs", length: "14.5cm" },
]

const brandNotes = [
  { brand: "Bata", note: "Bata sizes run true to size. Standard sizing applies." },
  { brand: "Hush Puppies", note: "Runs slightly narrow. Consider going half size up for wide feet." },
  { brand: "North Star", note: "Athletic sizing — fits slightly large. Go half size down." },
  { brand: "Bay", note: "Standard sizing. Check individual product for width options." },
]

export default function SizeGuidePage() {
  const [activeTab, setActiveTab] = useState("Men's")
  const [footLength, setFootLength] = useState("")
  const [openBrand, setOpenBrand] = useState<string | null>(null)

  function getMatchingSize() {
    const len = parseFloat(footLength)
    if (isNaN(len)) return null
    if (activeTab === "Men's") {
      const match = mensData.find((r) => Math.abs(parseFloat(r.length) - len) < 0.26)
      return match ? `EU ${match.eu} (BD ${match.eu})` : null
    }
    if (activeTab === "Women's") {
      const match = womensData.find((r) => Math.abs(parseFloat(r.length) - len) < 0.26)
      return match ? `EU ${match.eu} (BD ${match.eu})` : null
    }
    if (activeTab === "Kids'") {
      const match = kidsData.find((r) => Math.abs(parseFloat(r.length.replace("cm", "")) - len) < 0.26)
      return match ? `EU ${match.eu}` : null
    }
    return null
  }

  const matchedSize = getMatchingSize()

  return (
    <SupportPageLayout
      title="Size Guide"
      description="Find your perfect fit with our comprehensive size charts"
    >
      {/* Category tabs */}
      <div className="flex border-b border-gray-200 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); setFootLength("") }}
            className={`px-5 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === tab
                ? "border-[#1A2B5E] text-[#1A2B5E] font-bold"
                : "border-transparent text-gray-500 hover:text-[#1A2B5E]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* How to measure */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <h2 className="font-semibold text-[#1A2B5E] mb-4">How to Measure Your Foot</h2>
        <div className="grid grid-cols-2 gap-6">
          <ol className="space-y-2">
            {[
              "Place a blank paper on a hard floor",
              "Stand on the paper with your full weight",
              "Mark the longest point of your heel and toe",
              "Measure the distance in centimeters",
              "Use the chart below to find your size",
              "Measure in the evening — feet swell during the day",
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                <span className="shrink-0 w-6 h-6 rounded-full bg-[#1A2B5E] text-white text-xs flex items-center justify-center font-medium">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
          <div className="flex items-center justify-center">
            <img
              src="https://placehold.co/300x200/f5f5f5/1A2B5E?text=%F0%9F%93%8F+Measure"
              alt="Foot measurement guide"
              className="rounded-xl w-full"
            />
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-4 text-sm text-amber-800">
          💡 If you&apos;re between sizes, we recommend going up one size for comfort. For narrow feet, go down one size.
        </div>
      </div>

      {/* Size charts */}
      {activeTab === "Men's" && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="font-semibold text-[#1A2B5E] mb-4">Men&apos;s Shoe Sizes</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  {["BD/EU", "UK", "US", "Foot Length (cm)", "Width (cm)"].map((h) => (
                    <th key={h} className="bg-[#1A2B5E] text-white py-3 px-4 text-left font-medium first:rounded-tl-lg last:rounded-tr-lg">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mensData.map((row, i) => {
                  const highlighted = footLength && Math.abs(parseFloat(row.length) - parseFloat(footLength)) < 0.26
                  return (
                    <tr
                      key={row.eu}
                      className={`border-b border-gray-100 transition-colors ${
                        highlighted ? "bg-amber-100 font-semibold" : i % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-amber-50`}
                    >
                      <td className="py-2.5 px-4 font-medium text-[#1A2B5E]">{row.eu}</td>
                      <td className="py-2.5 px-4">{row.uk}</td>
                      <td className="py-2.5 px-4">{row.us}</td>
                      <td className="py-2.5 px-4">{row.length}</td>
                      <td className="py-2.5 px-4">{row.width}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "Women's" && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="font-semibold text-[#1A2B5E] mb-4">Women&apos;s Shoe Sizes</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  {["BD/EU", "UK", "US", "Foot Length (cm)"].map((h) => (
                    <th key={h} className="bg-[#1A2B5E] text-white py-3 px-4 text-left font-medium first:rounded-tl-lg last:rounded-tr-lg">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {womensData.map((row, i) => {
                  const highlighted = footLength && Math.abs(parseFloat(row.length) - parseFloat(footLength)) < 0.26
                  return (
                    <tr
                      key={row.eu}
                      className={`border-b border-gray-100 transition-colors ${
                        highlighted ? "bg-amber-100 font-semibold" : i % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-amber-50`}
                    >
                      <td className="py-2.5 px-4 font-medium text-[#1A2B5E]">{row.eu}</td>
                      <td className="py-2.5 px-4">{row.uk}</td>
                      <td className="py-2.5 px-4">{row.us}</td>
                      <td className="py-2.5 px-4">{row.length}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "Kids'" && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="font-semibold text-[#1A2B5E] mb-4">Kids&apos; Shoe Sizes</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  {["EU", "UK", "US", "Age (approx)", "Foot Length"].map((h) => (
                    <th key={h} className="bg-[#1A2B5E] text-white py-3 px-4 text-left font-medium first:rounded-tl-lg last:rounded-tr-lg">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {kidsData.map((row, i) => (
                  <tr
                    key={row.eu}
                    className={`border-b border-gray-100 hover:bg-blue-50 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                  >
                    <td className="py-2.5 px-4 font-medium text-[#1A2B5E]">{row.eu}</td>
                    <td className="py-2.5 px-4">{row.uk}</td>
                    <td className="py-2.5 px-4">{row.us}</td>
                    <td className="py-2.5 px-4">{row.age}</td>
                    <td className="py-2.5 px-4">{row.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "Newborn" && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="font-semibold text-[#1A2B5E] mb-4">Newborn Shoe Sizes</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  {["EU", "UK", "US", "Age (approx)", "Foot Length"].map((h) => (
                    <th key={h} className="bg-[#1A2B5E] text-white py-3 px-4 text-left font-medium first:rounded-tl-lg last:rounded-tr-lg">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {newbornData.map((row, i) => (
                  <tr
                    key={row.eu}
                    className={`border-b border-gray-100 hover:bg-blue-50 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                  >
                    <td className="py-2.5 px-4 font-medium text-[#1A2B5E]">{row.eu}</td>
                    <td className="py-2.5 px-4">{row.uk}</td>
                    <td className="py-2.5 px-4">{row.us}</td>
                    <td className="py-2.5 px-4">{row.age}</td>
                    <td className="py-2.5 px-4">{row.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Foot length finder */}
      {activeTab !== "Newborn" && (
        <div className="bg-white border-2 border-[#1A2B5E] rounded-xl p-6 mt-6 mb-6">
          <h2 className="font-semibold text-[#1A2B5E] mb-3">Find Your Size Instantly</h2>
          <p className="text-sm text-gray-500 mb-3">Enter your foot length in cm:</p>
          <input
            type="number"
            step="0.5"
            min="18"
            max="32"
            value={footLength}
            onChange={(e) => setFootLength(e.target.value)}
            placeholder="e.g. 25.5"
            className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm w-48 focus:outline-none focus:border-[#1A2B5E] transition-colors"
          />
          {footLength && (
            <div className="mt-4">
              {matchedSize ? (
                <p className="text-[#D4A017] text-xl font-bold">Your size is {matchedSize}</p>
              ) : (
                <p className="text-gray-500 text-sm">No exact match found. Try measuring again or contact us for help.</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Brand notes accordion */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-semibold text-[#1A2B5E] mb-4">Sizing Notes by Brand</h2>
        <div className="space-y-2">
          {brandNotes.map(({ brand, note }) => (
            <div key={brand} className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenBrand(openBrand === brand ? null : brand)}
                className="w-full flex items-center justify-between px-5 py-3.5 text-left"
              >
                <span className="font-medium text-[#1A2B5E] text-sm">{brand}</span>
                {openBrand === brand ? (
                  <ChevronUp size={16} className="text-[#D4A017]" />
                ) : (
                  <ChevronDown size={16} className="text-[#D4A017]" />
                )}
              </button>
              {openBrand === brand && (
                <div className="px-5 pb-4 text-sm text-gray-600">{note}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </SupportPageLayout>
  )
}
