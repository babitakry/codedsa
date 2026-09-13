import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { adminEndpoints } from "@/services/api";
import { Users, CheckCircle2, Send, ShieldCheck, Search, Filter, Mail, Globe, GraduationCap } from "lucide-react";
import Loading from "@/components/common/Loading";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(adminEndpoints.ALL_USERS_API);
      setUsers(res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users by search and role
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchSearch =
        u.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.college?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.country?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchRole =
        roleFilter === "ALL" ||
        (roleFilter === "ADMIN" && u.role === "ADMIN") ||
        (roleFilter === "USER" && (!u.role || u.role === "USER"));

      return matchSearch && matchRole;
    });
  }, [users, searchTerm, roleFilter]);

  // Aggregate stats
  const totalSolved = useMemo(() => {
    return users.reduce((acc, curr) => acc + (curr.solved_no_questions || curr.problem_solved_count?.length || 0), 0);
  }, [users]);

  const totalSubmissions = useMemo(() => {
    return users.reduce((acc, curr) => acc + (curr.total_submission || curr.submission_count?.length || 0), 0);
  }, [users]);

  const totalAdmins = useMemo(() => {
    return users.filter((u) => u.role === "ADMIN").length;
  }, [users]);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 font-sans text-neutral-800 dark:text-neutral-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Users Directory
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Monitor registered developers, problem-solving stats, and activity.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#00b8a3]/10 text-[#00b8a3] border border-[#00b8a3]/20">
            {users.length} Registered {users.length === 1 ? "User" : "Users"}
          </span>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Users */}
        <div className="bg-white dark:bg-[#282828] border border-neutral-200 dark:border-[#383838] rounded-xl p-4 sm:p-5 shadow-xs transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Total Users</span>
            <div className="w-8 h-8 rounded-lg bg-[#00b8a3]/10 text-[#00b8a3] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100 mt-2">
            {users.length}
          </p>
        </div>

        {/* Total Solved */}
        <div className="bg-white dark:bg-[#282828] border border-neutral-200 dark:border-[#383838] rounded-xl p-4 sm:p-5 shadow-xs transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Problems Solved</span>
            <div className="w-8 h-8 rounded-lg bg-[#ffc01e]/10 text-[#ffc01e] flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-[#ffc01e] mt-2">
            {totalSolved}
          </p>
        </div>

        {/* Total Submissions */}
        <div className="bg-white dark:bg-[#282828] border border-neutral-200 dark:border-[#383838] rounded-xl p-4 sm:p-5 shadow-xs transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Total Submissions</span>
            <div className="w-8 h-8 rounded-lg bg-[#3b82f6]/10 text-[#3b82f6] flex items-center justify-center">
              <Send className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100 mt-2">
            {totalSubmissions}
          </p>
        </div>

        {/* Admins */}
        <div className="bg-white dark:bg-[#282828] border border-neutral-200 dark:border-[#383838] rounded-xl p-4 sm:p-5 shadow-xs transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Admins</span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400 mt-2">
            {totalAdmins}
          </p>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by username, email, college, country..."
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white dark:bg-[#282828] border border-neutral-200 dark:border-[#383838] rounded-lg text-neutral-900 dark:text-neutral-100 focus:outline-none focus:border-[#00b8a3] placeholder:text-neutral-400 shadow-xs"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="inline-flex rounded-lg border border-neutral-200 dark:border-[#383838] bg-white dark:bg-[#282828] p-1 text-xs">
            {["ALL", "USER", "ADMIN"].map((role) => (
              <button
                key={role}
                onClick={() => setRoleFilter(role)}
                className={`px-3 py-1 rounded-md font-medium transition cursor-pointer ${
                  roleFilter === role
                    ? "bg-[#00b8a3] text-white shadow-xs"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                {role === "ALL" ? "All Roles" : role}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Users Table Card */}
      <div className="bg-white dark:bg-[#282828] border border-neutral-200 dark:border-[#383838] rounded-xl shadow-xs overflow-hidden transition-colors">
        {loading ? (
          <div className="py-16">
            <Loading />
          </div>
        ) : filteredUsers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-neutral-50 dark:bg-[#202020] border-b border-neutral-200 dark:border-[#383838] text-neutral-600 dark:text-neutral-400 font-medium">
                  <th className="px-5 py-3.5">User</th>
                  <th className="px-4 py-3.5">Role</th>
                  <th className="px-4 py-3.5 hidden md:table-cell">Country</th>
                  <th className="px-4 py-3.5 hidden lg:table-cell">College</th>
                  <th className="px-4 py-3.5 text-center">Solved</th>
                  <th className="px-4 py-3.5 text-center">Submissions</th>
                  <th className="px-5 py-3.5 text-right hidden sm:table-cell">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-[#333333]">
                {filteredUsers.map((user, idx) => {
                  const solvedCount = user.solved_no_questions ?? user.problem_solved_count?.length ?? 0;
                  const submissionCount = user.total_submission ?? user.submission_count?.length ?? 0;
                  const initial = (user.username || "U").charAt(0).toUpperCase();

                  return (
                    <tr
                      key={user._id || idx}
                      className="hover:bg-neutral-50/80 dark:hover:bg-[#232323] transition-colors"
                    >
                      {/* User Column */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#00b8a3]/15 text-[#00b8a3] font-bold flex items-center justify-center text-xs flex-shrink-0">
                            {initial}
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-neutral-900 dark:text-neutral-100 truncate">
                              {user.username}
                            </p>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Role Column */}
                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                            user.role === "ADMIN"
                              ? "bg-purple-500/15 text-purple-600 dark:text-purple-300 border border-purple-500/20"
                              : "bg-neutral-100 dark:bg-[#333333] text-neutral-600 dark:text-neutral-300"
                          }`}
                        >
                          {user.role || "USER"}
                        </span>
                      </td>

                      {/* Country Column */}
                      <td className="px-4 py-3.5 text-neutral-600 dark:text-neutral-300 hidden md:table-cell">
                        {user.country ? (
                          <div className="flex items-center gap-1.5 truncate max-w-[130px]">
                            <Globe className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" />
                            <span>{user.country}</span>
                          </div>
                        ) : (
                          <span className="text-neutral-400">—</span>
                        )}
                      </td>

                      {/* College Column */}
                      <td className="px-4 py-3.5 text-neutral-600 dark:text-neutral-300 hidden lg:table-cell">
                        {user.college ? (
                          <div className="flex items-center gap-1.5 truncate max-w-[160px]">
                            <GraduationCap className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" />
                            <span className="truncate">{user.college}</span>
                          </div>
                        ) : (
                          <span className="text-neutral-400">—</span>
                        )}
                      </td>

                      {/* Solved Column */}
                      <td className="px-4 py-3.5 text-center">
                        <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold rounded-md bg-[#00b8a3]/10 text-[#00b8a3]">
                          {solvedCount}
                        </span>
                      </td>

                      {/* Submissions Column */}
                      <td className="px-4 py-3.5 text-center">
                        <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium rounded-md bg-neutral-100 dark:bg-[#333333] text-neutral-700 dark:text-neutral-300">
                          {submissionCount}
                        </span>
                      </td>

                      {/* Joined Column */}
                      <td className="px-5 py-3.5 text-right text-xs text-neutral-500 dark:text-neutral-400 hidden sm:table-cell whitespace-nowrap">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-neutral-400 dark:text-neutral-500 text-xs sm:text-sm">
            <Users className="w-8 h-8 mx-auto mb-2 opacity-40" />
            <p className="font-semibold text-neutral-800 dark:text-neutral-200">No users found</p>
            <p className="mt-1">Try adjusting your search criteria or role filters.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default AdminUsers;
