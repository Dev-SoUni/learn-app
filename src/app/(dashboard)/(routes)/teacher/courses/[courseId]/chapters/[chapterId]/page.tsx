import React from "react"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react"

import { db } from "@/lib/db"
import { Banner } from "@/components/banner"
import { IconBadge } from "@/components/ui/icon-badge"

import { ChapterTitleForm } from "./_components/chapter-title-form"
import { ChapterDescriptionForm } from "./_components/chapter-description-form"
import { ChapterAccessForm } from "./_components/chapter-access-form"
import { ChapterVideoForm } from "./_components/chapter-video-form"
import { ChapterActions } from "./_components/chapter-actions"

export default async function ChapterId({
  params
}: {
    params: {
      courseId: string,
      chapterId: string,
    },
}) {
  const { userId } = auth()

  if (!userId) {
    return redirect("/")
  }

  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      courseId: params.courseId,
    },
    include: {
      muxData: true,
    },
  })

  if (!chapter) {
    return redirect("/")
  }

  const requiredFields = [
    chapter.title,
    chapter.description,
    chapter.videoUrl,
  ]

  const totalFields = requiredFields.length
  const completedFields = requiredFields.filter(Boolean).length

  const completionText = `(${completedFields}/${totalFields})`

  const isComplete = requiredFields.every(Boolean)


  return (
    <>
      {!chapter.isPublished && (
        <Banner
          variant="warning"
          label="해당 챕터는 공개되지 않았습니다. 강좌에 표시되지 않습니다."
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/teacher/courses/${params.courseId}`}
              className="flex items-center text-sm hover:opacity-75 mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
                뒤로 가기
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">
                  챕터 등록
                </h1>
                <span className="text-sm text-slate-700">
                  모든 항목을 입력해주세요. {completionText}
                </span>
              </div>
              <ChapterActions
                disabled={!isComplete}
                courseId={params.courseId}
                chapterId={params.chapterId}
                isPublished={chapter.isPublished}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">
                  챕터 수정
                </h2>
              </div>
              <ChapterTitleForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
              <ChapterDescriptionForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Eye} />
                <h2 className="text-xl">
                  설정
                </h2>
              </div>
              <ChapterAccessForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Video} />
              <h2 className="text-xl">
                영상 등록
              </h2>
            </div>
            <ChapterVideoForm
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />
          </div>
        </div>
      </div>
    </>
  )
}
