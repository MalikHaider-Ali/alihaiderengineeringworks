"use client";
import dynamic from "next/dynamic";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";

// Loaded only in the browser, so the 3D code never blocks first paint.
const PowerGrid = dynamic(() => import("./PowerGrid"), { ssr: false });

// If the 3D scene throws for any reason, fall back to the blueprint grid instead of breaking the page
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error: unknown) { console.error("3D hero failed:", error); }
  render() { return this.state.failed ? null : this.props.children; }
}

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch { return false; }
}

// Shows the CSS blueprint grid first (and forever if WebGL is missing), then fades the 3D scene in.
export default function HeroScene() {
  const ref = useRef<HTMLDivElement>(null);
  const [webgl, setWebgl] = useState(false);
  const [visible, setVisible] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    const ok = hasWebGL();
    if (!ok) console.info("WebGL is unavailable or disabled in this browser, so the 3D hero is replaced by the static grid.");
    setWebgl(ok);
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting)); // pause rendering when scrolled away
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} aria-hidden className="blueprint absolute inset-0">
      {webgl && <SceneBoundary><PowerGrid active={visible && !reduce} /></SceneBoundary>}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/85 via-navy-950/30 to-transparent" />
    </div>
  );
}
