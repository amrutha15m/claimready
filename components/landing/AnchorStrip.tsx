import { Container } from "@/components/ui/Container";
import { anchor } from "@/lib/content/landing";

export function AnchorStrip() {
  return (
    <section className="border-b border-hairline bg-canvas">
      <Container className="flex flex-col items-center gap-4 py-7 text-center md:flex-row md:justify-between md:text-left">
        <p className="text-sm text-muted">{anchor.label}</p>
        <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
          {anchor.names.map((n) => (
            <li key={n} className="text-sm font-medium text-ink/70">
              {n}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
