"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { logoutUser } from "@/lib/store/authSlice"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Men", href: "/men" },
  { label: "Women", href: "/women" },
  { label: "Kids", href: "/kids" },
  { label: "Newborn", href: "/newborn" },
  { label: "Sale", href: "/sale", className: "text-red-600 font-bold" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Brands", href: "/brands" },
]

function AccountMenu() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const user = useAppSelector((s) => s.auth.user)
  const sessionChecked = useAppSelector((s) => s.auth.sessionChecked)
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLogout = async () => {
    setOpen(false)
    await dispatch(logoutUser())
    router.push("/")
  }

  if (!sessionChecked) {
    return (
      <div className="flex flex-col items-center gap-0.5 text-gray-400">
        <div className="w-6 h-6 rounded-full bg-gray-200 animate-pulse" />
        <span className="text-[10px] font-bold tracking-[0.3px]">Account</span>
      </div>
    )
  }

  if (!user) {
    return (
      <Link
        href="/account/login"
        className="flex flex-col items-center gap-0.5 text-gray-700 hover:text-brand-navy transition-colors"
      >
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        <span className="text-[10px] font-bold tracking-[0.3px]">Account</span>
      </Link>
    )
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex flex-col items-center gap-0.5 text-brand-navy hover:text-brand-gold transition-colors"
      >
        <div className="w-6 h-6 rounded-full bg-brand-navy text-white flex items-center justify-center text-[11px] font-bold">
          {user.firstName[0].toUpperCase()}
        </div>
        <span className="text-[10px] font-bold tracking-[0.3px] max-w-[60px] truncate">
          {user.firstName}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg py-1 z-50">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-900">{user.firstName} {user.lastName}</p>
            <p className="text-xs text-gray-400 truncate">{user.email}</p>
          </div>
          <Link
            href="/account"
            onClick={() => setOpen(false)}
            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-navy transition-colors"
          >
            My Account
          </Link>
          <Link
            href="/wishlist"
            onClick={() => setOpen(false)}
            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-navy transition-colors"
          >
            My Wishlist
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100 mt-1"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  )
}

export function Header() {
  const pathname = usePathname()
  const cartCount = useAppSelector((s) =>
    s.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  )
  const wishlistCount = useAppSelector((s) => s.wishlist.items.length)

  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_1px_0_#e9ecef]">
      {/* ── Top Row ── */}
      <div className="max-w-[1440px] mx-auto px-16 h-[74px] flex items-center gap-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
            <rect width="38" height="38" rx="9" fill="#1A2B5E" />
            <path d="M7 23C7 23 12 16 20 18C28 20 31 17 31 17V24C31 24 22 28 14 26L7 24V23Z" fill="white" />
            <path d="M14 26C14 26 10 26 8 25L7 24V26C7 26 10 28 14 28V26Z" fill="#D4A017" />
            <circle cx="17" cy="18" r="2.2" fill="#D4A017" />
          </svg>
          <div className="leading-none">
            <div className="text-[22px] font-extrabold text-brand-navy tracking-tight">
              Footwear<span className="text-brand-gold">BD</span>
            </div>
            <div className="text-[9px] font-semibold text-gray-400 tracking-[1.8px] uppercase mt-px">
              Premium Footwear
            </div>
          </div>
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-[520px] relative">
          <input
            type="text"
            placeholder="Search shoes, brands, styles…"
            className="w-full h-[46px] border-2 border-gray-200 rounded-[10px] pl-[18px] pr-[52px] text-sm text-gray-800 bg-gray-50 outline-none focus:border-brand-navy focus:bg-white transition-colors"
          />
          <button
            type="button"
            className="absolute right-0 top-0 h-[46px] w-[46px] bg-brand-navy hover:bg-brand-gold rounded-r-[10px] flex items-center justify-center transition-colors cursor-pointer"
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>
        </div>

        <div className="flex-1" />

        {/* Icons */}
        <div className="flex items-center gap-7 flex-shrink-0">
          {/* Wishlist */}
          <Link href="/wishlist" className="flex flex-col items-center gap-0.5 text-gray-700 hover:text-brand-gold transition-colors relative">
            <div className="relative">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-brand-gold text-white text-[9px] font-extrabold min-w-[17px] h-[17px] rounded-full flex items-center justify-center px-1">
                  {wishlistCount}
                </span>
              )}
            </div>
            <span className="text-[10px] font-bold tracking-[0.3px]">Wishlist</span>
          </Link>

          {/* Cart */}
          <Link href="/cart" className="flex flex-col items-center gap-0.5 text-gray-700 hover:text-brand-navy transition-colors relative">
            <div className="relative">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-extrabold min-w-[17px] h-[17px] rounded-full flex items-center justify-center px-1">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-[10px] font-bold tracking-[0.3px]">Cart</span>
          </Link>

          {/* Account (smart — shows user menu when logged in) */}
          <AccountMenu />
        </div>
      </div>

      {/* ── Nav Row ── */}
      <nav className="border-t border-[#f1f3f5]">
        <div className="max-w-[1440px] mx-auto px-16 flex items-center h-12 gap-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-[22px] h-12 flex items-center text-sm font-semibold border-b-2 border-transparent transition-all",
                link.className ?? "text-brand-navy",
                pathname === link.href
                  ? "border-brand-gold text-brand-gold"
                  : link.href === "/sale"
                  ? "hover:border-red-500"
                  : "hover:text-brand-gold hover:border-brand-gold"
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex-1" />
          <Link
            href="/eid-special"
            className="flex items-center gap-1.5 px-[18px] py-2 bg-brand-gold hover:bg-brand-gold-dark text-white rounded-[7px] text-[13px] font-bold tracking-[0.3px] transition-all hover:-translate-y-px"
          >
            Eid Special →
          </Link>
        </div>
      </nav>
    </header>
  )
}
