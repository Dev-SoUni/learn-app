"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { UserButton } from "@clerk/nextjs"
import { BarChart, List, LogOut } from "lucide-react"
import cn from "clsx"

import { Button } from "@/components/ui/button"
import { Logo } from "@/app/(dashboard)/_components/logo";


const guestRoutes = [
  {
    label: "홈",
    href: "/",
  },
  {
    label: "강의",
    href: "/search",
  },
]

const teacherNavigations = [
  {
    label: "강좌",
    icon: List,
    href: "/teacher/courses",
  },
  {
    label: "통계",
    href: "/teacher/analytics",
    icon: BarChart,
  }
]

export function NavbarRoutes() {
  const pathname = usePathname()

  const isTeacherPage = pathname?.startsWith("/teacher")
  const isCoursePage = pathname?.includes("/courses")

  const navigations = isTeacherPage ? teacherNavigations : guestRoutes

  return (
    <>
      {/*{isSearchPage && (*/}
      {/*  <div className="hidden md:block">*/}
      {/*    <SearchInput />*/}
      {/*  </div>*/}
      {/*)}*/}
      <div className="w-full h-full flex justify-between ">
        <Link
          href="/"
          className={cn(
            "hidden transition",
            "lg:flex lg:items-center lg:gap-x-2",
            "hover:scale-105",
          )}
        >
          <Logo />
          <span className="text-lg font-bold">TechLearn</span>
        </Link>
        <ul className="hidden lg:flex lg:items-center">
          {
            navigations.map(({ label, href }) => (
              <li key={href} className="h-full">
                <Link
                  href={href}
                  className={cn(
                    "px-6 h-full flex items-center gap-2 border-b-[2.5px] transition",
                    "hover:text-black",
                    pathname === href ? "text-black border-black" : "text-gray-500 border-transparent"
                  )}
                >
                  <span className="text-base font-bold">{label}</span>
                </Link>
              </li>
            ))
          }
        </ul>
        <div className="ml-auto flex gap-x-2 lg:ml-0 items-center">
          {isTeacherPage || isCoursePage ? (
            <Button size="sm" variant="ghost" asChild>
              <Link href="/">
                <LogOut className="h-4 w-4 mr-2"/>
                <span>나가기</span>
              </Link>
            </Button>
          ) : (
            <Button size="sm" variant="ghost" asChild>
              <Link href="/teacher/courses">
                선생님 모드
              </Link>
            </Button>
          )}
          <UserButton
            afterSignOutUrl="/"
          />
        </div>
      </div>

    </>
  )
}
