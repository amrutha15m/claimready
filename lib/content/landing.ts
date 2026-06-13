// All landing copy lives here so it's easy to tune without touching components.
// Research figures are sourced from IRDAI's 2024 Master Circular, NABH norms,
// a LocalCircles survey, and Indian hospital RCM benchmarks (cited in the page).

export const hero = {
  eyebrow: "An AI module for Superleap CRM",
  title: "Turn stuck claims into cleared beds.",
  subtitle:
    "ClaimReady prepares and tracks every cashless claim from pre-auth to discharge — so the hospital insurance desk clears beds within the clock and stops revenue from sitting in a blocked ward.",
  primaryCta: "View demo",
  secondaryCta: "See the problem",
};

export const anchor = {
  label: "Superleap already serves healthcare providers",
  // Real Superleap healthcare clients — evidence the customer segment exists.
  // NOT presented as ClaimReady users.
  names: ["Nethradhama", "MediBuddy", "Luma Fertility", "Carepal", "Superhealth"],
};

export const challenge = {
  eyebrow: "The challenge",
  title: "The insurer answers in an hour. The desk still takes five.",
  subtitle:
    "Manual checklists, last-minute documents, and queries that reset the clock — the bottleneck has moved onto the hospital, and nothing helps the desk beat it.",
  cards: [
    {
      pain: "Insurers must clear discharge in three hours — so why do insurance discharges average over five?",
      evidence:
        "IRDAI's 2024 circular put insurers on a 1-hour pre-auth and 3-hour discharge clock, and they mostly hit it. Hospitals don't: insurance-patient discharges average 5h 9m against NABH's 3–4h norm.",
      whatif:
        "What if the desk knew a claim's readiness the moment the patient was admitted?",
    },
    {
      pain: "A bed waiting on paperwork is revenue standing still.",
      evidence:
        "Six in ten claimants wait 6–48 hours for approval and discharge. At ₹3,000–8,000 per bed per day, every delayed discharge is a blocked bed a new patient can't use.",
      whatif:
        "What if every at-risk discharge surfaced before the doctor signed off?",
    },
    {
      pain: "One missing document or open query, and the claim resets.",
      evidence:
        "Insurers reject 11% of claims and flag 10–15% with queries — almost always a documentation problem, not a clinical one. Each query is a pause that quietly restarts the clock.",
      whatif:
        "What if blockers were caught — and the response drafted — the moment they appeared?",
    },
  ],
};

export const solution = {
  eyebrow: "The solution",
  title: "Every claim, ready before discharge.",
  subtitle:
    "One readiness signal that runs from admission to approval — built inside Superleap, sitting next to the desk's existing workflow.",
  cards: [
    {
      name: "A live readiness board",
      desc: "Today's claims, sorted risk-first, each with a traffic-light state and the one thing blocking it.",
      points: [
        "Beds at risk and ₹ blocked, at a glance",
        "Discharge-readiness alert before sign-off",
        "Live against the 3-hour clock",
      ],
    },
    {
      name: "Copilots that clear blockers",
      desc: "When a query or gap appears, ClaimReady drafts the response from the claim's own documents.",
      points: [
        "TPA query responses, drafted",
        "Enhancement requests on bill-vs-approval gaps",
        "Justification structured for physician sign-off",
      ],
    },
    {
      name: "A clean claim, handed to cash",
      desc: "A complete final summary at discharge that turns a cleared bed into faster collection.",
      points: [
        "Higher clean-claim rate",
        "10–20 fewer AR days",
        "Less silent revenue leakage",
      ],
    },
  ],
};

export const impact = {
  label: "Projected impact · modeled from published benchmarks",
  stats: [
    { value: "30–60 min", label: "saved per discharge" },
    { value: "10–15", label: "more beds turned / day" },
    { value: "10–20", label: "fewer AR days" },
    { value: "11% → lower", label: "claim rejection rate" },
  ],
};

export const shift = {
  eyebrow: "The shift",
  title: "Same desk, same insurer clock — a different ending.",
  today: {
    label: "Discharge today",
    steps: [
      "Admit and treat — claim untouched until checkout",
      "Documents assembled under pressure at discharge",
      "TPA raises a query; the clock resets",
      "Patient waits 5+ hours; the bed stays blocked",
    ],
  },
  withClaimReady: {
    label: "With ClaimReady",
    steps: [
      "Readiness tracked from the moment of admission",
      "Missing docs and gaps flagged during the stay",
      "Query responses drafted from the claim itself",
      "Clean claim at discharge; bed clears in the window",
    ],
  },
};

export const finalCta = {
  title: "See it work inside the CRM.",
  subtitle:
    "Walk the discharge-readiness board and clear a blocked claim end-to-end.",
  cta: "View demo",
};
