"use client";

import { useLayoutEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function SmoothScroller({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    const reduced = prefersReducedMotion();

    ScrollTrigger.normalizeScroll(true);

    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: reduced ? 0 : 1.1,
      effects: true,
      normalizeScroll: true,
      ignoreMobileResize: true,
    });

    ScrollTrigger.refresh();

    return () => {
      smoother.kill();
    };
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
