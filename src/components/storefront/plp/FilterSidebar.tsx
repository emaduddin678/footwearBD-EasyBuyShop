"use client"

import { cn } from "@/lib/utils"

const COLORS = [
  { name: 'Black', hex: '#000000' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Brown', hex: '#8B4513' },
  { name: 'Navy', hex: '#1A2B5E' },
  { name: 'Red', hex: '#DC2626' },
  { name: 'Tan', hex: '#D2B48C' },
  { name: 'Grey', hex: '#9CA3AF' },
  { name: 'Pink', hex: '#EC4899' },
  { name: 'Purple', hex: '#7C3AED' },
] as const

const BRANDS = ['Bata', 'Hush Puppies', 'North Star', 'Bay', 'Power'] as const
const RATINGS = [5, 4, 3, 2] as const

export interface FilterSidebarProps {
  availableCategories: string[]
  availableSizes: number[]
  priceMin: number
  priceMax: number
  selectedCategories: string[]
  onCategoryChange: (categories: string[]) => void
  selectedSizes: number[]
  onSizeChange: (sizes: number[]) => void
  selectedColors: string[]
  onColorChange: (colors: string[]) => void
  priceRange: [number, number]
  onPriceRangeChange: (range: [number, number]) => void
  selectedBrands: string[]
  onBrandChange: (brands: string[]) => void
  minRating: number
  onRatingChange: (rating: number) => void
  onClearAll: () => void
  hasActiveFilters: boolean
  productCounts: {
    categories: Record<string, number>
    brands: Record<string, number>
  }
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-3">
      {children}
    </p>
  )
}

function Divider() {
  return <div className="border-t border-gray-100 my-4" />
}

