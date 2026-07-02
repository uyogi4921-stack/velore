import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Reveal } from "@/components/site/Reveal";
import journal1 from "@/assets/journal-1.jpg";
import journal2 from "@/assets/journal-2.jpg";
import journal3 from "@/assets/journal-3.jpg";
import editorial from "@/assets/editorial-summer.jpg";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Journal — VELORÉ" },
      { name: "description", content: "Notes on quiet luxury, timeless tailoring and the European summer." },
    ],
  }),
  component: Journal,
});

const posts = [
  { img: journal1, title: "How to Dress Old Money on a Budget", excerpt: "It's never been about the price tag — it's about the proportions, the fabric and the restraint.", tag: "Style", read: "5 min read" },
  { img: journal2, title: "The Rise of Quiet Luxury", excerpt: "Why the loudest logos are finally being silenced — and what's coming next.", tag: "Culture", read: "7 min read" },
  { img: journal3, title: "5 Essentials for a Timeless Wardrobe", excerpt: "The exact pieces we'd buy first if we were starting over from zero.", tag: "Edit", read: "4 min read" },
  { img: editorial, title: "A Weekend in Positano, in Linen", excerpt: "Three outfits, four days, one suitcase. The European summer, condensed.", tag: "Travel", read: "6 min read" },
];

function Journal() {
  return (
    <SiteShell>
      <section className="pt-36 pb-16 md:pt-44">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <SectionHeader eyebrow="The Journal" title="Notes on Quiet Luxury." description="Editorials, essays and quiet observations on dressing well." />
        </div>
      </section>
      <section className="pb-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-x-8 md:gap-y-20">
            {posts.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <article className="group">
                  <div className="hover-zoom overflow-hidden">
                    <img src={p.img} alt={p.title} className="aspect-[4/3] w-full object-cover" loading="lazy" />
                  </div>
                  <div className="mt-6 flex items-center gap-3 text-[11px] uppercase tracking-luxe text-gold">
                    <span>{p.tag}</span><span className="text-muted-foreground">·</span><span className="text-muted-foreground">{p.read}</span>
                  </div>
                  <h3 className="mt-3 font-display text-3xl leading-tight md:text-4xl">{p.title}</h3>
                  <p className="mt-3 max-w-lg text-muted-foreground">{p.excerpt}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
