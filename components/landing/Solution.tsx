import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { solution } from "@/lib/content/landing";

function Check() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
      className="mt-0.5 shrink-0"
    >
      <path
        d="M11.5 4L5.75 9.75L2.5 6.5"
        stroke="#13A05C"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Solution() {
  return (
    <section id="solution" className="border-b border-hairline bg-surface/60">
      <Container className="py-20 md:py-24">
        <div className="max-w-2xl">
          <Eyebrow>{solution.eyebrow}</Eyebrow>
          <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl">
            {solution.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            {solution.subtitle}
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {solution.cards.map((card, i) => (
            <article
              key={i}
              className="flex flex-col rounded-card border border-hairline bg-canvas p-6 shadow-card"
            >
              <span className="text-xs font-medium tabular-nums text-brand">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-lg font-medium tracking-tight text-ink">
                {card.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {card.desc}
              </p>
              <ul className="mt-5 space-y-2.5 border-t border-hairline pt-5">
                {card.points.map((p) => (
                  <li key={p} className="flex gap-2.5 text-sm text-ink">
                    <Check />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
