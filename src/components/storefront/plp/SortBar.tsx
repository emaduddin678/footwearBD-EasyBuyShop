"use client"

import { cn } from "@/lib/utils"

const SORT_OPTIONS = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest First' },
  { value: 'rating', label: 'Highest Rated' },
]

interface SortBarProps {
  viewMode: 'grid' | 'list'
  onViewModeChange: (mode: 'grid' | 'list') => void
  sortBy: string
  onSortChange: (sort: string) => void
  totalCount: number
  filteredCount: number
}

function GridIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <rect x="0" y="0" width="7" height="7" rx="1.5" />
      <rect x="9" y="0" width="7" height="7" rx="1.5" />
      <rect x="0" y="9" width="7" height="7" rx="1.5" />
      <rect x="9" y="9" width="7" height="7" rx="1.5" />
    </svg>
  )
}

function ListIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="1" y1="4" x2="15" y2="4" />
      <line x1="1" y1="8" x2="15" y2="8" />
      <line x1="1" y1="12" x2="15" y2="12" />
    </svg>
  )
}

export function SortBar({
  viewMode, onViewModeChange,
  sortBy, onSortChange,
  totalCount, filteredCount,
}: SortBarProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 px-4 py-3 flex items-center justify-between">
      {/* Left: view toggles + count */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onViewModeChange('grid')}
          className={cn(
            "p-2 rounded-lg transition-colors",
            viewMode === 'grid' ? "bg-[#1A2B5E] text-white" : "text-gray-400 hover:bg-gray-100",
          )}
          aria-label="Grid view"
        >
          <GridIcon />
        </button>
        <button
          onClick={() => onViewModeChange('list')}
          className={cn(
            "p-2 rounded-lg transition-colors",
            viewMode === 'list' ? "bg-[#1A2B5E] text-white" : "text-gray-400 hover:bg-gray-100",
          )}
          aria-label="List view"
        >
          <ListIcon />
        </button>
        <span className="text-sm text-gray-500 ml-1 hidden sm:block">
          <span className="font-semibold text-gray-800">{filteredCount}</span> of {totalCount} products
        </span>
      </div>

      {/* Right: sort dropdown */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500 hidden sm:block">Sort by:</span>
        <div className="relative">
          <select
            value={sortBy}
            onChange={e => onSortChange(e.target.value)}
            className="appearance-none border-2 border-[#1A2B5E] text-[#1A2B5E] rounded-lg pl-3 pr-8 py-2 text-sm font-medium focus:outline-none bg-white cursor-pointer"
          >
            {SORT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#1A2B5E]">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M2 4l4 4 4-4" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  )
}
