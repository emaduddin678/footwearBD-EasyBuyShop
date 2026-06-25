import { AnnouncementBar } from "@/components/storefront/AnnouncementBar"
import { Header } from "@/components/storefront/Header"
import { HeroBanner } from "@/components/storefront/HeroBanner"
import { CategorySection } from "@/components/storefront/CategorySection"
import { TrustBar } from "@/components/storefront/TrustBar"
import { BestSellers } from "@/components/storefront/BestSellers"
import { PromoBanner } from "@/components/storefront/PromoBanner"
import { NewArrivals } from "@/components/storefront/NewArrivals"
import { FlashSale } from "@/components/storefront/FlashSale"
import { BrandStrip } from "@/components/storefront/BrandStrip"
import { RecentlyViewed } from "@/components/storefront/RecentlyViewed"
import { Footer } from "@/components/storefront/Footer"
import { WhatsAppFloat } from "@/components/storefront/WhatsAppFloat"

export default function HomePage() {
  return (
    <div className="min-h-screen font-sans bg-[#f4f5f9]">
      <AnnouncementBar />
      <Header />
      <main>
        <HeroBanner />
        <CategorySection />
        <TrustBar />
        <BestSellers />
        <PromoBanner />
        <NewArrivals />
        <FlashSale />
        <BrandStrip />
        <RecentlyViewed />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
