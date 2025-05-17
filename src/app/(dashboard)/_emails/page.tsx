import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { EmailTable } from "@/components/tables/emails";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Emails | TidyMail",
  description: "Manage your email subscriptions",
}

export default function EmailsPage() {
  return (
    <Suspense fallback={<DataTableSkeleton columnCount={7} rowCount={10} />}>
      <EmailTable />
    </Suspense>
  );
}
