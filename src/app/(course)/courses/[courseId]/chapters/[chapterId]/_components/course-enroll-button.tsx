"use client"

import { Button } from "@/components/ui/button"
import {formatPrice} from "@/lib/format";

interface CourseEnrollButtonProps {
  price: number
  courseId: string
}

export function CourseEnrollButton({
  price,
  courseId,
}: CourseEnrollButtonProps ) {
  return (
    <Button
      size="sm"
      className="w-full md:w-auto"
    >
      {formatPrice(price)}
    </Button>
  )
}