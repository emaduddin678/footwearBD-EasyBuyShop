import { AnnouncementBar } from "@/components/storefront/AnnouncementBar"
import { Header } from "@/components/storefront/Header"
import { Footer } from "@/components/storefront/Footer"
import { WhatsAppFloat } from "@/components/storefront/WhatsAppFloat"

const sections = [
  {
    title: "Information We Collect",
    content: [
      "Name, phone, email, and delivery address when you create an account or place an order.",
      "Payment information — processed securely through our payment partners and never stored on our servers.",
      "Order history and browsing activity to improve your shopping experience.",
      "Device information and IP address for security and fraud prevention purposes.",
    ],
  },
  {
    title: "How We Use Your Information",
    content: [
      "Processing and delivering your orders accurately and on time.",
      "Sending order confirmations and delivery updates via SMS and WhatsApp.",
      "Improving our website, product range, and overall service quality.",
      "Sending promotional offers and newsletters — you can opt out at any time.",
    ],
  },
  {
    title: "Information Sharing",
    content: [
      "We share your name, address, and phone number with our delivery partners solely for the purpose of fulfilling your order.",
      "Payment information is shared with our payment processors in encrypted form.",
      "We never sell, rent, or trade your personal data to third parties for marketing purposes.",
    ],
  },
  {
    title: "Data Security",
    content: [
      "All transactions on FootwearBD are protected with 256-bit SSL encryption.",
      "Our servers undergo regular security audits and are hosted in secure data centres.",
      "Access to customer data is strictly limited to authorised employees on a need-to-know basis.",
    ],
  },
  {
    title: "Your Rights",
    content: [
      "You may request a copy of the personal data we hold about you at any time.",
      "You can update or correct your information from your account settings page.",
      "You may request deletion of your account and associated data by contacting us.",
      "You can opt out of marketing communications at any time via the unsubscribe link or by contacting us directly.",
    ],
  },
  {
    title: "Contact Us",
    content: [
      "Email: hello@footwearbd.com",
      "Phone: +880 1712-345678",
      "WhatsApp: wa.me/8801712345678",
      "If you have any questions or concerns about this Privacy Policy, please do not hesitate to reach out.",
    ],
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen font-sans bg-[#f4f5f9]">
      <AnnouncementBar />
      <Header />

      {/* Hero */}
      <div className="bg-[#1A2B5E] py-10 text-center">
        <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
        <p className="text-white/70 text-sm mt-2">How we collect, use, and protect your information</p>
        <p className="text-white/50 text-xs mt-3">Last updated: June 26, 2026</p>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <p className="text-sm text-gray-600 leading-relaxed mb-8">
            FootwearBD (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we
            collect, use, disclose, and safeguard your information when you visit our website or make a purchase.
            Please read this policy carefully.
          </p>

          {sections.map(({ title, content }, i) => (
            <div key={title}>
              {i > 0 && <hr className="border-t border-gray-100 my-6" />}
              <h2 className="text-lg font-semibold text-[#1A2B5E] mb-3">{title}</h2>
              <ul className="space-y-2">
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

      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
