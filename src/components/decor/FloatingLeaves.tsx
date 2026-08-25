import { Leaf } from "./Leaf"
import { cn } from "@/lib/utils"

interface LeafSpec {
  top: string
  left?: string
  right?: string
  size: number
  color: string
  opacity: number
  rotate: number
  animation: "animate-float" | "animate-float-slow"
  delay?: string
}

const defaultLeaves: LeafSpec[] = [
  { top: "8%", left: "6%", size: 90, color: "text-sea", opacity: 0.18, rotate: -12, animation: "animate-float" },
  { top: "62%", left: "2%", size: 60, color: "text-sea-light", opacity: 0.16, rotate: 20, animation: "animate-float-slow", delay: "1.5s" },
  { top: "18%", right: "8%", size: 110, color: "text-deep-teal", opacity: 0.14, rotate: 10, animation: "animate-float-slow" },
  { top: "70%", right: "5%", size: 70, color: "text-sea", opacity: 0.18, rotate: -18, animation: "animate-float", delay: "2.2s" },
  { top: "42%", left: "48%", size: 50, color: "text-aqua", opacity: 0.2, rotate: 8, animation: "animate-float-slow", delay: "0.8s" },
]

/**
 * A decorative layer of faint floating water-hyacinth leaves.
 * Purely visual — sits absolutely inside a `relative` parent.
 */
export function FloatingLeaves({
  leaves = defaultLeaves,
  className,
}: {
  leaves?: LeafSpec[]
  className?: string
}) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      {leaves.map((leaf, i) => (
        <div
          key={i}
          className={cn("absolute", leaf.animation, leaf.color)}
          style={{
            top: leaf.top,
            left: leaf.left,
            right: leaf.right,
            width: leaf.size,
            height: leaf.size * 1.2,
            opacity: leaf.opacity,
            transform: `rotate(${leaf.rotate}deg)`,
            animationDelay: leaf.delay,
          }}
        >
          <Leaf />
        </div>
      ))}
    </div>
  )
}
