"use client";

import {
  ChevronsUpDown,
  CreditCard,
  Loader2,
  LogOut,
  Sparkles,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useLogout } from "@/hooks/useAuth";
import { User } from "@/types/auth";
import { useCreateBillingPortalSession } from "@/services/email-service";
import { useState } from "react";
import PricingModal from "./dashboard/pricing-modal";

export function NavUser(user: User) {
  const { isMobile } = useSidebar();
  const logoutMutation = useLogout();
  const billinMutation = useCreateBillingPortalSession();

  const handleLogout = () => {
    logoutMutation.mutate();
  };
  const handleBilling = () => {
    billinMutation.mutate();
  };
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user?.profile_image} alt={user?.name} />
                <AvatarFallback className="rounded-lg">TM</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user?.name}</span>
                <span className="truncate text-xs">{user?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user?.profile_image} alt={user?.name} />
                  <AvatarFallback className="rounded-lg">TM</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user?.name}</span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            {user?.subscription_plan === "free" && (
              <DropdownMenuGroup onClick={() => setIsPricingOpen(true)}>
                <DropdownMenuItem>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Upgrade to Pro
                </DropdownMenuItem>
              </DropdownMenuGroup>
            )}
            {user?.subscription_plan === "pro" && (
              <DropdownMenuGroup onClick={() => setIsPricingOpen(true)}>
                <DropdownMenuItem>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Upgrade to Business
                </DropdownMenuItem>
              </DropdownMenuGroup>
            )}

            <DropdownMenuSeparator />
            {user?.subscription_plan?.toLowerCase() !== "free" && (
              <>
                <DropdownMenuGroup onClick={() => handleBilling()}>
                  <DropdownMenuItem disabled={billinMutation.isPending}>
                    {billinMutation.isPending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <CreditCard />
                    )}
                    Billing
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
              </>
            )}

            {/* <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
            </DropdownMenuGroup> */}
            <DropdownMenuItem
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
            >
              <LogOut className="mr-2 h-4 w-4" />
              {logoutMutation.isPending
                ? "Logging out..."
                : logoutMutation.isError
                ? "Error logging out"
                : "Log out"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <PricingModal open={isPricingOpen} onOpenChange={setIsPricingOpen} />
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
