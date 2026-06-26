"use client"

import { useState } from "react"
import Link from "next/link"
import { AnnouncementBar } from "@/components/storefront/AnnouncementBar"
import { Header } from "@/components/storefront/Header"
import { Footer } from "@/components/storefront/Footer"
import { WhatsAppFloat } from "@/components/storefront/WhatsAppFloat"

const CATEGORIES = ["All", "Style Guide", "Care Tips", "Brand News", "Trends", "BD Fashion"]

const posts = [
  {
    id: 1,
    category: "Care Tips",
    title: "5 Ways to Keep Your Leather Shoes Looking New",
    excerpt: "Proper care can extend the life of your leather shoes by years. Here's what you need to know...",
    author: "FootwearBD Team",
    date: "June 15, 2026",
    readTime: "3 min read",
    imgBg: "f5f5f5",
    imgFg: "1A2B5E",
    imgText: "Blog+1",
  },
  {
    id: 2,
    category: "Brand News",
    title: "Bata Launches New Comfort+ Collection in Bangladesh",
    excerpt: "Bata's latest innovation brings next-level cushioning technology to everyday footwear...",
    author: "FootwearBD Team",
    date: "June 10, 2026",
    readTime: "4 min read",
    imgBg: "e8eaf6",
    imgFg: "1A2B5E",
    imgText: "Blog+2",
  },
  {
    id: 3,
    category: "Style Guide",
    title: "The Ultimate Guide to Men's Formal Shoes in Bangladesh",
    excerpt: "From Derby to Oxford — understanding formal shoe styles for the modern Bangladeshi professional...",
    author: "FootwearBD Team",
    date: "June 5, 2026",
    readTime: "6 min read",
    imgBg: "dcfce7",
    imgFg: "166534",
    imgText: "Blog+3",
  },
  {
    id: 4,
    category: "BD Fashion",
    title: "Eid Fashion 2026: Top Footwear Trends",
    excerpt: "This Eid season, comfort meets elegance with these must-have footwear styles...",
    author: "FootwearBD Team",
    date: "May 28, 2026",
    readTime: "5 min read",
    imgBg: "fdf2f8",
    imgFg: "86198f",
    imgText: "Blog+4",
  },
  {
    id: 5,
    category: "Care Tips",
    title: "How to Clean Sneakers Without Damaging Them",
    excerpt: "Keep your white sneakers spotless with these simple cleaning techniques...",
    author: "FootwearBD Team",
    date: "May 20, 2026",
    readTime: "3 min read",
    imgBg: "eff6ff",
    imgFg: "1d4ed8",
    imgText: "Blog+5",
  },
  {
    id: 6,
    category: "Trends",
    title: "Sustainable Footwear: What Bangladesh Brands Are Doing",
    excerpt: "A look at how local and international brands are embracing sustainability...",
    author: "FootwearBD Team",
    date: "May 15, 2026",
    readTime: "4 min read",
    imgBg: "fdf4ff",
    imgFg: "7c3aed",
    imgText: "Blog+6",
  },
]

const categoryColors: Record<string, string> = {
  "Care Tips": "bg-amber-100 text-amber-700",
  "Brand News": "bg-blue-100 text-blue-700",
  "Style Guide": "bg-green-100 text-green-700",
  "BD Fashion": "bg-purple-100 text-purple-700",
  Trends: "bg-red-100 text-red-700",
}

