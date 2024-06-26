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
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { Course } from "@prisma/client"
import { formatPrice } from "@/lib/format"


interface  PriceFormProps {
  initialData: Course,
  courseId: string,
}

const formSchema = z.object({
  price: z.coerce.number(),
})

export function PriceForm({
  initialData,
  courseId,
}: PriceFormProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const toggleEdit = () => setIsEditing((current) => !current)

  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: initialData.price || undefined,
    },
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values)
      toast.success("강좌가 수정되었습니다.")
      toggleEdit()
      router.refresh()
    } catch {
      toast.error("알 수 없는 오류가 발생했습니다.")
    }
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
        <div className="font-medium flex items-center justify-between">
          가격
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
          !initialData.price && "text-slate-500 italic"
        )}>
          {initialData.price
            ? formatPrice(initialData.price) : "가격 없음"}
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
              name="price"
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      step="1000"
                      disabled={isSubmitting}
                      placeholder="강좌 가격"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
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
