"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

interface PasswordInputProps {
  id?: string
  name?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  label?: string
  showStrength?: boolean
  className?: string
  autoComplete?: string
}

function getStrength(password: string): { score: number; label: string; color: string } {
  if (password.length === 0) return { score: 0, label: "", color: "" }
  let score = 0
  if (password.length >= 6) score++
  if (password.length >= 10) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  if (score <= 1) return { score: 1, label: "Weak", color: "bg-red-400" }
  if (score <= 3) return { score: 2, label: "Fair", color: "bg-yellow-400" }
  return { score: 3, label: "Strong", color: "bg-green-500" }
}

export function PasswordInput({
  id,
  name,
  value,
  onChange,
  placeholder = "Enter your password",
  label,
  showStrength = false,
  className = "",
  autoComplete,
}: PasswordInputProps) {
  const [show, setShow] = useState(false)
  const strength = showStrength ? getStrength(value) : null

  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          name={name}
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="w-full h-[46px] border border-gray-200 rounded-xl px-4 pr-12 text-sm text-gray-800 bg-gray-50 outline-none focus:ring-2 focus:ring-[#1A2B5E]/20 focus:border-[#1A2B5E] focus:bg-white transition-all"
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          tabIndex={-1}
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {showStrength && strength && strength.score > 0 && (
        <div className="mt-2">
          <div className="flex gap-1 h-1">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`flex-1 rounded-full transition-all duration-300 ${
                  i <= strength.score ? strength.color : "bg-gray-200"
                }`}
              />
            ))}
          </div>
          <p className={`text-xs mt-1 font-medium ${
            strength.score === 1 ? "text-red-500" :
            strength.score === 2 ? "text-yellow-600" : "text-green-600"
          }`}>
            {strength.label} password
          </p>
        </div>
      )}
    </div>
  )
}
