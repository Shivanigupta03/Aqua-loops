import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container-app flex flex-col items-center gap-5 py-32 text-center">
      <h1 className="font-serif text-5xl text-deep-teal">404</h1>
      <p className="text-ink/60">This page has drifted away.</p>
      <Button size="lg" asChild>
        <Link to="/">Return Home</Link>
      </Button>
    </div>
  )
}
