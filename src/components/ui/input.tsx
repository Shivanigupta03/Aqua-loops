import * as React from "react"
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-12 w-full rounded-xl border border-sea/20 bg-white px-4 py-2 text-sm text-ink placeholder:text-ink/40 outline-none transition-colors focus:border-sea focus:ring-2 focus:ring-sea/20 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Input }
