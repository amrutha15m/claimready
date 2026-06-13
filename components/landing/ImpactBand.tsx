import { Container } from "@/components/ui/Container";
import { impact } from "@/lib/content/landing";

export function ImpactBand() {
  return (
    <section className="border-b border-hairline bg-canvas">
      <Container className="py-14">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
          {impact.label}
        </p>
        <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
          {impact.stats.map((s) => (
            <div key={s.label}>
              <dt className="text-3xl font-semibold tracking-tight text-ink tnum md:text-[2.5rem]">
                {s.value}
              </dt>
              <dd className="mt-1.5 text-sm text-muted">{s.label}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
