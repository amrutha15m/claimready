import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { hero } from "@/lib/content/landing";
import { claims, readinessMeta } from "@/lib/data/claims";

function ReadinessPreview() {
  // Signature element: a compact readiness snapshot — the product, teased.
  const rows = claims.slice(0, 4);
  return (
    <div className="rounded-card border border-hairline bg-canvas shadow-lift">
      <div className="flex items-center justify-between border-b border-hairline px-5 py-3.5">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-brand" aria-hidden />
          <span className="text-sm font-medium text-ink">Discharge readiness</span>
        </div>
        <span className="rounded-full bg-blocked/10 px-2.5 py-1 text-xs font-medium text-blocked tnum">
          02:14 to clock
        </span>
      </div>
      <ul className="divide-y divide-hairline">
        {rows.map((c) => {
          const m = readinessMeta[c.readiness];
          return (
            <li key={c.id} className="flex items-center gap-3 px-5 py-3">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: m.dot }}
                aria-hidden
              />
              <span className="w-14 shrink-0 text-sm text-muted tnum">
                Bed {c.bed}
              </span>
              <span className="truncate text-sm text-ink">
                {c.blocker ?? m.text}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function Hero() {
  return (
    <section className="border-b border-hairline bg-surface/60">
      <Container className="grid items-center gap-12 py-20 md:grid-cols-2 md:py-28">
        <div>
          <Eyebrow>{hero.eyebrow}</Eyebrow>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.08] tracking-tight text-ink md:text-[3.25rem]">
            {hero.title}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            {hero.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-lg bg-brand px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              {hero.primaryCta}
            </Link>
          </div>
        </div>
        <div className="md:pl-6">
          <ReadinessPreview />
        </div>
      </Container>
    </section>
  );
}
