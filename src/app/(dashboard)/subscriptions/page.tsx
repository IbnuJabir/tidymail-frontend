import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { SubscriptionTable } from "@/components/tables/subscription-table";
import { Suspense } from "react";

export default function SubscriptionsPage() {
  return (
    <Suspense fallback={<DataTableSkeleton columnCount={7} rowCount={10} />}>
      <SubscriptionTable />
    </Suspense>
  );
}
