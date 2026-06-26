"use client"

import { useState } from "react"
import Link from "next/link"
import { AnnouncementBar } from "@/components/storefront/AnnouncementBar"
import { Header } from "@/components/storefront/Header"
import { Footer } from "@/components/storefront/Footer"
import { WhatsAppFloat } from "@/components/storefront/WhatsAppFloat"

const TABS = ["All", "Summer 2026", "Eid Collection", "Office Wear", "Casual", "Sports"]

const looks = [
  { id: 1, name: "The Modern Professional", category: "Formal", products: "Derby Formal · Oxford Classic", imgSize: "300x400", bgColor: "e8eaf6", fgColor: "1A2B5E" },
  { id: 2, name: "Weekend Casual", category: "Casual", products: "Loafer Pro · Slip-On Max", imgSize: "300x300", bgColor: "dcfce7", fgColor: "166534" },
  { id: 3, name: "Street Style", category: "Casual", products: "North Star Runner · Bay Casual", imgSize: "300x500", bgColor: "fff7ed", fgColor: "92400e" },
  { id: 4, name: "Eid Celebration", category: "Eid", products: "Oxford Classic · Heel Pump", imgSize: "300x400", bgColor: "fdf2f8", fgColor: "86198f" },
  { id: 5, name: "Active Runner", category: "Sports", products: "Power Sneaker · Sport Sandal", imgSize: "300x300", bgColor: "eff6ff", fgColor: "1d4ed8" },
  { id: 6, name: "Summer Breeze", category: "Summer 2026", products: "Comfort Sandal · Wedge Sandal", imgSize: "300x500", bgColor: "fdf4ff", fgColor: "7c3aed" },
  { id: 7, name: "Office Ready", category: "Office Wear", products: "Derby Formal · Chelsea Boot", imgSize: "300x400", bgColor: "f0fdf4", fgColor: "166534" },
  { id: 8, name: "Festival Look", category: "Eid", products: "Ballet Flat · Ankle Strap", imgSize: "300x300", bgColor: "fdf2f8", fgColor: "86198f" },
  { id: 9, name: "Sports Casual", category: "Sports", products: "Sneaker Elite · Kids Runner", imgSize: "300x500", bgColor: "fff7ed", fgColor: "c2410c" },
  { id: 10, name: "Classic Formal", category: "Formal", products: "Ranger Boot · Driving Moc", imgSize: "300x400", bgColor: "e8eaf6", fgColor: "1A2B5E" },
  { id: 11, name: "Tropical Summer", category: "Summer 2026", products: "Sport Sandal · Comfort Sandal", imgSize: "300x300", bgColor: "dcfce7", fgColor: "166534" },
  { id: 12, name: "Urban Edge", category: "Casual", products: "Platform Sneaker · Loafer Pro", imgSize: "300x500", bgColor: "fdf4ff", fgColor: "7c3aed" },
]

const styleTips = [
  {
    title: "Match Formality",
    body: "Always match your shoe formality to the occasion. Derby for office, sneakers for casual, sandals for leisure.",
  },
  {
    title: "Color Coordination",
    body: "Neutral shoes (black, brown, white) go with everything. Build your wardrobe around 2-3 versatile pairs.",
  },
  {
    title: "Comfort First",
    body: "Style means nothing if you're uncomfortable. Always prioritize fit — measure your feet before buying.",
  },
]

const instaImages = [
  { bg: "e8eaf6", fg: "1A2B5E" },
  { bg: "dcfce7", fg: "166534" },
  { bg: "fff7ed", fg: "92400e" },
  { bg: "fdf2f8", fg: "86198f" },
  { bg: "eff6ff", fg: "1d4ed8" },
  { bg: "fdf4ff", fg: "7c3aed" },
]

