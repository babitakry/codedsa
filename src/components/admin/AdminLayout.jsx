import React from "react";
import { Routes, Route } from "react-router";
import { SidebarProvider } from "@/components/ui/sidebar";
import AdminProtectedRoute from "@/components/auth/AdminProtectedRoute";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

// Admin Pages
import AdminUsers from "@/pages/admin/AdminUsers";
import AdminProblems from "@/pages/admin/AdminProblems";
import AdminAddProblem from "@/pages/admin/AdminAddProblem";

export const AdminLayout = () => {
  return (
    <SidebarProvider>
      <AdminProtectedRoute>
        <div className="w-full min-h-screen flex bg-neutral-50 dark:bg-[#1a1a1a] text-neutral-800 dark:text-neutral-200 font-sans transition-colors">
          <AdminSidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <AdminHeader />
            <main className="flex-1 overflow-y-auto">
              <Routes>
                <Route path="users" element={<AdminUsers />} />
                <Route path="problems" element={<AdminProblems />} />
                <Route path="problems/add" element={<AdminAddProblem />} />
                <Route path="problems/update/:id" element={<AdminAddProblem />} />
              </Routes>
            </main>
          </div>
        </div>
      </AdminProtectedRoute>
    </SidebarProvider>
  );
};

export default AdminLayout;
