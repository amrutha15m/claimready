import { notFound } from "next/navigation";
import { claims, getClaim } from "@/lib/data/claims";
import { ClaimDetail } from "@/components/claim/ClaimDetail";

export function generateStaticParams() {
  return claims.map((c) => ({ id: c.id }));
}

export default function ClaimPage({ params }: { params: { id: string } }) {
  const claim = getClaim(params.id);
  if (!claim) notFound();
  return <ClaimDetail claim={claim} />;
}
