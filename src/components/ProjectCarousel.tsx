"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import ProjectPlaceholder from "@/components/ProjectPlaceholder";
import { prefersReducedMotion } from "@/lib/motion";

const AUTOPLAY_MS = 4500;

export default function ProjectCarousel({
  slides,
  accent,
}: {
  slides: string[];
  accent: [string, string];
}) {
  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const captionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const dragStart = useRef<{ x: number; y: number } | null>(null);

  const reduced = prefersReducedMotion();

  const goTo = (next: number, direction: 1 | -1) => {
    const total = slides.length;
    const prev = indexRef.current;
    const wrapped = ((next % total) + total) % total;
    indexRef.current = wrapped;
    setIndex(wrapped);

    const track = trackRef.current;
    const incomingLayer = layerRefs.current[wrapped];
    const outgoingLayer = layerRefs.current[prev];
    const incomingCaption = captionRefs.current[wrapped];
    const outgoingCaption = captionRefs.current[prev];
    if (!track) return;

    gsap.killTweensOf([track, ...layerRefs.current, ...captionRefs.current]);

    if (reduced) {
      gsap.set(track, { xPercent: -100 * wrapped });
      gsap.set(layerRefs.current, { xPercent: 0 });
      gsap.set(incomingCaption, { opacity: 1, y: 0 });
      return;
    }

    const tl = gsap.timeline();
    tl.to(track, { xPercent: -100 * wrapped, duration: 0.9, ease: "power4.inOut" }, 0);

    if (incomingLayer) {
      gsap.set(incomingLayer, { xPercent: direction > 0 ? 20 : -20 });
      tl.to(incomingLayer, { xPercent: 0, duration: 0.9, ease: "power4.inOut" }, 0);
    }
    if (outgoingLayer && outgoingLayer !== incomingLayer) {
      tl.to(
        outgoingLayer,
        { xPercent: direction > 0 ? -20 : 20, duration: 0.9, ease: "power4.inOut" },
        0,
      );
    }
    if (incomingCaption) {
      tl.fromTo(
        incomingCaption,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        0.3,
      );
    }
    if (outgoingCaption && outgoingCaption !== incomingCaption) {
      tl.to(outgoingCaption, { opacity: 0, y: -10, duration: 0.3 }, 0);
    }
  };

  const restartProgress = () => {
    const bar = progressRef.current;
    if (!bar) return;
    gsap.killTweensOf(bar);
    if (reduced) return;
    gsap.fromTo(
      bar,
      { scaleX: 0 },
      { scaleX: 1, duration: AUTOPLAY_MS / 1000, ease: "none" },
    );
  };

  const next = () => goTo(indexRef.current + 1, 1);
  const prevSlide = () => goTo(indexRef.current - 1, -1);

  const startAutoplay = () => {
    if (reduced) return;
    stopAutoplay();
    restartProgress();
    timerRef.current = setInterval(next, AUTOPLAY_MS);
  };

  const stopAutoplay = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    if (progressRef.current) gsap.killTweensOf(progressRef.current);
  };

  useLayoutEffect(() => {
    if (captionRefs.current[0]) {
      gsap.set(captionRefs.current[0], { opacity: 1, y: 0 });
    }
    startAutoplay();
    return () => stopAutoplay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    dragStart.current = { x: e.clientX, y: e.clientY };
    stopAutoplay();
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    const start = dragStart.current;
    dragStart.current = null;
    if (start) {
      const dx = e.clientX - start.x;
      if (Math.abs(dx) > 50) {
        if (dx < 0) next();
        else prevSlide();
      }
    }
    startAutoplay();
  };

  return (
    <div
      ref={rootRef}
      className="group relative w-full overflow-hidden rounded-2xl border border-black/10 bg-black dark:border-white/10"
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      <div className="relative aspect-[16/9] w-full touch-pan-y select-none">
        <div
          ref={trackRef}
          className="flex h-full"
          style={{ width: `${slides.length * 100}%` }}
        >
          {slides.map((label, i) => (
            <div
              key={label}
              className="relative h-full flex-shrink-0 overflow-hidden"
              style={{ width: `${100 / slides.length}%` }}
            >
              <div
                ref={(el) => {
                  layerRefs.current[i] = el;
                }}
                className="absolute -inset-x-[15%] inset-y-0"
              >
                <ProjectPlaceholder
                  accent={accent}
                  index={i}
                  label={label}
                  showLabel={false}
                  className="h-full w-full"
                />
              </div>

              <div
                ref={(el) => {
                  captionRefs.current[i] = el;
                }}
                className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/80 to-transparent px-6 py-5 opacity-0"
              >
                <p className="font-mono text-xs uppercase tracking-widest text-white/90">
                  {label}
                </p>
                <p className="font-mono text-xs text-white/60">
                  {String(i + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* arrows */}
      <button
        type="button"
        aria-label="Previous slide"
        onClick={prevSlide}
        className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-black opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:bg-white"
      >
        ←
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={next}
        className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-black opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:bg-white"
      >
        →
      </button>

      {/* dots */}
      <div className="absolute left-1/2 top-4 flex -translate-x-1/2 gap-2">
        {slides.map((label, i) => (
          <button
            key={label}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i, i > index ? 1 : -1)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? "w-6 bg-white" : "w-1.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* autoplay progress */}
      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-white/10">
        <div
          ref={progressRef}
          className="h-full origin-left scale-x-0 bg-white"
        />
      </div>
    </div>
  );
}
