"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { FcGoogle } from "react-icons/fc"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Sparkles } from "lucide-react"
import Image from "next/image"
import logo from "@/assets/logo.png"

export function LoginForm({ className }: React.ComponentProps<"div">) {
  const handleGoogleLogin = () => {
    // Redirect to backend Google OAuth endpoint
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/login`
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Image
                src={logo}
                alt="TidyMail Logo"
                className="h-8 w-8 rounded-full"
                width={32}
                height={32}
              />
            </div>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Welcome to TidyMail</h1>
          <p className="text-sm text-muted-foreground">Manage your email subscriptions with ease</p>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-center">Sign in</CardTitle>
            <CardDescription className="text-center">Continue with Google to access your account</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">secure authentication</span>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full h-12 cursor-pointer border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
              onClick={handleGoogleLogin}
            >
              <FcGoogle className="mr-2 h-5 w-5" />
              <span>Login with Google</span>
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col">
            <p className="mt-2 text-xs text-center text-muted-foreground">
              By continuing, you agree to our{" "}
              <a href="/terms" className="underline underline-offset-4 hover:text-primary">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="underline underline-offset-4 hover:text-primary">
                Privacy Policy
              </a>
              .
            </p>
          </CardFooter>
        </Card>

        <div className="flex items-center justify-center text-sm text-muted-foreground">
          <Sparkles className="mr-1 h-4 w-4" />
          <span>Simplify your inbox experience</span>
        </div>
      </div>
    </div>
  )
}
