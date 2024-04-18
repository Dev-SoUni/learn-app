"use client"

import * as z from "zod"
import axios from "axios"
import Link from "next/link"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"

import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField, FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input} from "@/components/ui/input"



const formSchema = z.object({
  title: z.string().min(1, {
    message: '제목은 필수 입력사항입니다.',
  }),
})

export default function CreatePage() {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  })

  const { isSubmitting, isValid} = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/courses", values)
      router.push(`/teacher/courses/${response.data.id}`)
      toast.success("새로운 강좌가 개설되었습니다.")
    } catch {
      toast.error("알 수 없는 오류가 발생했습니다.")
    }
  }

  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl">
          강좌명을 정해주세요.
        </h1>
        <p className="text-sm text-slate-600">
          강좌명을 무엇으로 하고 싶으세요? 걱정하지 마세요. 나중에 수정할 수 있어요.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({field}) => (
                <FormItem>
                  <FormLabel>
                    강좌명
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="강좌명"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    이 강좌에서 무엇을 가르치실 것인가요?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Link href="/">
                <Button
                  type="button"
                  variant="ghost"
                  >
                  취소
                </Button>
              </Link>
              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
              >
                  계속하기
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
