const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3002"

export interface AuthUser {
  _id: string
  firstName: string
  lastName: string
  email: string
  phoneNumber?: string
  isAdmin: boolean
  isVerified: boolean
  isBanned: boolean
  savedAddresses?: unknown[]
  createdAt?: string
}

const authApi = {
  async login(email: string, password: string): Promise<AuthUser> {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message ?? "Login failed")
    return data.payload.userWithoutPassword as AuthUser
  },

  async logout(): Promise<void> {
    const res = await fetch(`${BASE_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      throw new Error((data as { message?: string }).message ?? "Logout failed")
    }
  },

  async checkAuth(): Promise<AuthUser> {
    const res = await fetch(`${BASE_URL}/api/auth/check-auth/me`, {
      credentials: "include",
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message ?? "Not authenticated")
    return data.payload.me as AuthUser
  },

  async register(payload: {
    firstName: string
    lastName: string
    email: string
    password: string
    phoneNumber?: string
    agreeTerms: boolean
  }): Promise<string> {
    const res = await fetch(`${BASE_URL}/api/users/process-register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message ?? "Registration failed")
    return data.message as string
  },
}

export default authApi
