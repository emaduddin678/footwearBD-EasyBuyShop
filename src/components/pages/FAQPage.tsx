"use client"

import { useState } from "react"
import { SupportPageLayout } from "@/components/storefront/support/SupportPageLayout"
import {
  Search,
  Package,
  RefreshCw,
  CreditCard,
  ShoppingBag,
  User,
  ChevronDown,
  ChevronUp,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Mail,
  Phone,
} from "lucide-react"

const categories = ["All", "Orders & Delivery", "Returns", "Payment", "Products", "Account"]

const faqGroups = [
  {
    id: "orders",
    category: "Orders & Delivery",
    icon: Package,
    title: "Orders & Delivery",
    items: [
      {
        q: "How long does standard delivery take?",
        a: "Standard delivery takes 3-5 business days across Bangladesh. Express delivery (next business day) is available for Dhaka, Chattogram, and Sylhet for ৳250 additional charge.",
      },
      {
        q: "How can I track my order?",
        a: "Visit our Order Tracking page at footwearbd.com/track and enter your Order ID and phone number. You'll get real-time updates on your delivery status.",
      },
      {
        q: "Can I change my delivery address after ordering?",
        a: "Yes, but only within 1 hour of placing the order. Contact us immediately on WhatsApp at +880 1712-345678 with your Order ID and new address.",
      },
      {
        q: "What if I'm not home during delivery?",
        a: "Our delivery agent will call you before arriving. If you're unavailable, they'll attempt delivery again the next business day. After 3 failed attempts, the order returns to us.",
      },
      {
        q: "Do you deliver outside Dhaka?",
        a: "Yes! We deliver to all 64 districts of Bangladesh. Standard delivery applies nationwide. Remote areas may take 1-2 extra days.",
      },
    ],
  },
  {
    id: "returns",
    category: "Returns",
    icon: RefreshCw,
    title: "Returns & Exchanges",
    items: [
      {
        q: "What is your return policy?",
        a: "We offer free returns within 7 days of delivery. Items must be unworn, in original condition, with tags attached and original packaging intact.",
      },
      {
        q: "How do I initiate a return?",
        a: "Contact us on WhatsApp with your Order ID and reason for return. We'll arrange a free pickup from your address within 1-2 business days.",
      },
      {
        q: "How long does a refund take?",
        a: "Refunds are processed within 3-5 business days after we receive and inspect the returned item. Refund goes to your original payment method (bKash/Nagad/card).",
      },
      {
        q: "Can I exchange for a different size?",
        a: "Yes! Size exchanges are free within 7 days. Contact us on WhatsApp and we'll arrange pickup and delivery simultaneously.",
      },
    ],
  },
  {
    id: "payment",
    category: "Payment",
    icon: CreditCard,
    title: "Payment",
    items: [
      {
        q: "What payment methods do you accept?",
        a: "We accept bKash, Nagad, Rocket, VISA, MasterCard, and Cash on Delivery (COD). All digital payments are secured with 256-bit SSL encryption.",
      },
      {
        q: "Is Cash on Delivery available?",
        a: "Yes, COD is available across Bangladesh. COD orders may take 1-2 extra days to process. Please keep exact change ready.",
      },
      {
        q: "My payment failed but money was deducted?",
        a: "Don't worry — failed payment deductions are automatically reversed within 3-5 business days by your bank. Contact us on WhatsApp with transaction details if not resolved.",
      },
      {
        q: "Can I use a promo code?",
        a: "Yes! Enter your promo code in the cart before checkout. Current codes: EID20 (20% off), WELCOME10 (10% off for new customers).",
      },
    ],
  },
  {
    id: "products",
    category: "Products",
    icon: ShoppingBag,
    title: "Products",
    items: [
      {
        q: "How do I find the right size?",
        a: "Visit our Size Guide page for detailed measurements. We recommend measuring your foot length and comparing with our size chart.",
      },
      {
        q: "Are all products authentic?",
        a: "100% yes. We are an authorized retailer for all brands we carry including Bata, Hush Puppies, North Star, Bay, and Power. Every product comes with brand warranty.",
      },
      {
        q: "What if I receive a wrong or damaged product?",
        a: "Contact us immediately on WhatsApp with photos of the product. We'll send a replacement within 2-3 business days at no extra cost.",
      },
    ],
  },
  {
    id: "account",
    category: "Account",
    icon: User,
    title: "Account",
    items: [
      {
        q: "Do I need an account to order?",
        a: "No! You can checkout as a guest. However, creating an account lets you track orders, earn loyalty points, save addresses, and get exclusive member discounts.",
      },
      {
        q: "I forgot my password — how do I reset it?",
        a: "Click 'Forgot Password' on the login page and enter your phone number. You'll receive a 6-digit reset code via SMS.",
      },
    ],
  },
]

