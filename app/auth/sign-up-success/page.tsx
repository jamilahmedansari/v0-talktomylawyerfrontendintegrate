"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Scale, Mail } from "lucide-react"
import Link from "next/link"

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="w-full max-w-md">
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

          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-100">
                <Mail className="h-6 w-6 text-teal-600" />
              </div>
              <CardTitle className="text-2xl">Check your email</CardTitle>
              <CardDescription>We've sent you a confirmation link to complete your account setup.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center text-sm text-muted-foreground">
                <p>
                  Click the link in your email to verify your account and get started with generating legal letters.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Button asChild className="w-full bg-teal-600 hover:bg-teal-700">
                  <Link href="/auth/login">Return to Login</Link>
                </Button>
                <Button variant="outline" asChild className="w-full bg-transparent">
                  <Link href="/">Back to Home</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
