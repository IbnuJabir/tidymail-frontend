import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { UnsubscribedTable } from "@/components/tables/unsubscribed-table";
import { Suspense } from "react";

export default function UnubscribedPage() {
  return (
    <Suspense fallback={<DataTableSkeleton columnCount={7} rowCount={10} />}>
      <UnsubscribedTable />
    </Suspense>
  );
}
