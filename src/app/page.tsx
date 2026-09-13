import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";

export default function Home() {
  return (
    <div className="flex flex-col bg-white text-black dark:bg-black dark:text-white">
      <div className="flex min-h-screen flex-col">
        <Header />
        <Hero />
      </div>

      <div
        aria-hidden
        data-speed="0.85"
        className="h-24 bg-gradient-to-b from-white to-zinc-100 sm:h-40 dark:from-black dark:to-zinc-900"
      />

      <AboutSection />
    </div>
  );
}
