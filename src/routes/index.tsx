import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Star } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { ProductCard } from "@/components/site/ProductCard";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Reveal } from "@/components/site/Reveal";
import { byCategory, newArrivals, type Category } from "@/lib/products";
import hero from "@/assets/hero.jpg";
import editorial from "@/assets/editorial-summer.jpg";
import gurkhaDetail from "@/assets/gurkha-detail.jpg";
import look1 from "@/assets/lookbook-1.jpg";
import look2 from "@/assets/lookbook-2.jpg";
import look3 from "@/assets/lookbook-3.jpg";
import about from "@/assets/about.jpg";
import insta1 from "@/assets/insta-1.jpg";
import insta2 from "@/assets/insta-2.jpg";
import insta3 from "@/assets/insta-3.jpg";
import insta4 from "@/assets/insta-4.jpg";
import insta5 from "@/assets/insta-5.jpg";
import insta6 from "@/assets/insta-6.jpg";
import journal1 from "@/assets/journal-1.jpg";
import journal2 from "@/assets/journal-2.jpg";
import journal3 from "@/assets/journal-3.jpg";
import knitCrop from "@/assets/details/detail-knit-camel.jpg";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <SiteShell>
      <Hero />
      <Marquee />
      <NewIn />
      <Featured />
      <CategorySection category="Polos" eyebrow="The Polo Edit" title="Premium Polos." description="Pima cotton piqué — tailored for warm afternoons and quiet evenings." shopSlug="polos" />
      <CategorySection category="Linen Shirts" eyebrow="European Flax" title="Linen Shirts." description="Woven from European flax. Worn from morning espresso to last light." tone="cream" shopSlug="linen-shirts" />
      <Editorial />
      <CategorySection category="Chinos" eyebrow="The Chino Series" title="Tailored Chinos." description="Garment-dyed essentials, cut for movement and stillness alike." shopSlug="chinos" />
      <GurkhaSignature />
      <CategorySection category="Gurkhas" eyebrow="Signature" title="The Gurkha Trouser." description="Self-belted, double-pleated, structured. Tailoring without noise." tone="cream" shopSlug="gurkhas" />
      <Capsule />
      <NewLines />
      <About />
      <Testimonials />
      <Instagram />
      <Journal />
    </SiteShell>
  );
}

function CategorySection({ category, eyebrow, title, description, shopSlug, tone = "background" }: { category: Category; eyebrow: string; title: string; description: string; shopSlug: string; tone?: "background" | "cream" }) {
  const items = byCategory(category).slice(0, 3);
  return (
    <section className={`${tone === "cream" ? "bg-cream" : "bg-background"} py-24 md:py-32`}>
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex items-end justify-between gap-6">
          <SectionHeader eyebrow={eyebrow} title={title} description={description} />
          <Link to="/shop/$category" params={{ category: shopSlug }} className="hidden text-[11px] uppercase tracking-luxe text-foreground hover:text-gold md:block">
            View all →
          </Link>
        </div>
        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 md:gap-x-8">
          {items.map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section ref={ref} className="relative h-[100svh] w-full overflow-hidden bg-ink">
      <motion.img
        src={hero}
        alt="VELORÉ summer campaign"
        loading="eager"
        fetchPriority="high"
        decoding="async"
        style={{ y, scale }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/10 to-ink/70" />

      <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-end px-6 pb-20 md:px-10 md:pb-28">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-[11px] uppercase tracking-luxe text-cream/85"
        >
          Spring / Summer ’26 — La Riviera
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-4xl font-display text-[44px] leading-[1.02] text-cream text-balance md:text-7xl lg:text-[88px]"
        >
          Quiet Luxury<br />for the New Generation.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 1 }}
          className="mt-6 max-w-xl text-base leading-relaxed text-cream/85 md:text-lg"
        >
          Premium polos, linen shirts, gurkha trousers and timeless essentials —
          inspired by European summer fashion.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 1 }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <Link
            to="/shop/$category"
            params={{ category: "polos" }}
            className="group inline-flex items-center gap-2 bg-cream px-7 py-4 text-[11px] uppercase tracking-luxe text-ink transition hover:bg-gold hover:text-ink"
          >
            Shop Collection
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" strokeWidth={1.4} />
          </Link>
          <Link
            to="/journal"
            className="inline-flex items-center gap-2 border border-cream/60 px-7 py-4 text-[11px] uppercase tracking-luxe text-cream transition hover:border-gold hover:text-gold"
          >
            Explore Lookbook
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-6 right-6 hidden text-[10px] uppercase tracking-luxe text-cream/70 md:block md:right-10"
      >
        Photographed in Positano
      </motion.div>
    </section>
  );
}

