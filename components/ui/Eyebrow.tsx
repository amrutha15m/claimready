export function Eyebrow({
  children,
  tone = "brand",
}: {
  children: React.ReactNode;
  tone?: "brand" | "blocked" | "muted";
}) {
  const color =
    tone === "blocked"
      ? "text-blocked"
      : tone === "muted"
      ? "text-muted"
      : "text-brand";
  return (
    <span
      className={`inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] ${color}`}
    >
      <span
        aria-hidden
        className="h-1.5 w-1.5 rounded-full"
        style={{
          backgroundColor:
            tone === "blocked" ? "#DC4C4C" : tone === "muted" ? "#5C6B64" : "#13A05C",
        }}
      />
      {children}
    </span>
  );
}
