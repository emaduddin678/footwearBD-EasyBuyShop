"use client"

import { useEffect } from "react"
import Link from "next/link"
import { AnnouncementBar } from "@/components/storefront/AnnouncementBar"
import { Header } from "@/components/storefront/Header"
import { Footer } from "@/components/storefront/Footer"

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen font-sans bg-[#f4f5f9] flex flex-col">
      <AnnouncementBar />
      <Header />
      <div className="flex-1 flex flex-col items-center justify-center gap-4 py-24 px-6 text-center">
        <div className="text-6xl">⚠️</div>
        <h1 className="text-2xl font-bold text-[#1A2B5E]">Something went wrong</h1>
        <p className="text-gray-500 text-sm max-w-md">
          We hit an unexpected error loading this page. Please try again, or head back to the
          homepage.
        </p>
        <div className="flex gap-3 mt-2">
          <button
            onClick={() => unstable_retry()}
            className="px-6 py-3 bg-[#1A2B5E] text-white rounded-xl font-semibold hover:bg-[#D4A017] transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-3 border-2 border-[#1A2B5E] text-[#1A2B5E] rounded-xl font-semibold hover:bg-[#1A2B5E] hover:text-white transition-colors"
          >
            Back to Shop
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}
