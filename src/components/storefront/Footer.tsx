"use client"

import { useState } from "react"
import Link from "next/link"

const footerLinks = {
  About: [
    { label: "Our Story", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Press & Media", href: "/press" },
    { label: "Blog", href: "/blog" },
    { label: "Affiliate Program", href: "/affiliates" },
  ],
  "Shopping Info": [
    { label: "Size Guide", href: "/size-guide" },
    { label: "Delivery Information", href: "/delivery" },
    { label: "Returns & Exchanges", href: "/returns" },
    { label: "Order Tracking", href: "/track" },
    { label: "Payment Methods", href: "/payment" },
    { label: "bKash & Nagad Pay", href: "/payment" },
  ],
  "Customer Service": [
    { label: "My Account", href: "/account/login" },
    { label: "My Orders", href: "/account/orders" },
    { label: "Wishlist", href: "/wishlist" },
    { label: "FAQ", href: "/faq" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
}

const paymentMethods = ["bKash", "Nagad", "Rocket", "VISA", "MasterCard"]

export function Footer() {
  const [email, setEmail] = useState("")

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    setEmail("")
  }

  return (
    <footer className="bg-brand-navy pt-[72px]">
      <div className="max-w-[1440px] mx-auto px-16">
        {/* ── Brand header ── */}
        <div className="flex items-center justify-between pb-12 border-b border-white/8 mb-14">
          <Link href="/" className="flex items-center gap-3">
            <svg width="44" height="44" viewBox="0 0 38 38" fill="none">
              <rect width="38" height="38" rx="9" fill="rgba(255,255,255,0.1)" />
              <path d="M7 23C7 23 12 16 20 18C28 20 31 17 31 17V24C31 24 22 28 14 26L7 24V23Z" fill="white" />
              <path d="M14 26C14 26 10 26 8 25L7 24V26C7 26 10 28 14 28V26Z" fill="#D4A017" />
              <circle cx="17" cy="18" r="2.2" fill="#D4A017" />
            </svg>
            <div>
              <div className="text-[26px] font-extrabold text-white tracking-tight">
                Footwear<span className="text-brand-gold">BD</span>
              </div>
              <div className="text-[10px] text-white/40 tracking-[2px] uppercase mt-0.5">
                Premium Footwear · Bangladesh
              </div>
            </div>
          </Link>
          <p className="text-sm text-white/50 leading-[1.7] max-w-[380px] m-0 text-right">
            Bangladesh&apos;s leading footwear eCommerce — premium quality shoes for every occasion,
            delivered to your door.
          </p>
        </div>

        {/* ── 4 columns ── */}
        <div className="grid grid-cols-4 gap-12 pb-14">
          {/* About + Social */}
          <div>
            <h4 className="text-[13px] font-bold text-brand-gold uppercase tracking-[1.5px] m-0 mb-[22px]">
              About
            </h4>
            <div className="flex flex-col gap-[13px]">
              {footerLinks.About.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-white/55 font-medium hover:text-brand-gold transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            {/* Social icons */}
            <div className="flex items-center gap-2.5 mt-7">
              {/* Facebook */}
              <Link href="#" className="w-9 h-9 bg-white/7 rounded-lg flex items-center justify-center hover:bg-brand-gold hover:-translate-y-0.5 transition-all">
                <svg width="15" height="15" fill="#fff" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </Link>
              {/* Instagram */}
              <Link href="#" className="w-9 h-9 bg-white/7 rounded-lg flex items-center justify-center hover:bg-brand-gold hover:-translate-y-0.5 transition-all">
                <svg width="15" height="15" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </Link>
              {/* WhatsApp */}
              <Link href="https://wa.me/8801712345678" className="w-9 h-9 bg-white/7 rounded-lg flex items-center justify-center hover:bg-[#25d366] hover:-translate-y-0.5 transition-all">
                <svg width="15" height="15" fill="#fff" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Shopping Info */}
          <div>
            <h4 className="text-[13px] font-bold text-brand-gold uppercase tracking-[1.5px] m-0 mb-[22px]">
              Shopping Info
            </h4>
            <div className="flex flex-col gap-[13px]">
              {footerLinks["Shopping Info"].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-white/55 font-medium hover:text-brand-gold transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-[13px] font-bold text-brand-gold uppercase tracking-[1.5px] m-0 mb-[22px]">
              Customer Service
            </h4>
            <div className="flex flex-col gap-[13px]">
              {footerLinks["Customer Service"].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-white/55 font-medium hover:text-brand-gold transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h4 className="text-[13px] font-bold text-brand-gold uppercase tracking-[1.5px] m-0 mb-[22px]">
              Contact
            </h4>
            <div className="flex flex-col gap-3.5 mb-7">
              <div className="flex items-start gap-3">
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#D4A017" strokeWidth="2" className="flex-shrink-0 mt-0.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
                <span className="text-sm text-white/55 leading-[1.6] font-medium">
                  Dhaka, Chattogram, Sylhet — All across Bangladesh
                </span>
              </div>
              <div className="flex items-center gap-3">
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#D4A017" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <a href="tel:+8801712345678" className="text-sm text-white/55 font-medium hover:text-brand-gold transition-colors">
                  +880 1712-345678
                </a>
              </div>
              <div className="flex items-center gap-3">
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#D4A017" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <a href="mailto:hello@footwearbd.com" className="text-sm text-white/55 font-medium hover:text-brand-gold transition-colors">
                  hello@footwearbd.com
                </a>
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-white/5 rounded-xl p-[18px]">
              <div className="text-[13px] font-semibold text-white/80 mb-3">
                Get exclusive deals
              </div>
              <form onSubmit={handleSubscribe} className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 h-10 bg-white/8 border border-white/12 border-r-0 rounded-l-lg px-3.5 text-[13px] text-white placeholder:text-gray-500 outline-none"
                />
                <button
                  type="submit"
                  className="h-10 px-4 bg-brand-gold hover:bg-brand-gold-dark text-white border-none rounded-r-lg text-[13px] font-bold cursor-pointer whitespace-nowrap transition-colors"
                >
                  Join →
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-white/7 py-[22px] flex items-center justify-between">
          <span className="text-[13px] text-white/35 font-medium">
            © 2024 FootwearBD · Made with care in Bangladesh
          </span>
          <div className="flex items-center gap-2.5">
            <span className="text-xs text-white/30 mr-1">We accept:</span>
            {paymentMethods.map((method) => (
              <span
                key={method}
                className="text-[11px] font-bold text-white/50 bg-white/7 px-3 py-1 rounded-[5px]"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
