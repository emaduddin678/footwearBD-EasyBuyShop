const items = [
  "Free Delivery above ৳2,000",
  "Eid Collection Live Now",
  "Up to 40% Off Selected Styles",
  "Easy 7-Day Returns",
  "bKash & Nagad Accepted",
]

function MarqueeContent() {
  return (
    <span className="inline-flex items-center gap-7 px-15 text-[13px] font-medium text-white/90 tracking-[0.2px]">
      {items.map((item, i) => (
        <span key={i} className="inline-flex items-center gap-7">
          <span>
            <span className="text-brand-gold mr-1.5">✦</span>
            {item}
          </span>
          {i < items.length - 1 && (
            <span className="text-white/25">|</span>
          )}
        </span>
      ))}
    </span>
  )
}

export function AnnouncementBar() {
  return (
    <div className="bg-brand-navy h-10 flex items-center overflow-hidden relative">
      <div className="flex whitespace-nowrap animate-marquee">
        <MarqueeContent />
        <MarqueeContent />
      </div>
    </div>
  )
}
