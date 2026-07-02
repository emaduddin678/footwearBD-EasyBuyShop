"use client"

import "./globals.css"

export default function GlobalError({
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="min-h-screen font-sans bg-[#f4f5f9] flex flex-col items-center justify-center gap-4 py-24 px-6 text-center">
          <div className="text-6xl">🛠️</div>
          <h1 className="text-2xl font-bold text-[#1A2B5E]">FootwearBD is temporarily unavailable</h1>
          <p className="text-gray-500 text-sm max-w-md">
            A critical error occurred. Our team has been notified — please try again in a moment.
          </p>
          <button
            onClick={() => unstable_retry()}
            className="px-6 py-3 bg-[#1A2B5E] text-white rounded-xl font-semibold hover:bg-[#D4A017] transition-colors"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  )
}
