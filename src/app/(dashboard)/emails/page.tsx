import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { EmailTable } from "@/components/tables/emails";
import { Suspense } from "react";

export default function EmailsPage() {
  return (
    <Suspense fallback={<DataTableSkeleton columnCount={7} rowCount={10} />}>
      <EmailTable />
    </Suspense>
  );
}
