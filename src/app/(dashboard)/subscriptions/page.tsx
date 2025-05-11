import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { SubscriptionTable } from "@/components/tables/subscription-table";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Subscriptions | TidyMail",
  description: "Manage your email subscriptions",
}

export default function SubscriptionsPage() {
  return (
    <Suspense fallback={<DataTableSkeleton columnCount={7} rowCount={10} />}>
      <SubscriptionTable />
    </Suspense>
  );
}
