"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { AuthLayout } from "@/components/storefront/auth/AuthLayout"
import { PasswordInput } from "@/components/storefront/auth/PasswordInput"
import { SocialLogin } from "@/components/storefront/auth/SocialLogin"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { registerUser } from "@/lib/store/authSlice"
import { useRedirectIfAuthenticated } from "@/lib/hooks/useRedirectIfAuthenticated"

function getStrength(pwd: string): { label: string; color: string; width: string } | null {
  if (pwd.length === 0) return null
  if (pwd.length < 6) return { label: "Weak", color: "bg-red-500", width: "33%" }
  if (pwd.length < 10 || !/\d/.test(pwd)) return { label: "Fair", color: "bg-amber-500", width: "66%" }
  return { label: "Strong", color: "bg-green-500", width: "100%" }
}

function Toast({ message, onDone }: { message: string; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3000)
    return () => clearTimeout(t)
  }, [onDone])
  return (
    <div className="fixed top-6 right-6 z-[9999] bg-[#1A2B5E] text-white px-5 py-3 rounded-xl shadow-xl text-sm font-medium animate-[slideIn_0.3s_ease]">
      {message}
    </div>
  )
}

interface FieldErrors {
  firstName?: string
  lastName?: string
  email?: string
  password?: string
  confirmPassword?: string
  terms?: string
  server?: string
}

