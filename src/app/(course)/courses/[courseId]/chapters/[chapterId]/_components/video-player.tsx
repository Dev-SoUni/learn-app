"use client"

import axios from "axios"
import MuxPlayer from "@mux/mux-player-react"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import {Loader2, Lock, LogOut} from "lucide-react"

import { cn } from "@/lib/utils"
import { useConfettiStore } from "@/hooks/use-confetti-store"

interface VideoPlayerProps {
  playbackId: string
  courseId: string
  chapterId: string
  nextChapterId?: string
  isLocked: boolean
  completeOnEnd: boolean
  title: string
}


export function VideoPlayer({
  playbackId,
  courseId,
  chapterId,
  nextChapterId,
  isLocked,
  completeOnEnd,
  title
}: VideoPlayerProps) {
  const [isReady, setIsReady] = useState(false)

  return (
    <div className="relative aspect-video">
      {!isReady && !isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <Loader2 className="h-8 w-8 animate-spin text-secondary" />
        </div>
      )}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
          <Lock className="h-8 w-8" />
          <p className="text-sm">
            이 챕터는 이용하실 수 없습니다.
          </p>
        </div>
      )}
      {!isLocked && (
        <MuxPlayer
          title={title}
          className={cn(
            !isReady && "hidden"
          )}
          onCanPlay={() => setIsReady(true)}
          onEnded={() => {}}
          autoPlay
          playbackId={playbackId}
        />
      )}
    </div>
  )
}
