const items = [
  {
    icon: (
      <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="#D4A017" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    title: "Free Delivery",
    sub: "On orders above ৳2,000",
  },
  {
    icon: (
      <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="#D4A017" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 .49-3.18" />
      </svg>
    ),
    title: "Easy Returns",
    sub: "7-day hassle-free policy",
  },
  {
    icon: (
      <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="#D4A017" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Secure Payment",
    sub: "SSL encrypted checkout",
  },
  {
    icon: (
      <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="#D4A017" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    title: "24/7 Support",
    sub: "Always here to help you",
  },
]

export function TrustBar() {
  return (
    <section className="bg-brand-navy">
      <div className="max-w-[1440px] mx-auto px-16 grid grid-cols-4">
        {items.map((item, i) => (
          <div
            key={i}
            className={`flex items-center gap-[18px] py-9 px-9 ${i < items.length - 1 ? "border-r border-white/8" : ""}`}
          >
            <div className="w-[54px] h-[54px] bg-brand-gold/12 rounded-[14px] flex items-center justify-center flex-shrink-0">
              {item.icon}
            </div>
            <div>
              <div className="text-[15px] font-bold text-white mb-1">{item.title}</div>
              <div className="text-[13px] text-white/50 font-medium">{item.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
