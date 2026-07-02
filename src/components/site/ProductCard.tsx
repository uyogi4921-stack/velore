import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { type Product, formatINR } from "@/lib/products";

const badgeTone: Record<string, string> = {
  "New Season": "bg-gold text-ink",
  Bestseller: "bg-ink text-cream",
  Signature: "bg-navy text-cream",
  "Nearly Gone": "bg-destructive text-cream",
  Icon: "bg-olive text-cream",
};

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const hoverImg = product.images[1];
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <Link to="/product/$slug" params={{ slug: product.slug }} className="block">
        <div className="hover-zoom relative overflow-hidden rounded-sm bg-cream">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="aspect-[4/5] w-full object-cover"
          />
          {hoverImg && (
            <img
              src={hoverImg}
              alt=""
              loading="lazy"
              aria-hidden
              className="absolute inset-0 aspect-[4/5] h-full w-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            />
          )}
          {product.badge && (
            <span className={`absolute left-3 top-3 px-2.5 py-1 text-[9px] uppercase tracking-luxe ${badgeTone[product.badge]}`}>
              {product.badge}
            </span>
          )}
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); }}
            className="absolute inset-x-4 bottom-4 translate-y-3 rounded-sm bg-background/95 py-3 text-[11px] uppercase tracking-luxe text-foreground opacity-0 backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
          >
            Quick add
          </button>
        </div>
        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-lg leading-tight">{product.name}</h3>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full border border-border"
                style={{ backgroundColor: product.colorHex }}
                aria-hidden
              />
              {product.color} — {product.tagline}
            </p>
          </div>
          <span className="whitespace-nowrap text-sm tracking-wide">{formatINR(product.price)}</span>
        </div>
      </Link>
    </motion.div>
  );
}
