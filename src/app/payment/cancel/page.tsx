import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment canceled",
  description: "Your subscription payment was not successful",
};

export default function PaymentSuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10 p-4">
      <h1 className="text-red-500"> Payment canceled</h1>
    </div>
  );
}
