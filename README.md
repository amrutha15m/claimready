# ClaimReady AI

An AI module for **Superleap CRM** that prepares and tracks every cashless
insurance claim from pre-auth to discharge — so a hospital's insurance desk
clears beds within the regulatory clock and stops revenue from sitting in a
blocked ward.

This repository is a clickable product-feature proposal built for a Superleap
PM take-home. It carries all four parts of the brief:

1. **Research & problem** — the landing page (`/`) opens on the challenge,
   backed by published figures.
2. **Proposed solution** — the solution section on the landing page, with the
   full depth (GTM, cost structure, naming & branding, guardrails) at
   `/proposal`.
3. **Prototype** — the live demo: the discharge-readiness board at `/dashboard`,
   and the per-claim detail at `/claim/[id]` with working copilot flows and a
   discharge-readiness alert.

## The thesis

IRDAI's 2024 Master Circular put insurers on a 1-hour pre-auth and 3-hour
discharge clock — and they mostly meet it. The bottleneck has therefore moved
onto the **hospital**: assembling complete, query-proof documentation fast
enough to beat that clock. ClaimReady is the tool that helps the desk win the
race.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS 3 (design tokens matched to Superleap's green-accent look)
- Geist font
- Seeded, deterministic demo data — **no backend, no live API, no real patient
  data**, so the demo behaves identically every time.

## Run locally

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new) — Next.js is detected
   automatically; no configuration needed.
3. Deploy. Submit the resulting `*.vercel.app` URL plus this repo link.

## Structure

```
app/
  page.tsx              landing narrative (research · problem · solution)
  dashboard/page.tsx    the readiness board
  claim/[id]/page.tsx   per-claim detail with copilot flows
  proposal/page.tsx     GTM · cost · naming/branding · guardrails
components/landing/     hero, challenge, solution, impact, shift, CTA
components/claim/        timeline, document map, copilot rail, claim shell
components/ui/           small primitives (container, eyebrow)
lib/content/             landing.ts, proposal.ts — all copy in one place
lib/data/claims.ts       seeded demo data (fictional Meridian Health)
```

## A note on figures

All numbers are illustrative and drawn from public sources (IRDAI 2024 Master
Circular, NABH discharge norms, a LocalCircles survey, and Indian hospital RCM
benchmarks). The projected-impact figures are modeled from those benchmarks, not
measured customer results. The healthcare logos shown are existing Superleap
clients — included only as evidence the customer segment exists, not as
ClaimReady users.
