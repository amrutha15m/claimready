import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { challenge } from "@/lib/content/landing";

export function Challenge() {
  return (
    <section id="challenge" className="border-b border-hairline bg-canvas">
      <Container className="py-20 md:py-24">
        <div className="max-w-2xl">
          <Eyebrow tone="blocked">{challenge.eyebrow}</Eyebrow>
          <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl">
            {challenge.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            {challenge.subtitle}
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {challenge.cards.map((card, i) => (
            <article
              key={i}
              className="flex flex-col rounded-card border border-hairline bg-surface/50 p-6"
            >
              <div className="flex items-start gap-3">
                <span
                  className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blocked"
                  aria-hidden
                />
                <h3 className="text-base font-medium leading-snug text-ink">
                  {card.pain}
                </h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {card.evidence}
              </p>
              <p className="mt-5 border-t border-hairline pt-5 text-sm font-medium leading-snug text-brand-dark">
                {card.whatif}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
