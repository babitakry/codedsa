import React from "react";
import { Users, Code2, PlusCircle, Send, LogOut, ArrowLeft, ShieldCheck } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import CodeBite from "@/assets/CodeBite.png";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const navItems = [
  {
    title: "Users Directory",
    url: "/admin/users",
    icon: Users,
    badge: null,
  },
  {
    title: "Manage Problems",
    url: "/admin/problems",
    icon: Code2,
    badge: null,
  },
  {
    title: "Add New Problem",
    url: "/admin/problems/add",
    icon: PlusCircle,
    badge: "New",
  },
  {
    title: "Submissions",
    url: "/admin/submission",
    icon: Send,
    badge: null,
  },
];

export function AdminSidebar() {
  const { onLogout } = useAuth();
  const location = useLocation();

  return (
    <Sidebar className="border-r border-neutral-200 dark:border-[#2e2e2e] bg-white dark:bg-[#1a1a1a] text-neutral-800 dark:text-neutral-200 font-sans transition-colors">
      
      {/* Sidebar Header with Brand */}
      <SidebarHeader className="p-4 border-b border-neutral-200/80 dark:border-[#2e2e2e]">
        <div className="flex items-center justify-between">
          <Link to="/admin/users" className="flex items-center gap-2.5 group">
            <img src={CodeBite} alt="Logo" className="w-7 h-7 rounded-full" />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm tracking-tight text-neutral-900 dark:text-neutral-100">
                  CodeDSA
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-[#00b8a3]/15 text-[#00b8a3]">
                  Admin
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 dark:text-neutral-500 font-normal">
                Management Console
              </p>
            </div>
          </Link>
        </div>
      </SidebarHeader>

      {/* Main Navigation */}
      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 px-3 mb-1">
            Administration
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        to={item.url}
                        className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                          isActive
                            ? "bg-[#00b8a3]/10 text-[#00b8a3] dark:text-[#00b8a3] font-semibold shadow-xs"
                            : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-[#282828]"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <item.icon
                            className={`w-4 h-4 ${
                              isActive ? "text-[#00b8a3]" : "text-neutral-500 dark:text-neutral-400"
                            }`}
                          />
                          <span>{item.title}</span>
                        </div>
                        {item.badge && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#ffc01e]/15 text-[#ffc01e]">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Links Group */}
        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 px-3 mb-1">
            Shortcuts
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    to="/problems"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-[#282828] transition"
                  >
                    <ArrowLeft className="w-4 h-4 text-neutral-500" />
                    <span>View Public Problems</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    to="/"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-[#282828] transition"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#00b8a3]" />
                    <span>CodeDSA Homepage</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer with Logout */}
      <SidebarFooter className="p-3 border-t border-neutral-200/80 dark:border-[#2e2e2e]">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AdminSidebar;
