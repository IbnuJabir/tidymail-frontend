"use client";

import { DataTable } from "@/components/data-table/data-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDataTable } from "@/hooks/use-data-table";

import type { Column, ColumnDef } from "@tanstack/react-table";
import { Clock, MoreHorizontal, Text, User, RefreshCw } from "lucide-react";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { analyseSubcription, fetchEmails } from "@/services/email-service";
import type { Email } from "@/types/email";

export function EmailTable() {
  // URL query parameters
  const [search] = useQueryState("search", parseAsString.withDefault(""));
  const [label] = useQueryState(
    "label",
    parseAsArrayOf(parseAsString).withDefault([])
  );

  // Fetch emails with React Query
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["emails"],
    queryFn: fetchEmails,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  // Format handlers
  const formatDate = React.useCallback((timestamp: string) => {
    if (!timestamp) return "";
    try {
      const date = new Date(Number.parseInt(timestamp));
      return date.toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return timestamp;
    }
  }, []);

  const formatEmailAddress = React.useCallback((emailStr: string) => {
    if (!emailStr) return "";
    const match = emailStr.match(/(.+) <(.+)>/);
    return match ? match[1] : emailStr;
  }, []);

  // Filter data client-side
  const filteredData = React.useMemo(() => {
    if (!data?.data) return [];

    return data.data.filter((email) => {
      // Apply search filter
      const matchesSearch =
        search === "" ||
        email.subject?.toLowerCase().includes(search.toLowerCase()) ||
        email.from?.toLowerCase().includes(search.toLowerCase()) ||
        email.snippet?.toLowerCase().includes(search.toLowerCase());

      // Apply label filter
      const currentLabelFilter = label.length > 0 ? label[0] : undefined;
      const matchesLabel =
        !currentLabelFilter || email.labels?.includes(currentLabelFilter);

      return matchesSearch && matchesLabel;
    });
  }, [data, search, label]);

  const columns = React.useMemo<ColumnDef<Email>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        size: 32,
        enableSorting: false,
        enableHiding: false,
      },
      {
        id: "from",
        accessorKey: "from",
        header: ({ column }: { column: Column<Email, unknown> }) => (
          <DataTableColumnHeader column={column} title="From" />
        ),
        cell: ({ cell }) => (
          <div className="font-medium">
            {formatEmailAddress(cell.getValue<string>())}
          </div>
        ),
        meta: {
          label: "From",
          placeholder: "Search sender...",
          variant: "text",
          icon: User,
        },
        enableColumnFilter: true,
      },
      {
        id: "subject",
        accessorKey: "subject",
        header: ({ column }: { column: Column<Email, unknown> }) => (
          <DataTableColumnHeader column={column} title="Subject" />
        ),
        cell: ({ cell }) => (
          <div className="max-w-md truncate">{cell.getValue<string>()}</div>
        ),
        meta: {
          label: "Subject",
          placeholder: "Search subject...",
          variant: "text",
          icon: Text,
        },
        enableColumnFilter: true,
      },
      {
        id: "timestamp",
        accessorKey: "timestamp",
        header: ({ column }: { column: Column<Email, unknown> }) => (
          <DataTableColumnHeader column={column} title="Date" />
        ),
        cell: ({ cell }) => {
          const timestamp = cell.getValue<string>();
          return (
            <div className="flex items-center gap-1 whitespace-nowrap">
              <Clock className="h-3 w-3" />
              {formatDate(timestamp)}
            </div>
          );
        },
      },
      {
        id: "actions",
        cell: function Cell() {
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View Email</DropdownMenuItem>
                <DropdownMenuItem>Reply</DropdownMenuItem>
                <DropdownMenuItem>Forward</DropdownMenuItem>
                <DropdownMenuItem variant="destructive">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
        size: 32,
      },
    ],
    [formatEmailAddress, formatDate]
  );

  const { table } = useDataTable({
    data: filteredData,
    columns,
    pageCount: 1,
    initialState: {
      sorting: [{ id: "timestamp", desc: true }],
      columnPinning: { left: ["select"], right: ["actions"] },
    },
    getRowId: (row) => row.id,
  });

  // Render loading state
  if (isLoading) {
    return <DataTableSkeleton columnCount={5} rowCount={10} />;
  }

  // Render error state
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <div className="text-red-500 mb-4">
          Error loading emails:{" "}
          {error instanceof Error ? error.message : "Unknown error"}
        </div>
        <Button onClick={() => refetch()}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="data-table-container">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Inbox</h2>
        <Button variant="outline" size="sm" onClick={() => refetch()}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>
      <DataTable table={table}>
        <DataTableToolbar table={table} searchPlaceholder="Search emails..." />
      </DataTable>
    </div>
  );
}
