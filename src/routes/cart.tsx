import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, X, ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { products, formatINR } from "@/lib/products";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Bag — VELORÉ" }] }),
  component: Cart,
});

function Cart() {
  const [items, setItems] = useState([
    { ...products[0], qty: 1, size: "M" },
    { ...products[1], qty: 1, size: "32" },
  ]);
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const threshold = 4990;
  const progress = Math.min(100, (subtotal / threshold) * 100);

  return (
    <SiteShell>
      <section className="pt-32 pb-24 md:pt-40">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <p className="text-[11px] uppercase tracking-luxe text-gold">Your bag</p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl">A few quiet pieces.</h1>

          <div className="mt-12 grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-7">
              <div className="border-y border-border">
                {items.map((item, idx) => (
                  <div key={idx} className="flex gap-5 border-b border-border py-6 last:border-b-0">
                    <img src={item.image} alt={item.name} className="aspect-[4/5] w-28 flex-none object-cover" loading="lazy" />
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-display text-xl">{item.name}</h3>
                          <p className="mt-1 text-xs text-muted-foreground">Size {item.size} · {item.category}</p>
                        </div>
                        <button onClick={() => setItems(items.filter((_, i) => i !== idx))} aria-label="Remove">
                          <X className="h-4 w-4 text-muted-foreground hover:text-foreground" strokeWidth={1.4} />
                        </button>
                      </div>
                      <div className="mt-auto flex items-end justify-between pt-4">
                        <div className="flex items-center border border-border">
                          <button onClick={() => setItems(items.map((it, i) => i === idx ? { ...it, qty: Math.max(1, it.qty - 1) } : it))} className="px-3 py-2"><Minus className="h-3 w-3" /></button>
                          <span className="w-8 text-center text-sm">{item.qty}</span>
                          <button onClick={() => setItems(items.map((it, i) => i === idx ? { ...it, qty: it.qty + 1 } : it))} className="px-3 py-2"><Plus className="h-3 w-3" /></button>
                        </div>
                        <span className="text-sm tracking-wide">{formatINR(item.price * item.qty)}</span>
                      </div>
                    </div>
                  </div>
                ))}
                {items.length === 0 && (
                  <div className="py-16 text-center text-sm text-muted-foreground">Your bag is empty.</div>
                )}
              </div>

              <div className="mt-8 flex gap-3">
                <input placeholder="Promo code" className="flex-1 border border-border bg-transparent px-4 py-3 text-sm focus:border-foreground focus:outline-none" />
                <button className="border border-border px-6 py-3 text-[11px] uppercase tracking-luxe hover:border-foreground">Apply</button>
              </div>
            </div>

            <aside className="lg:col-span-5">
              <div className="border border-border bg-cream p-7">
                <h2 className="font-display text-2xl">Order Summary</h2>

                <div className="mt-6 rounded-sm border border-border bg-background p-4">
                  <p className="text-[11px] uppercase tracking-luxe text-foreground">
                    {subtotal >= threshold ? "Free shipping unlocked" : `${formatINR(threshold - subtotal)} away from free shipping`}
                  </p>
                  <div className="mt-3 h-1 overflow-hidden bg-border">
                    <div className="h-full bg-gold transition-all" style={{ width: `${progress}%` }} />
                  </div>
                </div>

                <dl className="mt-6 space-y-3 text-sm">
                  <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>{formatINR(subtotal)}</dd></div>
                  <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd>{subtotal >= threshold ? "Complimentary" : formatINR(149)}</dd></div>
                  <div className="flex justify-between border-t border-border pt-3 text-base"><dt>Total</dt><dd className="font-medium">{formatINR(subtotal + (subtotal >= threshold ? 0 : 149))}</dd></div>
                </dl>

                <button className="mt-6 flex w-full items-center justify-center gap-2 bg-foreground py-4 text-[11px] uppercase tracking-luxe text-background transition hover:bg-gold hover:text-foreground">
                  Checkout <ArrowRight className="h-4 w-4" strokeWidth={1.4} />
                </button>
                <Link to="/shop/$category" params={{ category: "polos" }} className="mt-4 block text-center text-[11px] uppercase tracking-luxe text-muted-foreground hover:text-foreground">
                  Continue shopping
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
