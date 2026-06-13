import { SiteHeader } from "@/components/landing/SiteHeader";
import { Hero } from "@/components/landing/Hero";
import { AnchorStrip } from "@/components/landing/AnchorStrip";
import { Challenge } from "@/components/landing/Challenge";
import { Solution } from "@/components/landing/Solution";
import { ImpactBand } from "@/components/landing/ImpactBand";
import { Shift } from "@/components/landing/Shift";
import { FinalCta } from "@/components/landing/FinalCta";

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <AnchorStrip />
        <Challenge />
        <Solution />
        <ImpactBand />
        <Shift />
        <FinalCta />
      </main>
      <footer className="border-t border-hairline bg-surface/60">
        <div className="mx-auto w-full max-w-page px-6 py-8 md:px-10">
          <p className="text-xs leading-relaxed text-muted">
            ClaimReady AI is a product-feature proposal for Superleap CRM. Figures
            are drawn from public sources (IRDAI 2024 Master Circular, NABH
            discharge norms, a LocalCircles survey, and Indian hospital RCM
            benchmarks) and are illustrative. Demo data is for a fictional
            hospital; no real patient information is used.
          </p>
        </div>
      </footer>
    </>
  );
}
