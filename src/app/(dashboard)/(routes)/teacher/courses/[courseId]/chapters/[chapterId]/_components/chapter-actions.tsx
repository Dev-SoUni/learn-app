"use client"

import { useState } from "react"
import { toast } from "sonner"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ConfirmModal } from "@/components/modals/confirm-modal"


interface ChapterActionsProps {
  disabled: boolean
  courseId: string
  chapterId: string
  isPublished: boolean
}

export function ChapterActions({
  disabled,
  courseId,
  chapterId,
  isPublished,
}: ChapterActionsProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const onClick = async () => {
    try {
      setIsLoading(true)

      if (isPublished) {
        await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/unpublish`)
        toast.success("챕터가 비공개 되었습니다.")
      } else {
        await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/publish`)
        toast.success("챕터가 공개 되었습니다.")
      }

      router.refresh()
    } catch {
      toast.error("문제가 발생했습니다.")
    } finally {
      setIsLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setIsLoading(true)

      await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`)
      toast.success("챕터가 삭제되었습니다.")
      router.push(`/teacher/courses/${courseId}`)
      router.refresh()
    } catch {
      toast.error("문제가 발생했습니다.")
    }
    setIsLoading(false)
  }
  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
      >
        {isPublished ? "비공개" : "공개"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={disabled || isLoading}>
          <Trash className="h-4 w-4"/>
        </Button>
      </ConfirmModal>
    </div>
  )
}
