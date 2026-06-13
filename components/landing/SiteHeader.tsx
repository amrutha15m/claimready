import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-hairline bg-canvas/85 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-page items-center justify-between px-6 md:px-10">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-6 w-6 place-items-center rounded-md bg-brand text-[13px] font-semibold text-white">
            C
          </span>
          <span className="text-sm font-semibold tracking-tight text-ink">
            ClaimReady
            <span className="ml-1.5 font-normal text-muted">for Superleap</span>
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/proposal"
            className="hidden rounded-lg px-3 py-2 text-sm font-medium text-ink transition-colors hover:bg-surface sm:inline-flex"
          >
            Full proposal
          </Link>
          <Link
            href="/dashboard"
            className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
          >
            View demo
          </Link>
        </div>
      </div>
    </header>
  );
}
