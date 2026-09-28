"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-[#111111] group-[.toaster]:border group-[.toaster]:border-gray-100 group-[.toaster]:shadow-sm group-[.toaster]:rounded-none group-[.toaster]:p-4",
          title: "group-[.toast]:text-xs group-[.toast]:font-black group-[.toast]:uppercase group-[.toast]:tracking-widest group-[.toast]:text-[#111111]",
          description: "group-[.toast]:text-gray-400 group-[.toast]:text-[10px] group-[.toast]:uppercase group-[.toast]:tracking-widest mt-1",
          actionButton:
            "group-[.toast]:bg-[#111111] group-[.toast]:text-white group-[.toast]:rounded-none group-[.toast]:text-[10px] group-[.toast]:uppercase group-[.toast]:tracking-widest group-[.toast]:font-bold group-[.toast]:px-4",
          cancelButton:
            "group-[.toast]:bg-gray-100 group-[.toast]:text-[#111111] group-[.toast]:rounded-none group-[.toast]:text-[10px] group-[.toast]:uppercase group-[.toast]:tracking-widest",
          success: "group-[.toaster]:border-l-4 group-[.toaster]:border-l-[#E2FF3B]",
          error: "group-[.toaster]:border-l-4 group-[.toaster]:border-l-red-500",
          warning: "group-[.toaster]:border-l-4 group-[.toaster]:border-l-yellow-400",
          info: "group-[.toaster]:border-l-4 group-[.toaster]:border-l-[#111111]",
          closeButton: "group-[.toast]:bg-white group-[.toast]:border-gray-100 group-[.toast]:text-[#111111] group-[.toast]:rounded-none hover:group-[.toast]:bg-[#E2FF3B]",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
