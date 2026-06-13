import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { finalCta } from "@/lib/content/landing";

export function FinalCta() {
  return (
    <section className="bg-canvas">
      <Container className="py-24 text-center">
        <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-ink md:text-4xl">
          {finalCta.title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
          {finalCta.subtitle}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-lg bg-brand px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            {finalCta.cta}
          </Link>
          <Link
            href="/proposal"
            className="inline-flex items-center justify-center rounded-lg border border-hairline bg-canvas px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-surface"
          >
            Read the full proposal
          </Link>
        </div>
      </Container>
    </section>
  );
}
