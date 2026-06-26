"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { AnnouncementBar } from "@/components/storefront/AnnouncementBar"
import { Header } from "@/components/storefront/Header"
import { Footer } from "@/components/storefront/Footer"
import { WhatsAppFloat } from "@/components/storefront/WhatsAppFloat"
import { ProductCard } from "@/components/storefront/ProductCard"
import { bestSellers } from "@/lib/data/products"

const EID_END = new Date("2026-07-15T23:59:59")

function useCountdown(target: Date) {
  const [diff, setDiff] = useState(Math.max(0, target.getTime() - Date.now()))

  useEffect(() => {
    const id = setInterval(() => {
      setDiff(Math.max(0, target.getTime() - Date.now()))
    }, 1000)
    return () => clearInterval(id)
  }, [target])

  const totalSecs = Math.floor(diff / 1000)
  const days = Math.floor(totalSecs / 86400)
  const hours = Math.floor((totalSecs % 86400) / 3600)
  const mins = Math.floor((totalSecs % 3600) / 60)
  const secs = totalSecs % 60

  return { days, hours, mins, secs }
}

function CountBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 bg-brand-gold rounded-xl flex items-center justify-center">
        <span className="text-brand-navy font-bold text-2xl leading-none">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-white/70 text-xs mt-1">{label}</span>
    </div>
  )
}

const giftCards = [
  { emoji: "👨", title: "For Him", range: "৳1,500–৳4,000", link: "/men" },
  { emoji: "👩", title: "For Her", range: "৳1,200–৳3,500", link: "/women" },
  { emoji: "👦", title: "For Kids", range: "৳800–৳2,000", link: "/kids" },
  { emoji: "👶", title: "For Baby", range: "৳600–৳1,500", link: "/kids" },
]

