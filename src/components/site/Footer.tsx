import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/70 bg-cream text-foreground">
      <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-10">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <h3 className="font-display text-3xl md:text-4xl">Letters from the Atelier.</h3>
            <p className="mt-3 max-w-md text-sm text-muted-foreground">
              Subscribe for new collections, editorials and quiet seasonal drops. No noise.
            </p>
            <form className="mt-7 flex max-w-md items-center border-b border-foreground/30">
              <input
                type="email"
                required
                placeholder="your@email.com"
                className="flex-1 bg-transparent py-3 text-sm placeholder:text-foreground/40 focus:outline-none"
              />
              <button className="text-[11px] uppercase tracking-luxe text-foreground hover:text-gold">
                Subscribe
              </button>
            </form>
          </div>

          <div className="grid gap-8 sm:grid-cols-3 md:col-span-7">
            <FooterCol title="Shop" links={[
              ["Polos", "/shop/polos"],
              ["Linen Shirts", "/shop/linen-shirts"],
              ["Gurkhas", "/shop/gurkhas"],
              ["Chinos", "/shop/chinos"],
              ["Knitwear", "/shop/knitwear"],
              ["Footwear", "/shop/footwear"],
            ]}/>
            <FooterCol title="House" links={[
              ["Journal", "/journal"],
              ["About", "/about"],
              ["Lookbook", "/journal"],
              ["Contact", "/about"],
            ]}/>
            <FooterCol title="Care" links={[
              ["Shipping", "/about"],
              ["Returns", "/about"],
              ["Size Guide", "/about"],
              ["FAQ", "/about"],
            ]}/>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-border/70 pt-8 md:flex-row md:items-center">
          <p className="text-[11px] uppercase tracking-luxe text-muted-foreground">
            © {new Date().getFullYear()} VELORÉ — Wear Legacy.
          </p>
          <div className="flex items-center gap-5 text-foreground/70">
            <a href="#" aria-label="Instagram" className="hover:text-gold"><Instagram className="h-4 w-4" strokeWidth={1.4} /></a>
            <a href="#" aria-label="Twitter" className="hover:text-gold"><Twitter className="h-4 w-4" strokeWidth={1.4} /></a>
            <a href="#" aria-label="Youtube" className="hover:text-gold"><Youtube className="h-4 w-4" strokeWidth={1.4} /></a>
            <span className="text-[11px] uppercase tracking-luxe">@velore.studio</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="text-[11px] uppercase tracking-luxe text-muted-foreground">{title}</h4>
      <ul className="mt-4 space-y-2.5">
        {links.map(([label, to]) => (
          <li key={label}>
            <Link to={to} className="text-sm text-foreground/85 hover:text-gold">{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
