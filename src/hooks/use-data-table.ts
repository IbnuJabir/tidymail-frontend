"use client";

import {
  type ColumnDef,
  type ColumnFiltersState,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
  type VisibilityState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import * as React from "react";

interface UseDataTableProps<TData, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  pageCount?: number;
  onPaginationChange?: (updater: PaginationState | ((state: PaginationState) => PaginationState)) => void;
  onSortingChange?: (updater: SortingState | ((state: SortingState) => SortingState)) => void;
  initialState?: {
    pagination?: {
      pageIndex?: number;
      pageSize?: number;
    };
    sorting?: SortingState;
    columnVisibility?: VisibilityState;
    columnPinning?: {
      left?: string[];
      right?: string[];
    };
  };
  getRowId?: (row: TData) => string;
}

export function useDataTable<TData, TValue>({
  data,
  columns,
  pageCount,
  onPaginationChange,
  onSortingChange,
  initialState,
  getRowId,
}: UseDataTableProps<TData, TValue>) {
  // URL state management
  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(initialState?.pagination?.pageIndex ?? 0)
  );
  
  const [pageSize, setPageSize] = useQueryState(
    "limit",
    parseAsInteger.withDefault(initialState?.pagination?.pageSize ?? 10)
  );
  
  const [sortField, setSortField] = useQueryState(
    "sort_by",
    parseAsString.withDefault("")
  );
  
  const [sortOrder, setSortOrder] = useQueryState(
    "order",
    parseAsString.withDefault("asc")
  );

  // Local state
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>(
    initialState?.columnVisibility ?? {}
  );
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

  // Convert URL parameters to table state
  const pagination = React.useMemo(
    () => ({
      pageIndex: page,
      pageSize: pageSize,
    }),
    [page, pageSize]
  );

  const sorting = React.useMemo(
    () =>
      sortField
        ? [{ id: sortField, desc: sortOrder === "desc" }]
        : ([] as SortingState),
    [sortField, sortOrder]
  );

  // Handle pagination changes
  const handlePaginationChange = React.useCallback(
    (updater: PaginationState | ((state: PaginationState) => PaginationState)) => {
      if (typeof updater === "function") {
        const newPagination = updater(pagination);
        setPage(newPagination.pageIndex);
        setPageSize(newPagination.pageSize);
        onPaginationChange?.(newPagination);
      } else {
        setPage(updater.pageIndex);
        setPageSize(updater.pageSize);
        onPaginationChange?.(updater);
      }
    },
    [pagination, setPage, setPageSize, onPaginationChange]
  );

  // Handle sorting changes
  const handleSortingChange = React.useCallback(
    (updater: SortingState | ((state: SortingState) => SortingState)) => {
      if (typeof updater === "function") {
        const newSorting = updater(sorting);
        if (newSorting.length > 0) {
          setSortField(newSorting[0].id);
          setSortOrder(newSorting[0].desc ? "desc" : "asc");
        } else {
          setSortField(null);
          setSortOrder(null);
        }
        onSortingChange?.(newSorting);
      } else {
        if (updater.length > 0) {
          setSortField(updater[0].id);
          setSortOrder(updater[0].desc ? "desc" : "asc");
        } else {
          setSortField(null);
          setSortOrder(null);
        }
        onSortingChange?.(updater);
      }
    },
    [sorting, setSortField, setSortOrder, onSortingChange]
  );

  // Create table instance
  const table = useReactTable({
    data,
    columns,
    pageCount: pageCount ?? -1,
    state: {
      pagination,
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    enableRowSelection: true,
    manualPagination: true,
    manualSorting: true,
    onPaginationChange: handlePaginationChange,
    onSortingChange: handleSortingChange,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getRowId,
    initialState: {
      columnPinning: initialState?.columnPinning,
    },
  });

  return {
    table,
    pagination,
    sorting,
    columnFilters,
    columnVisibility,
    rowSelection,
  };
}
