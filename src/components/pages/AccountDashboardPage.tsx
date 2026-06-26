"use client"

import { useState } from "react"
import { Header } from "@/components/storefront/Header"
import { AnnouncementBar } from "@/components/storefront/AnnouncementBar"
import { Footer } from "@/components/storefront/Footer"
import { WhatsAppFloat } from "@/components/storefront/WhatsAppFloat"
import AccountSidebar, { type AccountTab } from "@/components/storefront/account/AccountSidebar"
import AccountOverview from "@/components/storefront/account/AccountOverview"
import OrderHistory from "@/components/storefront/account/OrderHistory"
import AddressBook from "@/components/storefront/account/AddressBook"
import AccountSettings from "@/components/storefront/account/AccountSettings"
import LoyaltyPoints from "@/components/storefront/account/LoyaltyPoints"
import {
  LayoutDashboard,
  Package,
  MapPin,
  Settings,
  Gift,
} from "lucide-react"

const MOBILE_TABS: { id: AccountTab; label: string; icon: React.ComponentType<{ size?: number }> }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "orders", label: "Orders", icon: Package },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "settings", label: "Settings", icon: Settings },
  { id: "loyalty", label: "Loyalty", icon: Gift },
]

export default function AccountDashboardPage() {
  const [activeTab, setActiveTab] = useState<AccountTab>("overview")

  return (
    <div className="min-h-screen font-sans bg-[#f4f5f9]">
      <AnnouncementBar />
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-10">
        {/* Mobile tab bar */}
        <div className="lg:hidden mb-6 overflow-x-auto">
          <div className="flex gap-1 min-w-max border-b border-gray-200 pb-0">
            {MOBILE_TABS.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center gap-1 px-4 py-2.5 border-b-2 transition-colors text-xs font-medium whitespace-nowrap -mb-px ${
                    isActive
                      ? "border-[#1A2B5E] text-[#1A2B5E]"
                      : "border-transparent text-gray-500 hover:text-[#1A2B5E]"
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar — hidden on mobile */}
          <div className="hidden lg:block lg:col-span-1">
            <AccountSidebar activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          {/* Content panel */}
          <div className="lg:col-span-3">
            {activeTab === "overview" && <AccountOverview onTabChange={setActiveTab} />}
            {activeTab === "orders" && <OrderHistory />}
            {activeTab === "addresses" && <AddressBook />}
            {activeTab === "settings" && <AccountSettings />}
            {activeTab === "loyalty" && <LoyaltyPoints />}
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
