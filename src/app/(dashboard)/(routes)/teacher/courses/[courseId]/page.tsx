
export default function CourseIdPage({
  params
}: {
  params: {
    courseId: string
  }
}) {
  return (
    <div>
      page courseid: {params.courseId}
    </div>
  )
}
