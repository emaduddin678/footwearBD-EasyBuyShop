"use client"

interface ActiveFilterTagsProps {
  selectedCategories: string[]
  onRemoveCategory: (cat: string) => void
  selectedSizes: number[]
  onRemoveSize: (size: number) => void
  selectedColors: string[]
  onRemoveColor: (color: string) => void
  priceRange: [number, number]
  defaultPriceRange: [number, number]
  onPriceReset: () => void
  selectedBrands: string[]
  onRemoveBrand: (brand: string) => void
  minRating: number
  onRatingReset: () => void
  onClearAll: () => void
}

function Pill({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#1A2B5E] text-[#1A2B5E] text-sm font-medium">
      {label}
      <button
        onClick={onRemove}
        className="ml-0.5 text-[#1A2B5E] hover:text-red-500 transition-colors leading-none font-bold text-base"
        aria-label={`Remove ${label} filter`}
      >
        ×
      </button>
    </span>
  )
}

export function ActiveFilterTags({
  selectedCategories, onRemoveCategory,
  selectedSizes, onRemoveSize,
  selectedColors, onRemoveColor,
  priceRange, defaultPriceRange, onPriceReset,
  selectedBrands, onRemoveBrand,
  minRating, onRatingReset,
  onClearAll,
}: ActiveFilterTagsProps) {
  const priceChanged =
    priceRange[0] !== defaultPriceRange[0] || priceRange[1] !== defaultPriceRange[1]

  return (
    <div className="flex flex-wrap items-center gap-2 py-2">
      {selectedCategories.map(cat => (
        <Pill
          key={cat}
          label={cat.charAt(0).toUpperCase() + cat.slice(1)}
          onRemove={() => onRemoveCategory(cat)}
        />
      ))}
      {selectedSizes.map(size => (
        <Pill key={size} label={`Size: ${size}`} onRemove={() => onRemoveSize(size)} />
      ))}
      {selectedColors.map(color => (
        <Pill key={color} label={color} onRemove={() => onRemoveColor(color)} />
      ))}
      {priceChanged && (
        <Pill
          label={`৳${priceRange[0].toLocaleString()} – ৳${priceRange[1].toLocaleString()}`}
          onRemove={onPriceReset}
        />
      )}
      {selectedBrands.map(brand => (
        <Pill key={brand} label={brand} onRemove={() => onRemoveBrand(brand)} />
      ))}
      {minRating > 0 && (
        <Pill label={`${minRating}+ Stars`} onRemove={onRatingReset} />
      )}
      <button
        onClick={onClearAll}
        className="text-sm text-[#D4A017] underline hover:no-underline font-medium ml-1"
      >
        Clear All Filters
      </button>
    </div>
  )
}
