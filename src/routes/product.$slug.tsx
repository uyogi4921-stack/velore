import { useState } from "react";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Minus, Plus, Truck, RotateCcw, ShieldCheck, Star } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { ProductCard } from "@/components/site/ProductCard";
import { products, bySlug, categorySlug, formatINR } from "@/lib/products";

export const Route = createFileRoute("/product/$slug")({
  head: ({ params }) => {
    const p = products.find((x) => x.slug === params.slug);
    return {
      meta: [
        { title: p ? `${p.name} in ${p.color} — VELORÉ` : "Product — VELORÉ" },
        { name: "description", content: p?.tagline ?? "" },
        { property: "og:image", content: p?.image },
      ],
    };
  },
  component: PDP,
});

const SIZES: Record<string, string[]> = {
  Polos: ["XS", "S", "M", "L", "XL", "XXL"],
  "Linen Shirts": ["XS", "S", "M", "L", "XL", "XXL"],
  Knitwear: ["S", "M", "L", "XL"],
  Chinos: ["28", "30", "32", "34", "36", "38"],
  Gurkhas: ["28", "30", "32", "34", "36", "38"],
  Footwear: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
};

type ChartRow = string[];
const SIZE_CHARTS: Record<string, { columns: string[]; rows: ChartRow[]; note: string }> = {
  tops: {
    columns: ["Size", "Chest (cm)", "Length (cm)", "Shoulder (cm)"],
    rows: [
      ["XS", "96", "66", "42"],
      ["S", "101", "68", "43.5"],
      ["M", "106", "70", "45"],
      ["L", "112", "72", "46.5"],
      ["XL", "118", "74", "48"],
      ["XXL", "124", "76", "49.5"],
    ],
    note: "Garment measurements, laid flat and doubled at the chest. For a relaxed fit, size up once.",
  },
  bottoms: {
    columns: ["Size", "Waist (cm)", "Hip (cm)", "Inseam (cm)"],
    rows: [
      ["28", "71", "94", "76"],
      ["30", "76", "99", "76"],
      ["32", "81", "104", "77"],
      ["34", "86", "109", "77"],
      ["36", "91", "114", "78"],
      ["38", "96", "119", "78"],
    ],
    note: "Waist measured relaxed. Hems arrive unfinished on pleated styles — alteration is complimentary in-store.",
  },
  footwear: {
    columns: ["UK", "EU", "Foot length (cm)"],
    rows: [
      ["6", "40", "24.8"],
      ["7", "41", "25.6"],
      ["8", "42", "26.4"],
      ["9", "43", "27.3"],
      ["10", "44", "28.1"],
      ["11", "45", "28.9"],
    ],
    note: "Measured heel to longest toe. Between sizes, take the half size down — the moccasin moulds to the foot.",
  },
};

const chartFor = (category: string) =>
  category === "Footwear" ? SIZE_CHARTS.footwear
  : category === "Chinos" || category === "Gurkhas" ? SIZE_CHARTS.bottoms
  : SIZE_CHARTS.tops;

