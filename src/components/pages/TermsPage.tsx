"use client"

import { AnnouncementBar } from "@/components/storefront/AnnouncementBar"
import { Header } from "@/components/storefront/Header"
import { Footer } from "@/components/storefront/Footer"
import { WhatsAppFloat } from "@/components/storefront/WhatsAppFloat"
import { useEffect, useState } from "react"

const sections = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    content: [
      "By accessing or using FootwearBD (footwearbd.com), you agree to be bound by these Terms of Service.",
      "If you do not agree with any part of these terms, you may not use our website or services.",
      "We reserve the right to update these terms at any time. Continued use of the site constitutes acceptance of any changes.",
    ],
  },
  {
    id: "products",
    title: "Products and Pricing",
    content: [
      "All prices are listed in Bangladeshi Taka (BDT) and include applicable taxes.",
      "Prices are subject to change without prior notice. The price at the time of your order confirmation is final.",
      "We make every effort to display accurate product information, but we do not warrant that descriptions, images, or pricing are error-free.",
      "We reserve the right to cancel orders where pricing errors have occurred.",
    ],
  },
  {
    id: "orders",
    title: "Order Process",
    content: [
      "An order is confirmed once you receive an order confirmation SMS and email from us.",
      "Orders may be cancelled within 1 hour of placement. After that, cancellation may not be possible if the order is already being processed.",
      "For cancellations, contact us immediately on WhatsApp at +880 1712-345678 with your Order ID.",
      "We reserve the right to refuse or cancel any order at our discretion, with a full refund issued in such cases.",
    ],
  },
  {
    id: "payment",
    title: "Payment Terms",
    content: [
      "We accept bKash, Nagad, Rocket, VISA, MasterCard, and Cash on Delivery (COD).",
      "All digital payments are processed through secure, encrypted payment gateways.",
      "For failed payments where a deduction occurred, the amount is automatically reversed within 3-5 business days by your bank or mobile financial service.",
      "COD orders must be paid in full in cash upon delivery. We do not accept partial COD payments.",
    ],
  },
  {
    id: "delivery",
    title: "Delivery Terms",
    content: [
      "Standard delivery takes 3-5 business days across Bangladesh. Express delivery (next business day) is available for selected cities.",
      "Delivery timeframes are estimates and may vary due to circumstances beyond our control, including public holidays and adverse weather.",
      "Risk of loss or damage transfers to the customer upon delivery. Please inspect your order upon receipt.",
      "FootwearBD is not liable for delays caused by courier partners once the order has been dispatched.",
    ],
  },
  {
    id: "returns",
    title: "Returns Policy",
    content: [
      "Products may be returned within 7 days of delivery, provided they are unworn, unused, and in original packaging with all tags attached.",
      "Items marked as Final Sale, custom/personalised items, and hygiene-sensitive products (innersoles, socks) are not eligible for returns.",
      "Free returns are collected from your delivery address. Contact us on WhatsApp to initiate a return.",
      "Refunds are processed within 3-5 business days of receiving and inspecting the returned item.",
    ],
  },
  {
    id: "ip",
    title: "Intellectual Property",
    content: [
      "All content on this website — including text, images, logos, and design — is the property of FootwearBD or its licensors.",
      "You may not reproduce, distribute, or create derivative works without our express written permission.",
      "Product images and brand trademarks of third-party brands remain the property of their respective owners.",
    ],
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    content: [
      "FootwearBD shall not be liable for any indirect, incidental, or consequential damages arising from your use of our website or products.",
      "Our total liability in any matter shall not exceed the amount paid by you for the specific order giving rise to the claim.",
      "We do not warrant that the website will be uninterrupted, error-free, or free of viruses or other harmful components.",
    ],
  },
  {
    id: "law",
    title: "Governing Law",
    content: [
      "These Terms of Service shall be governed by and construed in accordance with the laws of Bangladesh.",
      "Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Dhaka, Bangladesh.",
      "Nothing in these terms affects your statutory rights as a consumer under Bangladeshi consumer protection law.",
    ],
  },
  {
    id: "contact",
    title: "Contact Us",
    content: [
      "Email: hello@footwearbd.com",
      "Phone: +880 1712-345678",
      "WhatsApp: wa.me/8801712345678",
      "For any questions about these Terms of Service, please contact our support team.",
    ],
  },
]

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState("acceptance")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: "-20% 0px -70% 0px" }
    )
    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  function scrollTo(id: string) {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="min-h-screen font-sans bg-[#f4f5f9]">
      <AnnouncementBar />
      <Header />

      {/* Hero */}
      <div className="bg-[#1A2B5E] py-10 text-center">
        <h1 className="text-3xl font-bold text-white">Terms of Service</h1>
        <p className="text-white/70 text-sm mt-2">Please read these terms carefully before using our services</p>
        <p className="text-white/50 text-xs mt-3">Last updated: June 26, 2026</p>
      </div>

      {/* Content + TOC */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex gap-8 items-start">
          {/* Sticky TOC sidebar */}
          <aside className="hidden lg:block w-56 shrink-0 sticky top-24">
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <p className="text-xs font-bold text-[#1A2B5E] uppercase tracking-wide mb-3">Contents</p>
              <nav className="flex flex-col gap-0.5">
                {sections.map(({ id, title }, i) => (
                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className={`text-left text-xs px-2.5 py-1.5 rounded-lg transition-colors leading-snug ${
                      activeSection === id
                        ? "bg-[#1A2B5E] text-white font-medium"
                        : "text-gray-500 hover:bg-gray-50 hover:text-[#1A2B5E]"
                    }`}
                  >
                    <span className="text-[#D4A017] font-semibold mr-1">{i + 1}.</span>
                    {title}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <p className="text-sm text-gray-600 leading-relaxed mb-8">
                Welcome to FootwearBD. By accessing our website and placing orders, you agree to the following terms and
                conditions. These terms apply to all users of the site, including browsers, vendors, customers, and
                content contributors.
              </p>

              {sections.map(({ id, title, content }, i) => (
                <div key={id} id={id} className="scroll-mt-28">
                  {i > 0 && <hr className="border-t border-gray-100 my-6" />}
                  <h2 className="text-base font-semibold text-[#1A2B5E] mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#1A2B5E] text-[#D4A017] text-xs flex items-center justify-center font-bold shrink-0">
                      {i + 1}
                    </span>
                    {title}
                  </h2>
                  <ul className="space-y-2 pl-8">
                    {content.map((para, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-gray-600 leading-relaxed">
                        <span className="text-[#D4A017] mt-0.5 shrink-0">•</span>
                        {para}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
