"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrambleTextPlugin);

export default function ScrambleText({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const tween = gsap.to(el, {
      duration: Math.max(0.8, text.length * 0.09),
      delay: delay / 1000,
      ease: "none",
      scrambleText: {
        text,
        chars: "upperCase",
        speed: 0.3,
        revealDelay: 0.15,
      },
    });

    return () => {
      tween.kill();
    };
  }, [text, delay]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {text}
    </span>
  );
}
