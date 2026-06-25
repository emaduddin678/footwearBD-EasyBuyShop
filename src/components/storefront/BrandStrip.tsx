import Link from "next/link"

const brands = ["Bata", "Hush Puppies", "North Star", "Bay", "Power", "Weinbrenner"]

export function BrandStrip() {
  return (
    <section className="bg-white py-14 border-t border-[#f1f3f5]">
      <div className="max-w-[1440px] mx-auto px-16">
        <div className="text-center mb-10">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-[2px]">
            Brands We Carry
          </div>
        </div>
        <div className="flex items-center justify-center gap-3.5 overflow-x-auto pb-1 scrollbar-none">
          {brands.map((brand) => (
            <Link
              key={brand}
              href={`/brands/${brand.toLowerCase().replace(/\s+/g, "-")}`}
              className="flex-shrink-0 flex items-center justify-center h-[62px] px-10 border-2 border-[#e5e7eb] rounded-full text-[17px] font-extrabold text-brand-navy whitespace-nowrap cursor-pointer transition-all duration-[0.22s] tracking-[0.2px] hover:border-brand-gold hover:text-brand-gold hover:shadow-[0_4px_20px_rgba(212,160,23,0.15)] hover:-translate-y-0.5"
            >
              {brand}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