function CheckRow({
  label, count, checked, onChange,
}: { label: string; count?: number; checked: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange} className="flex items-center gap-3 w-full text-left group">
      <span className={cn(
        "flex-shrink-0 w-4 h-4 rounded border-2 flex items-center justify-center transition-colors",
        checked
          ? "bg-[#1A2B5E] border-[#1A2B5E]"
          : "border-gray-300 group-hover:border-[#1A2B5E]",
      )}>
        {checked && (
          <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
            <path d="M1 3.5L3.2 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span className="text-sm text-gray-700 flex-1 capitalize">{label}</span>
      {count !== undefined && <span className="text-xs text-gray-400">({count})</span>}
    </button>
  )
}

function PriceRangeSlider({
  value, onChange, min, max,
}: { value: [number, number]; onChange: (v: [number, number]) => void; min: number; max: number }) {
  const [lo, hi] = value
  const range = max - min
  const leftPct = range > 0 ? ((lo - min) / range) * 100 : 0
  const rightPct = range > 0 ? 100 - ((hi - min) / range) * 100 : 0

  return (
    <div>
      <p className="text-sm font-semibold text-[#1A2B5E] mb-3">
        ৳{lo.toLocaleString()} – ৳{hi.toLocaleString()}
      </p>
      <div className="relative h-5 flex items-center mb-1">
        {/* Visual track */}
        <div className="absolute w-full h-1.5 rounded-full bg-gray-200 pointer-events-none">
          <div
            className="absolute h-full rounded-full bg-[#1A2B5E]"
            style={{ left: `${leftPct}%`, right: `${rightPct}%` }}
          />
        </div>
        {/* Min handle */}
        <input
          type="range" min={min} max={max} step={Math.max(1, Math.round(range / 75))}
          value={lo}
          onChange={e => {
            const v = Math.min(Number(e.target.value), hi - 1)
            onChange([v, hi])
          }}
          className="absolute w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#1A2B5E] [&::-webkit-slider-thumb]:shadow-[0_0_0_2px_white,0_1px_4px_rgba(0,0,0,0.25)] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-runnable-track]:bg-transparent"
          style={{ zIndex: lo > max - Math.round(range * 0.2) ? 5 : 3 }}
        />
        {/* Max handle */}
        <input
          type="range" min={min} max={max} step={Math.max(1, Math.round(range / 75))}
          value={hi}
          onChange={e => {
            const v = Math.max(Number(e.target.value), lo + 1)
            onChange([lo, v])
          }}
          className="absolute w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#1A2B5E] [&::-webkit-slider-thumb]:shadow-[0_0_0_2px_white,0_1px_4px_rgba(0,0,0,0.25)] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-runnable-track]:bg-transparent"
          style={{ zIndex: 4 }}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-400 mt-2">
        <span>৳{min.toLocaleString()}</span>
        <span>৳{max.toLocaleString()}</span>
      </div>
    </div>
  )
}

export function FilterSidebar({
  availableCategories, availableSizes, priceMin, priceMax,
  selectedCategories, onCategoryChange,
  selectedSizes, onSizeChange,
  selectedColors, onColorChange,
  priceRange, onPriceRangeChange,
  selectedBrands, onBrandChange,
  minRating, onRatingChange,
  onClearAll, hasActiveFilters,
  productCounts,
}: FilterSidebarProps) {

  const toggle = <T,>(arr: T[], item: T, setter: (a: T[]) => void) =>
    setter(arr.includes(item) ? arr.filter(x => x !== item) : [...arr, item])

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-[#1A2B5E]">Filters</h2>
        {hasActiveFilters && (
          <button onClick={onClearAll} className="text-sm text-[#D4A017] hover:underline font-medium">
            Clear All
          </button>
        )}
      </div>

      {/* Category */}
      {availableCategories.length > 0 && (
        <>
          <SectionTitle>Category</SectionTitle>
          <div className="space-y-3">
            {availableCategories.map(cat => (
              <CheckRow
                key={cat}
                label={cat}
                count={productCounts.categories[cat] ?? 0}
                checked={selectedCategories.includes(cat)}
                onChange={() => toggle(selectedCategories, cat, onCategoryChange)}
              />
            ))}
          </div>
          <Divider />
        </>
      )}

      {/* Size */}
      {availableSizes.length > 0 && (
        <>
          <SectionTitle>Size</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {availableSizes.map(size => (
              <button
                key={size}
                onClick={() => toggle(selectedSizes, size, onSizeChange)}
                className={cn(
                  "px-3 py-1.5 text-sm rounded-md border transition-all",
                  selectedSizes.includes(size)
                    ? "bg-[#1A2B5E] text-white border-[#1A2B5E]"
                    : "bg-white text-gray-700 border-[#E5E7EB] hover:bg-[#EEF2FF] hover:border-[#1A2B5E]",
                )}
              >
                {size}
              </button>
            ))}
          </div>
          <Divider />
        </>
      )}

      {/* Color */}
      <SectionTitle>Color</SectionTitle>
      <div className="flex flex-wrap gap-2.5">
        {COLORS.map(({ name, hex }) => (
          <button
            key={name}
            onClick={() => toggle(selectedColors, name, onColorChange)}
            title={name}
            className={cn(
              "w-7 h-7 rounded-full transition-all hover:scale-110",
              name === 'White' ? "border border-gray-300" : "",
              selectedColors.includes(name) ? "ring-2 ring-offset-2 ring-[#D4A017]" : "",
            )}
            style={{ backgroundColor: hex }}
          />
        ))}
      </div>

      <Divider />

      {/* Price Range */}
      <SectionTitle>Price Range</SectionTitle>
      <PriceRangeSlider value={priceRange} onChange={onPriceRangeChange} min={priceMin} max={priceMax} />

      <Divider />

      {/* Brand */}
      <SectionTitle>Brand</SectionTitle>
      <div className="space-y-3">
        {BRANDS.map(brand => (
          <CheckRow
            key={brand}
            label={brand}
            count={productCounts.brands[brand] ?? 0}
            checked={selectedBrands.includes(brand)}
            onChange={() => toggle(selectedBrands, brand, onBrandChange)}
          />
        ))}
      </div>

      <Divider />

      {/* Rating */}
      <SectionTitle>Rating</SectionTitle>
      <div className="space-y-1.5">
        {RATINGS.map(r => (
          <button
            key={r}
            onClick={() => onRatingChange(minRating === r ? 0 : r)}
            className={cn(
              "w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-all",
              minRating === r
                ? "bg-[#1A2B5E] text-white"
                : "text-gray-700 hover:bg-gray-50",
            )}
          >
            <span className="text-amber-400 text-[13px] tracking-wider">
              {'★'.repeat(r)}{'☆'.repeat(5 - r)}
            </span>
            <span className="text-xs opacity-75">
              {r === 5 ? '5 stars' : `${r}+ stars`}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
