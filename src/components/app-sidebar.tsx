"use client";

import * as React from "react";
import {
  AudioWaveform,
  UserX,
} from "lucide-react";
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

const data = {
  teams: [
    {
      name: "Tidy Mail.",
      logo: AudioWaveform,
      plan: "Free",
    },
  ],
};
const routes = [
  // {
  //   title: "Dashboard",
  //   icon: Home,
  //   href: "/",
  // },
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
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
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
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