export default function BlogPage() {
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)
  const [page, setPage] = useState(1)

  const filtered = posts.filter((p) => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory
    const matchesSearch =
      search.trim() === "" ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail("")
    }
  }

  return (
    <div className="min-h-screen font-sans bg-[#f4f5f9]">
      <AnnouncementBar />
      <Header />

      {/* Hero */}
      <div className="bg-brand-navy py-12 text-center">
        <h1 className="text-3xl font-bold text-white">FootwearBD Blog</h1>
        <p className="text-white/70 text-sm mt-2">Style guides, care tips, and footwear news</p>
      </div>

      {/* Search + Categories */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="max-w-lg mx-auto">
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            placeholder="Search articles..."
            className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-brand-navy transition-colors"
          />
        </div>
        <div className="flex flex-wrap gap-2 justify-center mt-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setPage(1) }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-brand-navy text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-brand-navy"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        <div className="mt-6 bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <img
              src="https://placehold.co/600x350/1A2B5E/D4A017?text=Featured+Post"
              alt="Featured post"
              className="w-full h-64 md:h-full object-cover"
            />
            <div className="p-8 flex flex-col justify-center">
              <span className="inline-block bg-brand-gold text-brand-navy text-xs font-bold px-3 py-1 rounded-full w-fit">
                FEATURED
              </span>
              <p className="text-brand-gold text-xs font-semibold mt-3 uppercase tracking-wide">
                Style Guide
              </p>
              <h2 className="text-brand-navy font-bold text-xl mt-2 leading-snug">
                How to Choose the Perfect Shoe for Every Occasion
              </h2>
              <p className="text-gray-500 text-sm mt-3 line-clamp-3 leading-relaxed">
                Whether you&apos;re heading to the office, a wedding, or a casual outing — the right shoe
                makes all the difference. Here&apos;s our complete guide...
              </p>
              <p className="text-xs text-gray-400 mt-4">By FootwearBD Team · June 20, 2026</p>
              <Link
                href="/blog/perfect-shoe-guide"
                className="mt-4 self-start border border-brand-navy text-brand-navy text-sm font-semibold px-5 py-2 rounded-lg hover:bg-brand-navy hover:text-white transition-colors"
              >
                Read More →
              </Link>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="mt-10">
          <h2 className="font-bold text-xl text-brand-navy mb-6">Latest Articles</h2>

          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 text-sm">No articles found. Try a different search or category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filtered.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md hover:border-gray-200 transition-all duration-200"
                >
                  <img
                    src={`https://placehold.co/400x220/${post.imgBg}/${post.imgFg}?text=${post.imgText}`}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-5">
                    <span
                      className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${
                        categoryColors[post.category] ?? "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {post.category}
                    </span>
                    <h3 className="font-bold text-brand-navy text-sm mt-3 leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-gray-500 text-xs mt-2 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-xs text-gray-400">{post.author}</span>
                      <span className="text-gray-300">·</span>
                      <span className="text-xs text-gray-400">{post.date}</span>
                      <span className="text-gray-300">·</span>
                      <span className="text-xs text-gray-400">{post.readTime}</span>
                    </div>
                    <Link
                      href={`/blog/${post.id}`}
                      className="mt-3 inline-block text-brand-gold text-xs font-semibold hover:text-amber-600 transition-colors"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-2 rounded-lg border border-gray-200 text-gray-600 text-sm disabled:opacity-40 hover:border-brand-navy hover:text-brand-navy transition-colors"
          >
            ←
          </button>
          {[1, 2, 3].map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                page === n
                  ? "bg-brand-navy text-white"
                  : "border border-gray-200 text-gray-600 hover:border-brand-navy hover:text-brand-navy"
              }`}
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(3, p + 1))}
            disabled={page === 3}
            className="px-3 py-2 rounded-lg border border-gray-200 text-gray-600 text-sm disabled:opacity-40 hover:border-brand-navy hover:text-brand-navy transition-colors"
          >
            →
          </button>
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-brand-navy py-10 text-center mt-10">
        <h2 className="text-xl font-bold text-white">Never Miss a Style Update</h2>
        <p className="text-white/70 text-sm mt-2">
          Join 10,000+ subscribers getting weekly footwear tips and exclusive deals
        </p>
        {subscribed ? (
          <p className="text-brand-gold font-semibold mt-6">
            You&apos;re subscribed! Check your inbox for a welcome email.
          </p>
        ) : (
          <form onSubmit={handleSubscribe} className="mt-6 flex gap-2 max-w-sm mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-1 px-4 py-2.5 rounded-lg text-sm outline-none bg-white text-gray-900"
            />
            <button
              type="submit"
              className="bg-brand-gold text-brand-navy font-bold px-5 py-2.5 rounded-lg text-sm hover:bg-amber-500 transition-colors"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>

      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
