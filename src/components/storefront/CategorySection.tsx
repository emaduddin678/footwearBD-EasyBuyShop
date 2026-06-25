import Link from "next/link"

const categories = [
  {
    label: "Men",
    count: "240+ Styles",
    href: "/men",
    imgBg: "1A2B5E",
    imgFg: "ffffff",
    bg: "bg-[#f5f7ff]",
    hoverBorder: "hover:border-brand-navy hover:bg-[#eef1ff]",
    shadow: "hover:shadow-[0_10px_30px_rgba(26,43,94,0.12)]",
    imgShadow: "shadow-[0_4px_18px_rgba(26,43,94,0.18)]",
  },
  {
    label: "Women",
    count: "310+ Styles",
    href: "/women",
    imgBg: "db2777",
    imgFg: "ffffff",
    bg: "bg-[#fff4f8]",
    hoverBorder: "hover:border-pink-600 hover:bg-[#ffe8f3]",
    shadow: "hover:shadow-[0_10px_30px_rgba(219,39,119,0.12)]",
    imgShadow: "shadow-[0_4px_18px_rgba(219,39,119,0.2)]",
  },
  {
    label: "Kids",
    count: "150+ Styles",
    href: "/kids",
    imgBg: "16a34a",
    imgFg: "ffffff",
    bg: "bg-[#f0fdf4]",
    hoverBorder: "hover:border-green-600 hover:bg-[#dcfce7]",
    shadow: "hover:shadow-[0_10px_30px_rgba(22,163,74,0.12)]",
    imgShadow: "shadow-[0_4px_18px_rgba(22,163,74,0.2)]",
  },
  {
    label: "Newborn",
    count: "80+ Styles",
    href: "/newborn",
    imgBg: "D4A017",
    imgFg: "ffffff",
    bg: "bg-[#fffbeb]",
    hoverBorder: "hover:border-brand-gold hover:bg-[#fef3c7]",
    shadow: "hover:shadow-[0_10px_30px_rgba(212,160,23,0.15)]",
    imgShadow: "shadow-[0_4px_18px_rgba(212,160,23,0.25)]",
  },
]

export function CategorySection() {
  return (
    <section className="bg-white py-[72px]">
      <div className="max-w-[1440px] mx-auto px-16">
        {/* Header */}
        <div className="flex items-end justify-between mb-11">
          <div>
            <div className="text-xs font-bold text-brand-gold uppercase tracking-[1.5px] mb-2">
              Collections
            </div>
            <h2 className="text-[36px] font-extrabold text-brand-navy m-0 tracking-[-0.8px]">
              Shop by Category
            </h2>
          </div>
          <Link
            href="/categories"
            className="text-sm font-semibold text-brand-gold flex items-center gap-1.5 pb-0.5 border-b-[1.5px] border-brand-gold hover:opacity-70 transition-opacity"
          >
            View All →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              className={`flex flex-col items-center gap-[18px] py-9 px-5 pb-8 rounded-[18px] border-2 border-transparent transition-all duration-300 hover:-translate-y-[5px] ${cat.bg} ${cat.hoverBorder} ${cat.shadow}`}
            >
              <div className={`w-[124px] h-[124px] rounded-full overflow-hidden border-4 border-white ${cat.imgShadow}`}>
                <img
                  src={`https://placehold.co/124x124/${cat.imgBg}/${cat.imgFg}?text=${cat.label}`}
                  alt={cat.label}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center">
                <div className="text-[19px] font-extrabold text-brand-navy mb-1">{cat.label}</div>
                <div className="text-[13px] text-gray-500 font-medium">{cat.count}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
