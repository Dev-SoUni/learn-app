"use client"

import { forwardRef, useMemo} from "react"
import dynamic from "next/dynamic"

import "react-quill/dist/quill.snow.css"

interface EditorProps {
  onChange: (value: string) => void
  value: string
}

export const Editor = forwardRef<HTMLElement, EditorProps>(({
  onChange,
  value,
}, _) => {
  const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), { ssr: false}), [])

  return (
    <div className="bg-white">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
      />
    </div>
  )
})

Editor.displayName = "Editor"
