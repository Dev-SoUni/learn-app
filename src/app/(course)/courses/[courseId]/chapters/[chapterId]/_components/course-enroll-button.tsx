"use client"

import { useState } from "react"
import { toast } from "sonner"
import axios from "axios"

import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/format"


interface CourseEnrollButtonProps {
  price: number
  courseId: string
}

export function CourseEnrollButton({
  price,
  courseId,
}: CourseEnrollButtonProps ) {
  const [isLoading, setIsLoading] = useState(false)

  const onClick = async () => {
    try {
      setIsLoading(true)

      const response = await axios.post(`/api/courses/${courseId}/checkout`)
      window.location.assign(response.data.url)
    } catch {
      toast.error("문제가 일어났습니다.")
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      size="sm"
      className="w-full md:w-auto"
    >
      {formatPrice(price)}
    </Button>
  )
}
