import type { Metadata } from "next";
import Header from "@/components/Header";
import WorkPageContent from "@/components/WorkPageContent";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work — Vinicio Ricci",
  description: "Selected work by Vinicio Ricci",
};

export default function Work() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-black dark:bg-black dark:text-white">
      <Header />

      <main className="flex-1 px-6 sm:px-10">
        <WorkPageContent projects={projects} />
      </main>
    </div>
  );
}
