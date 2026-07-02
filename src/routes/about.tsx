import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Reveal } from "@/components/site/Reveal";
import about from "@/assets/about.jpg";
import editorial from "@/assets/editorial-summer.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — VELORÉ" },
      { name: "description", content: "VELORÉ was built for a generation moving beyond fast fashion. Quiet luxury, timeless tailoring." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <SiteShell>
      <section className="bg-cream pt-36 pb-24 md:pt-44 md:pb-32">
        <div className="mx-auto max-w-[1100px] px-6 text-center md:px-10">
          <Reveal>
            <p className="text-[11px] uppercase tracking-luxe text-gold">About Veloré</p>
            <h1 className="mt-4 font-display text-5xl leading-[1.05] text-balance md:text-7xl">
              Wear Legacy.
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-base text-muted-foreground md:text-lg">
              VELORÉ was built for a generation moving beyond fast fashion and
              loud trends. Inspired by quiet luxury, timeless tailoring and
              European summers — we create elevated essentials that redefine
              modern sophistication.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-background py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <Reveal>
            <div className="hover-zoom overflow-hidden">
              <img src={about} alt="" className="aspect-[16/9] w-full object-cover" loading="lazy" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-background pb-28">
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-16 px-6 md:grid-cols-12 md:px-10">
          <div className="md:col-span-5">
            <Reveal>
              <h2 className="font-display text-3xl md:text-4xl">The House.</h2>
            </Reveal>
          </div>
          <div className="space-y-6 text-base leading-relaxed text-muted-foreground md:col-span-7 md:text-lg">
            <Reveal><p>Founded in Bombay. Cut for the Mediterranean. Worn anywhere a quiet confidence is welcome.</p></Reveal>
            <Reveal delay={0.1}><p>We work with European mills and Indian master tailors. We design only what we'd wear ourselves — and only release a handful of pieces each season.</p></Reveal>
            <Reveal delay={0.2}><p>No drops every Tuesday. No celebrity collabs. Just the right polo, the right linen shirt, the right gurkha trouser — over and over again, season after season.</p></Reveal>
          </div>
        </div>
      </section>

      <section className="bg-cream py-24 md:py-32">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 px-6 md:grid-cols-2 md:gap-20 md:px-10">
          <Reveal>
            <div className="hover-zoom overflow-hidden">
              <img src={editorial} alt="" className="aspect-[4/5] w-full object-cover" loading="lazy" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[11px] uppercase tracking-luxe text-gold">Our promise</p>
            <h3 className="mt-3 font-display text-4xl md:text-5xl">Made to outlast the season.</h3>
            <ul className="mt-8 space-y-4 text-base text-muted-foreground md:text-lg">
              <li>— European-grade fabrics, no exceptions.</li>
              <li>— Hand-finished construction in our Bombay atelier.</li>
              <li>— 14-day returns, lifetime tailoring guarantee.</li>
              <li>— Carbon-neutral shipping across India.</li>
            </ul>
          </Reveal>
        </div>
      </section>
    </SiteShell>
  );
}
