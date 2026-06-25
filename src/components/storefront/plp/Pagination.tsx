"use client"

import { cn } from "@/lib/utils"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

function getPages(current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages: (number | '...')[] = [1]
  if (current > 3) pages.push('...')
  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)
  for (let i = start; i <= end; i++) pages.push(i)
  if (current < total - 2) pages.push('...')
  pages.push(total)
  return pages
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = getPages(currentPage, totalPages)

  return (
    <div className="flex items-center justify-center gap-1.5 py-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-md text-sm font-medium border border-gray-200 bg-white text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:not-disabled:bg-[#1A2B5E] hover:not-disabled:text-white hover:not-disabled:border-[#1A2B5E] transition-colors"
      >
        ← Previous
      </button>

      {pages.map((page, idx) =>
        page === '...'
          ? (
            <span key={`dot-${idx}`} className="w-9 h-9 flex items-center justify-center text-gray-400 text-sm">
              …
            </span>
          )
          : (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              className={cn(
                "w-9 h-9 rounded-md text-sm font-medium transition-colors border",
                currentPage === page
                  ? "bg-[#1A2B5E] text-white border-[#1A2B5E]"
                  : "bg-white border-gray-200 text-gray-600 hover:bg-[#1A2B5E] hover:text-white hover:border-[#1A2B5E]",
              )}
            >
              {page}
            </button>
          ),
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-md text-sm font-medium border border-gray-200 bg-white text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:not-disabled:bg-[#1A2B5E] hover:not-disabled:text-white hover:not-disabled:border-[#1A2B5E] transition-colors"
      >
        Next →
      </button>
    </div>
  )
}
