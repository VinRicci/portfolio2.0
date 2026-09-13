export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function hasFinePointer() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}
