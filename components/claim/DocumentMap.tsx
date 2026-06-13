import type { DocItem, Policy } from "@/lib/data/claims";
import { inr } from "@/lib/data/claims";

function StatusIcon({ status }: { status: DocItem["status"] }) {
  if (status === "present")
    return (
      <span className="grid h-4 w-4 place-items-center rounded-full bg-brand/15">
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
      <span className="grid h-4 w-4 place-items-center rounded-full bg-atrisk/20">
        <span className="h-1.5 w-1.5 rounded-full bg-atrisk" />
      </span>
    );
  return (
    <span className="grid h-4 w-4 place-items-center rounded-full bg-blocked/15">
      <svg width="8" height="8" viewBox="0 0 12 12" fill="none" aria-hidden>
        <path d="M3 3L9 9M9 3L3 9" stroke="#DC4C4C" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export function DocumentMap({ docs }: { docs: DocItem[] }) {
  return (
    <section className="rounded-card border border-hairline bg-canvas p-6">
      <h2 className="text-sm font-medium text-ink">Document map</h2>
      <ul className="mt-4 divide-y divide-hairline">
        {docs.map((d) => (
          <li key={d.name} className="flex items-center gap-3 py-2.5">
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
          </li>
        ))}
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
          Gap of {inr(gap)} above approved — enhancement required before discharge.
        </p>
      )}
      <p className="mt-4 text-xs leading-relaxed text-muted">{policy.note}</p>
    </section>
  );
}
