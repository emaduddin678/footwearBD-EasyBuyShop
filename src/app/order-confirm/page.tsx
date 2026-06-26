import { AnnouncementBar } from "@/components/storefront/AnnouncementBar"
import { Header } from "@/components/storefront/Header"
import { Footer } from "@/components/storefront/Footer"
import { WhatsAppFloat } from "@/components/storefront/WhatsAppFloat"
import OrderConfirmPage from "@/components/pages/OrderConfirmPage"

export const metadata = {
  title: "Order Confirmed — FootwearBD",
  description: "Your order has been placed successfully",
}

export default function Page() {
  return (
    <div className="min-h-screen font-sans bg-[#f4f5f9]">
      <AnnouncementBar />
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-10">
        <OrderConfirmPage />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
