"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrambleText from "@/components/ScrambleText";
import { hasFinePointer, prefersReducedMotion } from "@/lib/motion";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const reduced = prefersReducedMotion();
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set([badgeRef.current, headingRef.current, descriptionRef.current], {
          opacity: 1,
          y: 0,
        });
        return;
      }

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          badgeRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6 },
        )
        .fromTo(
          headingRef.current,
          { opacity: 0, y: 32, clipPath: "inset(0 0 100% 0)" },
          { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)", duration: 0.9 },
          "-=0.3",
        )
        .fromTo(
          descriptionRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.5",
        );
    }, sectionRef);

    if (!reduced && hasFinePointer()) {
      const content = contentRef.current;
      if (content) {
        const setX = gsap.quickTo(content, "x", { duration: 0.8, ease: "power3" });
        const setY = gsap.quickTo(content, "y", { duration: 0.8, ease: "power3" });

        const handleMove = (e: PointerEvent) => {
          const relX = (e.clientX / window.innerWidth - 0.5) * 2;
          const relY = (e.clientY / window.innerHeight - 0.5) * 2;
          setX(relX * -10);
          setY(relY * -6);
        };

        window.addEventListener("pointermove", handleMove);
        return () => {
          window.removeEventListener("pointermove", handleMove);
          ctx.revert();
        };
      }
    }

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="flex flex-1 items-center px-6 sm:px-10">
      <div ref={contentRef} className="mx-auto w-full max-w-4xl py-24">
        <p
          ref={badgeRef}
          className="mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-black/50 dark:text-white/50"
        >
          <span className="inline-block h-2 w-2 border border-black dark:border-white" />
          Software Engineer
        </p>

        <h1
          ref={headingRef}
          className="text-6xl font-bold leading-[0.95] tracking-tight sm:text-8xl"
        >
          <ScrambleText text="VINICIO" delay={0} />
          <br />
          <ScrambleText text="RICCI" delay={150} />
          <span className="text-black/30 dark:text-white/30">.</span>
        </h1>

        <p
          ref={descriptionRef}
          className="mt-8 max-w-md text-lg leading-relaxed text-black/70 dark:text-white/70"
        >
          I build clean, functional software — from idea to finished
          product.
        </p>
      </div>
    </section>
  );
}
