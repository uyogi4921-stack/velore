import { createFileRoute, useParams } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { ProductCard } from "@/components/site/ProductCard";
import { SectionHeader } from "@/components/site/SectionHeader";
import { products, type Category } from "@/lib/products";

const titles: Record<string, { title: string; eyebrow: string; desc: string; cat: Category; note?: string }> = {
  polos: { cat: "Polos", eyebrow: "Collection", title: "Polos & Tees.", desc: "220 GSM Pima cotton piqué with mother-of-pearl buttons, joined by a heavyweight Supima tee — tailored for warm afternoons and quiet evenings." },
  "linen-shirts": { cat: "Linen Shirts", eyebrow: "Collection", title: "European Linen.", desc: "Certified European Flax®, garment-washed and finished with corozo buttons. Worn from morning espresso to last light." },
  gurkhas: { cat: "Gurkhas", eyebrow: "Signature", title: "The Gurkha.", desc: "Self-belted, double-pleated, structured. Our signature trouser — tailoring without noise." },
  chinos: { cat: "Chinos", eyebrow: "Collection", title: "Tailored Chinos.", desc: "Garment-dyed organic cotton twill with chain-stitched hems, cut for movement and stillness alike." },
  knitwear: { cat: "Knitwear", eyebrow: "New for Autumn", title: "Extra-Fine Merino.", desc: "12-gauge, 19.5 micron merino — fully-fashioned and linked by hand. The first knits from the house." },
  footwear: { cat: "Footwear", eyebrow: "First Release", title: "The Loafer.", desc: "Hand-sewn in Tuscany, Blake-stitched, resoleable for life. A numbered first run of 300 pairs.", note: "Footwear is our newest line — one silhouette, made properly. More to follow." },
};

export const Route = createFileRoute("/shop/$category")({
  head: ({ params }) => {
    const t = titles[params.category];
    return { meta: [{ title: t ? `${t.cat} — VELORÉ` : "Shop — VELORÉ" }] };
  },
  component: ShopPage,
});

function ShopPage() {
  const { category } = useParams({ from: "/shop/$category" });
  const t = titles[category];
  const items = t ? products.filter((p) => p.category === t.cat) : products;

  return (
    <SiteShell>
      <section className="pt-36 pb-16 md:pt-44">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <SectionHeader
            eyebrow={t?.eyebrow ?? "Shop"}
            title={t?.title ?? "The Shop."}
            description={t?.desc ?? "Edited essentials, season after season."}
          />
          <p className="mt-8 border-t border-border pt-5 text-[11px] uppercase tracking-luxe text-muted-foreground">
            {items.length} {items.length === 1 ? "piece" : "pieces"}
          </p>
        </div>
      </section>
      <section className="pb-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4 md:gap-x-8">
            {items.map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}
          </div>
          {t?.note && (
            <p className="mx-auto mt-20 max-w-md text-center font-display text-xl italic text-muted-foreground">
              {t.note}
            </p>
          )}
        </div>
      </section>
    </SiteShell>
  );
}
