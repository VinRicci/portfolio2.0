"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrambleText from "@/components/ScrambleText";
import ProjectPlaceholder from "@/components/ProjectPlaceholder";
import type { Project } from "@/lib/projects";
import { hasFinePointer, prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const card = cardRef.current;
    if (!card || !hasFinePointer() || prefersReducedMotion()) return;

    const setRotateX = gsap.quickTo(card, "rotationX", {
      duration: 0.5,
      ease: "power3",
    });
    const setRotateY = gsap.quickTo(card, "rotationY", {
      duration: 0.5,
      ease: "power3",
    });

    const handleMove = (e: PointerEvent) => {
      const rect = card.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      setRotateY(relX * 14);
      setRotateX(relY * -14);
    };

    const handleEnter = () => {
      gsap.to(card, { scale: 1.03, duration: 0.4, ease: "power3.out" });
      if (arrowRef.current) {
        gsap.to(arrowRef.current, { x: 4, duration: 0.3, ease: "power3.out" });
      }
    };

    const handleLeave = () => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        duration: 0.6,
        ease: "elastic.out(1, 0.5)",
      });
      if (arrowRef.current) {
        gsap.to(arrowRef.current, { x: 0, duration: 0.4, ease: "power3.out" });
      }
    };

    card.addEventListener("pointermove", handleMove);
    card.addEventListener("pointerenter", handleEnter);
    card.addEventListener("pointerleave", handleLeave);

    return () => {
      card.removeEventListener("pointermove", handleMove);
      card.removeEventListener("pointerenter", handleEnter);
      card.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  return (
    <div data-work-card className="[perspective:800px]">
      <Link
        ref={cardRef}
        href={`/work/${project.slug}`}
        className="flex h-full flex-col overflow-hidden border border-black/10 bg-white transition-colors hover:border-black/30 dark:border-white/10 dark:bg-black dark:hover:border-white/30 [transform-style:preserve-3d] will-change-transform"
      >
        <div className="aspect-video w-full overflow-hidden">
          <ProjectPlaceholder
            accent={project.accent}
            index={0}
            label={project.slides[0]}
            className="h-full w-full"
          />
        </div>

        <div className="flex flex-1 flex-col justify-between p-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              {project.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-black/70 dark:text-white/70">
              {project.description}
            </p>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex flex-wrap gap-2 font-mono text-[0.65rem] uppercase tracking-wider text-black/50 dark:text-white/50">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-black/10 px-2 py-1 dark:border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>
            <span className="flex items-center gap-1 whitespace-nowrap font-mono text-xs uppercase tracking-wider text-black/60 dark:text-white/60">
              View
              <span ref={arrowRef} className="inline-block">
                →
              </span>
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function WorkPageContent({
  projects,
}: {
  projects: Project[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduced = prefersReducedMotion();
    const label = container.querySelector("[data-work-reveal]");
    const cards = container.querySelectorAll("[data-work-card]");

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(label, { opacity: 1, y: 0 });
        gsap.set(cards, { opacity: 1, y: 0, scale: 1 });
        return;
      }

      gsap.fromTo(
        label,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      );

      gsap.fromTo(
        cards,
        { opacity: 0, y: 40, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "back.out(1.6)",
          stagger: 0.12,
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="mx-auto w-full max-w-4xl py-24">
      <p
        data-work-reveal
        className="mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-black/50 dark:text-white/50"
      >
        <span className="inline-block h-2 w-2 border border-black dark:border-white" />
        Selected Projects
      </p>

      <h1 className="text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl">
        <ScrambleText text="WORK" delay={120} />
        <span className="text-black/30 dark:text-white/30">.</span>
      </h1>

      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
