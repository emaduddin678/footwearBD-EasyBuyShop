import Link from "next/link"
import { AnnouncementBar } from "@/components/storefront/AnnouncementBar"
import { Header } from "@/components/storefront/Header"
import { Footer } from "@/components/storefront/Footer"

export const metadata = {
  title: "Page Not Found | FootwearBD",
}

export default function NotFound() {
  return (
    <div className="min-h-screen font-sans bg-[#f4f5f9] flex flex-col">
      <AnnouncementBar />
      <Header />
      <div className="flex-1 flex flex-col items-center justify-center gap-4 py-24 px-6 text-center">
        <div className="text-6xl">👟</div>
        <h1 className="text-2xl font-bold text-[#1A2B5E]">Page Not Found</h1>
        <p className="text-gray-500 text-sm max-w-md">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>
        <Link
          href="/"
          className="mt-2 px-6 py-3 bg-[#1A2B5E] text-white rounded-xl font-semibold hover:bg-[#D4A017] transition-colors"
        >
          Back to Shop
        </Link>
      </div>
      <Footer />
    </div>
  )
}
