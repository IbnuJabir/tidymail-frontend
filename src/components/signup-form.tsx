"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

export function SignupForm({ className }: React.ComponentProps<"form">) {
  const handleGoogleLogin = () => {
    // Redirect to backend Google OAuth endpoint
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/login`;
  };
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Signup to your account</h1>
      </div>
      <div className="grid gap-6">
        <Button
          variant="outline"
          className="w-full cursor-pointer"
          onClick={() => handleGoogleLogin()}
        >
          <FcGoogle className="mr-2" />
          Continue with Google
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <a href="/login" className="underline underline-offset-4">
          Login
        </a>
      </div>
    </div>
  );
}
