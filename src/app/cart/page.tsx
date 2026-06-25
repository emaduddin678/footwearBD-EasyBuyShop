import { AnnouncementBar } from "@/components/storefront/AnnouncementBar"
import { Header } from "@/components/storefront/Header"
import { Footer } from "@/components/storefront/Footer"
import { WhatsAppFloat } from "@/components/storefront/WhatsAppFloat"
import { CartContent } from "./CartContent"

export const metadata = {
  title: "Your Cart — FootwearBD",
  description: "Review your cart and proceed to checkout",
}

export default function Page() {
  return (
    <div className="min-h-screen font-sans bg-[#f4f5f9]">
      <AnnouncementBar />
      <Header />
      <main className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6 font-medium">
          <a href="/" className="hover:text-[#1A2B5E] transition-colors">Home</a>
          <span>›</span>
          <span className="text-gray-600">Cart</span>
        </nav>

        <h1 className="text-[28px] font-extrabold text-[#1A2B5E] mb-8 tracking-tight">
          Shopping Cart
        </h1>

        <CartContent />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
