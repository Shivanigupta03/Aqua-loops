import { Link } from "react-router-dom"
import { Camera, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-sea/10 bg-deep-teal text-off-white/80">
      <div className="container-app grid grid-cols-1 gap-10 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-serif text-2xl text-off-white">Aqua Loops</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-off-white/60">
            Sustainable crafts. Circular impact.
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-off-white/50">
            Quick Links
          </p>
          <div className="mt-4 flex flex-col gap-2.5 text-sm">
            <Link to="/" className="transition-colors hover:text-aqua">Home</Link>
            <Link to="/about" className="transition-colors hover:text-aqua">About &amp; Impact</Link>
            <Link to="/shop" className="transition-colors hover:text-aqua">Shop</Link>
            <Link to="/contact" className="transition-colors hover:text-aqua">Contact</Link>
          </div>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-off-white/50">
            Connect
          </p>
          <div className="mt-4 flex flex-col gap-2.5 text-sm">
            <span className="flex items-center gap-2">
              <Camera className="size-4" strokeWidth={1.75} />
              @aqualoops
            </span>
            <span className="flex items-center gap-2">
              <Mail className="size-4" strokeWidth={1.75} />
              hello@aqualoops.com
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-off-white/10 py-5 text-center text-xs text-off-white/40">
        © {new Date().getFullYear()} Aqua Loops. Handcrafted with purpose.
      </div>
    </footer>
  )
}
