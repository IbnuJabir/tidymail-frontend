import type React from "react"
// This is a separate layout for authentication pages (login and signup)
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
