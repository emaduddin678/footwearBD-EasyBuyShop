import { Suspense } from "react"
import { Header } from "@/components/storefront/Header"
import { AnnouncementBar } from "@/components/storefront/AnnouncementBar"
import { Footer } from "@/components/storefront/Footer"
import { WhatsAppFloat } from "@/components/storefront/WhatsAppFloat"
import OrderTrackingPage from "@/components/pages/OrderTrackingPage"

export const metadata = {
  title: "Track Your Order — FootwearBD",
  description: "Track your order status and get real-time delivery updates.",
}

export default function Page() {
  return (
    <div className="min-h-screen font-sans bg-[#f4f5f9]">
      <AnnouncementBar />
      <Header />
      <Suspense fallback={<div className="py-24 text-center text-gray-400 text-sm">Loading...</div>}>
        <OrderTrackingPage />
      </Suspense>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
