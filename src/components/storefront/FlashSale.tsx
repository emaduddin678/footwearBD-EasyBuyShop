"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ProductCard } from "./ProductCard"
import type { Product } from "@/lib/data/products"

const SALE_DURATION_S = 4 * 3600 + 47 * 60 + 23

function pad(n: number) {
  return String(n).padStart(2, "0")
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center">
      <div className="bg-brand-gold/10 border border-brand-gold/22 rounded-xl px-6 py-3.5 min-w-[90px]">
        <span className="text-[46px] font-extrabold text-brand-gold tracking-[-2px] tabular-nums leading-none block">
          {pad(value)}
        </span>
      </div>
      <div className="text-[10px] font-bold text-white/35 uppercase tracking-[1.5px] mt-2">
        {label}
      </div>
    </div>
  )
}

// ── Client component — receives pre-fetched products as a prop ────────────────

interface FlashSaleProps {
  products: Product[]
}

export function FlashSale({ products }: FlashSaleProps) {
  const [endTime] = useState(() => Date.now() + SALE_DURATION_S * 1000)
  const [timeLeft, setTimeLeft] = useState({ h: 4, m: 47, s: 23 })

  useEffect(() => {
    const iv = setInterval(() => {
      const rem = Math.max(0, endTime - Date.now())
      setTimeLeft({
        h: Math.floor(rem / 3_600_000),
        m: Math.floor((rem % 3_600_000) / 60_000),
        s: Math.floor((rem % 60_000) / 1_000),
      })
      if (rem === 0) clearInterval(iv)
    }, 1000)
    return () => clearInterval(iv)
  }, [endTime])

  return (
    <section className="bg-[#0d1733] py-[72px]">
      <div className="max-w-[1440px] mx-auto px-16">
        {/* Header row */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-[42px] font-extrabold text-brand-gold m-0 mb-2.5 tracking-[-1px] flex items-center gap-3">
              🔥 Flash Sale
            </h2>
            <p className="text-base text-white/50 m-0 font-medium">
              Limited time offers — don&apos;t miss out
            </p>
          </div>

          {/* Countdown */}
          <div className="flex items-end gap-1.5">
            <CountdownUnit value={timeLeft.h} label="Hours" />
            <div className="text-[42px] font-extrabold text-brand-gold/40 pb-8 leading-none">:</div>
            <CountdownUnit value={timeLeft.m} label="Mins" />
            <div className="text-[42px] font-extrabold text-brand-gold/40 pb-8 leading-none">:</div>
            <CountdownUnit value={timeLeft.s} label="Secs" />
          </div>
        </div>

        {/* Products */}
        <div className="grid grid-cols-4 gap-[22px]">
          {products.map((product, i) => (
            <ProductCard
              key={product.id ?? i}
              product={product}
              priceColor="red"
              ctaLabel="Grab Deal"
            />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/sale"
            className="inline-flex items-center gap-2 border-2 border-brand-gold/40 text-brand-gold hover:bg-brand-gold hover:text-white rounded-[9px] px-8 py-3 text-sm font-bold transition-all"
          >
            View All Flash Deals →
          </Link>
        </div>
      </div>
    </section>
  )
}
