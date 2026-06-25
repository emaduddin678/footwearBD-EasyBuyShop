"use client"

import { cn } from "@/lib/utils"

interface SizeSelectorProps {
  sizes: number[]
  unavailableSizes?: number[]
  selectedSize: number | null
  onSizeChange: (size: number) => void
  error?: boolean
}

export function SizeSelector({
  sizes,
  unavailableSizes = [],
  selectedSize,
  onSizeChange,
  error,
}: SizeSelectorProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className={cn("text-sm font-medium", error ? "text-red-500" : "text-gray-700")}>
          Select Size
        </span>
        <a
          href="#size-guide"
          className="text-sm font-medium text-[#D4A017] hover:underline"
        >
          Size Guide →
        </a>
      </div>

      {error && (
        <p className="text-xs text-red-500 mb-1.5">Please select a size to continue</p>
      )}

      <div
        className={cn(
          "flex flex-wrap gap-2 p-2 rounded-xl transition-colors",
          error ? "border-2 border-red-400 bg-red-50" : "border border-gray-100",
        )}
      >
        {sizes.map((size) => {
          const unavailable = unavailableSizes.includes(size)
          const selected = selectedSize === size
          return (
            <button
              key={size}
              disabled={unavailable}
              onClick={() => !unavailable && onSizeChange(size)}
              className={cn(
                "px-4 py-2 rounded-md border text-sm font-medium transition-all",
                unavailable
                  ? "border-gray-100 bg-gray-50 text-gray-300 line-through cursor-not-allowed"
                  : selected
                  ? "border-[#1A2B5E] bg-[#1A2B5E] text-white shadow-sm"
                  : "border-gray-200 bg-white text-gray-700 hover:border-[#1A2B5E] hover:bg-[#f0f4ff]",
              )}
            >
              {size}
            </button>
          )
        })}
      </div>
    </div>
  )
}
