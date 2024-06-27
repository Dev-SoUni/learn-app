import { NavbarRoutes } from "@/components/navbar-routes"

import { MobileSidebar } from "./mobile-sidebar"

export function Navbar() {
  return (
    <div className="px-4 border-b h-full bg-white shadow-sm">
      <div className="container h-full flex items-center ">
        <MobileSidebar />
        <NavbarRoutes />
      </div>
    </div>
  )
}
