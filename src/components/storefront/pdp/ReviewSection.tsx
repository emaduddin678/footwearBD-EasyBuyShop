"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { fetchProductReviews, type BackendReview } from "@/lib/api/products"

function Stars({ rating }: { rating: number }) {
  const r = Math.round(rating)
  return (
    <span className="text-amber-400 text-sm tracking-widest">
      {"★".repeat(r)}{"☆".repeat(5 - r)}
    </span>
  )
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

interface ReviewSectionProps {
  productId: string
  rating: number
  reviewCount: number
}

export function ReviewSection({ productId, rating, reviewCount }: ReviewSectionProps) {
  const [reviews, setReviews] = useState<BackendReview[]>([])
  const [averageRating, setAverageRating] = useState(rating)
  const [distribution, setDistribution] = useState<Record<string, number>>({})
  const [total, setTotal] = useState(reviewCount)
  const [loading, setLoading] = useState(true)
  const [helpfulCounts, setHelpfulCounts] = useState<Record<string, number>>({})

  useEffect(() => {
    fetchProductReviews(productId, { page: 1, limit: 10, sort: "newest" })
      .then((data) => {
        setReviews(data.reviews)
        setAverageRating(data.averageRating)
        setDistribution(data.ratingDistribution)
        setTotal(data.total)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [productId])

  const handleMarkHelpful = async (reviewId: string) => {
    const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3002"
    try {
      const res = await fetch(
        `${BASE_URL}/api/products/${productId}/reviews/${reviewId}/helpful`,
        { method: "PATCH", credentials: "include" },
      )
      if (res.ok) {
        const data = await res.json()
        setHelpfulCounts((prev) => ({ ...prev, [reviewId]: data.payload?.helpfulCount ?? (prev[reviewId] ?? 0) + 1 }))
      }
    } catch {
      // silent fail
    }
  }

  const ratingDist = [5, 4, 3, 2, 1].map((stars) => {
    const count = distribution[stars] ?? 0
    const pct = total > 0 ? Math.round((count / total) * 100) : 0
    return { stars, pct }
  })

  return (
    <div>
      {/* Summary */}
      <div className="flex flex-col sm:flex-row gap-8 mb-8 pb-8 border-b border-gray-100">
        <div className="flex flex-col items-center justify-center gap-1 min-w-[120px]">
          <div className="text-5xl font-extrabold text-[#1A2B5E]">
            {averageRating > 0 ? averageRating.toFixed(1) : "—"}
          </div>
          <Stars rating={averageRating} />
          <div className="text-sm text-gray-400">{total} review{total !== 1 ? "s" : ""}</div>
        </div>

        <div className="flex-1 flex flex-col gap-2">
          {ratingDist.map(({ stars, pct }) => (
            <div key={stars} className="flex items-center gap-3">
              <span className="text-xs text-gray-500 w-5 text-right">{stars}★</span>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#1A2B5E] rounded-full transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-xs text-gray-400 w-8">{pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Review cards */}
      {loading ? (
        <div className="flex flex-col gap-4 mb-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-gray-50 rounded-xl p-4 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-32 mb-2" />
              <div className="h-3 bg-gray-200 rounded w-full mb-1" />
              <div className="h-3 bg-gray-200 rounded w-3/4" />
            </div>
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-10 text-gray-400">
          <p className="text-3xl mb-2">💬</p>
          <p className="text-sm">No reviews yet. Be the first to review this product!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 mb-6">
          {reviews.map((review) => (
            <div key={review._id} className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-start justify-between mb-1 gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-800 text-sm">{review.userName}</span>
                  {review.isVerifiedPurchase && (
                    <span className="text-[10px] bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                      Verified Purchase
                    </span>
                  )}
                </div>
                <span className="text-xs text-gray-400">{formatDate(review.createdAt)}</span>
              </div>
              <Stars rating={review.rating} />
              {review.title && (
                <p className="font-semibold text-gray-800 text-sm mt-1">{review.title}</p>
              )}
              <p className="text-sm text-gray-600 mt-2 mb-3 leading-relaxed">{review.comment}</p>
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span>Was this helpful?</span>
                <button
                  onClick={() => handleMarkHelpful(review._id)}
                  className="flex items-center gap-1 hover:text-gray-700 transition-colors"
                >
                  👍 {helpfulCounts[review._id] ?? review.helpfulCount}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Link
        href="/account/login"
        className="inline-block px-6 py-2.5 border-2 border-[#1A2B5E] text-[#1A2B5E] rounded-xl font-semibold text-sm hover:bg-[#1A2B5E] hover:text-white transition-colors"
      >
        Write a Review
      </Link>
    </div>
  )
}
