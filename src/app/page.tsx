import { DataTableSkeleton } from "@/components/data-table-skeleton";
import { ProductTableWrapper } from "@/components/product-table-wrapper";
import { Suspense } from "react";
import Dashboard from "./dashboard/page";
export default function Home() {
  return (
    <>
      <main>
        <p className="text-2xl font-bold text-center">Home Page for TidyMail</p>
        {/* add login button that links to login route */}
        <a href="/login"><button>Login</button></a>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </>
  );
}