export default function RegisterPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const authStatus = useAppSelector((s) => s.auth.status)
  const { checking } = useRedirectIfAuthenticated()

  const [toast, setToast] = useState("")
  const showToast = (msg: string) => setToast(msg)

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [referralOpen, setReferralOpen] = useState(false)
  const [referralCode, setReferralCode] = useState("")
  const [referralValid, setReferralValid] = useState<boolean | null>(null)
  const [terms, setTerms] = useState(false)
  const [newsletter, setNewsletter] = useState(true)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [success, setSuccess] = useState(false)
  const [activationEmail, setActivationEmail] = useState("")

  const loading = authStatus === "loading"

  const passwordMatch = confirmPassword.length > 0 && password === confirmPassword
  const strength = getStrength(password)

  const handleReferral = (val: string) => {
    setReferralCode(val)
    if (val === "FRIEND200") setReferralValid(true)
    else if (val.length > 0) setReferralValid(false)
    else setReferralValid(null)
  }

  const validate = (): boolean => {
    const errs: FieldErrors = {}
    if (firstName.trim().length < 2) errs.firstName = "Min 2 characters"
    if (lastName.trim().length < 2) errs.lastName = "Min 2 characters"
    if (!email || !/^[\w.+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(email))
      errs.email = "A valid email address is required"
    if (password.length < 8) errs.password = "Min 8 characters"
    if (password !== confirmPassword) errs.confirmPassword = "Passwords don't match"
    if (!terms) errs.terms = "You must accept the terms"
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) {
      const firstErr = document.querySelector("[data-field-error]")
      firstErr?.scrollIntoView({ behavior: "smooth", block: "center" })
      return
    }

    const result = await dispatch(
      registerUser({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.toLowerCase().trim(),
        password,
        phoneNumber: phone.trim() || undefined,
      }),
    )

    if (registerUser.fulfilled.match(result)) {
      setActivationEmail(email.toLowerCase().trim())
      setSuccess(true)
    } else {
      const msg = (result.payload as string) || "Registration failed. Please try again."
      setErrors((prev) => ({ ...prev, server: msg }))
    }
  }

  if (checking) {
    return (
      <AuthLayout rightLink={{ label: "Already have an account? Sign In →", href: "/account/login" }}>
        <div className="flex items-center justify-center py-24">
          <p className="text-sm text-gray-400">Loading…</p>
        </div>
      </AuthLayout>
    )
  }

  if (success) {
    return (
      <>
        <AuthLayout rightLink={{ label: "Already have an account? Sign In →", href: "/account/login" }}>
          <div className="text-center py-8 relative overflow-hidden">
            {/* CSS Confetti */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="confetti-dot"
                  style={{
                    left: `${(i * 5.3) % 100}%`,
                    animationDelay: `${(i * 0.1) % 0.5}s`,
                    backgroundColor: i % 3 === 0 ? "#D4A017" : i % 3 === 1 ? "#1A2B5E" : "#22c55e",
                  }}
                />
              ))}
            </div>

            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4 animate-[scaleUp_0.4s_ease]">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-[#1A2B5E]">Almost There! 🎉</h2>
            <p className="text-gray-600 mt-2">Welcome to FootwearBD, {firstName}!</p>
            <p className="text-sm text-gray-500 mt-3 max-w-xs mx-auto">
              We&apos;ve sent an activation link to{" "}
              <span className="font-semibold text-[#1A2B5E]">{activationEmail}</span>.
              Click the link in the email to activate your account.
            </p>
            <p className="text-xs text-gray-400 mt-2">Check your spam folder if you don&apos;t see it.</p>

            <div className="flex flex-col gap-3 mt-6">
              <button
                type="button"
                onClick={() => router.push("/account/login")}
                className="bg-[#1A2B5E] text-white font-semibold py-3 rounded-xl hover:bg-[#0d1733] transition-all"
              >
                Go to Sign In →
              </button>
              <button
                type="button"
                onClick={() => router.push("/")}
                className="border-2 border-[#D4A017] text-[#D4A017] font-semibold py-3 rounded-xl hover:bg-[#D4A017]/10 transition-all"
              >
                Continue Browsing →
              </button>
            </div>
          </div>
        </AuthLayout>

        <style>{`
          @keyframes slideIn {
            from { opacity: 0; transform: translateX(20px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes scaleUp {
            from { transform: scale(0); }
            to { transform: scale(1); }
          }
          @keyframes confettiFall {
            0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
            100% { transform: translateY(300px) rotate(720deg); opacity: 0; }
          }
          .confetti-dot {
            position: absolute;
            top: 0;
            width: 8px;
            height: 8px;
            border-radius: 2px;
            animation: confettiFall 2s ease forwards;
          }
        `}</style>
      </>
    )
  }

  return (
    <>
      {toast && <Toast message={toast} onDone={() => setToast("")} />}

      <AuthLayout rightLink={{ label: "Already have an account? Sign In →", href: "/account/login" }}>
        {/* Tab switcher */}
        <div className="flex rounded-xl bg-gray-100 p-1 mb-5">
          <button
            type="button"
            onClick={() => router.push("/account/login")}
            className="flex-1 py-2.5 text-sm font-semibold rounded-lg text-gray-500 hover:text-gray-700 transition-all"
          >
            Sign In
          </button>
          <button
            type="button"
            className="flex-1 py-2.5 text-sm font-semibold rounded-lg bg-white text-[#1A2B5E] shadow-sm transition-all"
          >
            Create Account
          </button>
        </div>

        <h1 className="text-2xl font-bold text-[#1A2B5E]">Create Account 🎉</h1>
        <p className="text-gray-500 text-sm mt-1">
          Join FootwearBD and enjoy exclusive member benefits
        </p>

        {/* Benefit pills */}
        <div className="flex flex-wrap gap-2 mt-4">
          {[
            { icon: "🎁", label: "Earn Points" },
            { icon: "🚚", label: "Free Delivery" },
            { icon: "🔄", label: "Easy Returns" },
          ].map((b) => (
            <span
              key={b.label}
              className="flex items-center gap-1 bg-gray-100 text-gray-600 text-xs rounded-full px-3 py-1 font-medium"
            >
              {b.icon} {b.label}
            </span>
          ))}
        </div>

        <form onSubmit={handleRegister} className="mt-5 space-y-4">
          {/* Row 1: Name */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Rahim"
                data-field-error={errors.firstName ? true : undefined}
                className={`w-full h-[46px] border rounded-xl px-4 text-sm bg-gray-50 outline-none focus:ring-2 focus:ring-[#1A2B5E]/20 focus:border-[#1A2B5E] focus:bg-white transition-all ${
                  errors.firstName ? "border-red-400 bg-red-50" : "border-gray-200"
                }`}
              />
              {errors.firstName && (
                <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Uddin"
                data-field-error={errors.lastName ? true : undefined}
                className={`w-full h-[46px] border rounded-xl px-4 text-sm bg-gray-50 outline-none focus:ring-2 focus:ring-[#1A2B5E]/20 focus:border-[#1A2B5E] focus:bg-white transition-all ${
                  errors.lastName ? "border-red-400 bg-red-50" : "border-gray-200"
                }`}
              />
              {errors.lastName && (
                <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Email (required — used for activation) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              autoComplete="email"
              data-field-error={errors.email ? true : undefined}
              className={`w-full h-[46px] border rounded-xl px-4 text-sm bg-gray-50 outline-none focus:ring-2 focus:ring-[#1A2B5E]/20 focus:border-[#1A2B5E] focus:bg-white transition-all ${
                errors.email ? "border-red-400 bg-red-50" : "border-gray-200"
              }`}
            />
            {errors.email ? (
              <p className="text-xs text-red-500 mt-1">{errors.email}</p>
            ) : (
              <p className="text-xs text-gray-400 mt-1">We&apos;ll send your activation link here</p>
            )}
          </div>

          {/* Phone (optional) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Phone Number <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+880 1XXX-XXXXXX"
              autoComplete="tel"
              className="w-full h-[46px] border border-gray-200 rounded-xl px-4 text-sm bg-gray-50 outline-none focus:ring-2 focus:ring-[#1A2B5E]/20 focus:border-[#1A2B5E] focus:bg-white transition-all"
            />
            <p className="text-xs text-gray-400 mt-1">For order updates (optional)</p>
          </div>

          {/* Password + strength */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Password <span className="text-red-500">*</span>
            </label>
            <PasswordInput
              id="reg-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
            {strength && (
              <div className="mt-2">
                <div className="h-1.5 bg-gray-200 rounded-full">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-300 ${strength.color}`}
                    style={{ width: strength.width }}
                  />
                </div>
                <p className={`text-xs mt-1 font-medium ${
                  strength.label === "Weak" ? "text-red-500" :
                  strength.label === "Fair" ? "text-amber-500" : "text-green-500"
                }`}>
                  {strength.label} password
                </p>
              </div>
            )}
            {errors.password && (
              <p className="text-xs text-red-500 mt-1" data-field-error="true">{errors.password}</p>
            )}
          </div>

          {/* Confirm password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter password"
              autoComplete="new-password"
              data-field-error={errors.confirmPassword ? true : undefined}
              className={`w-full h-[46px] border rounded-xl px-4 text-sm bg-gray-50 outline-none focus:ring-2 focus:ring-[#1A2B5E]/20 focus:border-[#1A2B5E] focus:bg-white transition-all ${
                errors.confirmPassword
                  ? "border-red-400 bg-red-50"
                  : confirmPassword && passwordMatch
                  ? "border-green-400"
                  : "border-gray-200"
              }`}
            />
            {confirmPassword.length > 0 && (
              <p className={`text-xs mt-1 ${passwordMatch ? "text-green-500" : "text-red-500"}`}>
                {passwordMatch ? "✓ Passwords match" : "Passwords don't match"}
              </p>
            )}
            {errors.confirmPassword && !confirmPassword && (
              <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Referral code */}
          <div>
            {!referralOpen ? (
              <button
                type="button"
                onClick={() => setReferralOpen(true)}
                className="text-sm text-[#D4A017] hover:underline"
              >
                Have a referral code? +
              </button>
            ) : (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Referral Code
                </label>
                <input
                  type="text"
                  value={referralCode}
                  onChange={(e) => handleReferral(e.target.value.toUpperCase())}
                  placeholder="Enter referral code"
                  className="w-full h-[44px] border border-gray-200 rounded-xl px-4 text-sm bg-gray-50 outline-none focus:ring-2 focus:ring-[#1A2B5E]/20 focus:border-[#1A2B5E] focus:bg-white transition-all"
                />
                {referralValid === true && (
                  <p className="text-xs text-green-500 mt-1">✓ 200 bonus points will be added!</p>
                )}
                {referralValid === false && referralCode.length > 0 && (
                  <p className="text-xs text-red-500 mt-1">Invalid referral code</p>
                )}
              </div>
            )}
          </div>

          {/* Terms */}
          <div>
            <label className="flex items-start gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded border-gray-300 text-[#1A2B5E] focus:ring-[#1A2B5E]/20 cursor-pointer flex-shrink-0"
              />
              <span className="text-sm text-gray-600">
                I agree to the{" "}
                <Link href="/terms" target="_blank" className="text-[#D4A017] hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" target="_blank" className="text-[#D4A017] hover:underline">
                  Privacy Policy
                </Link>
              </span>
            </label>
            {errors.terms && (
              <p className="text-xs text-red-500 mt-1" data-field-error="true">{errors.terms}</p>
            )}
          </div>

          {/* Newsletter */}
          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={newsletter}
              onChange={(e) => setNewsletter(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-[#1A2B5E] focus:ring-[#1A2B5E]/20 cursor-pointer"
            />
            <span className="text-sm text-gray-600">
              Send me deals, new arrivals and exclusive offers
            </span>
          </label>

          {/* Server error */}
          {errors.server && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
              ❌ {errors.server}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !terms}
            className="w-full bg-[#D4A017] hover:bg-[#b8881a] text-[#1A2B5E] font-bold text-base py-3.5 rounded-xl mt-4 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Creating your account...
              </>
            ) : (
              "Create My Account →"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">or continue with</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <SocialLogin onToast={showToast} />

        <p className="text-sm text-center mt-5 text-gray-500">
          Already have an account?{" "}
          <Link href="/account/login" className="text-[#D4A017] font-medium hover:underline">
            Sign In →
          </Link>
        </p>
      </AuthLayout>

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleUp {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }
        @keyframes confettiFall {
          0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(300px) rotate(720deg); opacity: 0; }
        }
        .confetti-dot {
          position: absolute;
          top: 0;
          width: 8px;
          height: 8px;
          border-radius: 2px;
          animation: confettiFall 2s ease forwards;
        }
      `}</style>
    </>
  )
}
