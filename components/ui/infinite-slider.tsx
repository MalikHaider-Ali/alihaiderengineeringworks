"use client";

import { useEffect, useState } from "react";
import { animate, motion, useMotionValue, useReducedMotion } from "motion/react";
import useMeasure from "react-use-measure";
import { cn } from "@/lib/utils";

type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  duration?: number; // seconds for one full loop
  durationOnHover?: number; // slower loop while hovering
  direction?: "horizontal" | "vertical";
  reverse?: boolean;
  className?: string;
};

export function InfiniteSlider({
  children, gap = 16, duration = 25, durationOnHover, direction = "horizontal", reverse = false, className,
}: InfiniteSliderProps) {
  const reduce = useReducedMotion();
  const [currentDuration, setCurrentDuration] = useState(duration);
  const [ref, { width, height }] = useMeasure();
  const translation = useMotionValue(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (reduce) return;
    let controls: ReturnType<typeof animate> | undefined;
    const size = direction === "horizontal" ? width : height;
    const contentSize = size + gap;
    const from = reverse ? -contentSize / 2 : 0;
    const to = reverse ? 0 : -contentSize / 2;

    if (isTransitioning) {
      // Smoothly change speed from the current position
      controls = animate(translation, [translation.get(), to], {
        ease: "linear",
        duration: currentDuration * Math.abs((translation.get() - to) / contentSize),
        onComplete: () => { setIsTransitioning(false); setKey((k) => k + 1); },
      });
    } else {
      controls = animate(translation, [from, to], {
        ease: "linear", duration: currentDuration, repeat: Infinity, repeatType: "loop", repeatDelay: 0,
        onRepeat: () => translation.set(from),
      });
    }
    return () => controls?.stop();
  }, [key, translation, currentDuration, width, height, gap, isTransitioning, direction, reverse, reduce]);

  // Visitors who prefer reduced motion get a normal, manually scrollable row
  if (reduce) return <div className={cn("flex overflow-x-auto", className)} style={{ gap }}>{children}</div>;

  const hoverProps = durationOnHover
    ? {
        onHoverStart: () => { setIsTransitioning(true); setCurrentDuration(durationOnHover); },
        onHoverEnd: () => { setIsTransitioning(true); setCurrentDuration(duration); },
      }
    : {};

  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        ref={ref}
        className="flex w-max"
        style={{ ...(direction === "horizontal" ? { x: translation } : { y: translation }), gap, flexDirection: direction === "horizontal" ? "row" : "column" }}
        {...hoverProps}
      >
        {children}
        {/* Second copy makes the loop seamless; hidden from screen readers so photos are not read twice */}
        <div aria-hidden className="contents">{children}</div>
      </motion.div>
    </div>
  );
}
