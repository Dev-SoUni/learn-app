import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function CoursesPage() {
  return (
    <div className="p-6">
      <Link href="/teacher/create">
        <Button>
          새로운 강좌
        </Button>
      </Link>
    </div>
  )
}
