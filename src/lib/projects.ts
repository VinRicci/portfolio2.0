export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  paragraphs: string[];
  role: string;
  stack: string[];
  year: string;
  tags: string[];
  accent: [string, string];
  slides: string[];
};

export const projects: Project[] = [
  {
    slug: "tsf",
    title: "TSF",
    tagline: "Internal tooling for tracking field operations in real time.",
    description:
      "A dashboard and mobile-friendly console used by field teams to log visits, sync data, and flag issues on the spot.",
    paragraphs: [
      "TSF started as a spreadsheet-and-WhatsApp workflow that couldn't keep up with the team's growth. The goal was to replace it with a single source of truth: one dashboard for managers, one lightweight console for the field.",
      "I worked across the stack — a Node/Postgres API, a React dashboard for supervisors, and an offline-first mobile view so field agents could keep logging visits even with a spotty connection, syncing automatically once back online.",
      "The biggest win was cutting the daily reporting cycle from a manual end-of-day roundup to live, always-current data supervisors could act on immediately.",
    ],
    role: "Full-stack engineer",
    stack: ["React", "Node.js", "PostgreSQL", "Docker"],
    year: "2024",
    tags: ["Dashboard", "Real-time", "Mobile-friendly"],
    accent: ["#3b82f6", "#22d3ee"],
    slides: [
      "Supervisor dashboard",
      "Field console — visit log",
      "Sync & offline queue",
      "Issue flagging flow",
    ],
  },
  {
    slug: "dsd",
    title: "DSD",
    tagline: "A distribution scheduling system for a growing logistics team.",
    description:
      "Route planning, driver assignment, and delivery tracking in one tool, built to replace a patchwork of manual scheduling.",
    paragraphs: [
      "DSD's scheduling was living across phone calls, a whiteboard, and a shared Excel file. Small mistakes — double-booked drivers, missed windows — were costing real money every week.",
      "I designed and built a scheduling core that assigns routes based on driver availability and delivery windows, with a drag-and-drop calendar for dispatchers to make quick manual adjustments when reality didn't match the plan.",
      "Rolled out gradually, region by region, with dispatchers in the room for every iteration — the interface changed a lot in the first month based on what they actually needed on a busy morning.",
    ],
    role: "Full-stack engineer",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Redis"],
    year: "2023",
    tags: ["Scheduling", "Logistics", "Internal tool"],
    accent: ["#8b5cf6", "#ec4899"],
    slides: [
      "Dispatcher calendar",
      "Route assignment view",
      "Driver mobile view",
      "Delivery tracking map",
    ],
  },
  {
    slug: "personal",
    title: "Personal",
    tagline: "This site, and a handful of smaller side projects.",
    description:
      "A collection of self-directed builds — mostly small tools made to learn something specific or scratch a personal itch.",
    paragraphs: [
      "Between client and job work, I keep a rotating set of side projects going — some finished, some abandoned once they'd taught me what I wanted to learn.",
      "This portfolio itself is one of them: a small Next.js site I keep using as a sandbox for whatever I'm currently curious about, animation included.",
      "Others have been smaller — a CLI tool, a couple of automation scripts, and a few UI experiments that never shipped anywhere but were worth building anyway.",
    ],
    role: "Solo",
    stack: ["Next.js", "GSAP", "Tailwind CSS"],
    year: "2024 — ongoing",
    tags: ["Side projects", "Experiments"],
    accent: ["#f59e0b", "#84cc16"],
    slides: [
      "Portfolio — hero",
      "Portfolio — work grid",
      "CLI experiment",
      "UI sketch",
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
