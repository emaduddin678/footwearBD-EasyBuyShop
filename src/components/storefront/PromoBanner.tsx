import Link from "next/link"

export function PromoBanner() {
  return (
    <section className="bg-[#f4f5f9] pb-20">
      <div className="max-w-[1440px] mx-auto px-16">
        <div className="grid grid-cols-2 gap-6">
          {/* Men's Collection */}
          <Link
            href="/men"
            className="relative rounded-[18px] overflow-hidden block transition-all duration-300 hover:scale-[1.015] hover:shadow-[0_20px_50px_rgba(26,43,94,0.28)]"
          >
            <img
              src="https://placehold.co/680x340/1A2B5E/243472?text=Men's+Collection"
              alt="Men's Collection"
              className="w-full h-[340px] object-cover opacity-65"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,16,40,0.9)] via-[rgba(26,43,94,0.3)] to-transparent p-10 flex flex-col justify-end">
              <div className="text-[11px] font-bold text-brand-gold uppercase tracking-[1.8px] mb-3">
                Men's Collection
              </div>
              <h3 className="text-[34px] font-extrabold text-white m-0 mb-5 tracking-[-0.5px] leading-[1.15]">
                Classic Meets<br />Contemporary
              </h3>
              <div className="inline-flex items-center gap-2 bg-brand-gold text-white px-6 py-[11px] rounded-lg text-sm font-bold self-start">
                Shop Men →
              </div>
            </div>
          </Link>

          {/* Women's Sale */}
          <Link
            href="/sale"
            className="relative rounded-[18px] overflow-hidden block transition-all duration-300 hover:scale-[1.015] hover:shadow-[0_20px_50px_rgba(109,40,217,0.28)]"
          >
            <img
              src="https://placehold.co/680x340/6d28d9/7c3aed?text=Women's+Sale"
              alt="Women's Sale"
              className="w-full h-[340px] object-cover opacity-55"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(45,27,105,0.92)] via-[rgba(109,40,217,0.3)] to-transparent p-10 flex flex-col justify-end">
              <div className="inline-flex items-center gap-1.5 bg-red-500 rounded-[5px] px-3 py-1 self-start mb-3">
                <span className="text-[11px] font-bold text-white uppercase tracking-[1px]">
                  Sale Live
                </span>
              </div>
              <h3 className="text-[34px] font-extrabold text-white m-0 mb-2 tracking-[-0.5px] leading-[1.15]">
                Women's Sale
              </h3>
              <p className="text-[15px] text-white/70 m-0 mb-5 font-medium">
                Up to 40% off — Limited time only
              </p>
              <div className="inline-flex items-center gap-2 bg-white text-[#2d1b69] px-6 py-[11px] rounded-lg text-sm font-bold self-start">
                Shop Women →
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
