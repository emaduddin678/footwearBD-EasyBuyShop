"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { AuthLayout } from "@/components/storefront/auth/AuthLayout"
import { PasswordInput } from "@/components/storefront/auth/PasswordInput"
import { SocialLogin } from "@/components/storefront/auth/SocialLogin"

const VALID_CREDENTIALS = [
  { identifier: "rahim@example.com", password: "password123", name: "Rahim" },
  { identifier: "+8801712345678", password: "password123", name: "Rahim" },
]

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

type ForgotStep = "idle" | "email" | "otp" | "newpass"

export default function LoginPage() {
  const router = useRouter()
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [shake, setShake] = useState(false)
  const [toast, setToast] = useState("")

  const [forgotStep, setForgotStep] = useState<ForgotStep>("idle")
  const [forgotIdentifier, setForgotIdentifier] = useState("")
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [newPass, setNewPass] = useState("")
  const [confirmPass, setConfirmPass] = useState("")
  const otpRefs = useRef<(HTMLInputElement | null)[]>([])

  const showToast = (msg: string) => setToast(msg)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))

    const match = VALID_CREDENTIALS.find(
      (c) => c.identifier === identifier && c.password === password
    )

    if (match) {
      showToast(`✓ Welcome back, ${match.name}!`)
      setTimeout(() => router.push("/account"), 1000)
    } else {
      setError("❌ Invalid phone/email or password. Please try again.")
      setShake(true)
      setTimeout(() => setShake(false), 600)
    }
    setLoading(false)
  }

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return
    const next = [...otp]
    next[index] = value
    setOtp(next)
    if (value && index < 5) otpRefs.current[index + 1]?.focus()
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus()
    }
  }

  return (
    <>
      {toast && <Toast message={toast} onDone={() => setToast("")} />}

      <AuthLayout rightLink={{ label: "New to FootwearBD? Register →", href: "/account/register" }}>
        {/* Tab switcher */}
        <div className="flex rounded-xl bg-gray-100 p-1 mb-6">
          <button
            type="button"
            className="flex-1 py-2.5 text-sm font-semibold rounded-lg bg-white text-[#1A2B5E] shadow-sm transition-all"
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => router.push("/account/register")}
            className="flex-1 py-2.5 text-sm font-semibold rounded-lg text-gray-500 hover:text-gray-700 transition-all"
          >
            Create Account
          </button>
        </div>

        <h1 className="text-2xl font-bold text-[#1A2B5E]">Welcome Back! 👋</h1>
        <p className="text-gray-500 text-sm mt-1">Sign in to your FootwearBD account</p>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          {/* Identifier */}
          <div>
            <label htmlFor="identifier" className="block text-sm font-semibold text-gray-700 mb-1.5">
              Phone Number or Email
            </label>
            <input
              id="identifier"
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="+880 1XXX-XXXXXX or email@example.com"
              autoComplete="username"
              required
              className="w-full h-[46px] border border-gray-200 rounded-xl px-4 text-sm text-gray-800 bg-gray-50 outline-none focus:ring-2 focus:ring-[#1A2B5E]/20 focus:border-[#1A2B5E] focus:bg-white transition-all"
            />
          </div>

          {/* Password */}
          <PasswordInput
            id="password"
            name="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            autoComplete="current-password"
          />

          {/* Forgot password link */}
          <div className="flex justify-end -mt-1">
            <button
              type="button"
              onClick={() => setForgotStep(forgotStep === "idle" ? "email" : "idle")}
              className="text-sm text-[#D4A017] hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* Remember me */}
          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-[#1A2B5E] focus:ring-[#1A2B5E]/20 cursor-pointer"
            />
            <span className="text-sm text-gray-600">Remember me for 30 days</span>
          </label>

          {/* Error */}
          {error && (
            <div
              className={`bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl ${
                shake ? "animate-[shake_0.5s_ease]" : ""
              }`}
            >
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1A2B5E] hover:bg-[#0d1733] text-white font-semibold text-base py-3.5 rounded-xl mt-4 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Signing in...
              </>
            ) : (
              "Sign In →"
            )}
          </button>
        </form>

        {/* Forgot Password Panel */}
        {forgotStep !== "idle" && (
          <div className="mt-4 bg-gray-50 border border-gray-200 rounded-xl p-5 animate-[fadeDown_0.25s_ease]">
            {forgotStep === "email" && (
              <>
                <h3 className="font-semibold text-[#1A2B5E]">Reset Your Password</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Enter your phone number or email and we&apos;ll send you a reset code
                </p>
                <input
                  type="text"
                  value={forgotIdentifier}
                  onChange={(e) => setForgotIdentifier(e.target.value)}
                  placeholder="Phone or email"
                  className="w-full mt-3 h-[44px] border border-gray-200 rounded-xl px-4 text-sm bg-white outline-none focus:ring-2 focus:ring-[#1A2B5E]/20 focus:border-[#1A2B5E] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setForgotStep("otp")}
                  disabled={!forgotIdentifier}
                  className="w-full mt-3 bg-[#1A2B5E] text-white font-semibold py-2.5 rounded-xl text-sm hover:bg-[#0d1733] transition-all disabled:opacity-50"
                >
                  Send Reset Code →
                </button>
                <button
                  type="button"
                  onClick={() => setForgotStep("idle")}
                  className="w-full mt-2 text-sm text-gray-500 hover:text-gray-700"
                >
                  ← Back to Sign In
                </button>
              </>
            )}

            {forgotStep === "otp" && (
              <>
                <p className="text-sm text-gray-500">Enter the 6-digit code sent to your phone</p>
                <div className="flex gap-2 mt-3">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el) => { otpRefs.current[i] = el }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      className="w-10 h-11 sm:w-11 sm:h-11 border border-gray-200 rounded-lg text-center text-xl font-bold text-[#1A2B5E] bg-white outline-none focus:ring-2 focus:ring-[#1A2B5E]/20 focus:border-[#1A2B5E] transition-all"
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setForgotStep("newpass")}
                  className="w-full mt-3 bg-[#1A2B5E] text-white font-semibold py-2.5 rounded-xl text-sm hover:bg-[#0d1733] transition-all"
                >
                  Verify Code →
                </button>
                <button
                  type="button"
                  onClick={() => setForgotStep("email")}
                  className="w-full mt-2 text-sm text-gray-500 hover:text-gray-700"
                >
                  ← Back to Sign In
                </button>
              </>
            )}

            {forgotStep === "newpass" && (
              <>
                <h3 className="font-semibold text-[#1A2B5E]">Set New Password</h3>
                <PasswordInput
                  label="New Password"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  placeholder="New password"
                  className="mt-3"
                  autoComplete="new-password"
                />
                <PasswordInput
                  label="Confirm Password"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  placeholder="Confirm new password"
                  className="mt-3"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => {
                    showToast("✓ Password updated! Please sign in.")
                    setForgotStep("idle")
                    setNewPass("")
                    setConfirmPass("")
                    setOtp(["", "", "", "", "", ""])
                    setForgotIdentifier("")
                  }}
                  disabled={!newPass || newPass !== confirmPass}
                  className="w-full mt-3 bg-[#1A2B5E] text-white font-semibold py-2.5 rounded-xl text-sm hover:bg-[#0d1733] transition-all disabled:opacity-50"
                >
                  Update Password →
                </button>
                <button
                  type="button"
                  onClick={() => setForgotStep("idle")}
                  className="w-full mt-2 text-sm text-gray-500 hover:text-gray-700"
                >
                  ← Back to Sign In
                </button>
              </>
            )}
          </div>
        )}

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">or continue with</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <SocialLogin onToast={showToast} />

        <p className="text-sm text-center mt-5 text-gray-500">
          Don&apos;t have an account?{" "}
          <Link href="/account/register" className="text-[#D4A017] font-medium hover:underline">
            Create one →
          </Link>
        </p>
      </AuthLayout>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-5px); }
          80% { transform: translateX(5px); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  )
}
