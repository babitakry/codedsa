import React from "react";
import { Link, useLocation } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import ThemeToggle from "@/components/common/ThemeToggle";
import { useAuth } from "@/context/AuthContext";
import { Shield, ExternalLink, ChevronRight, User } from "lucide-react";

export const AdminHeader = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes("/admin/users")) return "Users Directory";
    if (path.includes("/admin/problems/add")) return "Add Problem";
    if (path.includes("/admin/problems")) return "Manage Problems";
    if (path.includes("/admin/submission")) return "Submissions";
    return "Admin Dashboard";
  };

  return (
    <header className="sticky top-0 z-30 h-14 w-full bg-white/85 dark:bg-[#1a1a1a]/85 backdrop-blur-md border-b border-neutral-200/80 dark:border-[#2e2e2e] flex items-center justify-between px-4 sm:px-6 font-sans text-xs transition-colors select-none">
      
      {/* Left: Sidebar Trigger & Breadcrumb */}
      <div className="flex items-center gap-3">
        <SidebarTrigger className="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-[#282828] text-neutral-600 dark:text-neutral-300 transition cursor-pointer" />
        
        <div className="h-4 w-[1px] bg-neutral-200 dark:bg-neutral-700 hidden sm:block" />

        <div className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400">
          <span className="hidden sm:inline font-medium">Admin</span>
          <ChevronRight className="w-3.5 h-3.5 hidden sm:inline opacity-60" />
          <span className="font-semibold text-neutral-900 dark:text-neutral-100 text-xs sm:text-sm">
            {getPageTitle()}
          </span>
        </div>
      </div>

      {/* Right: ThemeToggle, Return to App & Profile */}
      <div className="flex items-center gap-3">
        <ThemeToggle />

        <Link
          to="/"
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-neutral-200 dark:border-[#383838] bg-white dark:bg-[#282828] hover:bg-neutral-50 dark:hover:bg-[#333333] text-neutral-700 dark:text-neutral-300 font-medium transition"
        >
          <span>Exit Admin</span>
          <ExternalLink className="w-3 h-3 text-neutral-400" />
        </Link>

        {isAuthenticated && (
          <Link
            to="/profile"
            className="flex items-center justify-center w-7 h-7 rounded-full bg-neutral-100 dark:bg-[#282828] border border-neutral-200 dark:border-[#383838] hover:border-[#00b8a3] text-neutral-700 dark:text-neutral-300 transition"
            title="Admin Profile"
          >
            <User className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </header>
  );
};

export default AdminHeader;
