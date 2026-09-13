"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import ScrambleText from "@/components/ScrambleText";
import ProjectCarousel from "@/components/ProjectCarousel";
import type { Project } from "@/lib/projects";
import { prefersReducedMotion } from "@/lib/motion";

export default function ProjectDetailContent({
  project,
  nextProject,
}: {
  project: Project;
  nextProject: Project;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const targets = container.querySelectorAll("[data-detail-reveal]");
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(targets, { opacity: 1, y: 0 });
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
          stagger: 0.1,
        },
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="mx-auto w-full max-w-4xl py-16 sm:py-24">
      <Link
        data-detail-reveal
        href="/work"
        className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-black/50 transition-colors hover:text-black dark:text-white/50 dark:hover:text-white"
      >
        ← Work
      </Link>

      <p
        data-detail-reveal
        className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-black/50 dark:text-white/50"
      >
        <span className="inline-block h-2 w-2 border border-black dark:border-white" />
        Selected Project
      </p>

      <h1
        data-detail-reveal
        className="text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl"
      >
        <ScrambleText text={project.title.toUpperCase()} delay={0} />
      </h1>

      <p
        data-detail-reveal
        className="mt-6 max-w-xl text-lg leading-relaxed text-black/70 dark:text-white/70"
      >
        {project.tagline}
      </p>

      <div
        data-detail-reveal
        className="mt-10 grid grid-cols-3 gap-4 border-y border-black/10 py-6 font-mono text-xs uppercase tracking-widest text-black/50 dark:border-white/10 dark:text-white/50 sm:gap-8"
      >
        <div>
          <p className="mb-2">Role</p>
          <p className="text-sm normal-case tracking-normal text-black/80 dark:text-white/80">
            {project.role}
          </p>
        </div>
        <div>
          <p className="mb-2">Stack</p>
          <p className="text-sm normal-case tracking-normal text-black/80 dark:text-white/80">
            {project.stack.join(", ")}
          </p>
        </div>
        <div>
          <p className="mb-2">Year</p>
          <p className="text-sm normal-case tracking-normal text-black/80 dark:text-white/80">
            {project.year}
          </p>
        </div>
      </div>

      <div data-detail-reveal className="mt-10">
        <ProjectCarousel slides={project.slides} accent={project.accent} />
      </div>

      <div data-detail-reveal className="mt-12 max-w-2xl space-y-5">
        {project.paragraphs.map((paragraph) => (
          <p
            key={paragraph}
            className="text-base leading-relaxed text-black/70 dark:text-white/70"
          >
            {paragraph}
          </p>
        ))}
      </div>

      <div
        data-detail-reveal
        className="mt-8 flex flex-wrap gap-2 font-mono text-[0.65rem] uppercase tracking-wider text-black/50 dark:text-white/50"
      >
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="border border-black/10 px-2 py-1 dark:border-white/10"
          >
            {tag}
          </span>
        ))}
      </div>

      <Link
        data-detail-reveal
        href={`/work/${nextProject.slug}`}
        className="group mt-24 flex items-center justify-between border-t border-black/10 pt-8 dark:border-white/10"
      >
        <div>
          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-black/50 dark:text-white/50">
            Next project
          </p>
          <p className="text-3xl font-bold tracking-tight transition-transform duration-300 group-hover:translate-x-2">
            {nextProject.title}
          </p>
        </div>
        <span className="text-3xl transition-transform duration-300 group-hover:translate-x-2">
          →
        </span>
      </Link>
    </div>
  );
}