function Marquee() {
  const items = ["Free Shipping Above ₹4,990", "Crafted in India", "Wear Legacy", "European Flax Linen", "Pima Cotton Piqué", "Quiet Confidence"];
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-border/60 bg-cream py-4">
      <div className="flex animate-[marquee_40s_linear_infinite] whitespace-nowrap" style={{ animationName: "marquee" }}>
        {row.map((t, i) => (
          <span key={i} className="mx-10 text-[11px] uppercase tracking-luxe text-foreground/70">
            ✦ {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function NewIn() {
  const items = newArrivals().slice(0, 4);
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex items-end justify-between gap-6">
          <SectionHeader
            eyebrow="Just Arrived"
            title="New This Season."
            description="Five new pieces — a featherweight linen, two polos, our first merino, and the first shoe from the house."
          />
        </div>
        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4 md:gap-x-8">
          {items.map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}

function NewLines() {
  const lines = [
    {
      img: knitCrop,
      eyebrow: "New Line — Knitwear",
      title: "Merino, Finally.",
      copy: "Extra-fine 19.5 micron wool, knitted to shape and linked by hand. Two crews to start; more before winter.",
      slug: "knitwear",
      cta: "Shop knitwear",
    },
    {
      img: insta2,
      eyebrow: "New Line — Footwear",
      title: "The First Loafer.",
      copy: "Hand-sewn espresso calf, Blake-stitched and resoleable for life. A numbered first run of 300 pairs.",
      slug: "footwear",
      cta: "Shop footwear",
    },
  ];
  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-14 px-6 md:grid-cols-2 md:gap-10 md:px-10">
        {lines.map((l, i) => (
          <Reveal key={l.slug} delay={i * 0.1}>
            <Link to="/shop/$category" params={{ category: l.slug }} className="group block">
              <div className="hover-zoom overflow-hidden">
                <img src={l.img} alt={l.title} className="aspect-[4/5] w-full object-cover" loading="lazy" />
              </div>
              <p className="mt-6 text-[11px] uppercase tracking-luxe text-gold">{l.eyebrow}</p>
              <h3 className="mt-3 font-display text-3xl transition group-hover:text-gold md:text-4xl">{l.title}</h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">{l.copy}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-luxe text-foreground group-hover:text-gold">
                {l.cta} <ArrowRight className="h-4 w-4" strokeWidth={1.4} />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Featured() {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex items-end justify-between gap-6">
          <SectionHeader
            eyebrow="Featured Collection"
            title="The Essentials, Reimagined."
            description="Four pieces. Endlessly composable. Cut for the next generation of quiet dressers."
          />
          <Link to="/shop/$category" params={{ category: "polos" }} className="hidden text-[11px] uppercase tracking-luxe text-foreground hover:text-gold md:block">
            View all →
          </Link>
        </div>
        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4 md:gap-x-8">
          {(["Polos", "Linen Shirts", "Chinos", "Gurkhas"] as const).map((c, i) => {
            const p = byCategory(c)[0];
            return <ProductCard key={p.slug} product={p} index={i} />;
          })}
        </div>
      </div>
    </section>
  );
}

function Editorial() {
  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-6 md:grid-cols-12 md:gap-16 md:px-10">
        <Reveal>
          <div className="md:col-span-7">
            <div className="hover-zoom overflow-hidden">
              <img src={editorial} alt="European summer" className="aspect-[4/5] w-full object-cover" loading="lazy" />
            </div>
          </div>
        </Reveal>
        <div className="flex flex-col justify-end md:col-span-5">
          <Reveal delay={0.1}>
            <p className="text-[11px] uppercase tracking-luxe text-gold">Editorial — N° 01</p>
            <h2 className="mt-4 font-display text-4xl leading-[1.05] text-balance md:text-5xl lg:text-6xl">
              European Summer,<br />Tailored for Gen-Z.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              VELORÉ blends timeless tailoring with modern sophistication —
              creating refined essentials designed for effortless elegance,
              from Mediterranean cafés to your morning espresso.
            </p>
            <Link to="/journal" className="mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-luxe text-foreground hover:text-gold">
              Read the journal <ArrowRight className="h-4 w-4" strokeWidth={1.4} />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function GurkhaSignature() {
  return (
    <section className="relative overflow-hidden bg-ink py-28 text-cream md:py-40">
      <img src={gurkhaDetail} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/30" />
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <p className="text-[11px] uppercase tracking-luxe text-gold">Signature — Gurkha</p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] text-balance md:text-6xl lg:text-7xl">
            Tailoring That Speaks Without Noise.
          </h2>
          <p className="mt-6 max-w-xl text-base text-cream/75 md:text-lg">
            Structured silhouettes inspired by timeless European menswear —
            a self-belted waistband, double pleats, and the kind of drape that
            doesn’t go in or out of season.
          </p>
          <Link
            to="/shop/$category"
            params={{ category: "gurkhas" }}
            className="mt-9 inline-flex items-center gap-2 border border-cream/60 px-7 py-4 text-[11px] uppercase tracking-luxe text-cream transition hover:border-gold hover:text-gold"
          >
            Shop Gurkhas <ArrowRight className="h-4 w-4" strokeWidth={1.4} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function Capsule() {
  const looks = [
    { img: look1, name: "The Stroller", pieces: "Olive Polo · Cream Chino" },
    { img: look2, name: "The Coastline", pieces: "Linen Shirt · Sand Gurkha" },
    { img: look3, name: "The Monochrome", pieces: "Cream Polo · Cream Trouser" },
  ];
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionHeader
          eyebrow="Capsule Wardrobe"
          title="Build Your Timeless Wardrobe."
          description="Three silhouettes. Infinite weeks of effortless dressing."
          align="center"
        />
        <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-3 md:gap-x-8">
          {looks.map((l, i) => (
            <Reveal key={l.name} delay={i * 0.08}>
              <div className="hover-zoom overflow-hidden bg-cream">
                <img src={l.img} alt={l.name} className="aspect-[4/5] w-full object-cover" loading="lazy" />
              </div>
              <div className="mt-4">
                <p className="text-[11px] uppercase tracking-luxe text-gold">Look 0{i + 1}</p>
                <h3 className="mt-2 font-display text-2xl">{l.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{l.pieces}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-14 px-6 md:grid-cols-12 md:gap-20 md:px-10">
        <div className="md:col-span-5">
          <Reveal>
            <p className="text-[11px] uppercase tracking-luxe text-gold">About Veloré</p>
            <h2 className="mt-4 font-display text-4xl leading-[1.05] text-balance md:text-5xl lg:text-6xl">
              Designed for Quiet Confidence.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              VELORÉ was built for a generation moving beyond fast fashion and
              loud trends. Inspired by quiet luxury, timeless tailoring and
              European summers, we create elevated essentials that redefine
              modern sophistication.
            </p>
            <Link to="/about" className="mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-luxe text-foreground hover:text-gold">
              Our story <ArrowRight className="h-4 w-4" strokeWidth={1.4} />
            </Link>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <div className="hover-zoom overflow-hidden md:col-span-7">
            <img src={about} alt="VELORÉ atelier" className="aspect-[5/4] w-full object-cover" loading="lazy" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Testimonials() {
  const reviews = [
    { q: "Finally an Indian brand doing old-money fashion right.", a: "Aryan M." },
    { q: "Luxury aesthetic without luxury pricing.", a: "Kabir S." },
    { q: "The perfect blend of elegance and comfort.", a: "Vihaan R." },
  ];
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionHeader eyebrow="The House" title="Worn by the new quiet." align="center" />
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <figure className="flex h-full flex-col justify-between border border-border/70 bg-cream p-8">
                <div className="flex gap-1 text-gold">
                  {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-3.5 w-3.5 fill-current" strokeWidth={0} />)}
                </div>
                <blockquote className="mt-6 font-display text-2xl leading-snug text-foreground">
                  “{r.q}”
                </blockquote>
                <figcaption className="mt-8 text-[11px] uppercase tracking-luxe text-muted-foreground">— {r.a}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Instagram() {
  const grid = [insta1, insta2, insta3, insta4, insta5, insta6];
  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex flex-col items-center text-center">
          <p className="text-[11px] uppercase tracking-luxe text-gold">@velore.studio</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">Lived in. Tagged @velore.</h2>
        </div>
        <div className="mt-14 grid grid-cols-2 gap-2 md:grid-cols-6 md:gap-3">
          {grid.map((src, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <a href="#" className="hover-zoom block overflow-hidden">
                <img src={src} alt="" className="aspect-square w-full object-cover" loading="lazy" />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Journal() {
  const posts = [
    { img: journal1, title: "How to Dress Old Money on a Budget", tag: "Style" },
    { img: journal2, title: "The Rise of Quiet Luxury", tag: "Culture" },
    { img: journal3, title: "5 Essentials for a Timeless Wardrobe", tag: "Edit" },
  ];
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex items-end justify-between">
          <SectionHeader eyebrow="The Journal" title="Notes on Quiet Luxury." />
          <Link to="/journal" className="hidden text-[11px] uppercase tracking-luxe text-foreground hover:text-gold md:block">
            All articles →
          </Link>
        </div>
        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <article className="group">
                <div className="hover-zoom overflow-hidden">
                  <img src={p.img} alt={p.title} className="aspect-[4/3] w-full object-cover" loading="lazy" />
                </div>
                <p className="mt-5 text-[11px] uppercase tracking-luxe text-gold">{p.tag}</p>
                <h3 className="mt-3 font-display text-2xl leading-snug text-foreground transition group-hover:text-gold">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">A 4 minute read on what it really means to dress with restraint.</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