export default function LookbookPage() {
  const [activeTab, setActiveTab] = useState("All")

  const filteredLooks =
    activeTab === "All"
      ? looks
      : looks.filter((l) => l.category === activeTab)

  return (
    <div className="min-h-screen font-sans bg-[#f4f5f9]">
      <AnnouncementBar />
      <Header />

      {/* Hero */}
      <div className="bg-brand-navy py-16 text-center">
        <p className="text-brand-gold text-sm uppercase tracking-widest">SS 2026 Lookbook</p>
        <h1 className="text-white text-4xl font-bold mt-2">Style That Speaks</h1>
        <p className="text-white/70 text-sm mt-2">
          Discover how to style this season&apos;s finest footwear
        </p>
      </div>

      {/* Season Filter Tabs */}
      <div className="bg-white py-4 border-b border-gray-100">
        <div className="flex flex-wrap gap-2 justify-center px-4">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "bg-brand-navy text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Look */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="bg-brand-navy rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <img
              src="https://placehold.co/500x400/1A2B5E/D4A017?text=Featured+Look"
              alt="Featured Look"
              className="rounded-xl w-full object-cover"
            />
            <div>
              <p className="text-brand-gold text-xs uppercase tracking-widest">Featured Look</p>
              <h2 className="text-white text-2xl font-bold mt-2">The Modern Professional</h2>
              <p className="text-white/70 text-sm mt-3 leading-relaxed">
                Pair our Derby Formal with tailored trousers for a polished office look
                that transitions seamlessly into evening events.
              </p>
              <p className="text-white/50 text-xs mt-4 font-mono">
                Wearing: Derby Formal · Size 42
              </p>
              <Link
                href="/product/4"
                className="mt-4 inline-block bg-brand-gold text-brand-navy font-bold px-6 py-2.5 rounded-lg text-sm hover:bg-amber-500 transition-colors"
              >
                Shop This Look →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Lookbook Grid — Masonry */}
      <div className="max-w-7xl mx-auto px-6 pb-10">
        <h2 className="font-bold text-xl text-brand-navy mb-6">All Looks</h2>
        {filteredLooks.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-12">No looks in this category yet.</p>
        ) : (
          <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
            {filteredLooks.map((look) => (
              <div
                key={look.id}
                className="relative rounded-xl overflow-hidden break-inside-avoid mb-4 cursor-pointer group"
              >
                <img
                  src={`https://placehold.co/${look.imgSize}/${look.bgColor}/${look.fgColor}?text=${encodeURIComponent(look.name)}`}
                  alt={look.name}
                  className="w-full object-cover"
                />
                {/* Category pill */}
                <span className="absolute top-3 left-3 bg-brand-navy text-white text-xs px-2.5 py-1 rounded-full font-medium z-10">
                  {look.category}
                </span>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/60 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex flex-col justify-end p-4">
                  <p className="text-white font-bold">{look.name}</p>
                  <p className="text-white/80 text-xs mt-1">{look.products}</p>
                  <Link
                    href="/men"
                    className="mt-3 self-start bg-brand-gold text-brand-navy font-bold px-4 py-1.5 rounded-lg text-xs hover:bg-amber-500 transition-colors"
                  >
                    Shop Look →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Style Tips */}
      <div className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-bold text-xl text-brand-navy mb-6">Styling Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {styleTips.map((tip) => (
              <div key={tip.title} className="bg-white rounded-xl border border-gray-100 p-6">
                <h3 className="font-semibold text-brand-navy mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{tip.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Instagram Strip */}
      <div className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="font-bold text-xl text-brand-navy">#FootwearBD on Instagram</h2>
          <p className="text-gray-500 text-sm mt-1">Tag us for a chance to be featured</p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mt-6">
            {instaImages.map((img, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-xl hover:scale-105 transition-transform duration-200 cursor-pointer"
              >
                <img
                  src={`https://placehold.co/200x200/${img.bg}/${img.fg}?text=📸`}
                  alt={`Instagram ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-center gap-4">
            <span className="text-brand-navy font-semibold">@footwearbd</span>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-brand-navy text-brand-navy text-sm font-semibold px-5 py-2 rounded-lg hover:bg-brand-navy hover:text-white transition-colors"
            >
              Follow us
            </a>
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