function FeedbackRow({ id }: { id: string }) {
  const [voted, setVoted] = useState<"up" | "down" | null>(null)

  if (voted) {
    return <p className="text-xs text-gray-400 mt-3">Thanks for your feedback!</p>
  }

  return (
    <div className="flex items-center gap-3 mt-3">
      <span className="text-xs text-gray-400">Was this helpful?</span>
      <button
        onClick={() => setVoted("up")}
        className="flex items-center gap-1 text-xs text-gray-400 hover:text-green-600 transition-colors"
      >
        <ThumbsUp size={13} /> Yes
      </button>
      <button
        onClick={() => setVoted("down")}
        className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition-colors"
      >
        <ThumbsDown size={13} /> No
      </button>
    </div>
  )
}

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({})

  function toggleItem(key: string) {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const filteredGroups = faqGroups
    .filter(
      (g) => activeCategory === "All" || g.category === activeCategory
    )
    .map((g) => ({
      ...g,
      items: g.items.filter(
        (item) =>
          !searchQuery ||
          item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.a.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((g) => g.items.length > 0)

  const totalResults = filteredGroups.reduce((sum, g) => sum + g.items.length, 0)

  return (
    <SupportPageLayout
      title="Frequently Asked Questions"
      description="Find answers to common questions about shopping at FootwearBD"
    >
      {/* Search bar */}
      <div className="bg-white rounded-xl shadow-lg p-4 mb-8">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search your question..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1A2B5E] transition-colors"
          />
        </div>
        {searchQuery && (
          <p className="text-xs text-gray-500 mt-2">{totalResults} result{totalResults !== 1 ? "s" : ""} found</p>
        )}
      </div>

      {/* Category filter tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat
                ? "bg-[#1A2B5E] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-[#1A2B5E] hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQ accordion groups */}
      {filteredGroups.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <Search size={40} className="mx-auto mb-3 opacity-40" />
          <p className="font-medium">No results found</p>
          <p className="text-sm mt-1">Try different keywords or browse all categories</p>
        </div>
      ) : (
        filteredGroups.map((group) => {
          const Icon = group.icon
          return (
            <div key={group.id} className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Icon size={20} className="text-[#1A2B5E]" />
                <h2 className="font-semibold text-[#1A2B5E] text-base">{group.title}</h2>
              </div>

              {group.items.map((item, idx) => {
                const key = `${group.id}-${idx}`
                const isOpen = openItems[key]
                return (
                  <div
                    key={key}
                    className={`bg-white rounded-xl border mb-2 transition-all ${
                      isOpen ? "border-[#1A2B5E] border-l-4" : "border-gray-200"
                    }`}
                  >
                    <button
                      onClick={() => toggleItem(key)}
                      className="w-full flex items-center justify-between py-4 px-5 text-left"
                    >
                      <span className="font-medium text-[#1A2B5E] text-sm pr-4">{item.q}</span>
                      {isOpen ? (
                        <ChevronUp size={18} className="text-[#D4A017] shrink-0" />
                      ) : (
                        <ChevronDown size={18} className="text-[#D4A017] shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="pb-4 px-5">
                        <p className="text-sm text-gray-600 leading-relaxed">{item.a}</p>
                        <FeedbackRow id={key} />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )
        })
      )}

      {/* Still have questions */}
      <div className="bg-[#1A2B5E] rounded-2xl p-8 text-center mt-10">
        <h2 className="text-white text-xl font-bold">Still have questions?</h2>
        <p className="text-white/70 text-sm mt-2">Our support team is available 24/7 to help you</p>

        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-white rounded-xl p-4 text-center">
            <MessageCircle size={24} className="text-green-600 mx-auto mb-2" />
            <p className="font-semibold text-[#1A2B5E] text-sm">WhatsApp</p>
            <p className="text-gray-500 text-xs mt-0.5">Chat with us</p>
            <p className="text-[#1A2B5E] text-xs font-medium mt-1">+880 1712-345678</p>
            <a
              href="https://wa.me/8801712345678"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block bg-green-500 text-white text-xs font-semibold py-2 px-3 rounded-lg hover:bg-green-600 transition-colors"
            >
              Start Chat
            </a>
          </div>

          <div className="bg-white rounded-xl p-4 text-center">
            <Mail size={24} className="text-[#1A2B5E] mx-auto mb-2" />
            <p className="font-semibold text-[#1A2B5E] text-sm">Email</p>
            <p className="text-gray-500 text-xs mt-0.5">Email us</p>
            <p className="text-[#1A2B5E] text-xs font-medium mt-1">hello@footwearbd.com</p>
            <a
              href="mailto:hello@footwearbd.com"
              className="mt-3 block border border-[#1A2B5E] text-[#1A2B5E] text-xs font-semibold py-2 px-3 rounded-lg hover:bg-[#1A2B5E] hover:text-white transition-colors"
            >
              Send Email
            </a>
          </div>

          <div className="bg-white rounded-xl p-4 text-center">
            <Phone size={24} className="text-[#1A2B5E] mx-auto mb-2" />
            <p className="font-semibold text-[#1A2B5E] text-sm">Call</p>
            <p className="text-gray-500 text-xs mt-0.5">Call us</p>
            <p className="text-[#1A2B5E] text-xs font-medium mt-1">+880 1712-345678</p>
            <a
              href="tel:+8801712345678"
              className="mt-3 block border border-[#1A2B5E] text-[#1A2B5E] text-xs font-semibold py-2 px-3 rounded-lg hover:bg-[#1A2B5E] hover:text-white transition-colors"
            >
              Call Now
            </a>
          </div>
        </div>
      </div>
    </SupportPageLayout>
  )
}
