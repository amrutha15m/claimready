// Depth for assignment Part 3 (Proposed Solution): naming & branding, GTM,
// rough cost structure — plus the guardrails that keep the feature credible.

export const proposalIntro = {
  eyebrow: "The full proposal",
  title: "How ClaimReady ships, sells, and stays honest.",
  subtitle:
    "The landing page makes the case. This is the operating detail behind it: go-to-market, a rough cost structure, the naming and theming rationale, and the guardrails that keep an AI claims copilot trustworthy.",
};

export const gtm = {
  eyebrow: "Go-to-market",
  title: "Land inside the accounts Superleap already has.",
  points: [
    {
      h: "The wedge",
      p: "Discharge-readiness for the insurance desk at multi-specialty hospitals already on Superleap. Healthcare is a named Superleap vertical, so this needs no new logo acquisition; it activates an existing relationship.",
    },
    {
      h: "Land and expand",
      p: "Start at the single sharpest pain (the discharge clock), prove cleared beds and AR-day reduction, then expand across the full claim lifecycle and into multi-hospital chains.",
    },
    {
      h: "Who buys, who uses",
      p: "Champion is the revenue-cycle head or CFO, who feels blocked beds and AR days as cash. The daily user is the insurance desk. The metric that closes the deal is bed turnover, not feature count.",
    },
    {
      h: "Time to value",
      p: "Fits Superleap's go-live-in-weeks promise. ClaimReady seeds from the hospital's existing HMS and billing integration, so the readiness board is populated on day one.",
    },
  ],
};

export const pricing = {
  eyebrow: "Cost structure",
  title: "Priced far below the value of a single recovered bed-day.",
  model:
    "A Superleap module priced per active bed per month, anchored so that recovering even one delayed discharge a week more than covers it. The economics are deliberately lopsided in the buyer's favour.",
  rows: [
    { label: "AI cost to process one claim", value: "under ₹50", note: "Document parsing + drafting (model + compute)" },
    { label: "Value of one recovered bed-day", value: "₹3,000–8,000", note: "A bed turned for a new admission" },
    { label: "Value of one prevented denial", value: "tens of thousands", note: "On a typical ₹1L+ cashless claim" },
  ],
  margin:
    "Because the marginal AI cost per claim is a few rupees against a price anchored to bed-day value, the module carries healthy software margins while still being an obvious yes for the hospital.",
};

export const naming = {
  eyebrow: "Naming, branding & theming",
  title: "Built to read as Superleap's tenth module.",
  points: [
    {
      h: "Why \u201cClaimReady\u201d",
      p: "It names the outcome (the claim is ready) and the moment (readiness, before discharge). Verb-forward and plain, in line with Superleap's own outcome-named surfaces: Pipeline, Leads, Engage, SuperAgents.",
    },
    {
      h: "Theming",
      p: "It borrows Superleap's chrome entirely: the green accent, the clean enterprise canvas, the left-rail module pattern. The readiness traffic light does double duty: \u201cready\u201d green is Superleap green, so the feature looks native by construction, not by decoration.",
    },
  ],
};

export const guardrails = {
  eyebrow: "Guardrails",
  title: "What the AI does, and what it never does.",
  points: [
    {
      h: "Human-in-the-loop",
      p: "ClaimReady structures the physician's existing notes into the insurer's required format. It never writes clinical justification itself, and a claim cannot clear without physician sign-off, surfaced explicitly in the document map.",
    },
    {
      h: "No medical advice, no invented rationale",
      p: "The copilot formats and drafts from documents that already exist. It never generates a medical reason to clear a claim. That line, crossed, is fraud, not automation.",
    },
    {
      h: "Privacy by design",
      p: "Patient data is handled under India's DPDP Act with consent and a full audit trail. Drafts are reviewable before anything is sent to a TPA.",
    },
    {
      h: "An honest signal",
      p: "Green means hospital-side complete: ready to clear within the insurer's SLA. It is not a guarantee of insurer approval, and the product never claims to be.",
    },
  ],
};
