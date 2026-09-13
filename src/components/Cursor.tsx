"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { hasFinePointer, prefersReducedMotion } from "@/lib/motion";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!hasFinePointer() || prefersReducedMotion()) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add("cursor-none");

    const setDot = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3" });
    const setDotY = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3" });
    const setRing = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" });
    const setRingY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" });

    const handleMove = (e: PointerEvent) => {
      setDot(e.clientX);
      setDotY(e.clientY);
      setRing(e.clientX);
      setRingY(e.clientY);
    };

    const grow = () => {
      gsap.to(ring, { scale: 2.2, duration: 0.3, ease: "power3.out" });
      gsap.to(dot, { scale: 0, duration: 0.3, ease: "power3.out" });
    };
    const shrink = () => {
      gsap.to(ring, { scale: 1, duration: 0.3, ease: "power3.out" });
      gsap.to(dot, { scale: 1, duration: 0.3, ease: "power3.out" });
    };

    const interactive = 'a, button, [data-cursor="link"]';
    const handleOver = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest(interactive)) grow();
    };
    const handleOut = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest(interactive)) shrink();
    };

    window.addEventListener("pointermove", handleMove);
    document.addEventListener("pointerover", handleOver);
    document.addEventListener("pointerout", handleOut);

    return () => {
      document.documentElement.classList.remove("cursor-none");
      window.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerover", handleOver);
      document.removeEventListener("pointerout", handleOut);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white mix-blend-difference"
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference"
      />
    </>
  );
}
