import { useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ProductImage } from "@/types"

/**
 * Swipeable image gallery. Safe to nest inside a react-router <Link>
 * (as on the shop grid cards): dragging past the swipe threshold or
 * pressing an arrow/dot suppresses the click so it doesn't navigate,
 * while a plain tap on the image still does.
 */
export function ProductGallery({
  images,
  alt,
  aspect = "aspect-square",
  compact = false,
  className,
}: {
  images: ProductImage[]
  alt: string
  aspect?: string
  compact?: boolean
  className?: string
}) {
  const [index, setIndex] = useState(0)
  const dragStartX = useRef<number | null>(null)
  const dragged = useRef(false)

  const goTo = (i: number) => setIndex(Math.max(0, Math.min(images.length - 1, i)))

  const onPointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX
    dragged.current = false
  }
  const onPointerUp = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return
    const delta = e.clientX - dragStartX.current
    dragStartX.current = null
    if (Math.abs(delta) < 40) return
    dragged.current = true
    e.preventDefault()
    e.stopPropagation()
    goTo(delta > 0 ? index - 1 : index + 1)
  }
  const onClickCapture = (e: React.MouseEvent) => {
    if (dragged.current) {
      e.preventDefault()
      e.stopPropagation()
      dragged.current = false
    }
  }
  const stopAnd = (fn: () => void) => (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    fn()
  }

  if (images.length === 1) {
    return (
      <div className={cn(aspect, "overflow-hidden rounded-3xl bg-aqua-pale shadow-card", className)}>
        <img
          src={images[0].src}
          alt={alt}
          className="h-full w-full object-cover"
          style={{ objectPosition: images[0].focus ?? "50% 50%" }}
        />
      </div>
    )
  }

  const controlSize = compact ? "h-7 w-7" : "h-9 w-9"

  return (
    <div className={cn("relative", className)}>
      <div
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onClickCapture={onClickCapture}
        className={cn(aspect, "touch-pan-y select-none overflow-hidden rounded-3xl bg-aqua-pale shadow-card")}
      >
        <div
          className="flex h-full transition-transform duration-400 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map(({ src, focus }, i) => (
            <img
              key={src}
              src={src}
              alt={`${alt} — photo ${i + 1} of ${images.length}`}
              draggable={false}
              className="h-full w-full shrink-0 object-cover"
              style={{ objectPosition: focus ?? "50% 50%" }}
            />
          ))}
        </div>
      </div>

      <button
        onClick={stopAnd(() => goTo(index - 1))}
        disabled={index === 0}
        aria-label="Previous photo"
        className={cn(
          "absolute left-2 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full bg-off-white/85 text-deep-teal shadow-card backdrop-blur-sm transition-opacity hover:bg-off-white disabled:pointer-events-none disabled:opacity-0",
          controlSize
        )}
      >
        <ChevronLeft className="size-4" />
      </button>
      <button
        onClick={stopAnd(() => goTo(index + 1))}
        disabled={index === images.length - 1}
        aria-label="Next photo"
        className={cn(
          "absolute right-2 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full bg-off-white/85 text-deep-teal shadow-card backdrop-blur-sm transition-opacity hover:bg-off-white disabled:pointer-events-none disabled:opacity-0",
          controlSize
        )}
      >
        <ChevronRight className="size-4" />
      </button>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 rounded-b-3xl bg-gradient-to-t from-deep-teal/35 to-transparent" />
      <div className="absolute inset-x-0 bottom-2.5 flex items-center justify-center gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={stopAnd(() => goTo(i))}
            aria-label={`Go to photo ${i + 1}`}
            className={cn(
              "h-1.5 rounded-full bg-off-white/70 shadow-sm transition-all",
              i === index ? "w-5 bg-off-white" : "w-1.5"
            )}
          />
        ))}
      </div>
    </div>
  )
}
