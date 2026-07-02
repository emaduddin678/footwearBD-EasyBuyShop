"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { AuthLayout } from "@/components/storefront/auth/AuthLayout"
import { PasswordInput } from "@/components/storefront/auth/PasswordInput"
import { SocialLogin } from "@/components/storefront/auth/SocialLogin"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { loginUser } from "@/lib/store/authSlice"
import authApi from "@/lib/api/auth"
import { useRedirectIfAuthenticated } from "@/lib/hooks/useRedirectIfAuthenticated"

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

type ForgotStep = "idle" | "email" | "sent"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const dispatch = useAppDispatch()
  const authStatus = useAppSelector((s) => s.auth.status)
  const { checking } = useRedirectIfAuthenticated()

  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState("")
  const [shake, setShake] = useState(false)
  const [toast, setToast] = useState("")

  const [forgotStep, setForgotStep] = useState<ForgotStep>("idle")
  const [forgotIdentifier, setForgotIdentifier] = useState("")
  const [forgotLoading, setForgotLoading] = useState(false)
  const [forgotError, setForgotError] = useState("")

  const loading = authStatus === "loading"

  const showToast = (msg: string) => setToast(msg)

  const handleSendResetLink = async () => {
    setForgotError("")
    setForgotLoading(true)
    try {
      await authApi.forgetPassword(forgotIdentifier.trim())
      setForgotStep("sent")
    } catch (err) {
      setForgotError((err as Error).message || "Failed to send reset email")
    } finally {
      setForgotLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const result = await dispatch(loginUser({ email: identifier, password }))

    if (loginUser.fulfilled.match(result)) {
      const user = result.payload
      const returnUrl = searchParams.get("returnUrl") || "/account"
      showToast(`✓ Welcome back, ${user.firstName}!`)
      setTimeout(() => router.push(returnUrl), 1000)
    } else {
      const msg = (result.payload as string) || "Invalid email or password. Please try again."
      setError(`❌ ${msg}`)
      setShake(true)
      setTimeout(() => setShake(false), 600)
    }
  }

  if (checking) {
    return (
      <AuthLayout rightLink={{ label: "New to FootwearBD? Register →", href: "/account/register" }}>
        <div className="flex items-center justify-center py-24">
          <p className="text-sm text-gray-400">Loading…</p>
        </div>
      </AuthLayout>
    )
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
              Email Address
            </label>
            <input
              id="identifier"
              type="email"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="email@example.com"
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
                  Enter your email and we&apos;ll send you a link to reset your password
                </p>
                <input
                  type="email"
                  value={forgotIdentifier}
                  onChange={(e) => setForgotIdentifier(e.target.value)}
                  placeholder="email@example.com"
                  className="w-full mt-3 h-[44px] border border-gray-200 rounded-xl px-4 text-sm bg-white outline-none focus:ring-2 focus:ring-[#1A2B5E]/20 focus:border-[#1A2B5E] transition-all"
                />
                {forgotError && (
                  <p className="text-sm text-red-500 mt-2">{forgotError}</p>
                )}
                <button
                  type="button"
                  onClick={handleSendResetLink}
                  disabled={!forgotIdentifier || forgotLoading}
                  className="w-full mt-3 bg-[#1A2B5E] text-white font-semibold py-2.5 rounded-xl text-sm hover:bg-[#0d1733] transition-all disabled:opacity-50"
                >
                  {forgotLoading ? "Sending…" : "Send Reset Link →"}
                </button>
                <button
                  type="button"
                  onClick={() => { setForgotStep("idle"); setForgotError("") }}
                  className="w-full mt-2 text-sm text-gray-500 hover:text-gray-700"
                >
                  ← Back to Sign In
                </button>
              </>
            )}

            {forgotStep === "sent" && (
              <>
                <h3 className="font-semibold text-[#1A2B5E]">Check Your Email</h3>
                <p className="text-sm text-gray-500 mt-1">
                  We&apos;ve sent a password reset link to{" "}
                  <span className="font-semibold text-[#1A2B5E]">{forgotIdentifier}</span>.
                  The link expires in 10 minutes.
                </p>
                <button
                  type="button"
                  onClick={() => { setForgotStep("idle"); setForgotIdentifier("") }}
                  className="w-full mt-3 bg-[#1A2B5E] text-white font-semibold py-2.5 rounded-xl text-sm hover:bg-[#0d1733] transition-all"
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
