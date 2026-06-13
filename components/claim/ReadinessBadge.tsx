import { readinessMeta, type Readiness } from "@/lib/data/claims";

export function ReadinessBadge({ readiness }: { readiness: Readiness }) {
  const m = readinessMeta[readiness];
  const bg =
    readiness === "ready"
      ? "bg-brand/10 text-brand-dark"
      : readiness === "atrisk"
      ? "bg-atrisk/15 text-[#8a5a14]"
      : "bg-blocked/10 text-blocked";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${bg}`}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: m.dot }}
        aria-hidden
      />
      {m.label}
    </span>
  );
}
