import { DataTableSkeleton } from "@/components/data-table-skeleton";
import { ProductTableWrapper } from "@/components/product-table-wrapper";
import { Suspense } from "react";
import Dashboard from "./dashboard/page";
export default function Home() {
  return (
    <>
      <main>
        <Dashboard />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </>
  );
}
