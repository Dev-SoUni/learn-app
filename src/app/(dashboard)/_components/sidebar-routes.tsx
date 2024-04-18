"use client"

import { usePathname } from "next/navigation"
import { BarChart, Compass, Layout, List } from "lucide-react"

import { SidebarItem } from "./sidebar-item"

const guestRoutes = [
  {
    icon: Layout,
    label: "대시보드",
    href: "/",
  },
  {
    icon: Compass,
    label: "탐색",
    href: "/search",
  },
]

const teacherRoutes = [
  {
    icon: List,
    label: "강좌",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "통계",
    href: "/teacher/analytics",
  },
]

export function SidebarRoutes() {
  const pathname = usePathname()

  const isTeacherPage = pathname?.includes("/teacher")

  const routes = isTeacherPage ? teacherRoutes : guestRoutes

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  )
}
