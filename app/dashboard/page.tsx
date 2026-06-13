import Link from "next/link";
import { Container } from "@/components/ui/Container";
import {
  HOSPITAL,
  claims,
  readinessMeta,
  summarize,
} from "@/lib/data/claims";

function inr(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

export default function DashboardPage() {
  const s = summarize(claims);
  const sorted = [...claims].sort((a, b) => {
    const order = { blocked: 0, atrisk: 1, ready: 2 } as const;
    return order[a.readiness] - order[b.readiness];
  });

  return (
    <main className="min-h-screen bg-surface/50">
      <header className="border-b border-hairline bg-canvas">
        <Container className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="grid h-6 w-6 place-items-center rounded-md bg-brand text-[13px] font-semibold text-white"
            >
              C
            </Link>
            <span className="text-sm text-muted">
              {HOSPITAL.name} · {HOSPITAL.unit}
            </span>
          </div>
          <span className="rounded-full bg-blocked/10 px-3 py-1 text-xs font-medium text-blocked tnum">
            Discharge clock · 3h SLA
          </span>
        </Container>
      </header>

      <Container className="py-8">
        <h1 className="text-xl font-semibold tracking-tight text-ink">
          Discharge readiness
        </h1>

        <dl className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-5">
          {[
            { k: "Ready", v: s.ready },
            { k: "At risk", v: s.atrisk },
            { k: "Blocked", v: s.blocked },
            { k: "Beds at risk", v: s.bedsAtRisk },
            { k: "₹ blocked", v: inr(s.blockedRevenue) },
          ].map((stat) => (
            <div
              key={stat.k}
              className="rounded-card border border-hairline bg-canvas p-4"
            >
              <dt className="text-xs text-muted">{stat.k}</dt>
              <dd className="mt-1 text-xl font-semibold text-ink tnum">
                {stat.v}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 overflow-hidden rounded-card border border-hairline bg-canvas">
          <div className="border-b border-hairline px-5 py-3 text-sm text-muted">
            Claims, sorted risk-first
          </div>
          <ul className="divide-y divide-hairline">
            {sorted.map((c) => {
              const m = readinessMeta[c.readiness];
              return (
                <li key={c.id}>
                  <Link
                    href={`/claim/${c.id}`}
                    className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-surface/70"
                  >
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: m.dot }}
                      aria-hidden
                    />
                    <span className="w-16 shrink-0 text-sm font-medium text-ink tnum">
                      Bed {c.bed}
                    </span>
                    <span className="hidden w-40 shrink-0 text-sm text-muted sm:block">
                      {c.payer} · {c.tpa}
                    </span>
                    <span className="flex-1 truncate text-sm text-ink">
                      {c.blocker ?? m.text}
                    </span>
                    <span className="shrink-0 text-muted" aria-hidden>
                      →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <p className="mt-6 text-sm text-muted">
          Select any claim to open its lifecycle, document map, and copilot.{" "}
          <Link href="/" className="font-medium text-brand hover:text-brand-dark">
            Back to overview
          </Link>
          .
        </p>
      </Container>
    </main>
  );
}
