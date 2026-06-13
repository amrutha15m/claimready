// Seeded, deterministic demo data for a FICTIONAL hospital.
// No real patient data; no live API. The demo always behaves the same.

export type Readiness = "ready" | "atrisk" | "blocked";
export type BlockerType = "enhancement" | "query" | "signoff" | null;
export type DocStatus = "present" | "review" | "missing";
export type StageState = "done" | "active" | "pending";

export type DocItem = { name: string; status: DocStatus; note?: string };
export type TimelineEvent = {
  stage: string;
  detail: string;
  state: StageState;
  time: string;
};
export type Policy = {
  sumInsured: number;
  roomRentCap: string;
  coPay: string;
  note: string;
};

export type Claim = {
  id: string;
  patient: string;
  bed: string;
  payer: string;
  tpa: string;
  approvedAmount: number;
  billedAmount: number;
  readiness: Readiness;
  blocker: string | null;
  blockerType: BlockerType;
  admittedAgoHours: number;
  policy: Policy;
  documents: DocItem[];
  timeline: TimelineEvent[];
  queryText?: string;
};

export const HOSPITAL = {
  name: "Meridian Health",
  city: "Bengaluru",
  unit: "Inpatient · Insurance desk",
};

export function inr(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

const baseDocs = (overrides: Partial<Record<string, DocStatus>> = {}): DocItem[] => [
  { name: "Pre-authorization form", status: overrides["pre"] ?? "present" },
  { name: "Policy & ID copy", status: overrides["id"] ?? "present" },
  { name: "Clinical notes", status: overrides["clin"] ?? "present" },
  {
    name: "Medical justification (AI-structured)",
    status: overrides["just"] ?? "present",
    note: overrides["just"] === "review" ? "Needs physician sign-off" : "Physician-approved",
  },
  { name: "Final bill", status: overrides["bill"] ?? "present" },
  { name: "Discharge summary", status: overrides["dis"] ?? "present" },
];

export const claims: Claim[] = [
  {
    id: "CLM-3181",
    patient: "R. Nair",
    bed: "318",
    payer: "Star Health",
    tpa: "Medi Assist",
    approvedAmount: 120000,
    billedAmount: 184000,
    readiness: "blocked",
    blocker: "Enhancement pending — billed exceeds approved by ₹64,000",
    blockerType: "enhancement",
    admittedAgoHours: 52,
    policy: {
      sumInsured: 500000,
      roomRentCap: "₹8,000 / day",
      coPay: "10%",
      note: "Approved ₹1,20,000 at admission; final bill higher after extended ICU stay.",
    },
    documents: baseDocs(),
    timeline: [
      { stage: "Admission", detail: "Cashless intimation sent", state: "done", time: "Day 1, 09:10" },
      { stage: "Pre-auth approved", detail: "₹1,20,000 authorized", state: "done", time: "Day 1, 09:52" },
      { stage: "Treatment", detail: "Extended ICU stay", state: "done", time: "Day 1–3" },
      { stage: "Final bill", detail: "₹1,84,000 — exceeds approval", state: "active", time: "Now" },
      { stage: "Discharge", detail: "Awaiting enhancement", state: "pending", time: "—" },
    ],
  },
  {
    id: "CLM-2044",
    patient: "S. Iyer",
    bed: "204",
    payer: "Care Health",
    tpa: "Family Health Plan",
    approvedAmount: 90000,
    billedAmount: 88000,
    readiness: "blocked",
    blocker: "TPA query open — discharge summary clarification requested",
    blockerType: "query",
    admittedAgoHours: 33,
    queryText:
      "Please clarify the line of treatment in the discharge summary and confirm the duration of IV antibiotics, with supporting clinical notes.",
    policy: {
      sumInsured: 300000,
      roomRentCap: "₹5,000 / day",
      coPay: "Nil",
      note: "Within approved amount; held only by an open TPA query.",
    },
    documents: baseDocs({ dis: "review" }),
    timeline: [
      { stage: "Admission", detail: "Cashless intimation sent", state: "done", time: "Day 1, 14:20" },
      { stage: "Pre-auth approved", detail: "₹90,000 authorized", state: "done", time: "Day 1, 15:05" },
      { stage: "Treatment", detail: "Completed", state: "done", time: "Day 1–2" },
      { stage: "Final bill", detail: "₹88,000 raised", state: "done", time: "Day 2, 11:00" },
      { stage: "Discharge", detail: "TPA query open", state: "active", time: "Now" },
    ],
  },
  {
    id: "CLM-4122",
    patient: "A. Khan",
    bed: "412",
    payer: "Niva Bupa",
    tpa: "Vidal Health",
    approvedAmount: 75000,
    billedAmount: 74500,
    readiness: "atrisk",
    blocker: "Discharge summary unsigned by treating physician",
    blockerType: "signoff",
    admittedAgoHours: 27,
    policy: {
      sumInsured: 400000,
      roomRentCap: "₹6,000 / day",
      coPay: "Nil",
      note: "Everything in order except the treating physician's sign-off.",
    },
    documents: baseDocs({ dis: "review" }),
    timeline: [
      { stage: "Admission", detail: "Cashless intimation sent", state: "done", time: "Day 1, 08:00" },
      { stage: "Pre-auth approved", detail: "₹75,000 authorized", state: "done", time: "Day 1, 08:40" },
      { stage: "Treatment", detail: "Completed", state: "done", time: "Day 1" },
      { stage: "Final bill", detail: "₹74,500 raised", state: "done", time: "Day 2, 09:30" },
      { stage: "Discharge", detail: "Summary awaiting sign-off", state: "active", time: "Now" },
    ],
  },
  {
    id: "CLM-1073",
    patient: "P. Desai",
    bed: "107",
    payer: "HDFC Ergo",
    tpa: "In-house",
    approvedAmount: 56000,
    billedAmount: 55200,
    readiness: "ready",
    blocker: null,
    blockerType: null,
    admittedAgoHours: 19,
    policy: {
      sumInsured: 250000,
      roomRentCap: "₹4,000 / day",
      coPay: "Nil",
      note: "Clean claim — all documents complete and within approval.",
    },
    documents: baseDocs(),
    timeline: [
      { stage: "Admission", detail: "Cashless intimation sent", state: "done", time: "Day 1, 10:15" },
      { stage: "Pre-auth approved", detail: "₹56,000 authorized", state: "done", time: "Day 1, 10:48" },
      { stage: "Treatment", detail: "Completed", state: "done", time: "Day 1" },
      { stage: "Final bill", detail: "₹55,200 raised", state: "done", time: "Now" },
      { stage: "Discharge", detail: "Ready to clear", state: "active", time: "Now" },
    ],
  },
  {
    id: "CLM-5090",
    patient: "M. Reddy",
    bed: "509",
    payer: "ICICI Lombard",
    tpa: "Medi Assist",
    approvedAmount: 142000,
    billedAmount: 141000,
    readiness: "ready",
    blocker: null,
    blockerType: null,
    admittedAgoHours: 41,
    policy: {
      sumInsured: 600000,
      roomRentCap: "₹10,000 / day",
      coPay: "10%",
      note: "Clean claim — complete and within approval.",
    },
    documents: baseDocs(),
    timeline: [
      { stage: "Admission", detail: "Cashless intimation sent", state: "done", time: "Day 1, 07:30" },
      { stage: "Pre-auth approved", detail: "₹1,42,000 authorized", state: "done", time: "Day 1, 08:12" },
      { stage: "Treatment", detail: "Completed", state: "done", time: "Day 1–2" },
      { stage: "Final bill", detail: "₹1,41,000 raised", state: "done", time: "Now" },
      { stage: "Discharge", detail: "Ready to clear", state: "active", time: "Now" },
    ],
  },
];

export const readinessMeta: Record<
  Readiness,
  { label: string; dot: string; text: string }
> = {
  ready: { label: "Ready", dot: "#13A05C", text: "Clean, ready to clear" },
  atrisk: { label: "At risk", dot: "#E0A23B", text: "One blocker remaining" },
  blocked: { label: "Blocked", dot: "#DC4C4C", text: "Needs action now" },
};

export function getClaim(id: string) {
  return claims.find((c) => c.id === id) ?? null;
}

export function summarize(list: Claim[]) {
  const ready = list.filter((c) => c.readiness === "ready").length;
  const atrisk = list.filter((c) => c.readiness === "atrisk").length;
  const blocked = list.filter((c) => c.readiness === "blocked").length;
  const blockedRevenue = list
    .filter((c) => c.readiness !== "ready")
    .reduce((sum, c) => sum + c.billedAmount, 0);
  return { ready, atrisk, blocked, bedsAtRisk: atrisk + blocked, blockedRevenue };
}