export default function EidSpecialPage() {
  const { days, hours, mins, secs } = useCountdown(EID_END)
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail("")
    }
  }

  const eidProducts = bestSellers.slice(0, 8)

  return (
    <div className="min-h-screen font-sans bg-[#f4f5f9]">
      <AnnouncementBar />
      <Header />

      {/* Hero */}
      <div className="relative bg-brand-navy py-20 text-center overflow-hidden">
        {/* Decorative gold motifs */}
        <span className="absolute top-6 left-8 text-brand-gold text-4xl opacity-40 select-none">✦</span>
        <span className="absolute top-10 left-24 text-brand-gold text-2xl opacity-30 select-none">✦</span>
        <span className="absolute top-4 right-10 text-brand-gold text-4xl opacity-40 select-none">✦</span>
        <span className="absolute top-16 right-28 text-brand-gold text-2xl opacity-30 select-none">✦</span>
        <span className="absolute bottom-8 left-16 text-brand-gold text-3xl opacity-20 select-none">✦</span>
        <span className="absolute bottom-6 right-20 text-brand-gold text-3xl opacity-20 select-none">✦</span>

        <div className="relative z-10">
          <p className="text-brand-gold text-sm font-medium tracking-widest uppercase">
            ✨ Eid Special Collection ✨
          </p>
          <h1 className="text-white text-4xl sm:text-5xl font-bold mt-2">Step Into Eid</h1>
          <p className="text-white/80 text-lg mt-3">
            Exclusive festive footwear for every celebration
          </p>

          {/* Countdown */}
          <div className="mt-6">
            <p className="text-white/70 text-sm mb-3">Sale ends in:</p>
            <div className="flex items-start justify-center gap-3">
              <CountBox value={days} label="Days" />
              <span className="text-brand-gold font-bold text-2xl mt-2">:</span>
              <CountBox value={hours} label="Hours" />
              <span className="text-brand-gold font-bold text-2xl mt-2">:</span>
              <CountBox value={mins} label="Mins" />
              <span className="text-brand-gold font-bold text-2xl mt-2">:</span>
              <CountBox value={secs} label="Secs" />
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/men?eid=true"
              className="bg-brand-gold text-brand-navy font-bold px-8 py-3 rounded-xl hover:bg-amber-500 transition-colors"
            >
              Shop Men&apos;s Eid
            </Link>
            <Link
              href="/women?eid=true"
              className="border-2 border-white text-white font-bold px-8 py-3 rounded-xl hover:bg-white/10 transition-colors"
            >
              Shop Women&apos;s Eid
            </Link>
          </div>
        </div>
      </div>

      {/* Offer Highlights Marquee */}
      <div className="bg-white py-3 border-b border-gray-100 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[
            "🎁 Up to 40% Off",
            "Free Gift Wrapping",
            "Free Delivery on All Eid Orders",
            "Exclusive Eid Designs",
            "Limited Stock",
            "🎁 Up to 40% Off",
            "Free Gift Wrapping",
            "Free Delivery on All Eid Orders",
            "Exclusive Eid Designs",
            "Limited Stock",
          ].map((text, i) => (
            <span key={i} className="text-sm text-brand-navy font-medium mx-6">
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* Eid Collections Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="font-bold text-2xl text-brand-navy">Eid Collections</h2>
        <p className="text-gray-500 text-sm mt-1">Specially curated for the festive season</p>

        {/* Two Featured Banners */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 mb-10">
          <div className="bg-brand-navy rounded-2xl p-8 h-48 flex flex-col justify-between overflow-hidden relative">
            <img
              src="https://placehold.co/400x200/1A2B5E/D4A017?text=Men's+Eid"
              alt="Men's Eid"
              className="absolute inset-0 w-full h-full object-cover opacity-20 rounded-2xl"
            />
            <div className="relative z-10">
              <h3 className="text-white text-xl font-bold">Men&apos;s Eid Collection</h3>
              <p className="text-white/70 text-sm mt-1">Premium formal and casual styles</p>
            </div>
            <Link
              href="/men?eid=true"
              className="relative z-10 self-start bg-brand-gold text-brand-navy font-bold px-5 py-2 rounded-lg text-sm hover:bg-amber-500 transition-colors"
            >
              Shop Now →
            </Link>
          </div>

          <div className="rounded-2xl p-8 h-48 flex flex-col justify-between overflow-hidden relative"
            style={{ background: "linear-gradient(135deg, #D4A017, #f0c040)" }}
          >
            <img
              src="https://placehold.co/400x200/D4A017/1A2B5E?text=Women's+Eid"
              alt="Women's Eid"
              className="absolute inset-0 w-full h-full object-cover opacity-20 rounded-2xl"
            />
            <div className="relative z-10">
              <h3 className="text-brand-navy text-xl font-bold">Women&apos;s Eid Collection</h3>
              <p className="text-brand-navy/70 text-sm mt-1">Elegant styles for the celebration</p>
            </div>
            <Link
              href="/women?eid=true"
              className="relative z-10 self-start bg-brand-navy text-white font-bold px-5 py-2 rounded-lg text-sm hover:bg-brand-navy/80 transition-colors"
            >
              Shop Now →
            </Link>
          </div>
        </div>

        {/* Eid Picks */}
        <h3 className="font-bold text-xl text-brand-navy mb-6">Eid Picks</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {eidProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Gift Guide */}
      <div className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-bold text-xl text-brand-navy">Eid Gift Guide</h2>
          <p className="text-gray-500 text-sm mt-1">Perfect gifts for everyone in the family</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {giftCards.map((g) => (
              <div key={g.title} className="bg-white rounded-xl border border-gray-100 p-5 text-center">
                <div className="text-5xl mb-3">{g.emoji}</div>
                <h3 className="font-bold text-brand-navy">{g.title}</h3>
                <p className="text-brand-gold text-sm font-semibold mt-1">{g.range}</p>
                <Link
                  href={g.link}
                  className="mt-4 inline-block border border-brand-navy text-brand-navy text-sm font-semibold px-4 py-2 rounded-lg hover:bg-brand-navy hover:text-white transition-colors"
                >
                  Shop →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gift Wrapping CTA */}
      <div className="bg-brand-navy py-10 text-center">
        <div className="text-4xl mb-3">🎁</div>
        <h2 className="text-white text-xl font-bold">Free Gift Wrapping on All Eid Orders!</h2>
        <p className="text-white/70 text-sm mt-2">Make every gift extra special this Eid</p>
        {subscribed ? (
          <p className="text-brand-gold font-semibold mt-6">You&apos;re all set! Enjoy your Eid shopping.</p>
        ) : (
          <div className="mt-6">
            <Link
              href="/men?eid=true"
              className="inline-block bg-brand-gold text-brand-navy font-bold px-10 py-3 rounded-xl text-base hover:bg-amber-500 transition-colors"
            >
              Shop Eid Collection →
            </Link>
          </div>
        )}
      </div>

      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
