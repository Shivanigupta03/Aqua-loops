import { cn } from "@/lib/utils"

/** A single stylised water hyacinth leaf, used as a floating background motif. */
export function Leaf({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 120"
      fill="none"
      className={cn("h-full w-full", className)}
      aria-hidden="true"
    >
      <path
        d="M50 4C74 22 90 46 84 74C79 98 62 116 50 116C38 116 21 98 16 74C10 46 26 22 50 4Z"
        fill="currentColor"
      />
      <path
        d="M50 12V110"
        stroke="rgba(74,59,63,0.25)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
