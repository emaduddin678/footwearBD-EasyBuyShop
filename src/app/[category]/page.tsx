import CategoryProductListingPage from '@/components/pages/CategoryProductListingPage'
import { fetchProductsByCategory, normalizePlpProduct } from "@/lib/api/products"
import type { PlpProduct } from "@/lib/data/products"

const VALID_CATEGORIES = ['men', 'women', 'kids', 'newborn', 'sale', 'new-arrivals']

export function generateStaticParams() {
  return VALID_CATEGORIES.map(category => ({ category }))
}

export default async function Page({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params

  let initialProducts: PlpProduct[] = []
  try {
    const raw = await fetchProductsByCategory(category, 50)
    initialProducts = raw.map((p, i) => normalizePlpProduct(p, i))
  } catch {
    // backend unavailable — PLP shows empty state
  }

  return <CategoryProductListingPage category={category} initialProducts={initialProducts} />
}
