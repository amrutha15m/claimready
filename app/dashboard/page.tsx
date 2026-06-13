"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import {
  HOSPITAL,
  claims,
  readinessMeta,
  summarize,
  type Readiness,
} from "@/lib/data/claims";

function inr(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

export default function DashboardPage() {
  const [filter, setFilter] = useState<Readiness | null>(null);

  const s = summarize(claims);
  const sorted = [...claims].sort((a, b) => {
    const order = { blocked: 0, atrisk: 1, ready: 2 } as const;
    return order[a.readiness] - order[b.readiness];
  });

  const displayed = filter ? sorted.filter((c) => c.readiness === filter) : sorted;

  function toggleFilter(f: Readiness) {
    setFilter((prev) => (prev === f ? null : f));
  }

  const filterCards: { k: string; v: number; f: Readiness }[] = [
    { k: "Ready", v: s.ready, f: "ready" },
    { k: "At risk", v: s.atrisk, f: "atrisk" },
    { k: "Blocked", v: s.blocked, f: "blocked" },
  ];

  const dotColor: Record<Readiness, string> = {
    ready: "#13A05C",
    atrisk: "#E0A23B",
    blocked: "#DC4C4C",
  };

  const tableLabel = filter
    ? `${readinessMeta[filter].label} claims`
    : "Claims, sorted risk-first";

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
          {filterCards.map(({ k, v, f }) => {
            const active = filter === f;
            return (
              <button
                key={k}
                onClick={() => toggleFilter(f)}
                className={`rounded-card border p-4 text-left transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
                  active
                    ? "border-brand bg-brand/[0.05] shadow-sm"
                    : "border-hairline bg-canvas hover:border-brand/40 hover:bg-surface/60"
                }`}
              >
                <dt className="flex items-center gap-1.5 text-xs text-muted">
                  {active && (
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: dotColor[f] }}
                      aria-hidden
                    />
                  )}
                  {k}
                </dt>
                <dd className="mt-1 text-xl font-semibold text-ink tnum">{v}</dd>
              </button>
            );
          })}

          {[
            { k: "Beds at risk", v: s.bedsAtRisk },
            { k: "₹ blocked", v: inr(s.blockedRevenue) },
          ].map(({ k, v }) => (
            <div
              key={k}
              className="rounded-card border border-hairline bg-canvas p-4"
            >
              <dt className="text-xs text-muted">{k}</dt>
              <dd className="mt-1 text-xl font-semibold text-ink tnum">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 overflow-hidden rounded-card border border-hairline bg-canvas">
          <div className="flex items-center justify-between border-b border-hairline px-5 py-3">
            <span className="text-sm text-muted">{tableLabel}</span>
            {filter && (
              <button
                onClick={() => setFilter(null)}
                className="text-xs text-muted transition-colors hover:text-ink"
              >
                Clear filter ×
              </button>
            )}
          </div>
          <ul className="divide-y divide-hairline">
            {displayed.map((c) => {
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
            {displayed.length === 0 && (
              <li className="px-5 py-8 text-center text-sm text-muted">
                No claims in this category.
              </li>
            )}
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
