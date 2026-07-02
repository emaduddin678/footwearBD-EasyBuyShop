"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { clearCart } from "@/lib/store/cartSlice"
import { DeliveryForm, type DeliveryData } from "@/components/storefront/checkout/DeliveryForm"
import { PaymentMethod, type PaymentData, type PaymentMethodType } from "@/components/storefront/checkout/PaymentMethod"
import { CheckoutSummary } from "@/components/storefront/checkout/CheckoutSummary"
import { OrderReview } from "@/components/storefront/checkout/OrderReview"
import { createOrder, type CreateOrderPayload } from "@/lib/api/orders"
import type { PromoResult } from "@/lib/api/discounts"

/* ── helpers ── */
const FREE_DELIVERY_THRESHOLD = 2000

function parsePrice(p: string) {
  return parseInt(p.replace(/[৳,\s]/g, ""), 10) || 0
}

function fmt(n: number) {
  return n.toLocaleString()
}

/* ── validation helpers ── */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const BD_PHONE_RE = /^(\+880|880|0)1[3-9]\d{8}$/
const CARD_NUM_RE = /^\d{4} \d{4} \d{4} \d{4}$/
const EXPIRY_RE = /^(0[1-9]|1[0-2])\/\d{2}$/

function isExpiryValid(val: string): boolean {
  if (!EXPIRY_RE.test(val)) return false
  const [mm, yy] = val.split("/").map(Number)
  const now = new Date()
  const expYear = 2000 + yy
  const expMonth = mm
  return expYear > now.getFullYear() || (expYear === now.getFullYear() && expMonth >= now.getMonth() + 1)
}

