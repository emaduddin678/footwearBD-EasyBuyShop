import { AnnouncementBar } from "@/components/storefront/AnnouncementBar"
import { Header } from "@/components/storefront/Header"
import { Footer } from "@/components/storefront/Footer"
import { Skeleton } from "@/components/ui/Skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen font-sans bg-white">
      <AnnouncementBar />
      <Header />

      <div className="bg-[#F8F9FA] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <Skeleton className="h-4 w-64" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Gallery */}
          <div className="w-full lg:w-[55%] flex-shrink-0 space-y-4">
            <Skeleton className="aspect-square w-full rounded-2xl" />
            <div className="flex gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-20 w-20 rounded-lg" />
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 w-full space-y-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-9 w-32" />
            <div className="space-y-2 pt-4">
              <Skeleton className="h-4 w-16" />
              <div className="flex gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-14 rounded-lg" />
                ))}
              </div>
            </div>
            <Skeleton className="h-12 w-full rounded-xl mt-4" />
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
