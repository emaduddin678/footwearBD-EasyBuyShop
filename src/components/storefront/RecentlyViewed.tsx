function SkeletonCard() {
  return (
    <div className="flex-shrink-0 w-[280px] bg-white rounded-[14px] overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.05)] opacity-60">
      <div className="relative bg-[#f0f1f5] h-60 flex items-center justify-center">
        <img
          src="https://placehold.co/280x240/e8eaf0/c0c4d0?text=Shoe"
          alt="placeholder"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 pb-[18px]">
        <div className="h-3 bg-[#f0f1f5] rounded-full mb-2.5" />
        <div className="h-[18px] bg-[#f0f1f5] rounded-full mb-3 w-[70%]" />
        <div className="h-6 bg-[#f0f1f5] rounded-full w-[45%] mb-4" />
        <div className="h-10 bg-[#f0f1f5] rounded-lg" />
      </div>
    </div>
  )
}

export function RecentlyViewed() {
  return (
    <section className="bg-[#f4f5f9] py-[72px]">
      <div className="max-w-[1440px] mx-auto px-16">
        <div className="flex items-end justify-between mb-9">
          <div>
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-3.5 py-1 mb-2.5">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-[1.2px]">
                History
              </span>
            </div>
            <h2 className="text-[36px] font-extrabold text-brand-navy m-0 mb-1.5 tracking-[-0.8px]">
              Recently Viewed
            </h2>
            <p className="text-sm text-gray-400 m-0 font-medium">
              Your recently viewed items appear here
            </p>
          </div>
        </div>

        <div className="flex gap-[22px] overflow-x-auto pb-3 [scrollbar-width:thin] [scrollbar-color:#1A2B5E_#e5e7eb]">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    </section>
  )
}
