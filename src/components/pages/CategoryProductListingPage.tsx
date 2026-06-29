"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { cn } from "@/lib/utils"
import { AnnouncementBar } from "@/components/storefront/AnnouncementBar"
import { Header } from "@/components/storefront/Header"
import { Footer } from "@/components/storefront/Footer"
import { WhatsAppFloat } from "@/components/storefront/WhatsAppFloat"
import { ProductCard } from "@/components/storefront/ProductCard"
import { FilterSidebar, type FilterSidebarProps } from "@/components/storefront/plp/FilterSidebar"
import { SortBar } from "@/components/storefront/plp/SortBar"
import { ActiveFilterTags } from "@/components/storefront/plp/ActiveFilterTags"
import { Pagination } from "@/components/storefront/plp/Pagination"
import { QuickViewModal } from "@/components/storefront/plp/QuickViewModal"
import type { PlpProduct } from "@/lib/data/products"

const ITEMS_PER_PAGE = 12

const PAGE_META: Record<string, { title: string; crumb: string }> = {
  men: { title: "Men's Collection", crumb: "Men" },
  women: { title: "Women's Collection", crumb: "Women" },
  kids: { title: "Kids' Collection", crumb: "Kids" },
  newborn: { title: "Newborn Collection", crumb: "Newborn" },
  sale: { title: "Sale — Up to 40% Off", crumb: "Sale" },
  'new-arrivals': { title: "New Arrivals", crumb: "New Arrivals" },
}