/* ── Stepper (same style as CartPage) ── */
function CheckoutStepper() {
  const steps = ["Cart", "Checkout", "Confirmation"]
  return (
    <div className="flex items-center justify-center mb-10">
      {steps.map((label, i) => {
        const s = (i + 1) as 1 | 2 | 3
        const active = s === 2
        const done = s < 2
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-extrabold transition-colors ${
                  active
                    ? "bg-[#D4A017] text-white ring-4 ring-amber-100"
                    : done
                    ? "bg-[#1A2B5E] text-white"
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                {done ? (
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                ) : s}
              </div>
              <span className={`text-xs font-semibold mt-1.5 whitespace-nowrap ${
                active ? "text-[#D4A017]" : done ? "text-[#1A2B5E]" : "text-gray-400"
              }`}>
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-20 sm:w-32 h-0.5 mx-3 mb-5 rounded-full transition-colors ${
                done ? "bg-[#1A2B5E]" : "bg-gray-200"
              }`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

/* ── types ── */
interface ContactData {
  firstName: string
  lastName: string
  email: string
  phone: string
}

type FormErrors = Partial<Record<string, string>>

/* ── main component ── */
export default function CheckoutPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const cartItems = useAppSelector((s) => s.cart.items)

  /* redirect if empty */
  const redirectedRef = useRef(false)
  useEffect(() => {
    if (cartItems.length === 0 && !redirectedRef.current) {
      redirectedRef.current = true
      sessionStorage.setItem(
        "checkoutToast",
        "Your cart is empty. Add items before checkout.",
      )
      router.replace("/cart")
    }
  }, [cartItems.length, router])

  /* promo from sessionStorage (carried over from cart) */
  const [appliedPromo, setAppliedPromo] = useState<PromoResult | null>(null)
  useEffect(() => {
    const raw = sessionStorage.getItem("appliedPromo")
    if (raw) {
      try { setAppliedPromo(JSON.parse(raw)) } catch { /* ignore */ }
    }
  }, [])

  /* contact */
  const [contact, setContact] = useState<ContactData>({
    firstName: "", lastName: "", email: "", phone: "",
  })

  /* delivery */
  const [delivery, setDelivery] = useState<DeliveryData>({
    type: "home", address: "", area: "", city: "", postalCode: "",
    instructions: "", speed: "standard",
  })

  /* payment */
  const [payment, setPayment] = useState<PaymentData>({
    method: "" as PaymentMethodType, accountNumber: "",
    cardNumber: "", cardExpiry: "", cardCvv: "", cardName: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Partial<Record<string, boolean>>>({})
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const [loading, setLoading] = useState(false)
  const firstErrorRef = useRef<HTMLDivElement>(null)

  function touchField(name: string) {
    setTouched((p) => ({ ...p, [name]: true }))
  }

  function showErr(name: string) {
    return !!(errors[name] && touched[name])
  }

  /* ── Derived pricing ── */
  const subtotal = cartItems.reduce((s, i) => s + parsePrice(i.price) * i.quantity, 0)
  const discountAmount = appliedPromo?.discountAmount ?? 0
  const afterDiscount = subtotal - discountAmount
  const freeShip = appliedPromo?.freeShipping === true
  const isPickup = delivery.type === "pickup"

  let deliveryCharge = 0
  if (!isPickup) {
    if (delivery.speed === "express") {
      deliveryCharge = 250
    } else {
      deliveryCharge = afterDiscount >= FREE_DELIVERY_THRESHOLD || freeShip ? 0 : 120
    }
  }
  const total = afterDiscount + deliveryCharge

  const discountLabel = appliedPromo?.label ?? ""

  /* ── Validation ── */
  function validate(): FormErrors {
    const e: FormErrors = {}

    if (!contact.firstName.trim() || contact.firstName.trim().length < 2)
      e.firstName = "First name must be at least 2 characters"
    if (!contact.lastName.trim() || contact.lastName.trim().length < 2)
      e.lastName = "Last name must be at least 2 characters"
    if (!contact.email.trim() || !EMAIL_RE.test(contact.email))
      e.email = "Please enter a valid email address"
    if (!contact.phone.trim() || !BD_PHONE_RE.test(contact.phone.trim()))
      e.phone = "Please enter a valid Bangladesh phone number"

    if (!isPickup) {
      if (!delivery.address.trim() || delivery.address.trim().length < 10)
        e.address = "Please enter a full street address (min 10 characters)"
      if (!delivery.area.trim())
        e.area = "Please enter your area / thana"
      if (!delivery.city)
        e.city = "Please select a city"
    }

    if (!payment.method)
      e.method = "Please select a payment method"

    if (payment.method === "bkash" || payment.method === "nagad" || payment.method === "rocket") {
      if (!payment.accountNumber.trim() || !BD_PHONE_RE.test(payment.accountNumber.trim()))
        e.accountNumber = "Please enter a valid Bangladesh phone number"
    }

    if (payment.method === "card") {
      if (!CARD_NUM_RE.test(payment.cardNumber))
        e.cardNumber = "Please enter a valid 16-digit card number"
      if (!isExpiryValid(payment.cardExpiry))
        e.cardExpiry = "Please enter a valid expiry date (MM/YY)"
      if (!/^\d{3}$/.test(payment.cardCvv))
        e.cardCvv = "CVV must be 3 digits"
      if (!payment.cardName.trim())
        e.cardName = "Please enter the cardholder name"
    }

    return e
  }

  /* ── Place order ── */
  async function handlePlaceOrder() {
    setSubmitAttempted(true)
    setTouched({
      firstName: true, lastName: true, email: true, phone: true,
      address: true, area: true, city: true,
      method: true, accountNumber: true,
      cardNumber: true, cardExpiry: true, cardCvv: true, cardName: true,
    })
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) {
      setTimeout(() => {
        firstErrorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
      }, 50)
      return
    }

    setLoading(true)

    // Map cart items → backend order items.
    // productId is only included when the id looks like a MongoDB ObjectId (24 hex chars).
    const isObjectId = (id: string | number) => /^[0-9a-fA-F]{24}$/.test(String(id))
    const orderItems = cartItems.map((item) => ({
      ...(isObjectId(item.id) ? { productId: String(item.id) } : {}),
      productName: item.name,
      variant: { size: item.size },
      quantity: item.quantity,
      unitPrice: parsePrice(item.price),
      totalPrice: parsePrice(item.price) * item.quantity,
    }))

    // Frontend uses "cod"; backend enum is "cash_on_delivery"
    const backendPaymentMethod =
      payment.method === "cod" ? "cash_on_delivery" : (payment.method as CreateOrderPayload["payment"]["method"])

    const payload: CreateOrderPayload = {
      customer: {
        name: `${contact.firstName} ${contact.lastName}`.trim(),
        email: contact.email,
        phone: contact.phone,
        shippingAddress: {
          street: isPickup ? "Store Pickup" : `${delivery.address}, ${delivery.area}`,
          city: isPickup ? "Dhaka" : delivery.city,
          state: isPickup ? "Dhaka" : delivery.city,
          zip: delivery.postalCode || undefined,
          country: "Bangladesh",
        },
      },
      items: orderItems,
      pricing: {
        subtotal,
        discountAmount: discountAmount || undefined,
        couponCode: appliedPromo?.code || undefined,
        shippingCost: deliveryCharge,
        total,
      },
      payment: { method: backendPaymentMethod },
      source: "website",
    }

    try {
      const result = await createOrder(payload)

      // Save enough data for OrderConfirmPage to render without another API call
      const orderData = {
        orderId: result.payload.orderId,
        items: cartItems,
        customer: {
          firstName: contact.firstName,
          lastName: contact.lastName,
          email: contact.email,
          phone: contact.phone,
        },
        delivery: {
          type: delivery.type,
          address: delivery.address,
          area: delivery.area,
          city: delivery.city,
          postalCode: delivery.postalCode,
          instructions: delivery.instructions,
          speed: delivery.speed,
          charge: deliveryCharge,
        },
        payment: {
          method: payment.method,
          accountNumber:
            payment.method === "bkash" || payment.method === "nagad" || payment.method === "rocket"
              ? payment.accountNumber
              : null,
        },
        pricing: {
          subtotal,
          discount: discountAmount,
          deliveryCharge,
          total,
        },
        placedAt: result.payload.createdAt ?? new Date().toISOString(),
      }

      sessionStorage.setItem("lastOrder", JSON.stringify(orderData))
      sessionStorage.removeItem("appliedPromo")
      redirectedRef.current = true // suppress the empty-cart guard before clearing the cart
      dispatch(clearCart())
      router.push("/order-confirm")
    } catch (err) {
      setLoading(false)
      setErrors((prev) => ({
        ...prev,
        _submit: err instanceof Error ? err.message : "Failed to place order. Please try again.",
      }))
    }
  }

  /* collect contact-level errors for the ref */
  const hasContactError = errors.firstName || errors.lastName || errors.email || errors.phone
  const hasAddressError = errors.address || errors.area || errors.city
  const hasPaymentError = errors.method || errors.accountNumber || errors.cardNumber || errors.cardExpiry || errors.cardCvv || errors.cardName

  if (cartItems.length === 0) return null

  return (
    <div className="pb-24 lg:pb-0">
      <CheckoutStepper />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* ── LEFT: forms ── */}
        <div className="lg:col-span-2">

          {/* CARD 1 — Contact */}
          <div
            ref={hasContactError ? firstErrorRef : undefined}
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-7 h-7 rounded-full bg-[#1A2B5E] text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                1
              </div>
              <h2 className="font-semibold text-lg text-[#1A2B5E]">Contact Information</h2>
            </div>

            <div className="space-y-4">
              {/* Row 1: names */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={contact.firstName}
                    onChange={(e) => setContact({ ...contact, firstName: e.target.value })}
                    onBlur={() => {
                      touchField("firstName")
                      if (!contact.firstName.trim() || contact.firstName.trim().length < 2)
                        setErrors((p) => ({ ...p, firstName: "First name must be at least 2 characters" }))
                      else
                        setErrors((p) => { const n = { ...p }; delete n.firstName; return n })
                    }}
                    placeholder="Rahim"
                    className={`w-full h-11 border rounded-lg px-3 text-sm outline-none transition-colors ${showErr("firstName") ? "border-red-500" : "border-gray-200 focus:border-[#1A2B5E]"}`}
                  />
                  {showErr("firstName") && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={contact.lastName}
                    onChange={(e) => setContact({ ...contact, lastName: e.target.value })}
                    onBlur={() => {
                      touchField("lastName")
                      if (!contact.lastName.trim() || contact.lastName.trim().length < 2)
                        setErrors((p) => ({ ...p, lastName: "Last name must be at least 2 characters" }))
                      else
                        setErrors((p) => { const n = { ...p }; delete n.lastName; return n })
                    }}
                    placeholder="Uddin"
                    className={`w-full h-11 border rounded-lg px-3 text-sm outline-none transition-colors ${showErr("lastName") ? "border-red-500" : "border-gray-200 focus:border-[#1A2B5E]"}`}
                  />
                  {showErr("lastName") && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
                </div>
              </div>

              {/* Row 2: email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={contact.email}
                  onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  onBlur={() => {
                    touchField("email")
                    if (!contact.email.trim() || !EMAIL_RE.test(contact.email))
                      setErrors((p) => ({ ...p, email: "Please enter a valid email address" }))
                    else
                      setErrors((p) => { const n = { ...p }; delete n.email; return n })
                  }}
                  placeholder="rahim@example.com"
                  className={`w-full h-11 border rounded-lg px-3 text-sm outline-none transition-colors ${showErr("email") ? "border-red-500" : "border-gray-200 focus:border-[#1A2B5E]"}`}
                />
                {showErr("email") && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>

              {/* Row 3: phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={contact.phone}
                  onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                  onBlur={() => {
                    touchField("phone")
                    if (!contact.phone.trim() || !BD_PHONE_RE.test(contact.phone.trim()))
                      setErrors((p) => ({ ...p, phone: "Please enter a valid Bangladesh phone number" }))
                    else
                      setErrors((p) => { const n = { ...p }; delete n.phone; return n })
                  }}
                  placeholder="+880 1XXX-XXXXXX"
                  className={`w-full h-11 border rounded-lg px-3 text-sm outline-none transition-colors ${showErr("phone") ? "border-red-500" : "border-gray-200 focus:border-[#1A2B5E]"}`}
                />
                {showErr("phone") && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                <p className="text-xs text-gray-400 mt-1">
                  We&apos;ll send order updates to this number via SMS
                </p>
              </div>
            </div>

            {/* Guest checkout note */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
              <p className="text-xs text-blue-800">
                ℹ️ Checking out as guest. Create an account to track orders easily.{" "}
                <Link href="/account/register" className="font-semibold underline hover:text-blue-600">
                  Sign Up →
                </Link>
              </p>
            </div>
          </div>

          {/* CARD 2 — Delivery */}
          <div ref={hasAddressError && !hasContactError ? firstErrorRef : undefined}>
            <DeliveryForm
              data={delivery}
              onChange={setDelivery}
              errors={errors}
              subtotal={afterDiscount}
              submitAttempted={submitAttempted}
            />
          </div>

          {/* CARD 3 — Payment */}
          <div ref={hasPaymentError && !hasContactError && !hasAddressError ? firstErrorRef : undefined}>
            <PaymentMethod
              data={payment}
              onChange={setPayment}
              errors={errors}
              submitAttempted={submitAttempted}
            />
          </div>

          {/* CARD 4 — Order review */}
          <OrderReview items={cartItems} />
        </div>

        {/* ── RIGHT: summary (desktop) ── */}
        <div className="hidden lg:block lg:col-span-1">
          {errors._submit && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4 text-sm text-red-700">
              {errors._submit}
            </div>
          )}
          <CheckoutSummary
            items={cartItems}
            subtotal={subtotal}
            discountAmount={discountAmount}
            discountLabel={discountLabel}
            deliveryCharge={deliveryCharge}
            total={total}
            onPlaceOrder={handlePlaceOrder}
            loading={loading}
          />
        </div>
      </div>

      {/* ── Mobile summary (below forms) ── */}
      <div className="lg:hidden mt-6">
        {errors._submit && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4 text-sm text-red-700">
            {errors._submit}
          </div>
        )}
        <CheckoutSummary
          items={cartItems}
          subtotal={subtotal}
          discountAmount={discountAmount}
          discountLabel={discountLabel}
          deliveryCharge={deliveryCharge}
          total={total}
          onPlaceOrder={handlePlaceOrder}
          loading={loading}
        />
      </div>

      {/* ── Mobile sticky bottom bar ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white border-t border-gray-200 px-4 py-3 flex items-center justify-between shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
        <div>
          <p className="text-[11px] text-gray-400 font-medium">Total</p>
          <p className="text-lg font-extrabold text-[#1A2B5E]">৳{fmt(total)}</p>
        </div>
        <button
          type="button"
          onClick={handlePlaceOrder}
          disabled={loading}
          className="bg-[#D4A017] hover:bg-amber-600 text-[#1A2B5E] font-extrabold px-6 py-3 rounded-xl text-sm transition-colors disabled:opacity-70 flex items-center gap-2"
        >
          {loading ? (
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          ) : (
            "Place Order →"
          )}
        </button>
      </div>
    </div>
  )
}
