import Link from "next/link"

interface AuthLayoutProps {
  children: React.ReactNode
  rightLink: { label: string; href: string }
}

export function AuthLayout({ children, rightLink }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Minimal auth header */}
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between flex-shrink-0">
        <Link href="/" className="flex items-center gap-2.5">
          <svg width="34" height="34" viewBox="0 0 38 38" fill="none">
            <rect width="38" height="38" rx="9" fill="#1A2B5E" />
            <path d="M7 23C7 23 12 16 20 18C28 20 31 17 31 17V24C31 24 22 28 14 26L7 24V23Z" fill="white" />
            <path d="M14 26C14 26 10 26 8 25L7 24V26C7 26 10 28 14 28V26Z" fill="#D4A017" />
            <circle cx="17" cy="18" r="2.2" fill="#D4A017" />
          </svg>
          <div className="leading-none">
            <div className="text-[18px] font-extrabold text-[#1A2B5E] tracking-tight">
              Footwear<span className="text-[#D4A017]">BD</span>
            </div>
            <div className="text-[8px] font-semibold text-gray-400 tracking-[1.6px] uppercase mt-px">
              Premium Footwear
            </div>
          </div>
        </Link>
        <Link
          href={rightLink.href}
          className="text-sm text-[#1A2B5E] font-medium hover:text-[#D4A017] transition-colors"
        >
          {rightLink.label}
        </Link>
      </header>

      {/* Two-column body */}
      <div className="flex-1 grid lg:grid-cols-2">
        {/* Left brand panel — hidden on mobile */}
        <div className="hidden lg:flex bg-[#1A2B5E] flex-col justify-between py-12 px-12 min-h-full">
          {/* Center content */}
          <div className="flex-1 flex flex-col justify-center items-center">
            <img
              src="https://placehold.co/380x280/1A2B5E/D4A017?text=FootwearBD"
              alt="FootwearBD"
              className="rounded-2xl mx-auto w-full max-w-sm"
            />
            <h2 className="text-white text-2xl font-bold mt-8 text-center">
              Bangladesh&apos;s #1 Footwear Store
            </h2>
            <div className="mt-6 text-center space-y-2">
              <p className="text-white/80 text-sm">✓ 50,000+ Happy Customers</p>
              <p className="text-white/80 text-sm">✓ Authentic Products Only</p>
              <p className="text-white/80 text-sm">✓ Free Returns Within 7 Days</p>
            </div>
          </div>

          {/* Copyright */}
          <p className="text-white/40 text-xs text-center mt-8">© 2026 FootwearBD</p>
        </div>

        {/* Right form panel */}
        <div className="flex flex-col justify-center px-6 py-10 lg:px-16 bg-white overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  )
}
