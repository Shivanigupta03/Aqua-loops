import { useState, type FormEvent } from "react"
import { CheckCircle2, GraduationCap, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { WaterRipple } from "@/components/decor/WaterRipple"

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", message: "" })

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return
    // Messages aren't persisted yet — wire this up to an email service or
    // a Supabase "messages" table when one is available.
    setSubmitted(true)
  }

  return (
    <div>
      <section className="relative overflow-hidden py-20 text-center md:py-28">
        <WaterRipple />
        <div className="container-app relative">
          <p className="text-xs font-medium uppercase tracking-widest text-sea">Get in Touch</p>
          <h1 className="mt-3 font-serif text-4xl text-deep-teal md:text-5xl">Contact</h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink/60">
            For collaborations, custom orders, or artisan partnerships,
            please get in touch.
          </p>
        </div>
      </section>

      <section className="container-app grid grid-cols-1 gap-12 pb-24 md:grid-cols-2 md:pb-32">
        <Card className="p-8">
          {submitted ? (
            <div className="flex flex-col items-center gap-4 py-10 text-center">
              <CheckCircle2 className="size-10 text-sea" strokeWidth={1.5} />
              <h2 className="font-serif text-2xl text-deep-teal">Message sent</h2>
              <p className="text-ink/60">We'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  required
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className="mt-1.5 min-h-36"
                />
              </div>
              <Button type="submit" size="lg" className="mt-2">
                Send Message
              </Button>
            </form>
          )}
        </Card>

        <div className="flex flex-col justify-center gap-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sea/10 text-sea">
              <Mail className="size-5" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-deep-teal/60">Email</p>
              <p className="mt-1 text-ink/75">manyarajgarhia@gmail.com</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sea/10 text-sea">
              <GraduationCap className="size-5" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-deep-teal/60">Founder</p>
              <p className="mt-1 text-ink/75">Manya Rajgarhia</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
