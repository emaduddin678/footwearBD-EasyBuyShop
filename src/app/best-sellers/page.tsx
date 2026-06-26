import { redirect } from "next/navigation"

export default function Page() {
  redirect("/men?sort=popular")
}
