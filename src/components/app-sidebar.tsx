"use client";

import * as React from "react";
import { ChartColumn, Home, UserX } from "lucide-react";
import { UserRound } from "lucide-react";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
// import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/hooks/useAuth";
import logo from "@/assets/logo-w.png";
import { NavAccount } from "./nav-projects";

const routes = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/dashboard",
  },
  // {
  //   title: "Emails",
  //   icon: Mail,
  //   href: "/emails",
  // },
  {
    title: "Subscriptions",
    icon: UserRound,
    href: "/subscriptions",
  },
  {
    title: "Unsubscribed",
    icon: UserX,
    href: "/unsubscribed",
  },
];
const accountSetting = [
  // {
  //   name: "Account",
  //   url: "/account",
  //   icon: UserRound
  // }, 
  {
    name: "Usage",
    url: "/usage",
    icon: ChartColumn
  }, 
  // {
  //   name: "Setting",
  //   url: "/setting",
  //   icon: Settings
  // }
]
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { data: user } = useUser();
  const teams = {
    name: "Tidy Mail.",
    logo: logo,
    plan: user?.subscription_plan.toUpperCase(),
  };
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {routes.map((route) => (
            <SidebarMenuItem key={route.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === route.href}
                tooltip={route.title}
              >
                <a href={route.href}>
                  <route.icon />
                  <span>{route.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <NavAccount accountSetting={accountSetting}/>
      </SidebarContent>
      <SidebarFooter>{user && <NavUser {...user} />}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
