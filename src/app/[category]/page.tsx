import CategoryProductListingPage from '@/components/pages/CategoryProductListingPage'

const VALID_CATEGORIES = ['men', 'women', 'kids', 'newborn', 'sale', 'new-arrivals']

export function generateStaticParams() {
  return VALID_CATEGORIES.map(category => ({ category }))
}

export default async function Page({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  return <CategoryProductListingPage category={category} />
}
