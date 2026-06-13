import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { shift } from "@/lib/content/landing";

function Column({
  label,
  steps,
  tone,
}: {
  label: string;
  steps: string[];
  tone: "today" | "after";
}) {
  const accent = tone === "after" ? "#13A05C" : "#DC4C4C";
  return (
    <div
      className={`rounded-card border bg-canvas p-7 ${
        tone === "after" ? "border-brand/40 shadow-card" : "border-hairline"
      }`}
    >
      <div className="flex items-center gap-2">
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: accent }}
          aria-hidden
        />
        <h3 className="text-base font-medium text-ink">{label}</h3>
      </div>
      <ol className="mt-5 space-y-3.5">
        {steps.map((s, i) => (
          <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted">
            <span
              className="mt-0.5 w-4 shrink-0 text-right font-medium tabular-nums"
              style={{ color: accent }}
            >
              {i + 1}
            </span>
            <span>{s}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Shift() {
  return (
    <section className="border-b border-hairline bg-surface/60">
      <Container className="py-20 md:py-24">
        <div className="max-w-2xl">
          <Eyebrow tone="muted">{shift.eyebrow}</Eyebrow>
          <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl">
            {shift.title}
          </h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <Column label={shift.today.label} steps={shift.today.steps} tone="today" />
          <Column
            label={shift.withClaimReady.label}
            steps={shift.withClaimReady.steps}
            tone="after"
          />
        </div>
      </Container>
    </section>
  );
}
