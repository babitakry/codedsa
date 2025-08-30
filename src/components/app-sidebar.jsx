import { ClipboardList, User, Send, LogOut } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "react-router"
import { useAuth } from "@/context/AuthContext"

// Menu items.
const items = [
  {
    title: "Users",
    url: "/admin/users",
    icon: User,
  },
  {
    title: "Problems",
    url: "/admin/problems",
    icon: ClipboardList,
  },
  {
    title: "Submission",
    url: "/admin/submission",
    icon: Send,
  }
]

export function AppSidebar() {
  const {onLogout} = useAuth();
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarFooter>
          <SidebarMenuButton onClick={onLogout}>
            <LogOut />
            <span>Logout</span>
          </SidebarMenuButton>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  )
}