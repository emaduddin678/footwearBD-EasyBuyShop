import { AnnouncementBar } from "@/components/storefront/AnnouncementBar"
import { Header } from "@/components/storefront/Header"
import { Footer } from "@/components/storefront/Footer"
import { WhatsAppFloat } from "@/components/storefront/WhatsAppFloat"
import CheckoutPage from "@/components/pages/CheckoutPage"
import Link from "next/link"

export const metadata = {
  title: "Checkout — FootwearBD",
  description: "Complete your order",
}

export default function Page() {
  return (
    <div className="min-h-screen font-sans bg-[#f4f5f9]">
      <AnnouncementBar />
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6 font-medium">
          <Link href="/" className="hover:text-[#1A2B5E] transition-colors">Home</Link>
          <span>›</span>
          <Link href="/cart" className="hover:text-[#1A2B5E] transition-colors">Cart</Link>
          <span>›</span>
          <span className="text-gray-600">Checkout</span>
        </nav>

        <h1 className="text-2xl font-bold text-[#1A2B5E] py-6">Checkout</h1>

        <CheckoutPage />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
