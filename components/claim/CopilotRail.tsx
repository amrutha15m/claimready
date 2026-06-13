"use client";

import { useState } from "react";
import type { Claim } from "@/lib/data/claims";
import { inr } from "@/lib/data/claims";

const DRAFTS: Record<string, string> = {
  enhancement:
    "Requesting enhancement of ₹64,000 over the approved ₹1,20,000. Patient required an extended ICU stay (Day 1–3) with continued ventilatory support, supported by the attached clinical notes and revised final bill. Room rent remains within the ₹8,000/day cap. Kindly authorize the revised amount of ₹1,84,000.",
  query:
    "Line of treatment was conservative management of acute bacterial infection. IV antibiotics (Ceftriaxone) administered for 48 hours per the clinical notes attached, transitioned to oral on Day 2. Discharge summary updated to reflect duration and dosage. Please find supporting notes enclosed.",
};

function Spinner() {
  return (
    <span
      className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-brand/30 border-t-brand"
      aria-hidden
    />
  );
}

type Step = "idle" | "drafting" | "drafted" | "sending" | "done";

export function CopilotRail({
  claim,
  resolved,
  onResolve,
}: {
  claim: Claim;
  resolved: boolean;
  onResolve: () => void;
}) {
  const [step, setStep] = useState<Step>("idle");
  const [summaryOpen, setSummaryOpen] = useState(false);
  const isActive = !resolved && claim.blockerType !== null;
  const draft = claim.blockerType ? DRAFTS[claim.blockerType] : "";

  function startDraft() {
    setStep("drafting");
    setTimeout(() => setStep("drafted"), 1100);
  }
  function send() {
    setStep("sending");
    setTimeout(() => {
      setStep("done");
      onResolve();
    }, 900);
  }
  function requestSignoff() {
    setStep("sending");
    setTimeout(() => {
      setStep("done");
      onResolve();
    }, 1200);
  }

  const verb = claim.blockerType === "enhancement" ? "enhancement request" : "query response";

  return (
    <aside className="space-y-4">
      {isActive && (
        <section className="rounded-card border border-hairline bg-canvas p-6">
          <div className="flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-md bg-brand text-[12px] font-semibold text-white">
              C
            </span>
            <h2 className="text-sm font-medium text-ink">ClaimReady copilot</h2>
          </div>

          {/* Sign-off flow */}
          {claim.blockerType === "signoff" && (
            <div className="mt-4">
              <p className="text-sm leading-relaxed text-muted">
                The discharge summary is complete but awaits the treating
                physician&rsquo;s sign-off. ClaimReady can request it now.
              </p>
              {step === "idle" && (
                <button
                  onClick={requestSignoff}
                  className="mt-4 w-full rounded-lg bg-brand px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
                >
                  Request physician sign-off
                </button>
              )}
              {step === "sending" && (
                <p className="mt-4 flex items-center gap-2 text-sm text-muted">
                  <Spinner /> Awaiting sign-off from Dr. Menon&hellip;
                </p>
              )}
            </div>
          )}

          {/* Enhancement / query flow */}
          {(claim.blockerType === "enhancement" || claim.blockerType === "query") && (
            <div className="mt-4">
              {claim.blockerType === "query" && claim.queryText && (
                <div className="mb-4 rounded-lg bg-blocked/[0.06] px-3 py-2.5">
                  <p className="text-xs font-medium text-blocked">TPA query</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink">
                    {claim.queryText}
                  </p>
                </div>
              )}
              {step === "idle" && (
                <>
                  <p className="text-sm leading-relaxed text-muted">
                    ClaimReady can draft the {verb} from this claim&rsquo;s own
                    documents.
                  </p>
                  <button
                    onClick={startDraft}
                    className="mt-4 w-full rounded-lg bg-brand px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
                  >
                    Draft {verb}
                  </button>
                </>
              )}
              {step === "drafting" && (
                <p className="flex items-center gap-2 text-sm text-muted">
                  <Spinner /> Drafting from clinical notes&hellip;
                </p>
              )}
              {(step === "drafted" || step === "sending") && (
                <>
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted">
                    Drafted {verb}
                  </p>
                  <div className="rounded-lg border border-hairline bg-surface/60 p-3 text-sm leading-relaxed text-ink">
                    {draft}
                  </div>
                  <p className="mt-2 text-xs text-muted">
                    Review before sending — you stay in control.
                  </p>
                  <button
                    onClick={send}
                    disabled={step === "sending"}
                    className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-dark disabled:opacity-70"
                  >
                    {step === "sending" ? (
                      <>
                        <Spinner /> Sending to {claim.tpa}&hellip;
                      </>
                    ) : (
                      <>Send to {claim.tpa}</>
                    )}
                  </button>
                </>
              )}
            </div>
          )}
        </section>
      )}

      {/* Resolved / ready → final approval summary */}
      {(resolved || claim.readiness === "ready") && (
        <section className="rounded-card border border-brand/40 bg-canvas p-6 shadow-card">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-brand" aria-hidden />
            <h2 className="text-sm font-medium text-ink">Ready to clear</h2>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Hospital-side documentation is complete. The claim can be submitted
            for final approval within the insurer&rsquo;s 3-hour discharge SLA.
          </p>
          {!summaryOpen ? (
            <button
              onClick={() => setSummaryOpen(true)}
              className="mt-4 w-full rounded-lg border border-brand bg-brand/[0.06] px-4 py-2.5 text-sm font-medium text-brand-dark transition-colors hover:bg-brand/10"
            >
              Generate final approval summary
            </button>
          ) : (
            <dl className="mt-4 space-y-2 rounded-lg border border-hairline bg-surface/60 p-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">Claim</dt>
                <dd className="font-medium text-ink tnum">{claim.id}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Patient · bed</dt>
                <dd className="font-medium text-ink">
                  {claim.patient} · {claim.bed}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Payer</dt>
                <dd className="font-medium text-ink">{claim.payer}</dd>
              </div>
              <div className="flex justify-between border-t border-hairline pt-2">
                <dt className="text-muted">Final claim value</dt>
                <dd className="font-medium text-ink tnum">
                  {inr(Math.max(claim.billedAmount, claim.approvedAmount))}
                </dd>
              </div>
              <p className="pt-1 text-xs leading-relaxed text-brand-dark">
                Clean claim submitted. Faster collection — fewer days in AR.
              </p>
            </dl>
          )}
        </section>
      )}
    </aside>
  );
}
