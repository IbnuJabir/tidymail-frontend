import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { UnsubscribedTable } from "@/components/tables/unsubscribed-table";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Unsubscribed | TidyMail",
  description: "Manage your unsubscribed emails",
}

export default function UnubscribedPage() {
  return (
    <Suspense fallback={<DataTableSkeleton columnCount={7} rowCount={10} />}>
      <UnsubscribedTable />
    </Suspense>
  );
}
