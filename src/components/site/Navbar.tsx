import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, ChevronDown } from "lucide-react";

const shopLinks = [
  { category: "polos", label: "Polos & Tees" },
  { category: "linen-shirts", label: "Linen Shirts" },
  { category: "gurkhas", label: "Gurkhas" },
  { category: "chinos", label: "Chinos & Trousers" },
  { category: "knitwear", label: "Knitwear" },
  { category: "footwear", label: "Footwear" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      {/* Announcement bar — retires on scroll */}
      <div
        className={`overflow-hidden bg-ink text-center transition-all duration-500 ${
          scrolled ? "max-h-0" : "max-h-8"
        }`}
      >
        <p className="py-2 text-[10px] uppercase tracking-luxe text-cream/85">
          Complimentary express shipping above ₹4,990 — pan India
        </p>
      </div>

      <div
        className={`transition-all duration-500 ${
          scrolled ? "glass-nav border-b border-border/60 py-3" : "bg-transparent py-5"
        }`}
      >
        <nav className="mx-auto grid max-w-[1400px] grid-cols-[1fr_auto_1fr] items-center px-6 md:px-10">
          {/* Left zone */}
          <ul className="hidden items-center gap-8 lg:flex">
            <li className="group relative">
              <button className="flex items-center gap-1.5 pb-0.5 text-[11px] uppercase tracking-luxe text-foreground/80 transition group-hover:text-foreground">
                Shop
                <ChevronDown className="h-3 w-3 transition-transform duration-300 group-hover:rotate-180" strokeWidth={1.6} />
              </button>
              {/* Dropdown */}
              <div className="invisible absolute -left-6 top-full pt-5 opacity-0 transition-all duration-300 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                <div className="w-60 border border-border/70 bg-background/98 p-6 shadow-luxe backdrop-blur">
                  <p className="text-[9px] uppercase tracking-luxe text-gold">Collections</p>
                  <ul className="mt-4 space-y-3">
                    {shopLinks.map((s) => (
                      <li key={s.category}>
                        <Link
                          to="/shop/$category"
                          params={{ category: s.category }}
                          className="gold-underline pb-0.5 text-[11px] uppercase tracking-luxe text-foreground/80 transition hover:text-foreground"
                        >
                          {s.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
            <li>
              <Link to="/" hash="new-in" className="gold-underline pb-0.5 text-[11px] uppercase tracking-luxe text-foreground/80 transition hover:text-foreground">
                New In
              </Link>
            </li>
            <li>
              <Link to="/journal" className="gold-underline pb-0.5 text-[11px] uppercase tracking-luxe text-foreground/80 transition hover:text-foreground" activeProps={{ className: "text-foreground" }}>
                Journal
              </Link>
            </li>
          </ul>

          {/* Mobile: hamburger left */}
          <button aria-label="Menu" onClick={() => setOpen(true)} className="justify-self-start lg:hidden">
            <Menu className="h-6 w-6" strokeWidth={1.4} />
          </button>

          {/* Center logo */}
          <Link to="/" className="justify-self-center font-display text-2xl tracking-[0.22em] text-foreground md:text-[26px]">
            VELORÉ
          </Link>

          {/* Right zone */}
          <div className="flex items-center justify-self-end gap-8">
            <Link
              to="/about"
              className="gold-underline hidden pb-0.5 text-[11px] uppercase tracking-luxe text-foreground/80 transition hover:text-foreground lg:block"
              activeProps={{ className: "text-foreground" }}
            >
              About
            </Link>
            <Link
              to="/cart"
              aria-label="Cart"
              className="group relative flex items-center gap-2 text-foreground/90 transition hover:text-foreground"
            >
              <ShoppingBag className="h-5 w-5" strokeWidth={1.4} />
              <span className="absolute -right-2 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] text-ink">2</span>
            </Link>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-background"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <span className="font-display text-2xl tracking-[0.22em]">VELORÉ</span>
              <button onClick={() => setOpen(false)} aria-label="Close">
                <X className="h-6 w-6" strokeWidth={1.4} />
              </button>
            </div>
            <div className="px-6 pb-16">
              <p className="mt-8 text-[10px] uppercase tracking-luxe text-gold">Collections</p>
              <ul className="mt-5 space-y-4">
                {shopLinks.map((s) => (
                  <li key={s.category}>
                    <Link
                      to="/shop/$category"
                      params={{ category: s.category }}
                      onClick={() => setOpen(false)}
                      className="font-display text-3xl text-foreground"
                    >
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-10 text-[10px] uppercase tracking-luxe text-gold">House</p>
              <ul className="mt-5 space-y-4">
                <li><Link to="/journal" onClick={() => setOpen(false)} className="font-display text-3xl">Journal</Link></li>
                <li><Link to="/about" onClick={() => setOpen(false)} className="font-display text-3xl">About</Link></li>
                <li><Link to="/cart" onClick={() => setOpen(false)} className="font-display text-3xl">Cart</Link></li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
