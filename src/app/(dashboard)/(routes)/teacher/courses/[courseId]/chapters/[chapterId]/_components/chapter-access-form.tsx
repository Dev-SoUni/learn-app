"use client"

import * as z from "zod"
import axios from "axios"
import { useForm } from "react-hook-form"
import { Pencil } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { zodResolver} from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { cn } from '@/lib/utils'

import {
  Form,
  FormDescription,
  FormField,
  FormItem,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import type { Chapter } from "@prisma/client"
import { Checkbox } from "@/components/ui/checkbox"


interface  ChapterAccessFormProps {
  initialData: Chapter,
  courseId: string,
  chapterId: string,
}

const formSchema = z.object({
  isFree: z.boolean().default(false),
})

export function ChapterAccessForm({
  initialData,
  courseId,
  chapterId,
}: ChapterAccessFormProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const toggleEdit = () => setIsEditing((current) => !current)

  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { isFree: initialData.isFree },
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values)
      toast.success("챕터가 수정되었습니다.")
      toggleEdit()
      router.refresh()
    } catch {
      toast.error("알 수 없는 오류가 발생했습니다.")
    }
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
        <div className="font-medium flex items-center justify-between">
          무료 공개 여부
          <Button onClick={toggleEdit} variant="ghost">
            {isEditing ? (
              <>취소</>
            ) : (
              <>
                <Pencil className="h-4 w-4 mr-2" />
                수정
              </>
            )}
          </Button>
        </div>
      {!isEditing && (
        <p className={cn(
          "text-sm mt-2",
          !initialData.isFree && "text-slate-500 italic"
        )}>
          {initialData.isFree ? (
            <>
              이번 챕터는 무료 미리보기로 공개되었습니다.
            </>
          ): (
            <>이번 챕터는 유료입니다.</>
          )}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="isFree"
              render={({field}) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    />
                  <div className="space-y-1 leading-none">
                    <FormDescription>
                      해당 챕터가 무료로 공개하길 원한다면 체크해주세요.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button
                disabled={!isValid || isSubmitting}
                type="submit"
              >
                저장
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}
