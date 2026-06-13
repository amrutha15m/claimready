"use client";

import { useState } from "react";
import type { DocItem, Policy, Claim, DocPreview } from "@/lib/data/claims";
import { inr, getDocPreview } from "@/lib/data/claims";

function StatusIcon({ status }: { status: DocItem["status"] }) {
  if (status === "present")
    return (
      <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-brand/15">
        <svg width="9" height="9" viewBox="0 0 14 14" fill="none" aria-hidden>
          <path
            d="M11.5 4L5.75 9.75L2.5 6.5"
            stroke="#13A05C"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    );
  if (status === "review")
    return (
      <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-atrisk/20">
        <span className="h-1.5 w-1.5 rounded-full bg-atrisk" />
      </span>
    );
  return (
    <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-blocked/15">
      <svg width="8" height="8" viewBox="0 0 12 12" fill="none" aria-hidden>
        <path d="M3 3L9 9M9 3L3 9" stroke="#DC4C4C" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 text-muted motion-safe:transition-transform motion-safe:duration-150 ${
        open ? "rotate-180" : ""
      }`}
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function PreviewPanel({ preview }: { preview: DocPreview }) {
  return (
    <div className="mb-2 ml-7 rounded-lg border border-hairline bg-surface/70 px-3.5 py-3">
      {preview.badge && (
        <span className="mb-2.5 inline-block rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-medium text-brand-dark">
          {preview.badge}
        </span>
      )}
      <dl className="space-y-1.5">
        {preview.fields.map((f) => (
          <div key={f.label} className="flex gap-3 text-xs">
            <dt className="w-40 shrink-0 text-muted">{f.label}</dt>
            <dd className="text-ink">{f.value}</dd>
          </div>
        ))}
      </dl>
      {preview.warning && (
        <p className="mt-2.5 text-xs text-atrisk">{preview.warning}</p>
      )}
    </div>
  );
}

export function DocumentMap({ docs, claim }: { docs: DocItem[]; claim: Claim }) {
  const [openDoc, setOpenDoc] = useState<string | null>(null);

  function toggle(name: string) {
    setOpenDoc((prev) => (prev === name ? null : name));
  }

  return (
    <section className="rounded-card border border-hairline bg-canvas p-6">
      <h2 className="text-sm font-medium text-ink">Document map</h2>
      <ul className="mt-4 divide-y divide-hairline">
        {docs.map((d) => {
          const isOpen = openDoc === d.name;
          const preview = getDocPreview(claim, d);
          const hasPreview = preview != null;

          return (
            <li key={d.name}>
              {hasPreview ? (
                <button
                  type="button"
                  onClick={() => toggle(d.name)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-3 py-2.5 text-left"
                >
                  <StatusIcon status={d.status} />
                  <span className="flex-1 text-sm text-ink">{d.name}</span>
                  {d.note && (
                    <span
                      className={`text-xs ${
                        d.status === "review" ? "text-atrisk" : "text-muted"
                      }`}
                    >
                      {d.note}
                    </span>
                  )}
                  <ChevronIcon open={isOpen} />
                </button>
              ) : (
                <div className="flex items-center gap-3 py-2.5">
                  <StatusIcon status={d.status} />
                  <span className="flex-1 text-sm text-ink">{d.name}</span>
                  {d.note && (
                    <span
                      className={`text-xs ${
                        d.status === "review" ? "text-atrisk" : "text-muted"
                      }`}
                    >
                      {d.note}
                    </span>
                  )}
                </div>
              )}
              {isOpen && preview && <PreviewPanel preview={preview} />}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function PolicyPanel({
  policy,
  approved,
  billed,
}: {
  policy: Policy;
  approved: number;
  billed: number;
}) {
  const gap = billed - approved;
  return (
    <section className="rounded-card border border-hairline bg-canvas p-6">
      <h2 className="text-sm font-medium text-ink">Policy & amounts</h2>
      <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4">
        <div>
          <dt className="text-xs text-muted">Sum insured</dt>
          <dd className="mt-0.5 text-sm font-medium text-ink tnum">
            {inr(policy.sumInsured)}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted">Room-rent cap</dt>
          <dd className="mt-0.5 text-sm font-medium text-ink tnum">
            {policy.roomRentCap}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted">Approved</dt>
          <dd className="mt-0.5 text-sm font-medium text-ink tnum">
            {inr(approved)}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted">Billed</dt>
          <dd className="mt-0.5 text-sm font-medium tnum">
            <span className={gap > 0 ? "text-blocked" : "text-ink"}>
              {inr(billed)}
            </span>
          </dd>
        </div>
      </dl>
      {gap > 0 && (
        <p className="mt-4 rounded-lg bg-blocked/[0.06] px-3 py-2 text-xs text-blocked">
          Gap of {inr(gap)} above approved. Enhancement required before discharge.
        </p>
      )}
      <p className="mt-4 text-xs leading-relaxed text-muted">{policy.note}</p>
    </section>
  );
}
