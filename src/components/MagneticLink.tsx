"use client";

import { useLayoutEffect, useRef, type HTMLAttributes, type ReactNode } from "react";
import gsap from "gsap";
import { hasFinePointer, prefersReducedMotion } from "@/lib/motion";

export default function MagneticLink({
  children,
  strength = 0.35,
  className = "",
  ...rest
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, "className" | "children">) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !hasFinePointer() || prefersReducedMotion()) return;

    const setX = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" });
    const setY = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" });

    const handleMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      setX(relX * strength);
      setY(relY * strength);
    };

    const handleLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
    };

    el.addEventListener("pointermove", handleMove);
    el.addEventListener("pointerleave", handleLeave);

    return () => {
      el.removeEventListener("pointermove", handleMove);
      el.removeEventListener("pointerleave", handleLeave);
    };
  }, [strength]);

  return (
    <div
      ref={ref}
      className={`inline-block will-change-transform ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
