import { AnnouncementBar } from "@/components/storefront/AnnouncementBar"
import { Header } from "@/components/storefront/Header"
import { Footer } from "@/components/storefront/Footer"
import { Skeleton, ProductGridSkeleton } from "@/components/ui/Skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen font-sans bg-[#f4f5f9]">
      <AnnouncementBar />
      <Header />

      <div className="bg-[#F8F9FA] border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-6 py-3">
          <Skeleton className="h-4 w-40" />
        </div>
      </div>

      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-6 py-5 flex items-center justify-between">
          <Skeleton className="h-7 w-56" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 py-6">
        <div className="flex gap-6 items-start">
          <aside className="hidden lg:block w-[280px] flex-shrink-0 space-y-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-3/4" />
              </div>
            ))}
          </aside>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-9 w-40 rounded-lg" />
            </div>
            <ProductGridSkeleton count={12} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
