import Header from "@/components/Header";
import AboutSection from "@/components/AboutSection";
import ScrambleText from "@/components/ScrambleText";

export default function Home() {
  return (
    <div className="flex flex-col bg-white text-black dark:bg-black dark:text-white">
      <div className="flex min-h-screen flex-col">
        <Header />

        <main className="flex flex-1 items-center px-6 sm:px-10">
          <div className="mx-auto w-full max-w-4xl py-24">
            <p
              className="animate-fade-up mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-black/50 dark:text-white/50"
              style={{ animationDelay: "0ms" }}
            >
              <span className="inline-block h-2 w-2 border border-black dark:border-white" />
              Software Engineer
            </p>

            <h1 className="text-6xl font-bold leading-[0.95] tracking-tight sm:text-8xl">
              <ScrambleText text="VINICIO" delay={0} />
              <br />
              <ScrambleText text="RICCI" delay={150} />
              <span className="text-black/30 dark:text-white/30">.</span>
            </h1>

            <p
              className="animate-fade-up mt-8 max-w-md text-lg leading-relaxed text-black/70 dark:text-white/70"
              style={{ animationDelay: "380ms" }}
            >
              I build clean, functional software — from idea to finished
              product.
            </p>
          </div>
        </main>
      </div>

      <div
        aria-hidden
        className="h-24 bg-gradient-to-b from-white to-zinc-100 sm:h-40 dark:from-black dark:to-zinc-900"
      />

      <AboutSection />
    </div>
  );
}
