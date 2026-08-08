"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";

export default function PageTransition({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const prevPathname = useRef(pathname);
  const origin = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      origin.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("pointerdown", handlePointerDown);
    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  useLayoutEffect(() => {
    if (prevPathname.current === pathname) return;
    prevPathname.current = pathname;

    const overlay = overlayRef.current;
    if (!overlay) return;

    const { x, y } = origin.current;
    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    gsap.set(overlay, {
      clipPath: `circle(${maxRadius}px at ${x}px ${y}px)`,
    });
    gsap.to(overlay, {
      clipPath: `circle(0px at ${x}px ${y}px)`,
      duration: 0.8,
      ease: "power3.inOut",
    });
  }, [pathname]);

  return (
    <>
      <div
        ref={overlayRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-50 bg-zinc-600 will-change-[clip-path]"
        style={{ clipPath: "circle(0px at 0px 0px)" }}
      />
      {children}
    </>
  );
}
