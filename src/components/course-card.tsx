import Link from "next/link"
import Image from "next/image"
import cn from "clsx"
import { BookOpen } from "lucide-react"

import { formatPrice } from "@/lib/format"
import { IconBadge } from "@/components/icon-badge"
import { CourseProgress } from "@/components/course-progress"

interface CourseCardProps {
  id: string
  title: string
  imageUrl: string
  chaptersLength: number
  price: number
  progress: number | null
  category: string
}

export const CourseCard = ({
  id,
  title,
  imageUrl,
  chaptersLength,
  price,
  progress,
  category,
}: CourseCardProps) => {

  return (
    <Link href={`/courses/${id}`} className="group">
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image
            fill
            className={cn(
              "object-cover duration-300 transition",
              "group-hover:scale-105",
            )}
            alt={title}
            src={imageUrl}
          />
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
            {title}
          </div>
          <p className="text-sm text-muted-foreground">
            {category}
          </p>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <IconBadge size="sm" icon={BookOpen} />
              <span>
                챕터: {chaptersLength}개
              </span>
            </div>
          </div>
          {progress != null ? (
            <CourseProgress
              variant={progress === 100 ? "success" : "default" }
              value={progress}
            />
          ) : (
            <p className="text-md md:text-sm font-medium text-slate-700">
              {formatPrice(price)}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}
