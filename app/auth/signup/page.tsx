"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Scale } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedLetterType, setSelectedLetterType] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const storedLetterType = localStorage.getItem("selectedLetterType")
    const storedFormData = localStorage.getItem("draftFormData")

    if (storedLetterType) {
      setSelectedLetterType(storedLetterType)
    }

    if (storedFormData) {
      setSelectedLetterType("form-data")
    }
  }, [])

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (password !== repeatPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long")
      setIsLoading(false)
      return
    }

    try {
      console.log("[v0] Starting signup process...")

      const supabase = createClient()
      console.log("[v0] Supabase client created successfully")

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/dashboard`,
        },
      })

      console.log("[v0] Signup response:", { data, error })

      if (error) {
        console.error("[v0] Signup error:", error)
        throw error
      }

      console.log("[v0] Signup successful, redirecting...")
      router.push("/auth/sign-up-success")
    } catch (error: unknown) {
      console.error("[v0] Caught error:", error)
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError("An unexpected error occurred. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <div className="text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 transition-colors"
            >
              <Scale className="h-6 w-6" />
              <span className="text-lg font-semibold">talk-to-my-lawyer</span>
            </Link>
          </div>

          {selectedLetterType && (
            <div className="text-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-700">
                {selectedLetterType === "form-data"
                  ? "Create your account to continue with your letter request"
                  : `Create your account to get started with your ${selectedLetterType} letter`}
              </p>
            </div>
          )}

          <div className="running-border fade-in">
            <Card className="running-border-inner border-0">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Create Account
                </CardTitle>
                <CardDescription>Create a new account to get started</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignUp}>
                  <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="animate-input"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="password" className="text-sm font-medium">
                        Password
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="animate-input"
                        placeholder="At least 6 characters"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="repeat-password" className="text-sm font-medium">
                        Confirm Password
                      </Label>
                      <Input
                        id="repeat-password"
                        type="password"
                        required
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        className="animate-input"
                        placeholder="Repeat your password"
                      />
                    </div>
                    {error && (
                      <p className="text-sm text-red-500 animate-in slide-in-from-top-1 duration-200">{error}</p>
                    )}
                    <Button
                      type="submit"
                      className="w-full animate-button bg-teal-600 hover:bg-teal-700"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          Creating account...
                        </span>
                      ) : (
                        "Create Account"
                      )}
                    </Button>
                  </div>
                  <div className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <Link
                      href="/auth/login"
                      className="underline underline-offset-4 transition-colors hover:text-teal-600 text-teal-600"
                    >
                      Login
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