export default function CategoryProductListingPage({
  category,
  initialProducts,
}: {
  category: string
  initialProducts: PlpProduct[]
}) {
  if (!PAGE_META[category]) notFound()

  const meta = PAGE_META[category]

  // Base product pool — server-fetched and passed in as a prop
  const baseProducts = initialProducts

  // Derived filter options from base pool
  const availableCategories = useMemo(() =>
    Array.from(new Set(baseProducts.map(p => p.category))).sort()
  , [baseProducts])

  const availableSizes = useMemo(() =>
    Array.from(new Set(baseProducts.flatMap(p => p.sizes))).sort((a, b) => a - b)
  , [baseProducts])

  const priceMin = useMemo(() =>
    baseProducts.length ? Math.floor(Math.min(...baseProducts.map(p => p.priceNum)) / 100) * 100 : 0
  , [baseProducts])

  const priceMax = useMemo(() =>
    baseProducts.length ? Math.ceil(Math.max(...baseProducts.map(p => p.priceNum)) / 100) * 100 : 10000
  , [baseProducts])

  // Filter state
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<number[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([priceMin, priceMax])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [minRating, setMinRating] = useState(0)
  const [sortBy, setSortBy] = useState('popular')
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState<PlpProduct | null>(null)

  // Body scroll lock when drawer open
  useMemo(() => {
    if (typeof window !== 'undefined') {
      document.body.style.overflow = drawerOpen ? 'hidden' : ''
    }
  }, [drawerOpen])

  const filteredProducts = useMemo(() => {
    return baseProducts
      .filter(p => selectedCategories.length === 0 || selectedCategories.includes(p.category))
      .filter(p => selectedSizes.length === 0 || p.sizes.some(s => selectedSizes.includes(s)))
      .filter(p => selectedColors.length === 0 || selectedColors.includes(p.color))
      .filter(p => p.priceNum >= priceRange[0] && p.priceNum <= priceRange[1])
      .filter(p => selectedBrands.length === 0 || selectedBrands.includes(p.brand))
      .filter(p => p.rating >= minRating)
  }, [baseProducts, selectedCategories, selectedSizes, selectedColors, priceRange, selectedBrands, minRating])

  const sortedProducts = useMemo(() => {
    const copy = [...filteredProducts]
    if (sortBy === 'price-asc') return copy.sort((a, b) => a.priceNum - b.priceNum)
    if (sortBy === 'price-desc') return copy.sort((a, b) => b.priceNum - a.priceNum)
    if (sortBy === 'newest') return copy.sort((a, b) => b.id - a.id)
    if (sortBy === 'rating') return copy.sort((a, b) => b.rating - a.rating)
    return copy.sort((a, b) => b.sales - a.sales)
  }, [filteredProducts, sortBy])

  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE)
  const safePage = Math.min(currentPage, totalPages || 1)
  const paginatedProducts = sortedProducts.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE,
  )

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedSizes.length > 0 ||
    selectedColors.length > 0 ||
    priceRange[0] !== priceMin ||
    priceRange[1] !== priceMax ||
    selectedBrands.length > 0 ||
    minRating > 0

  const clearAll = () => {
    setSelectedCategories([])
    setSelectedSizes([])
    setSelectedColors([])
    setPriceRange([priceMin, priceMax])
    setSelectedBrands([])
    setMinRating(0)
    setCurrentPage(1)
  }

  const handleFilterChange = (fn: () => void) => {
    fn()
    setCurrentPage(1)
  }

  const categoryCounts = useMemo(() => {
    const c: Record<string, number> = {}
    baseProducts.forEach(p => { c[p.category] = (c[p.category] ?? 0) + 1 })
    return c
  }, [baseProducts])

  const brandCounts = useMemo(() => {
    const c: Record<string, number> = {}
    baseProducts.forEach(p => { c[p.brand] = (c[p.brand] ?? 0) + 1 })
    return c
  }, [baseProducts])

  const filterProps: FilterSidebarProps = {
    availableCategories,
    availableSizes,
    priceMin,
    priceMax,
    selectedCategories,
    onCategoryChange: cats => handleFilterChange(() => setSelectedCategories(cats)),
    selectedSizes,
    onSizeChange: sizes => handleFilterChange(() => setSelectedSizes(sizes)),
    selectedColors,
    onColorChange: colors => handleFilterChange(() => setSelectedColors(colors)),
    priceRange,
    onPriceRangeChange: range => handleFilterChange(() => setPriceRange(range)),
    selectedBrands,
    onBrandChange: brands => handleFilterChange(() => setSelectedBrands(brands)),
    minRating,
    onRatingChange: r => handleFilterChange(() => setMinRating(r)),
    onClearAll: clearAll,
    hasActiveFilters,
    productCounts: { categories: categoryCounts, brands: brandCounts },
  }

  return (
    <div className="min-h-screen font-sans bg-[#f4f5f9]">
      <AnnouncementBar />
      <Header />

      {/* Breadcrumb */}
      <div className="bg-[#F8F9FA] border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-6 py-3">
          <nav className="text-[13px] flex items-center gap-1.5">
            <Link href="/" className="text-[#1A2B5E] hover:underline">Home</Link>
            <span className="text-gray-400">›</span>
            <span className="text-gray-500">{meta.crumb}</span>
          </nav>
        </div>
      </div>

      {/* Page title */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-6 py-5 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#1A2B5E]">{meta.title}</h1>
          <p className="text-sm text-gray-500">
            Showing <span className="font-semibold text-gray-700">{paginatedProducts.length}</span> of{' '}
            <span className="font-semibold text-gray-700">{sortedProducts.length}</span> products
          </p>
        </div>
      </div>

      {/* Main layout */}
      <div className="max-w-[1440px] mx-auto px-6 py-6">
        <div className="flex gap-6 items-start">

          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-[280px] flex-shrink-0 sticky top-24">
            <FilterSidebar {...filterProps} />
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0">

            {/* Mobile filter button */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setDrawerOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-[#1A2B5E] text-white rounded-lg text-sm font-semibold"
              >
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
                Filters
                {hasActiveFilters && (
                  <span className="ml-1 bg-[#D4A017] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    •
                  </span>
                )}
              </button>
            </div>

            {/* Sort bar */}
            <SortBar
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              sortBy={sortBy}
              onSortChange={v => { setSortBy(v); setCurrentPage(1) }}
              totalCount={baseProducts.length}
              filteredCount={sortedProducts.length}
            />

            {/* Active filter tags */}
            {hasActiveFilters && (
              <ActiveFilterTags
                selectedCategories={selectedCategories}
                onRemoveCategory={cat => handleFilterChange(() => setSelectedCategories(prev => prev.filter(c => c !== cat)))}
                selectedSizes={selectedSizes}
                onRemoveSize={size => handleFilterChange(() => setSelectedSizes(prev => prev.filter(s => s !== size)))}
                selectedColors={selectedColors}
                onRemoveColor={color => handleFilterChange(() => setSelectedColors(prev => prev.filter(c => c !== color)))}
                priceRange={priceRange}
                defaultPriceRange={[priceMin, priceMax]}
                onPriceReset={() => handleFilterChange(() => setPriceRange([priceMin, priceMax]))}
                selectedBrands={selectedBrands}
                onRemoveBrand={brand => handleFilterChange(() => setSelectedBrands(prev => prev.filter(b => b !== brand)))}
                minRating={minRating}
                onRatingReset={() => handleFilterChange(() => setMinRating(0))}
                onClearAll={clearAll}
              />
            )}

            {/* Product grid / empty state */}
            {paginatedProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-xl border border-gray-200 mt-4">
                <svg width="64" height="64" fill="none" viewBox="0 0 24 24" className="text-gray-300 mb-4">
                  <path d="M7 22H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M12 11c-2.21 0-4 1.79-4 4v3h8v-3c0-2.21-1.79-4-4-4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="7" r="2" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                <h3 className="text-xl font-bold text-gray-700 mb-2">No products found</h3>
                <p className="text-gray-500 mb-6 text-sm">Try adjusting or clearing your filters to see more results</p>
                <button
                  onClick={clearAll}
                  className="px-6 py-3 bg-[#1A2B5E] text-white rounded-lg font-semibold hover:bg-[#D4A017] transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className={cn(
                "mt-4",
                viewMode === 'grid'
                  ? "grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                  : "grid grid-cols-1 sm:grid-cols-2 gap-4",
              )}>
                {paginatedProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={(p) => setQuickViewProduct(p as PlpProduct)}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && paginatedProducts.length > 0 && (
              <Pagination
                currentPage={safePage}
                totalPages={totalPages}
                onPageChange={page => {
                  setCurrentPage(page)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <div className={cn(
        "fixed inset-0 z-50 lg:hidden transition-all duration-300",
        drawerOpen ? "visible" : "invisible pointer-events-none",
      )}>
        <div
          className={cn(
            "absolute inset-0 bg-black/50 transition-opacity duration-300",
            drawerOpen ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setDrawerOpen(false)}
        />
        <div className={cn(
          "absolute left-0 top-0 h-full w-[300px] bg-[#f4f5f9] overflow-y-auto transition-transform duration-300 shadow-2xl flex flex-col",
          drawerOpen ? "translate-x-0" : "-translate-x-full",
        )}>
          <div className="flex items-center justify-between px-5 py-4 bg-white border-b border-gray-200 flex-shrink-0">
            <span className="font-bold text-[#1A2B5E] text-lg">Filters</span>
            <button
              onClick={() => setDrawerOpen(false)}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
              aria-label="Close filters"
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-4 flex-1">
            <FilterSidebar {...filterProps} />
          </div>
          <div className="p-4 bg-white border-t border-gray-200 flex-shrink-0">
            <button
              onClick={() => setDrawerOpen(false)}
              className="w-full py-3 bg-[#1A2B5E] text-white rounded-lg font-semibold hover:bg-[#D4A017] transition-colors"
            >
              Show {sortedProducts.length} Results
            </button>
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppFloat />

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  )
}
