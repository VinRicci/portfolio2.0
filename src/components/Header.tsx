"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "/work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header className="relative z-50 flex items-center justify-between border-b border-black/10 px-6 py-5 dark:border-white/10 sm:px-10">
      <Link
        href="/"
        onClick={() => setIsOpen(false)}
        className="flex items-center gap-3"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-xs font-bold text-white dark:bg-white dark:text-black">
          VR
        </span>
        <span className="font-mono text-sm tracking-tight">Vinicio Ricci</span>
      </Link>

      <nav className="hidden gap-8 font-mono text-xs uppercase tracking-wider text-black/60 dark:text-white/60 sm:flex">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="transition-colors hover:text-black dark:hover:text-white"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 sm:hidden"
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
        className={`fixed inset-x-0 top-[73px] bottom-0 flex flex-col justify-center gap-6 bg-white px-6 transition-opacity duration-300 dark:bg-black sm:hidden ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        {links.map((link, index) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className="text-4xl font-bold tracking-tight transition-transform duration-300"
            style={{
              transitionDelay: isOpen ? `${index * 60}ms` : "0ms",
              transform: isOpen ? "translateY(0)" : "translateY(12px)",
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
