"use client";
import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

// Lenis gives the site inertia scrolling; disabled for reduced-motion users.
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;
  return <ReactLenis root options={{ lerp: 0.1, duration: 1.1 }}>{children}</ReactLenis>;
}
