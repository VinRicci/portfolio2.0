"use client";

import Link from "next/link";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticLink from "@/components/MagneticLink";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const links = [
  { href: "/work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

const noopSubscribe = () => () => {};
const useMounted = () =>
  useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

function NavLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: () => void;
}) {
  const underlineRef = useRef<HTMLSpanElement>(null);

  const handleEnter = () => {
    if (prefersReducedMotion() || !underlineRef.current) return;
    gsap.to(underlineRef.current, {
      scaleX: 1,
      transformOrigin: "left",
      duration: 0.35,
      ease: "power3.out",
    });
  };

  const handleLeave = () => {
    if (prefersReducedMotion() || !underlineRef.current) return;
    gsap.to(underlineRef.current, {
      scaleX: 0,
      transformOrigin: "right",
      duration: 0.35,
      ease: "power3.out",
    });
  };

  return (
    <MagneticLink strength={0.4} data-header-reveal="">
      <Link
        href={href}
        onClick={onClick}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className="relative inline-block pb-1"
      >
        {label}
        <span
          ref={underlineRef}
          className="absolute inset-x-0 -bottom-0.5 h-px scale-x-0 bg-black dark:bg-white"
        />
      </Link>
    </MagneticLink>
  );
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const mounted = useMounted();
  const headerRef = useRef<HTMLElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const mobileLinkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Mount entrance
  useLayoutEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const targets = header.querySelectorAll("[data-header-reveal]");

    if (prefersReducedMotion()) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }

    gsap.fromTo(
      targets,
      { opacity: 0, y: -16 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.08,
        delay: 0.1,
      },
    );
  }, []);

  // Pin header + shrink on scroll
  useLayoutEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    if (prefersReducedMotion()) return;

    const pinTrigger = ScrollTrigger.create({
      trigger: header,
      start: "top top",
      end: "max",
      pin: true,
      pinSpacing: false,
    });

    const shrinkTrigger = ScrollTrigger.create({
      start: "top -80",
      onEnter: () =>
        gsap.to(header, {
          paddingTop: "0.75rem",
          paddingBottom: "0.75rem",
          duration: 0.3,
          ease: "power2.out",
        }),
      onLeaveBack: () =>
        gsap.to(header, {
          paddingTop: "1.25rem",
          paddingBottom: "1.25rem",
          duration: 0.3,
          ease: "power2.out",
        }),
    });

    return () => {
      pinTrigger.kill();
      shrinkTrigger.kill();
    };
  }, []);

  // Mobile menu open/close
  useLayoutEffect(() => {
    const panel = mobilePanelRef.current;
    const linkEls = mobileLinkRefs.current.filter(
      (el): el is HTMLAnchorElement => Boolean(el),
    );
    if (!panel) return;

    if (prefersReducedMotion()) {
      gsap.set(panel, { opacity: isOpen ? 1 : 0 });
      gsap.set(linkEls, { opacity: isOpen ? 1 : 0, y: 0 });
      return;
    }

    const tl = gsap.timeline();
    if (isOpen) {
      tl.to(panel, { opacity: 1, duration: 0.3, ease: "power2.out" }).fromTo(
        linkEls,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power3.out",
        },
        "-=0.15",
      );
    } else {
      tl.to(linkEls, {
        opacity: 0,
        y: 12,
        duration: 0.2,
        stagger: 0.03,
      }).to(panel, { opacity: 0, duration: 0.2 }, "-=0.1");
    }

    return () => {
      tl.kill();
    };
  }, [isOpen]);

  return (
    <header
      ref={headerRef}
      className="relative z-50 flex items-center justify-between border-b border-black/10 bg-white px-6 py-5 dark:border-white/10 dark:bg-black sm:px-10"
    >
      <MagneticLink strength={0.25} data-header-reveal="">
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-3"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-xs font-bold text-white dark:bg-white dark:text-black">
            VR
          </span>
          <span className="font-mono text-sm tracking-tight">
            Vinicio Ricci
          </span>
        </Link>
      </MagneticLink>

      <nav className="hidden gap-8 font-mono text-xs uppercase tracking-wider text-black/60 dark:text-white/60 sm:flex">
        {links.map((link) => (
          <NavLink
            key={link.href}
            href={link.href}
            label={link.label}
          />
        ))}
      </nav>

      {/* Mobile menu trigger + panel are portaled to <div id="menu-root"> in
          the root layout: header is pinned via a GSAP transform, and that
          (plus ScrollSmoother's own transform on #smooth-content) would
          otherwise become the containing block for a nested `fixed` panel,
          collapsing it instead of covering the viewport. */}
      {mounted &&
        createPortal(
          <>
            <button
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              className="fixed right-6 top-5 z-[70] flex h-8 w-8 flex-col items-center justify-center gap-1.5 sm:hidden"
            >
              <span
                className={`h-px w-5 bg-black transition-transform duration-300 dark:bg-white ${
                  isOpen ? "translate-y-[3.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px w-5 bg-black transition-transform duration-300 dark:bg-white ${
                  isOpen ? "-translate-y-[3.5px] -rotate-45" : ""
                }`}
              />
            </button>

            <div
              ref={mobilePanelRef}
              className={`fixed inset-0 z-[65] flex flex-col justify-center gap-6 bg-white px-6 pt-16 dark:bg-black sm:hidden ${
                isOpen ? "pointer-events-auto" : "pointer-events-none"
              }`}
              style={{ opacity: 0 }}
            >
              {links.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  ref={(el) => {
                    mobileLinkRefs.current[index] = el;
                  }}
                  className="text-4xl font-bold tracking-tight"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </>,
          document.getElementById("menu-root")!,
        )}
    </header>
  );
}