function PDP() {
  const { slug } = useParams({ from: "/product/$slug" });
  const product = products.find((p) => p.slug === slug) ?? products[0];
  const sizes = SIZES[product.category] ?? ["S", "M", "L"];
  const [size, setSize] = useState(sizes[2]);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [showChart, setShowChart] = useState(false);
  const chart = chartFor(product.category);
  const gallery = product.images;
  const colorways = product.colorways.map(bySlug).filter(Boolean);
  const recs = product.styledWith.map(bySlug).filter(Boolean);

  return (
    <SiteShell>
      <section className="pt-32 md:pt-40">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <p className="text-[11px] uppercase tracking-luxe text-muted-foreground">
            <Link to="/" className="hover:text-gold">Home</Link> / <Link to="/shop/$category" params={{ category: categorySlug(product.category) }} className="hover:text-gold">{product.category}</Link> / <span>{product.name}</span>
          </p>
          <div className="mt-10 grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
            {/* Gallery */}
            <div className="md:col-span-7">
              <div className="hover-zoom overflow-hidden bg-cream">
                <motion.img
                  key={activeImg}
                  src={gallery[activeImg]}
                  alt={`${product.name} in ${product.color}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
              {gallery.length > 1 && (
                <div className="mt-3 grid grid-cols-4 gap-3">
                  {gallery.map((g, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      aria-label={`View image ${i + 1}`}
                      className={`overflow-hidden border ${i === activeImg ? "border-gold" : "border-transparent"}`}
                    >
                      <img src={g} alt="" className="aspect-square w-full object-cover" loading="lazy" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="md:col-span-5">
              <div className="flex items-center gap-3">
                <p className="text-[11px] uppercase tracking-luxe text-gold">{product.category}</p>
                {product.badge && (
                  <span className="border border-gold px-2 py-0.5 text-[9px] uppercase tracking-luxe text-gold">{product.badge}</span>
                )}
              </div>
              <h1 className="mt-3 font-display text-4xl leading-tight md:text-5xl">{product.name}</h1>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex gap-0.5 text-gold">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className={`h-3.5 w-3.5 ${k < Math.round(product.rating) ? "fill-current" : "fill-border text-border"}`} strokeWidth={0} />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">{product.rating} · {product.reviews} reviews</span>
              </div>
              <p className="mt-5 text-2xl tracking-wide">{formatINR(product.price)}</p>
              <p className="mt-1 text-xs text-muted-foreground">MRP incl. of all taxes.</p>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
                {product.tagline}{" "}
                {product.category === "Footwear"
                  ? "Hand-sewn in Tuscany from "
                  : "Cut and finished in our Bombay atelier from "}
                {product.fabric.charAt(0).toLowerCase() + product.fabric.slice(1).replace(/\.$/, "")}.
              </p>

              {/* colour */}
              <div className="mt-8">
                <p className="text-[11px] uppercase tracking-luxe">
                  Colour — <span className="text-muted-foreground normal-case tracking-normal">{product.color}</span>
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span
                    className="h-8 w-8 rounded-full border-2 border-gold p-0.5"
                    title={product.color}
                  >
                    <span className="block h-full w-full rounded-full" style={{ backgroundColor: product.colorHex }} />
                  </span>
                  {colorways.map((c) => c && (
                    <Link
                      key={c.slug}
                      to="/product/$slug"
                      params={{ slug: c.slug }}
                      title={`${c.name} in ${c.color}`}
                      className="h-8 w-8 rounded-full border border-border p-0.5 transition hover:border-foreground"
                    >
                      <span className="block h-full w-full rounded-full" style={{ backgroundColor: c.colorHex }} />
                    </Link>
                  ))}
                </div>
              </div>

              {/* size */}
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] uppercase tracking-luxe">Size</p>
                  <button
                    onClick={() => setShowChart(!showChart)}
                    aria-expanded={showChart}
                    className="text-[11px] uppercase tracking-luxe text-muted-foreground transition hover:text-gold"
                  >
                    {showChart ? "Hide size chart" : "Size chart"}
                  </button>
                </div>
                {showChart && (
                  <div className="mt-4 border border-border bg-cream/60 p-4">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr>
                            {chart.columns.map((c) => (
                              <th key={c} className="border-b border-border pb-2 pr-4 font-normal uppercase tracking-luxe text-[10px] text-muted-foreground">{c}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {chart.rows.map((row) => (
                            <tr key={row[0]}>
                              {row.map((cell, ci) => (
                                <td key={ci} className={`py-2 pr-4 ${ci === 0 ? "font-medium" : "text-muted-foreground"}`}>{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">{chart.note}</p>
                  </div>
                )}
                <div className="mt-3 flex flex-wrap gap-2">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`min-w-12 border px-4 py-3 text-xs uppercase tracking-luxe transition ${
                        size === s ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                {product.modelNote && (
                  <p className="mt-3 text-xs italic text-muted-foreground">{product.modelNote}</p>
                )}
              </div>

              {/* qty + cart */}
              <div className="mt-8 flex items-stretch gap-3">
                <div className="flex items-center border border-border">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-4" aria-label="Decrease"><Minus className="h-3.5 w-3.5" /></button>
                  <span className="w-8 text-center text-sm">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="px-4 py-4" aria-label="Increase"><Plus className="h-3.5 w-3.5" /></button>
                </div>
                <button className="flex-1 bg-foreground py-4 text-[11px] uppercase tracking-luxe text-background transition hover:bg-gold hover:text-foreground">
                  Add to bag · {formatINR(product.price * qty)}
                </button>
              </div>
              {product.badge === "Nearly Gone" && (
                <p className="mt-3 text-xs text-destructive">Final pieces of the season — restock not planned.</p>
              )}

              <div className="mt-10 grid grid-cols-3 gap-3 border-t border-border pt-6 text-[11px] uppercase tracking-luxe text-muted-foreground">
                <div className="flex flex-col items-start gap-2"><Truck className="h-4 w-4" strokeWidth={1.4} /> Free over ₹4,990</div>
                <div className="flex flex-col items-start gap-2"><RotateCcw className="h-4 w-4" strokeWidth={1.4} /> 14-day returns</div>
                <div className="flex flex-col items-start gap-2"><ShieldCheck className="h-4 w-4" strokeWidth={1.4} /> 2-year guarantee</div>
              </div>

              <div className="mt-10 space-y-4 border-t border-border pt-6 text-sm text-muted-foreground">
                <details className="group" open>
                  <summary className="flex cursor-pointer list-none items-center justify-between text-foreground">
                    <span className="text-[11px] uppercase tracking-luxe">Fit & Details</span>
                    <Plus className="h-4 w-4 group-open:rotate-45 transition" />
                  </summary>
                  <p className="mt-3">{product.fit}</p>
                  <ul className="mt-3 list-disc space-y-1.5 pl-4">
                    {product.details.map((d) => <li key={d}>{d}</li>)}
                  </ul>
                </details>
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between text-foreground">
                    <span className="text-[11px] uppercase tracking-luxe">Fabric & Care</span>
                    <Plus className="h-4 w-4 group-open:rotate-45 transition" />
                  </summary>
                  <p className="mt-3">{product.fabric}.</p>
                  <p className="mt-2">{product.care}</p>
                </details>
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between text-foreground">
                    <span className="text-[11px] uppercase tracking-luxe">Shipping & Returns</span>
                    <Plus className="h-4 w-4 group-open:rotate-45 transition" />
                  </summary>
                  <p className="mt-3">Complimentary express shipping on orders above ₹4,990, pan-India in 2–4 days. 14-day no-questions returns, pickup arranged by us.</p>
                </details>
              </div>
            </div>
          </div>
        </div>
      </section>

      {recs.length > 0 && (
        <section className="bg-background py-24 md:py-32">
          <div className="mx-auto max-w-[1400px] px-6 md:px-10">
            <h2 className="font-display text-3xl md:text-4xl">Complete the Look.</h2>
            <p className="mt-3 text-sm text-muted-foreground">Chosen by our stylists to pair with the {product.name}.</p>
            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 md:gap-x-8">
              {recs.map((p, i) => p && <ProductCard key={p.slug} product={p} index={i} />)}
            </div>
          </div>
        </section>
      )}
    </SiteShell>
  );
}
