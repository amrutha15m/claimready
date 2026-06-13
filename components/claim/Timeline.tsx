import type { TimelineEvent } from "@/lib/data/claims";

function Node({ state }: { state: TimelineEvent["state"] }) {
  if (state === "done") {
    return (
      <span className="grid h-5 w-5 place-items-center rounded-full bg-brand">
        <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden>
          <path
            d="M11.5 4L5.75 9.75L2.5 6.5"
            stroke="#fff"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    );
  }
  if (state === "active") {
    return (
      <span className="grid h-5 w-5 place-items-center rounded-full border-2 border-atrisk bg-atrisk/15">
        <span className="h-1.5 w-1.5 rounded-full bg-atrisk" />
      </span>
    );
  }
  return (
    <span className="grid h-5 w-5 place-items-center rounded-full border-2 border-hairline bg-canvas">
      <span className="h-1.5 w-1.5 rounded-full bg-hairline" />
    </span>
  );
}

export function Timeline({ events }: { events: TimelineEvent[] }) {
  return (
    <section className="rounded-card border border-hairline bg-canvas p-6">
      <h2 className="text-sm font-medium text-ink">Claim lifecycle</h2>
      <ol className="mt-5">
        {events.map((e, i) => (
          <li key={i} className="relative flex gap-4 pb-6 last:pb-0">
            {i < events.length - 1 && (
              <span
                className="absolute left-[9px] top-6 h-full w-px bg-hairline"
                aria-hidden
              />
            )}
            <Node state={e.state} />
            <div className="-mt-0.5 flex-1">
              <div className="flex items-baseline justify-between gap-3">
                <p
                  className={`text-sm font-medium ${
                    e.state === "pending" ? "text-muted" : "text-ink"
                  }`}
                >
                  {e.stage}
                </p>
                <span className="shrink-0 text-xs text-muted tnum">{e.time}</span>
              </div>
              <p className="mt-0.5 text-sm text-muted">{e.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
