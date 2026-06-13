"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Claim, Readiness } from "@/lib/data/claims";
import { HOSPITAL, readinessMeta } from "@/lib/data/claims";
import { Container } from "@/components/ui/Container";
import { ReadinessBadge } from "@/components/claim/ReadinessBadge";
import { Timeline } from "@/components/claim/Timeline";
import { DocumentMap, PolicyPanel } from "@/components/claim/DocumentMap";
import { CopilotRail } from "@/components/claim/CopilotRail";

export function ClaimDetail({ claim }: { claim: Claim }) {
  const [resolved, setResolved] = useState(claim.readiness === "ready");
  const [docs, setDocs] = useState(claim.documents);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 6000);
    return () => clearTimeout(t);
  }, [toast]);

  const readiness: Readiness = resolved ? "ready" : claim.readiness;

  function handleResolve() {
    setDocs((prev) => {
      let next = prev.map((d) =>
        d.status === "review"
          ? { ...d, status: "present" as const, note: d.note ? "Physician-approved" : undefined }
          : d
      );
      if (claim.blockerType === "enhancement")
        next = [...next, { name: "Enhancement request", status: "present" as const }];
      if (claim.blockerType === "query")
        next = [...next, { name: "Query response", status: "present" as const }];
      return next;
    });
    setResolved(true);
    setToast(
      `Bed ${claim.bed} is ready. Discharge will clear within the 3-hour window.`
    );
  }

  const timeline = resolved
    ? claim.timeline.map((e, i, arr) =>
        i === arr.length - 1
          ? { ...e, detail: "Ready to clear", state: "active" as const, time: "Now" }
          : { ...e, state: "done" as const }
      )
    : claim.timeline;

  const verdict =
    readiness === "ready"
      ? "Ready. Discharge will clear within the 3-hour window."
      : readiness === "atrisk"
      ? `Almost ready: ${claim.blocker}`
      : `Not ready: ${claim.blocker}`;

  const verdictTone =
    readiness === "ready"
      ? "border-brand/40 bg-brand/[0.06] text-brand-dark"
      : readiness === "atrisk"
      ? "border-atrisk/40 bg-atrisk/[0.08] text-[#8a5a14]"
      : "border-blocked/40 bg-blocked/[0.06] text-blocked";

  return (
    <main className="min-h-screen bg-surface/50">
      <header className="border-b border-hairline bg-canvas">
        <Container className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              ← Board
            </Link>
            <span className="text-hairline">/</span>
            <span className="text-sm text-muted">
              {HOSPITAL.name} · {HOSPITAL.unit}
            </span>
          </div>
          <span
            className="rounded-full px-3 py-1 text-xs font-medium tnum"
            style={{ backgroundColor: "#FBEAE9", color: "#A32D2D" }}
          >
            Discharge clock · 3h SLA
          </span>
        </Container>
      </header>

      <Container className="py-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-semibold tracking-tight text-ink">
                {claim.patient}
              </h1>
              <ReadinessBadge readiness={readiness} />
            </div>
            <p className="mt-1 text-sm text-muted tnum">
              {claim.id} · Bed {claim.bed} · {claim.payer} · {claim.tpa}
            </p>
          </div>
        </div>

        <div
          className={`mt-6 flex items-center gap-3 rounded-card border px-4 py-3 text-sm font-medium ${verdictTone}`}
        >
          <span
            className="h-2.5 w-2.5 shrink-0 rounded-full"
            style={{ backgroundColor: readinessMeta[readiness].dot }}
            aria-hidden
          />
          {verdict}
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          <div className="space-y-5 lg:col-span-2">
            <Timeline events={timeline} />
            <DocumentMap docs={docs} claim={claim} />
            <PolicyPanel
              policy={claim.policy}
              approved={claim.approvedAmount}
              billed={claim.billedAmount}
            />
          </div>
          <CopilotRail claim={claim} resolved={resolved} onResolve={handleResolve} />
        </div>
      </Container>

      {toast && (
        <div className="toast-in fixed bottom-5 right-5 z-50 max-w-sm">
          <div
            role="status"
            className="flex items-start gap-3 rounded-card border border-brand/40 bg-canvas px-4 py-3 shadow-lift"
          >
            <span className="mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full bg-brand" aria-hidden />
            <div className="flex-1">
              <p className="text-xs font-medium uppercase tracking-wide text-brand">
                Discharge readiness
              </p>
              <p className="mt-0.5 text-sm leading-snug text-ink">{toast}</p>
            </div>
            <button
              onClick={() => setToast(null)}
              aria-label="Dismiss"
              className="text-muted transition-colors hover:text-ink"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
