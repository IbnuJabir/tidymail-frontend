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
  // URL state management - using 1-based pagination for URL
  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(initialState?.pagination?.pageIndex ? initialState.pagination.pageIndex + 1 : 1)
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
    parseAsString.withDefault("")
  );

  // Local state
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>(
    initialState?.columnVisibility ?? {}
  );
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

  // Convert URL parameters to table state (0-based for table)
  const pagination = React.useMemo(
    () => ({
      pageIndex: Math.max(0, (page || 1) - 1), // Convert 1-based to 0-based
      pageSize: pageSize || 10,
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
      const newPagination = typeof updater === "function" ? updater(pagination) : updater;
      
      // Convert 0-based pageIndex to 1-based page for URL
      const newPage = newPagination.pageIndex + 1;
      const newPageSize = newPagination.pageSize;
      
      // Update URL state
      setPage(newPage);
      setPageSize(newPageSize);
      
      // Call external handler if it was passed
      if (onPaginationChange) {
        onPaginationChange(newPagination);
      }
    },
    [pagination, setPage, setPageSize, onPaginationChange]
  );

  // Handle sorting changes
  const handleSortingChange = React.useCallback(
    (updater: SortingState | ((state: SortingState) => SortingState)) => {
      const newSorting = typeof updater === "function" ? updater(sorting) : updater;
      
      if (newSorting.length > 0) {
        setSortField(newSorting[0].id);
        setSortOrder(newSorting[0].desc ? "desc" : "asc");
      } else {
        setSortField(null);
        setSortOrder(null);
      }
      
      // Call external handler if provided
      if (onSortingChange) {
        onSortingChange(newSorting);
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
