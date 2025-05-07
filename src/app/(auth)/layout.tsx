import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import type React from "react";
// This is a separate layout for authentication pages (login and signup)
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
