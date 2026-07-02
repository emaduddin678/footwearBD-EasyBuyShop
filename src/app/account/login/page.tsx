import { Suspense } from "react"
import LoginPage from "@/components/pages/LoginPage"

export const metadata = {
  title: "Sign In — FootwearBD",
  description: "Sign in to your FootwearBD account",
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <LoginPage />
    </Suspense>
  )
}
