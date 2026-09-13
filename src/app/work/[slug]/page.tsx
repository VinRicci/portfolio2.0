import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import ProjectDetailContent from "@/components/ProjectDetailContent";
import { getProject, projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: `${project.title} — Vinicio Ricci`,
    description: project.description,
  };
}

export default async function ProjectPage({
  params,
}: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <div className="flex min-h-screen flex-col bg-white text-black dark:bg-black dark:text-white">
      <Header />

      <main className="flex-1 px-6 sm:px-10">
        <ProjectDetailContent project={project} nextProject={nextProject} />
      </main>
    </div>
  );
}
