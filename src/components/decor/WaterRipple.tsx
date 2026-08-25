import { cn } from "@/lib/utils"

/**
 * A soft underwater gradient wash with faint concentric ripple rings.
 * Sits absolutely inside a `relative` parent, behind foreground content.
 */
export function WaterRipple({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden bg-gradient-to-b from-aqua-pale via-off-white to-off-white",
        className
      )}
      aria-hidden="true"
    >
      <div className="absolute -top-32 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-sea/15 blur-3xl animate-ripple" />
      <div className="absolute -bottom-40 -right-24 h-[420px] w-[420px] rounded-full bg-aqua/40 blur-3xl animate-ripple [animation-delay:2s]" />
      <div className="absolute -bottom-24 -left-24 h-[360px] w-[360px] rounded-full bg-sand-dark/30 blur-3xl animate-ripple [animation-delay:4s]" />
    </div>
  )
}
