"use client"

import * as z from "zod"
import axios from "axios"
import { useForm } from "react-hook-form"
import { PlusCircle } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { zodResolver} from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { Chapter, Course } from "@prisma/client"
import { cn } from "@/lib/utils"


interface  ChapterFormProps {
  initialData: Course & { chapters: Chapter[] },
  courseId: string,
}

const formSchema = z.object({
  title: z.string().min(1),
})

export function ChapterForm({
  initialData,
  courseId,
}: ChapterFormProps) {
  const [isCreating, setIsCreating] = useState<boolean>(false)
  const [isUpdating, setIsUpdating] = useState<boolean>(false)

  const toggleCreating = () => setIsCreating((current) => !current)

  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/chapters`, values)
      toast.success("챕터가 등록되었습니다.")
      toggleCreating()
      router.refresh()
    } catch {
      toast.error("알 수 없는 오류가 발생했습니다.")
    }
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
        <div className="font-medium flex items-center justify-between">
          챕터
          <Button onClick={toggleCreating} variant="ghost">
            {isCreating ? (
              <>취소</>
            ) : (
              <>
                <PlusCircle className="h-4 w-4 mr-2" />
                등록
              </>
            )}
          </Button>
        </div>
      {isCreating && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="챕터"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={!isValid || isSubmitting}
              type="submit"
            >
              등록
            </Button>
          </form>
        </Form>
      )}
      {!isCreating && (
        <div className={cn(
          "text-sm mt-2",
          !initialData.chapters.length && "text-slate-500 italic"
        )}>
          {!initialData.chapters.length && "챕터 없음"}
        </div>
      )}
      {!isCreating && (
        <p className="text-sm text-muted-foreground mt-4">
          드래그 그랍로 챕터 순서를 변경할 수 있습니다.
        </p>
      )}
    </div>
  )
}
