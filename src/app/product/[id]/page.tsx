import Link from "next/link"
import { allPlpProducts } from "@/lib/data/products"
import { AnnouncementBar } from "@/components/storefront/AnnouncementBar"
import { Header } from "@/components/storefront/Header"
import { Footer } from "@/components/storefront/Footer"
import { WhatsAppFloat } from "@/components/storefront/WhatsAppFloat"
import { ImageGallery } from "@/components/storefront/pdp/ImageGallery"
import { ProductInfo } from "@/components/storefront/pdp/ProductInfo"
import { PDPTabs } from "@/components/storefront/pdp/PDPTabs"
import { RelatedProducts } from "@/components/storefront/pdp/RelatedProducts"
import { RecentlyViewedPDP } from "@/components/storefront/pdp/RecentlyViewedPDP"

export async function generateStaticParams() {
  return allPlpProducts.map((p) => ({ id: String(p.id) }))
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = allPlpProducts.find((p) => p.id === Number(id)) ?? null

  if (!product) {
    return (
      <div className="min-h-screen font-sans bg-[#f4f5f9] flex flex-col">
        <AnnouncementBar />
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center gap-4 py-24">
          <div className="text-6xl">👟</div>
          <h1 className="text-2xl font-bold text-[#1A2B5E]">Product Not Found</h1>
          <p className="text-gray-500 text-sm">
            This product doesn&apos;t exist or may have been removed.
          </p>
          <Link
            href="/"
            className="mt-2 px-6 py-3 bg-[#1A2B5E] text-white rounded-xl font-semibold hover:bg-[#D4A017] transition-colors"
          >
            Back to Shop
          </Link>
        </div>
        <Footer />
        <WhatsAppFloat />
      </div>
    )
  }

  const relatedProducts = allPlpProducts
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.category === product.category || p.brand === product.brand),
    )
    .slice(0, 4)

  const genderLabel =
    { men: "Men", women: "Women", kids: "Kids", newborn: "Newborn", unisex: "All" }[
      product.gender
    ] ?? "All"
  const categoryLabel =
    product.category.charAt(0).toUpperCase() + product.category.slice(1)
  const genderPath = product.gender === "unisex" ? "men" : product.gender

  return (
    <div className="min-h-screen font-sans bg-white">
      <AnnouncementBar />
      <Header />

      {/* Breadcrumb */}
      <div className="bg-[#F8F9FA] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <nav className="text-[13px] flex items-center gap-1.5 flex-wrap">
            <Link href="/" className="text-[#1A2B5E] hover:underline">
              Home
            </Link>
            <span className="text-gray-400">›</span>
            <Link href={`/${genderPath}`} className="text-[#1A2B5E] hover:underline">
              {genderLabel}
            </Link>
            <span className="text-gray-400">›</span>
            <Link href={`/${genderPath}`} className="text-[#1A2B5E] hover:underline">
              {categoryLabel}
            </Link>
            <span className="text-gray-400">›</span>
            <span className="text-gray-500 truncate max-w-[200px]">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main product section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Left: Image gallery — 55% */}
            <div className="w-full lg:w-[55%] flex-shrink-0">
              <ImageGallery product={product} />
            </div>

            {/* Right: Product info — 45% */}
            <div className="flex-1">
              <ProductInfo product={product} />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Description, Size Guide, Reviews */}
      <PDPTabs product={product} />

      {/* Related Products */}
      <RelatedProducts currentProduct={product} relatedProducts={relatedProducts} />

      {/* Recently Viewed */}
      <RecentlyViewedPDP currentProductId={product.id} />

      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
