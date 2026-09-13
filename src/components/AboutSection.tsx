"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statementRef = useRef<HTMLParagraphElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduced = prefersReducedMotion();
    const targets = section.querySelectorAll("[data-about-reveal]");

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(targets, { opacity: 1, y: 0 });
        if (statementRef.current) gsap.set(statementRef.current, { opacity: 1 });
        return;
      }

      gsap.fromTo(
        targets,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );

      if (statementRef.current) {
        const split = SplitText.create(statementRef.current, {
          type: "lines",
          mask: "lines",
        });

        gsap.fromTo(
          split.lines,
          { opacity: 0, yPercent: 110, rotationX: -40 },
          {
            opacity: 1,
            yPercent: 0,
            rotationX: 0,
            duration: 0.8,
            ease: "power4.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      if (dotRef.current) {
        gsap.to(dotRef.current, {
          rotation: 360,
          duration: 6,
          ease: "none",
          repeat: -1,
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-zinc-100 px-6 pb-24 dark:bg-zinc-900 sm:px-10"
    >
      <div className="mx-auto w-full max-w-4xl">
        <p
          data-about-reveal
          className="mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-black/50 dark:text-white/50"
        >
          <span
            ref={dotRef}
            className="inline-block h-2 w-2 border border-black dark:border-white"
          />
          About
        </p>

        <p
          ref={statementRef}
          className="max-w-2xl text-2xl leading-relaxed font-medium text-black/80 sm:text-3xl dark:text-white/80"
        >
          Full-stack software engineer with 2-5 years of experience building
          products end-to-end — from backend logic to the interfaces people
          actually use.
        </p>

        <p
          data-about-reveal
          className="mt-6 max-w-xl text-base leading-relaxed text-black/60 dark:text-white/60"
        >
          I&apos;ve worked with companies like Tigo in areas like TSF or DSD, turning ideas into
          software that ships and holds up in production.
        </p>
      </div>
    </section>
  );
}
