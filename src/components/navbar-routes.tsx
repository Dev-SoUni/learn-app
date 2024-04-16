"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { UserButton } from "@clerk/nextjs"
import { LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SearchInput } from "@/components/search-input"

export function NavbarRoutes() {
  const pathname = usePathname()

  const isTeacherPage = pathname?.startsWith("/teacher")
  const isPlayerPage = pathname?.includes("/chapter")
  const isSearchPage = pathname === "/search"

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto">
        {isTeacherPage || isPlayerPage ? (
          <Button size="sm" variant="ghost" asChild>
            <Link href="/">
              <LogOut className="h-4 w-4 mr-2"/>
              <span>나가기</span>
            </Link>
          </Button>
        ): (
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
    </>
  )
}
