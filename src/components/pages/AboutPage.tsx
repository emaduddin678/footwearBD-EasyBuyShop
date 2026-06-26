import { AnnouncementBar } from "@/components/storefront/AnnouncementBar"
import { Header } from "@/components/storefront/Header"
import { Footer } from "@/components/storefront/Footer"
import { WhatsAppFloat } from "@/components/storefront/WhatsAppFloat"
import { ShieldCheck, Smile, Leaf, Users } from "lucide-react"

const stats = [
  { value: "50,000+", label: "Happy Customers" },
  { value: "64", label: "Districts Served" },
  { value: "5+", label: "Years" },
  { value: "100%", label: "Authentic" },
]

const values = [
  {
    icon: ShieldCheck,
    title: "Authenticity Guaranteed",
    desc: "Every product we sell is sourced directly from authorised brand distributors. We carry zero replicas — your trust is our foundation.",
  },
  {
    icon: Smile,
    title: "Customer First",
    desc: "From free returns to 24/7 WhatsApp support, every decision we make starts with your satisfaction in mind.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    desc: "We partner with brands that are committed to responsible manufacturing and reducing environmental impact across their supply chains.",
  },
  {
    icon: Users,
    title: "Community",
    desc: "FootwearBD was built for Bangladesh — our pricing, payment options, and delivery network are designed around the lives of everyday Bangladeshis.",
  },
]

const brands = ["Bata", "Hush Puppies", "North Star", "Bay", "Power", "Apex"]

const team = [
  { name: "Karim Hossain", role: "Founder & CEO", initials: "KH" },
  { name: "Nusrat Jahan", role: "Head of Operations", initials: "NJ" },
  { name: "Rafiqul Islam", role: "Head of Technology", initials: "RI" },
  { name: "Tahmina Begum", role: "Customer Experience Lead", initials: "TB" },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen font-sans bg-[#f4f5f9]">
      <AnnouncementBar />
      <Header />

      {/* Hero */}
      <div className="bg-[#1A2B5E] py-16 text-center">
        <h1 className="text-3xl font-bold text-white">Bangladesh&apos;s Premier Footwear Destination</h1>
        <p className="text-white/70 text-sm mt-2 max-w-lg mx-auto">
          Bringing quality footwear to every corner of Bangladesh since 2020
        </p>
      </div>

      {/* Stats bar */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-4 text-center gap-4">
            {stats.map(({ value, label }) => (
              <div key={label}>
                <p className="text-3xl font-extrabold text-[#1A2B5E]">{value}</p>
                <p className="text-sm text-gray-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our story */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-bold text-[#1A2B5E] mb-5">Our Story</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              FootwearBD was founded in 2020 with a simple mission: to make quality footwear accessible to every
              Bangladeshi, no matter where they live. What started as a small online store in Dhaka has grown into
              the country&apos;s most trusted footwear destination, serving over 50,000 happy customers across all 64
              districts.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              We partner with Bangladesh&apos;s most beloved brands — Bata, Hush Puppies, North Star, Bay, and more —
              as an authorised retailer. Every pair of shoes on our platform is 100% authentic, backed by the brand&apos;s
              official warranty. We take counterfeits seriously: our zero-tolerance policy has earned us the trust
              of both customers and brand partners alike.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Our growing team of 50+ people works tirelessly to ensure every order arrives on time, every return
              is handled with care, and every customer interaction leaves a smile. We&apos;re not just selling shoes —
              we&apos;re building a footwear community that Bangladesh can be proud of.
            </p>
          </div>
          <div>
            <img
              src="https://placehold.co/500x350/f5f5f5/1A2B5E?text=%F0%9F%91%9F+Our+Story"
              alt="FootwearBD story"
              className="rounded-2xl w-full object-cover shadow-md"
            />
          </div>
        </div>
      </div>

      {/* Our values */}
      <div className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-[#1A2B5E] text-center mb-8">What We Stand For</h2>
          <div className="grid grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-xl p-6 text-center shadow-sm">
                <div className="w-14 h-14 rounded-full bg-[#1A2B5E] flex items-center justify-center mx-auto mb-4">
                  <Icon size={24} className="text-[#D4A017]" />
                </div>
                <h3 className="font-semibold text-[#1A2B5E] text-sm mb-2">{title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Brand partners */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-[#1A2B5E] text-center mb-8">Our Brand Partners</h2>
        <div className="grid grid-cols-6 gap-4">
          {brands.map((brand) => (
            <div key={brand} className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:shadow-md transition-shadow">
              <img
                src={`https://placehold.co/100x50/f5f5f5/1A2B5E?text=${encodeURIComponent(brand)}`}
                alt={brand}
                className="mx-auto mb-2"
              />
              <p className="text-xs font-medium text-gray-600">{brand}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="bg-[#1A2B5E] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Meet the Team</h2>
          <div className="grid grid-cols-4 gap-6">
            {team.map(({ name, role, initials }) => (
              <div key={name} className="bg-white/10 rounded-xl p-5 text-center">
                <div className="w-16 h-16 rounded-full bg-[#D4A017] flex items-center justify-center mx-auto mb-3">
                  <span className="text-[#1A2B5E] font-bold text-lg">{initials}</span>
                </div>
                <p className="text-white font-semibold text-sm">{name}</p>
                <p className="text-white/60 text-xs mt-0.5">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-6 py-12 text-center">
        <h2 className="text-2xl font-bold text-[#1A2B5E] mb-3">Ready to Find Your Perfect Pair?</h2>
        <p className="text-sm text-gray-500 mb-6">Browse our collection of 1,000+ authentic footwear styles</p>
        <div className="flex items-center justify-center gap-4">
          <a
            href="/men"
            className="bg-[#1A2B5E] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#0d1733] transition-colors text-sm"
          >
            Shop Men&apos;s
          </a>
          <a
            href="/women"
            className="bg-[#D4A017] text-[#1A2B5E] font-semibold px-6 py-3 rounded-xl hover:bg-[#b8881a] transition-colors text-sm"
          >
            Shop Women&apos;s
          </a>
        </div>
      </div>

      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
