import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs"

import { Banner } from "@/components/banner"
import { getChapter } from "@/actions/get-chapter"

import { VideoPlayer } from "./_components/video-player"

export default async function ChapterIdPage({
  params
}: {
  params: { courseId: string, chapterId: string }
}) {
  const { userId } = auth()

  if (!userId) {
    return redirect("/")
  }

  const {
    chapter,
    course,
    muxData,
    attachments,
    nextChapter,
    userProgress,
    purchase,
  } = await getChapter({
    userId,
    chapterId: params.chapterId,
    courseId: params.courseId,
  })

  if (!chapter || !course) {
    return redirect("/")
  }

  const isLocked = !chapter.isFree && !purchase
  const completeOneEnd = !purchase && !userProgress?.isCompleted

  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner
          variant="success"
          label="해당 챕터는 이미 수강하였습니다."
        />
      )}
      {isLocked && (
        <Banner
          variant="warning"
          label="해당 챕터를 수강하기 위해 구매해야합니다.."
        />
      )}
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          <VideoPlayer
            chapterId={params.chapterId}
            title={chapter.title}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id}
            playbackId={muxData?.playbackId!}
            isLocked={isLocked}
            completeOnEnd={completeOneEnd}
          />
        </div>
      </div>
    </div>
  )
}
