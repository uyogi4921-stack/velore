import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop/$category", params: { category: "polos" }, label: "Polos" },
  { to: "/shop/$category", params: { category: "linen-shirts" }, label: "Linen" },
  { to: "/shop/$category", params: { category: "gurkhas" }, label: "Gurkhas" },
  { to: "/shop/$category", params: { category: "chinos" }, label: "Chinos" },
  { to: "/shop/$category", params: { category: "knitwear" }, label: "Knitwear" },
  { to: "/shop/$category", params: { category: "footwear" }, label: "Footwear" },
  { to: "/journal", label: "Journal" },
  { to: "/about", label: "About" },
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
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-nav border-b border-border/60 py-3" : "bg-transparent py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 md:px-10">
        <Link to="/" className="font-display text-2xl tracking-[0.18em] text-foreground">
          VELORÉ
        </Link>

        <ul className="hidden items-center gap-9 lg:flex">
          {links.map((l) => (
            <li key={l.label}>
              <Link
                to={l.to}
                params={"params" in l ? l.params : undefined}
                className="gold-underline pb-0.5 text-[11px] uppercase tracking-luxe text-foreground/80 transition hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <Link
            to="/cart"
            aria-label="Cart"
            className="group relative flex items-center gap-2 text-foreground/90 transition hover:text-foreground"
          >
            <ShoppingBag className="h-5 w-5" strokeWidth={1.4} />
            <span className="hidden text-[11px] uppercase tracking-luxe md:inline">Cart (2)</span>
          </Link>
          <button
            aria-label="Menu"
            onClick={() => setOpen(true)}
            className="lg:hidden"
          >
            <Menu className="h-6 w-6" strokeWidth={1.4} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <span className="font-display text-2xl tracking-[0.18em]">VELORÉ</span>
              <button onClick={() => setOpen(false)} aria-label="Close">
                <X className="h-6 w-6" strokeWidth={1.4} />
              </button>
            </div>
            <ul className="mt-12 flex flex-col items-center gap-7 px-6">
              {links.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    params={"params" in l ? l.params : undefined}
                    onClick={() => setOpen(false)}
                    className="font-display text-3xl text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
