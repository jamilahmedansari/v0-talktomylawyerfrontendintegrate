import type React from "react"
import "./globals.css"

export const metadata = {
  title: "Talk to My Lawyer",
  description: "Professional legal letters with AI precision",
  generator: "v0.app",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900 antialiased">{children}</body>
    </html>
  )
}
