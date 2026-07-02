"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AuthLayout } from "@/components/storefront/auth/AuthLayout"
import { PasswordInput } from "@/components/storefront/auth/PasswordInput"
import authApi from "@/lib/api/auth"

export default function ResetPasswordPage({ token }: { token: string }) {
  const router = useRouter()
  const [newPass, setNewPass] = useState("")
  const [confirmPass, setConfirmPass] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (newPass.length < 8) {
      setError("Password must be at least 8 characters.")
      return
    }
    if (newPass !== confirmPass) {
      setError("Passwords do not match.")
      return
    }

    setLoading(true)
    try {
      await authApi.resetPassword(token, newPass)
      setSuccess(true)
      setTimeout(() => router.push("/account/login"), 2000)
    } catch (err) {
      setError((err as Error).message || "Failed to reset password. The link may have expired.")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <AuthLayout rightLink={{ label: "Back to Sign In →", href: "/account/login" }}>
        <div className="text-center py-8">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[#1A2B5E]">Password Updated!</h2>
          <p className="text-gray-500 text-sm mt-2">Redirecting you to sign in…</p>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout rightLink={{ label: "Back to Sign In →", href: "/account/login" }}>
      <h1 className="text-2xl font-bold text-[#1A2B5E]">Set New Password</h1>
      <p className="text-gray-500 text-sm mt-1">Choose a new password for your account</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <PasswordInput
          id="newPassword"
          label="New Password"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
          placeholder="At least 8 characters"
          autoComplete="new-password"
          showStrength
        />
        <PasswordInput
          id="confirmPassword"
          label="Confirm New Password"
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
          placeholder="Re-enter new password"
          autoComplete="new-password"
        />

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
            ❌ {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#1A2B5E] hover:bg-[#0d1733] text-white font-semibold text-base py-3.5 rounded-xl mt-2 transition-all disabled:opacity-60"
        >
          {loading ? "Updating…" : "Update Password →"}
        </button>
      </form>
    </AuthLayout>
  )
}
