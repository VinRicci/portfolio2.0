import type { Metadata } from "next";
import Header from "@/components/Header";
import Reveal from "@/components/Reveal";
import ScrambleText from "@/components/ScrambleText";

export const metadata: Metadata = {
  title: "Work — Vinicio Ricci",
  description: "Selected work by Vinicio Ricci",
};

const projects = [
  {
    title: "TSF",
    description: "Add a short description of this project here.",
    tags: ["Tag 1", "Tag 2"],
  },
  {
    title: "DSD",
    description: "Add a short description of this project here.",
    tags: ["Tag 1", "Tag 2"],
  },
  {
    title: "Personal",
    description: "Add a short description of this project here.",
    tags: ["Tag 1", "Tag 2"],
  },
];

export default function Work() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-black dark:bg-black dark:text-white">
      <Header />

      <main className="flex-1 px-6 sm:px-10">
        <div className="mx-auto w-full max-w-4xl py-24">
          <p
            className="animate-fade-up mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-black/50 dark:text-white/50"
            style={{ animationDelay: "0ms" }}
          >
            <span className="inline-block h-2 w-2 border border-black dark:border-white" />
            Selected Projects
          </p>

          <h1 className="text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl">
            <ScrambleText text="WORK" delay={120} />
            <span className="text-black/30 dark:text-white/30">.</span>
          </h1>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {projects.map((project, index) => (
              <Reveal key={project.title} delay={index * 100}>
                <div className="flex h-full flex-col justify-between border border-black/10 p-6 transition-colors hover:border-black/30 dark:border-white/10 dark:hover:border-white/30">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight">
                      {project.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-black/70 dark:text-white/70">
                      {project.description}
                    </p>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2 font-mono text-[0.65rem] uppercase tracking-wider text-black/50 dark:text-white/50">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-black/10 px-2 py-1 dark:border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
