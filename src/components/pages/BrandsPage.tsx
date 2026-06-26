"use client"

import { useState } from "react"
import Link from "next/link"
import { AnnouncementBar } from "@/components/storefront/AnnouncementBar"
import { Header } from "@/components/storefront/Header"
import { Footer } from "@/components/storefront/Footer"
import { WhatsAppFloat } from "@/components/storefront/WhatsAppFloat"

const brands = [
  {
    key: "bata",
    name: "Bata",
    logo: "https://placehold.co/160x60/f5f5f5/1A2B5E?text=BATA",
    tagline: "Bangladesh's #1 shoe brand since 1962",
    styles: "200+ styles available",
    badge: "Most Popular",
    badgeColor: "bg-green-100 text-green-700",
    link: "/men?brand=Bata",
  },
  {
    key: "hush-puppies",
    name: "Hush Puppies",
    logo: "https://placehold.co/160x60/f5f5f5/8B4513?text=Hush+Puppies",
    tagline: "Premium comfort footwear for modern life",
    styles: "80+ styles",
    badge: "Premium",
    badgeColor: "bg-amber-100 text-amber-700",
    link: "/men?brand=Hush+Puppies",
  },
  {
    key: "north-star",
    name: "North Star",
    logo: "https://placehold.co/160x60/f5f5f5/E63946?text=North+Star",
    tagline: "Trendy athletic and casual footwear",
    styles: "100+ styles",
    badge: "Trending",
    badgeColor: "bg-red-100 text-red-700",
    link: "/men?brand=North+Star",
  },
  {
    key: "bay",
    name: "Bay",
    logo: "https://placehold.co/160x60/f5f5f5/2B9348?text=BAY",
    tagline: "Affordable quality for the whole family",
    styles: "60+ styles",
    badge: "Best Value",
    badgeColor: "bg-blue-100 text-blue-700",
    link: "/men?brand=Bay",
  },
  {
    key: "power",
    name: "Power",
    logo: "https://placehold.co/160x60/f5f5f5/F4A261?text=POWER",
    tagline: "Sports and performance footwear",
    styles: "40+ styles",
    badge: "Sports",
    badgeColor: "bg-orange-100 text-orange-700",
    link: "/men?brand=Power",
  },
  {
    key: "weinbrenner",
    name: "Weinbrenner",
    logo: "https://placehold.co/160x60/f5f5f5/6B4226?text=Weinbrenner",
    tagline: "Classic formal and outdoor footwear",
    styles: "30+ styles",
    badge: "Formal",
    badgeColor: "bg-purple-100 text-purple-700",
    link: "/men?brand=Weinbrenner",
  },
]

const whyUs = [
  { icon: "✓", title: "100% Authentic", desc: "Direct from brand distributors" },
  { icon: "✓", title: "Brand Warranty", desc: "Official warranty on all products" },
  { icon: "✓", title: "Free Returns", desc: "7-day hassle-free returns" },
  { icon: "✓", title: "Best Prices", desc: "Competitive prices guaranteed" },
]

export default function BrandsPage() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail("")
    }
  }

  return (
    <div className="min-h-screen font-sans bg-[#f4f5f9]">
      <AnnouncementBar />
      <Header />

      {/* Hero */}
      <div className="bg-brand-navy py-14 text-center">
        <h1 className="text-3xl font-bold text-white">Our Brand Partners</h1>
        <p className="text-white/70 text-sm mt-2">
          Authorized retailer for Bangladesh&apos;s most trusted footwear brands
        </p>
        <p className="text-white/60 text-xs mt-3">6 Brands · 500+ Styles · 100% Authentic</p>
      </div>

      {/* Brand Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="font-bold text-xl text-brand-navy mb-6">All Brands</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {brands.map((brand) => (
            <div
              key={brand.key}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center hover:shadow-lg hover:border-brand-navy transition-all duration-200 cursor-pointer"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="mx-auto h-[60px] object-contain"
              />
              <h3 className="font-bold text-xl text-brand-navy mt-4">{brand.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{brand.tagline}</p>
              <p className="text-xs text-brand-gold mt-2">{brand.styles}</p>
              <span
                className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mt-3 ${brand.badgeColor}`}
              >
                {brand.badge}
              </span>
              <div className="mt-4">
                <Link
                  href={brand.link}
                  className="inline-block border border-brand-navy text-brand-navy text-sm font-semibold px-5 py-2 rounded-lg hover:bg-brand-navy hover:text-white transition-colors"
                >
                  Shop {brand.name} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Authorized */}
      <div className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-bold text-xl text-brand-navy text-center mb-8">
            Why Buy from FootwearBD?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {whyUs.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-xl p-6 text-center border border-gray-100"
              >
                <div className="w-10 h-10 bg-brand-navy rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-brand-gold font-bold text-lg">{item.icon}</span>
                </div>
                <h3 className="font-semibold text-brand-navy text-sm">{item.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Brand Newsletter */}
      <div className="bg-brand-navy py-10 text-center">
        <h2 className="text-xl font-bold text-white">Get Brand Updates</h2>
        <p className="text-white/70 text-sm mt-2">
          Be the first to know about new arrivals from your favourite brands
        </p>
        {subscribed ? (
          <p className="text-brand-gold font-semibold mt-6">
            Thanks for subscribing! We&apos;ll keep you posted.
          </p>
        ) : (
          <form onSubmit={handleSubscribe} className="mt-6 flex gap-2 max-w-sm mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-1 px-4 py-2.5 rounded-lg text-sm outline-none bg-white text-gray-900"
            />
            <button
              type="submit"
              className="bg-brand-gold text-brand-navy font-bold px-5 py-2.5 rounded-lg text-sm hover:bg-amber-500 transition-colors"
            >
              Subscribe
            </button>
          </form>
        )}
        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          {brands.map((b) => (
            <span
              key={b.key}
              className="bg-white/10 text-white text-xs px-3 py-1 rounded-full"
            >
              {b.name}
            </span>
          ))}
        </div>
      </div>

      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
