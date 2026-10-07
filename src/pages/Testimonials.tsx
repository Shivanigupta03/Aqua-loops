import { useEffect, useState, type FormEvent } from "react"
import { CheckCircle2, MessageSquareQuote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { WaterRipple } from "@/components/decor/WaterRipple"
import { getApprovedTestimonials, submitTestimonial } from "@/lib/testimonials"
import type { Testimonial } from "@/types"

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState<string>()

  const [name, setName] = useState("")
  const [quote, setQuote] = useState("")
  const [errors, setErrors] = useState<{ name?: string; quote?: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string>()
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    getApprovedTestimonials()
      .then(setTestimonials)
      .catch(() => setLoadError("Couldn't load testimonials right now."))
      .finally(() => setIsLoading(false))
  }, [])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const nextErrors: { name?: string; quote?: string } = {}
    if (!name.trim()) nextErrors.name = "This field is required."
    if (!quote.trim()) nextErrors.quote = "This field is required."
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setIsSubmitting(true)
    setSubmitError(undefined)
    try {
      await submitTestimonial({ name: name.trim(), quote: quote.trim() })
      setSubmitted(true)
      setName("")
      setQuote("")
    } catch {
      setSubmitError("Something went wrong submitting your testimonial. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <section className="relative overflow-hidden py-20 text-center md:py-28">
        <WaterRipple />
        <div className="container-app relative">
          <p className="text-xs font-medium uppercase tracking-widest text-sea">
            From Our Customers
          </p>
          <h1 className="mt-3 font-serif text-4xl text-deep-teal md:text-5xl">Testimonials</h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink/60">
            Hear what customers have to say about their Aqua Loops pieces —
            and share your own experience below.
          </p>
        </div>
      </section>

      <section className="container-app pb-20 md:pb-28">
        {isLoading ? (
          <p className="text-center text-sm text-ink/50">Loading testimonials…</p>
        ) : loadError ? (
          <p className="text-center text-sm text-red-500">{loadError}</p>
        ) : testimonials.length === 0 ? (
          <p className="text-center text-sm text-ink/50">
            No testimonials yet — be the first to share one below.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <Card key={t.id} className="flex flex-col gap-4 p-6">
                <MessageSquareQuote className="size-6 text-sea/40" strokeWidth={1.5} />
                <p className="flex-1 text-sm leading-relaxed text-ink/70">"{t.quote}"</p>
                <p className="font-serif text-base text-deep-teal">{t.name}</p>
              </Card>
            ))}
          </div>
        )}
      </section>

      <section className="container-app pb-24 md:pb-32">
        <Card className="mx-auto max-w-xl p-8">
          {submitted ? (
            <div className="flex flex-col items-center gap-4 py-6 text-center">
              <CheckCircle2 className="size-10 text-sea" strokeWidth={1.5} />
              <h2 className="font-serif text-2xl text-deep-teal">Thank you!</h2>
              <p className="text-ink/60">
                Your testimonial will appear above once we approve it.
              </p>
            </div>
          ) : (
            <>
              <h2 className="font-serif text-xl text-deep-teal">Share Your Experience</h2>
              <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-5">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1.5"
                  />
                  {errors.name && <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>}
                </div>
                <div>
                  <Label htmlFor="quote">Your Testimonial</Label>
                  <Textarea
                    id="quote"
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                    className="mt-1.5 min-h-32"
                  />
                  {errors.quote && <p className="mt-1.5 text-xs text-red-500">{errors.quote}</p>}
                </div>
                {submitError && <p className="text-sm text-red-500">{submitError}</p>}
                <Button type="submit" size="lg" className="mt-2" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting…" : "Submit Testimonial"}
                </Button>
              </form>
            </>
          )}
        </Card>
      </section>
    </div>
  )
}
