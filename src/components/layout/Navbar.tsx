import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { Menu, ShoppingBag, X } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { cn } from "@/lib/utils"

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About & Impact" },
  { to: "/shop", label: "Shop" },
  { to: "/contact", label: "Contact" },
]

export function Navbar() {
  const { itemCount, openDrawer } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-sea/10 bg-off-white/85 backdrop-blur-md">
      <div className="container-app flex h-20 items-center justify-between">
        <Link to="/" className="font-serif text-2xl tracking-wide text-deep-teal">
          Aqua Loops
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  "text-sm font-medium tracking-wide text-ink/70 transition-colors hover:text-deep-teal",
                  isActive && "text-deep-teal"
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={openDrawer}
            aria-label="Open cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-deep-teal transition-colors hover:bg-deep-teal/5"
          >
            <ShoppingBag className="size-5" strokeWidth={1.75} />
            {itemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-sea text-[10px] font-semibold text-white">
                {itemCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
            className="flex h-10 w-10 items-center justify-center rounded-full text-deep-teal transition-colors hover:bg-deep-teal/5 md:hidden"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="flex flex-col gap-1 border-t border-sea/10 bg-off-white px-6 py-4 md:hidden">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                cn(
                  "rounded-xl px-3 py-2.5 text-sm font-medium text-ink/70 transition-colors hover:bg-deep-teal/5 hover:text-deep-teal",
                  isActive && "bg-deep-teal/5 text-deep-teal"
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}
