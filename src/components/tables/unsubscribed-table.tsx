"use client";

import { DataTable } from "@/components/data-table/data-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useDataTable } from "@/hooks/use-data-table";
import { useMediaQuery } from "@/hooks/use-media-query";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";

import type {
  Column,
  ColumnDef,
  PaginationState,
  Updater,
  SortingState,
} from "@tanstack/react-table";
import {
  Loader2,
  Mail,
  MoreHorizontal,
  Search,
  Trash,
  Trash2,
  X,
} from "lucide-react";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import * as React from "react";
import {
  bulkDelete,
  bulkTrash,
  getUnsubscribedEmails,
  subscribeBack,
} from "@/services/email-service";
import type { Subscription } from "@/types/email";
import { DataTableViewOptions } from "../data-table/data-table-view-options";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function UnsubscribedTable() {
  const queryClient = useQueryClient();
  // URL query parameters - using nuqs for state management
  const [search, setSearch] = useQueryState(
    "search_query",
    parseAsString.withDefault("")
  );
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [pageSize, setPageSize] = useQueryState(
    "limit",
    parseAsInteger.withDefault(10)
  );
  const [sortField, setSortField] = useQueryState(
    "sort_by",
    parseAsString.withDefault("")
  );
  const [sortOrder, setSortOrder] = useQueryState(
    "order",
    parseAsString.withDefault("")
  );

  const isMobile = useMediaQuery("(max-width: 640px)");

  // Local state for search input
  const [searchInput, setSearchInput] = React.useState(search || "");

  // State for keeping starred emails
  const [keepStarred, setKeepStarred] = React.useState(false);

  // State for confirmation dialogs
  const [confirmDialog, setConfirmDialog] = React.useState<{
    isOpen: boolean;
    title: string;
    description: string;
    action: () => void;
    showKeepStarred?: boolean;
  }>({
    isOpen: false,
    title: "",
    description: "",
    action: () => {},
    showKeepStarred: false,
  });

  // Convert URL query params to table sorting state
  const sortingState = React.useMemo(() => {
    return sortField ? [{ id: sortField, desc: sortOrder === "desc" }] : [];
  }, [sortField, sortOrder]);

  // Handle sorting changes from the table
  const handleSortingChange = React.useCallback(
    async (updater: Updater<SortingState>) => {
      const currentSorting: SortingState = sortingState;

      const newSorting =
        typeof updater === "function" ? updater(currentSorting) : updater;

      if (newSorting.length > 0) {
        await setSortField(newSorting[0].id);
        await setSortOrder(newSorting[0].desc ? "desc" : "asc");
      } else {
        await setSortField(null);
        await setSortOrder(null);
      }
    },
    [sortingState, setSortField, setSortOrder]
  );

  // Reset keepStarred when dialog opens
  React.useEffect(() => {
    if (confirmDialog.isOpen) {
      setKeepStarred(false);
    }
  }, [confirmDialog.isOpen]);

  // Mutations
  const subscribeBackMutation = useMutation({
    mutationFn: (email: string) => subscribeBack(email),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
      setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
      toast.success("Subscribed back successfully", {
        description: "The email has been added back to the mailing list.",
      });
    },
    onError: (error) => {
      toast.error("Failed to subscribe back", {
        description:
              (error as { response?: { data?: { detail?: string } } })?.response?.data?.detail ||
              (error instanceof Error ? error.message : "An unknown error occurred"),
      });
    },
  });

  const bulkTrashMutation = useMutation({
    mutationFn: ({
      emails,
      keepStarred,
    }: {
      emails: string | string[];
      keepStarred: boolean;
    }) => bulkTrash(emails, keepStarred),
    onSuccess: (_, { emails }) => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
      setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
      toast.success("Moved to trash", {
        description: Array.isArray(emails)
          ? `${emails.length} subscriptions moved to trash`
          : "Subscription moved to trash successfully",
      });
    },
    onError: (error) => {
      toast.error("Failed to move to trash", {
        description:
                (error as { response?: { data?: { detail?: string } } })?.response?.data?.detail ||
                (error instanceof Error ? error.message : "An unknown error occurred"),
      });
    },
  });

  const bulkDeleteMutation = useMutation({
    mutationFn: ({
      emails,
      keepStarred,
    }: {
      emails: string | string[];
      keepStarred: boolean;
    }) => bulkDelete(emails, keepStarred),
    onSuccess: (_, { emails }) => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
      setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
      toast.success("Deleted permanently", {
        description: Array.isArray(emails)
          ? `${emails.length} subscriptions deleted permanently`
          : "Subscription deleted permanently",
      });
    },
    onError: (error) => {
      toast.error("Failed to delete", {
        description:
                (error as { response?: { data?: { detail?: string } } })?.response?.data?.detail ||
                (error instanceof Error ? error.message : "An unknown error occurred"),
      });
    },
  });

  // Fetch subscriptions with React Query
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["subscriptions", page, pageSize, sortField, sortOrder, search],
    queryFn: async () => {
      // Build query parameters as a URLSearchParams object
      const params = new URLSearchParams();

      // Add pagination params
      params.append("page", page?.toString() || "1");
      params.append("limit", pageSize?.toString() || "10");

      // Add search param if present
      if (search) {
        params.append("search_query", search);
      }

      // Add sorting params with the correct parameter names
      if (sortField) {
        params.append("sort_by", sortField);
        params.append("order", sortOrder || "asc");
      }

      // Call the API with the constructed params
      return getUnsubscribedEmails(params.toString());
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  // Calculate total pages from API response
  const totalPages = React.useMemo(() => {
    if (data?.totalPages) {
      return data.totalPages;
    }
    return 1;
  }, [data]);
  // Initialize searchInput with search value when component mounts or search changes
  React.useEffect(() => {
    setSearchInput(search || "");
  }, [search]);

  // Handle search input change
  const handleSearchInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value);
    },
    []
  );

  // Handle search form submission
  const handleSearchSubmit = React.useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      await setSearch(searchInput);
      await setPage(1); // Reset to first page on new search
    },
    [searchInput, setSearch, setPage]
  );

  // Handle search clear
  const handleSearchClear = React.useCallback(async () => {
    setSearchInput("");
    await setSearch("");
    await setPage(1);
  }, [setSearch, setPage]);

  const handlePaginationChange = React.useCallback(
    async (updater: Updater<PaginationState>) => {
      const currentPagination: PaginationState = {
        pageIndex: (page || 1) - 1,
        pageSize: pageSize || 10,
      };

      const newPagination =
        typeof updater === "function" ? updater(currentPagination) : updater;

      await setPage(newPagination.pageIndex + 1);
      await setPageSize(newPagination.pageSize);
    },
    [page, pageSize, setPage, setPageSize]
  );

  // Action handlers
  const handleSubscribeBack = React.useCallback(
    (subscription: Subscription) => {
      setConfirmDialog({
        isOpen: true,
        title: "Subscribe Back",
        description: `Are you sure you want to subscribe back to ${subscription.name} (${subscription.email})?`,
        action: () => subscribeBackMutation.mutate(subscription.email),
        showKeepStarred: false,
      });
    },
    [subscribeBackMutation]
  );

  const handleBulkTrash = React.useCallback(
    (subscription: Subscription) => {
      setConfirmDialog({
        isOpen: true,
        title: "Move to Trash",
        description: `Are you sure you want to move all messages from ${subscription.name} (${subscription.email}) to trash?`,
        action: () =>
          bulkTrashMutation.mutate({ emails: subscription.email, keepStarred }),
        showKeepStarred: true,
      });
    },
    [bulkTrashMutation, keepStarred]
  );

  const handleBulkDelete = React.useCallback(
    (subscription: Subscription) => {
      setConfirmDialog({
        isOpen: true,
        title: "Permanently Delete",
        description: `Are you sure you want to permanently delete all messages from ${subscription.name} (${subscription.email})? This action cannot be undone.`,
        action: () =>
          bulkDeleteMutation.mutate({
            emails: subscription.email,
            keepStarred,
          }),
        showKeepStarred: true,
      });
    },
    [bulkDeleteMutation, keepStarred]
  );

  const handleBulkRowTrash = React.useCallback(
    (selectedRows: Subscription[]) => {
      const emails = selectedRows.map((row) => row.email);
      setConfirmDialog({
        isOpen: true,
        title: "Move to Trash",
        description: `Are you sure you want to move all messages from selected rows to trash?`,
        action: () => bulkTrashMutation.mutate({ emails, keepStarred }),
        showKeepStarred: true,
      });
    },
    [bulkTrashMutation, keepStarred]
  );

  const handleBulkRowDelete = React.useCallback(
    (selectedRows: Subscription[]) => {
      const emails = selectedRows.map((row) => row.email);
      setConfirmDialog({
        isOpen: true,
        title: "Permanently Delete",
        description: `Are you sure you want to permanently delete all messages from selected rows? This action cannot be undone.`,
        action: () => bulkDeleteMutation.mutate({ emails, keepStarred }),
        showKeepStarred: true,
      });
    },
    [bulkDeleteMutation, keepStarred]
  );

  const columns = React.useMemo<ColumnDef<Subscription>[]>(
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
        id: "name",
        accessorKey: "name",
        header: ({ column }: { column: Column<Subscription, unknown> }) => (
          <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ cell }) => (
          <div className="font-medium">{cell.getValue<string>()}</div>
        ),
        meta: {
          label: "Name",
          placeholder: "Search name...",
          variant: "text",
        },
        enableColumnFilter: true,
        enableSorting: true,
      },
      {
        id: "email",
        accessorKey: "email",
        header: ({ column }: { column: Column<Subscription, unknown> }) => (
          <DataTableColumnHeader column={column} title="Email" />
        ),
        cell: ({ cell }) => (
          <div className="max-w-md truncate">{cell.getValue<string>()}</div>
        ),
        meta: {
          label: "Email",
          placeholder: "Search email...",
          variant: "text",
        },
        enableColumnFilter: true,
        enableSorting: true,
      },
      {
        id: "domain",
        accessorKey: "domain",
        header: ({ column }: { column: Column<Subscription, unknown> }) => (
          <DataTableColumnHeader column={column} title="Domain" />
        ),
        cell: ({ cell }) => <div>{cell.getValue<string>()}</div>,
        meta: {
          label: "Domain",
          placeholder: "Search domain...",
          variant: "text",
        },
        enableColumnFilter: true,
        enableSorting: true,
        // Hide domain column on mobile
        enableHiding: true,
        size: isMobile ? 0 : undefined,
      },
      {
        id: "email_count",
        accessorKey: "email_count",
        header: ({ column }: { column: Column<Subscription, unknown> }) => (
          <DataTableColumnHeader column={column} title="Emails" />
        ),
        cell: ({ cell }) => {
          const count = cell.getValue<number>();
          return (
            <div className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              {count}
            </div>
          );
        },
        enableSorting: true,
      },
      {
        id: "actions",
        cell: function Cell({ row }) {
          const isSubscribingBack =
            subscribeBackMutation.isPending &&
            subscribeBackMutation.variables === row.original.email;
          const isTrashingRow =
            bulkTrashMutation.isPending &&
            typeof bulkTrashMutation.variables?.emails === "string" &&
            bulkTrashMutation.variables.emails === row.original.email;
          const isDeletingRow =
            bulkDeleteMutation.isPending &&
            typeof bulkDeleteMutation.variables?.emails === "string" &&
            bulkDeleteMutation.variables.emails === row.original.email;
          const isLoading = isSubscribingBack || isTrashingRow || isDeletingRow;

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <MoreHorizontal className="h-4 w-4" />
                  )}
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => handleSubscribeBack(row.original)}
                  disabled={isLoading}
                >
                  {isSubscribingBack ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <X className="mr-2 h-4 w-4" />
                  )}
                  Subscribe Back
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => handleBulkTrash(row.original)}
                  disabled={isLoading || row.original.email_count === 0}
                >
                  {isTrashingRow ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Trash className="mr-2 h-4 w-4" />
                  )}
                  Move to Trash
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => handleBulkDelete(row.original)}
                  disabled={isLoading || row.original.email_count === 0}
                  className="text-destructive"
                >
                  {isDeletingRow ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="mr-2 h-4 w-4" />
                  )}
                  Delete Permanently
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
        size: 32,
      },
    ],
    [
      handleSubscribeBack,
      handleBulkTrash,
      handleBulkDelete,
      isMobile,
      subscribeBackMutation.isPending,
      subscribeBackMutation.variables,
      bulkTrashMutation.isPending,
      bulkTrashMutation.variables,
      bulkDeleteMutation.isPending,
      bulkDeleteMutation.variables,
    ]
  );

  const { table } = useDataTable({
    data: data?.data || [],
    columns,
    pageCount: totalPages,
    onPaginationChange: handlePaginationChange,
    onSortingChange: handleSortingChange,
    initialState: {
      pagination: {
        pageIndex: (page || 1) - 1, // Convert 1-based to 0-based for table
        pageSize: pageSize || 10,
      },
      sorting: sortingState,
      columnPinning: { left: ["select"], right: ["actions"] },
      columnVisibility: {
        domain: !isMobile,
      },
    },
    getRowId: (row) => row.id,
  });

  // Get selected rows for bulk actions
  const selectedRows = table
    .getSelectedRowModel()
    .rows.map((row) => row.original);
  const hasSelected = selectedRows.length > 0;

  // Render loading state
  if (isLoading) {
    return <DataTableSkeleton columnCount={5} rowCount={10} />;
  }

  // Render error state
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <div className="text-red-500 mb-4">
          Error loading subscriptions:{" "}
          {error instanceof Error ? error.message : "Unknown error"}
        </div>
        <Button onClick={() => refetch()}>Retry</Button>
      </div>
    );
  }

  const isBulkTrashLoading =
    bulkTrashMutation.isPending &&
    bulkTrashMutation.variables?.emails &&
    Array.isArray(bulkTrashMutation.variables.emails);

  const isBulkDeleteLoading =
    bulkDeleteMutation.isPending &&
    bulkDeleteMutation.variables?.emails &&
    Array.isArray(bulkDeleteMutation.variables.emails);

  return (
    <div className="data-table-container">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <h2 className="text-xl font-bold">Unsubscribed</h2>

        {/* Search form with button */}
        <form onSubmit={handleSearchSubmit} className="flex w-full sm:w-auto">
          <div className="relative flex-1 min-w-[200px] sm:w-64 md:w-80">
            <Input
              type="text"
            placeholder="Search by name, email, domain ..."
              className="pr-16" // Make room for the buttons
              value={searchInput}
              onChange={handleSearchInputChange}
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              {searchInput && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={handleSearchClear}
                  className="h-full aspect-square rounded-none border-l"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Clear search</span>
                </Button>
              )}
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                className="h-full aspect-square rounded-none border-l"
              >
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </div>
          </div>
        </form>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleBulkRowTrash(selectedRows)}
            disabled={
              !hasSelected ||
              isBulkTrashLoading ||
              selectedRows.some((email) => email.email_count === 0)
            }
          >
            {isBulkTrashLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Trash className="mr-2 h-4 w-4" />
            )}
            <span className="hidden sm:inline">Move to Trash</span>
            <span className="sm:hidden">Trash</span>
          </Button>

          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleBulkRowDelete(selectedRows)}
            disabled={
              !hasSelected ||
              isBulkDeleteLoading ||
              selectedRows.some((email) => email.email_count === 0)
            }
          >
            {isBulkDeleteLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="mr-2 h-4 w-4" />
            )}
            <span className="hidden sm:inline">Delete Permanently</span>
            <span className="sm:hidden">Delete</span>
          </Button>
          <DataTableViewOptions table={table} />
        </div>
      </div>

      {/* Data Table */}
      <DataTable table={table} />

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialog.isOpen}
        onOpenChange={(open) =>
          setConfirmDialog((prev) => ({ ...prev, isOpen: open }))
        }
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{confirmDialog.title}</DialogTitle>
            <DialogDescription>{confirmDialog.description}</DialogDescription>
          </DialogHeader>

          {confirmDialog.showKeepStarred && (
            <div className="flex items-center justify-between pt-2">
              <label
                htmlFor="keep-starred"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Keep starred emails
              </label>
              <Switch
                id="keep-starred"
                checked={keepStarred}
                onCheckedChange={setKeepStarred}
                className="data-[state=checked]:bg-primary"
              />
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() =>
                setConfirmDialog((prev) => ({ ...prev, isOpen: false }))
              }
              disabled={
                subscribeBackMutation.isPending ||
                bulkTrashMutation.isPending ||
                bulkDeleteMutation.isPending
              }
            >
              Cancel
            </Button>
            <Button
              variant={
                confirmDialog.title === "Permanently Delete"
                  ? "destructive"
                  : "default"
              }
              onClick={confirmDialog.action}
              disabled={
                subscribeBackMutation.isPending ||
                bulkTrashMutation.isPending ||
                bulkDeleteMutation.isPending
              }
            >
              {subscribeBackMutation.isPending ||
              bulkTrashMutation.isPending ||
              bulkDeleteMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Confirm"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
