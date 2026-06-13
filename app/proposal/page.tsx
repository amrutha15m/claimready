import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import {
  proposalIntro,
  gtm,
  pricing,
  naming,
  guardrails,
} from "@/lib/content/proposal";

function PointGrid({
  points,
}: {
  points: { h: string; p: string }[];
}) {
  return (
    <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2">
      {points.map((pt) => (
        <div key={pt.h}>
          <h3 className="text-base font-medium text-ink">{pt.h}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{pt.p}</p>
        </div>
      ))}
    </div>
  );
}

export default function ProposalPage() {
  return (
    <main className="min-h-screen bg-canvas">
      <header className="sticky top-0 z-30 border-b border-hairline bg-canvas/85 backdrop-blur">
        <Container className="flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-md bg-brand text-[13px] font-semibold text-white">
              C
            </span>
            <span className="text-sm font-semibold tracking-tight text-ink">
              ClaimReady
              <span className="ml-1.5 font-normal text-muted">for Superleap</span>
            </span>
          </Link>
          <Link
            href="/dashboard"
            className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
          >
            View demo
          </Link>
        </Container>
      </header>

      <section className="border-b border-hairline bg-surface/60">
        <Container className="py-16 md:py-20">
          <div className="max-w-2xl">
            <Eyebrow>{proposalIntro.eyebrow}</Eyebrow>
            <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl">
              {proposalIntro.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              {proposalIntro.subtitle}
            </p>
          </div>
        </Container>
      </section>

      <section className="border-b border-hairline">
        <Container className="py-16 md:py-20">
          <Eyebrow>{gtm.eyebrow}</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-2xl font-semibold tracking-tight text-ink md:text-3xl">
            {gtm.title}
          </h2>
          <PointGrid points={gtm.points} />
        </Container>
      </section>

      <section className="border-b border-hairline bg-surface/60">
        <Container className="py-16 md:py-20">
          <Eyebrow>{pricing.eyebrow}</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-2xl font-semibold tracking-tight text-ink md:text-3xl">
            {pricing.title}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
            {pricing.model}
          </p>
          <div className="mt-8 overflow-hidden rounded-card border border-hairline bg-canvas">
            {pricing.rows.map((r, i) => (
              <div
                key={r.label}
                className={`flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-5 py-4 ${
                  i > 0 ? "border-t border-hairline" : ""
                }`}
              >
                <div>
                  <p className="text-sm font-medium text-ink">{r.label}</p>
                  <p className="text-xs text-muted">{r.note}</p>
                </div>
                <p className="text-lg font-semibold text-ink tnum">{r.value}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted">
            {pricing.margin}
          </p>
        </Container>
      </section>

      <section className="border-b border-hairline">
        <Container className="py-16 md:py-20">
          <Eyebrow>{naming.eyebrow}</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-2xl font-semibold tracking-tight text-ink md:text-3xl">
            {naming.title}
          </h2>
          <PointGrid points={naming.points} />
        </Container>
      </section>

      <section>
        <Container className="py-16 md:py-20">
          <Eyebrow tone="muted">{guardrails.eyebrow}</Eyebrow>
          <h2 className="mt-4 max-w-2xl text-2xl font-semibold tracking-tight text-ink md:text-3xl">
            {guardrails.title}
          </h2>
          <PointGrid points={guardrails.points} />
          <div className="mt-12">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-lg bg-brand px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
            >
              View the live demo
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
