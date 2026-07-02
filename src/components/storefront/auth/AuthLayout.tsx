import Link from "next/link"

interface AuthLayoutProps {
  children: React.ReactNode
  rightLink: { label: string; href: string }
}

export function AuthLayout({ children, rightLink }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Two-column body */}
      <div className="grid flex-1 lg:grid-cols-2">
        {/* Left brand panel — hidden on mobile */}
        <div className="hidden min-h-full flex-col justify-between bg-[#1A2B5E] px-12 py-12 lg:flex">
          {/* Center content */}
          <div className="flex flex-1 flex-col items-center justify-center">
            {/* Logo */}
            <Link
              href="/"
              className="mb-8 flex flex-shrink-0 items-center gap-2.5 rounded-lg bg-white px-3 py-2"
            >
              <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
                <rect width="48" height="48" rx="9" fill="#1A2B5E" />
                <path
                  d="M7 23C7 23 12 16 20 18C28 20 31 17 31 17V24C31 24 22 28 14 26L7 24V23Z"
                  fill="white"
                />
                <path
                  d="M14 26C14 26 10 26 8 25L7 24V26C7 26 10 28 14 28V26Z"
                  fill="#D4A017"
                />
                <circle cx="17" cy="18" r="2.2" fill="#D4A017" />
              </svg>
              <div className="leading-none">
                <div className="text-[40px] font-extrabold tracking-tight text-brand-navy">
                  Footwear<span className="text-brand-gold">BD</span>
                </div>
                <div className="mt-px text-[12px] font-semibold tracking-[1.8px] text-gray-400 uppercase">
                  Premium Footwear
                </div>
              </div>
            </Link>

            <h2 className="mt-8 text-center text-2xl font-bold text-white">
              Bangladesh&apos;s #1 Footwear Store
            </h2>
            <div className="mt-6 space-y-2 text-center">
              <p className="text-sm text-white/80">✓ 50,000+ Happy Customers</p>
              <p className="text-sm text-white/80">✓ Authentic Products Only</p>
              <p className="text-sm text-white/80">
                ✓ Free Returns Within 7 Days
              </p>
            </div>
          </div>

          {/* Copyright */}
          <p className="mt-8 text-center text-xs text-white/40">
            © 2026 FootwearBD
          </p>
        </div>

        {/* Right form panel */}
        <div className="flex flex-col justify-center overflow-y-auto bg-white px-6 py-10 lg:px-16">
          {children}
        </div>
      </div>
    </div>
  )
}
