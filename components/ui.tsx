import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

// Button variants follow DESIGN.md: 4px radius, sentence case, no pills.
const base = "inline-flex min-h-11 items-center justify-center gap-2 rounded px-5 text-[15px] font-semibold border transition-colors duration-200";
const variants = {
  primary: "bg-navy-700 border-navy-700 text-white hover:bg-navy-900 hover:border-navy-900",
  secondary: "bg-transparent border-blue-100 text-navy-900 hover:bg-blue-100",
  inverse: "bg-white border-white text-navy-900 hover:bg-blue-100 hover:border-blue-100",
  outlineDark: "bg-transparent border-white/30 text-white hover:border-white hover:bg-white/10",
};

export function ButtonLink({ variant = "primary", className = "", ...props }: ComponentProps<typeof Link> & { variant?: keyof typeof variants }) {
  return <Link className={`${base} ${variants[variant]} ${className}`} {...props} />;
}

// Specification badge (e.g. "11 kV")
export function Badge({ children }: { children: ReactNode }) {
  return <span className="inline-block rounded border border-navy-700/20 bg-blue-100 px-2 py-0.5 text-xs font-medium text-navy-900">{children}</span>;
}

export function SectionHeading({ title, intro, dark = false }: { title: string; intro?: string; dark?: boolean }) {
  return (
    <div className="max-w-2xl">
      <h2 className={`text-3xl md:text-[40px] ${dark ? "!text-white" : ""}`}>{title}</h2>
      {intro && <p className={`mt-4 text-lg ${dark ? "text-blue-100/80" : ""}`}>{intro}</p>}
    </div>
  );
}

// Engineering metric counter: blue accent line on the left edge
export function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-l-2 border-blue-500 pl-4">
      <div className="font-heading text-4xl font-bold text-white md:text-5xl">{value}</div>
      <div className="mt-1 text-sm text-blue-100/80">{label}</div>
    </div>
  );
}
