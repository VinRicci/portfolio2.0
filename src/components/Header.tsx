import Link from "next/link";

const links = [
  { href: "/work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b border-black/10 px-6 py-5 dark:border-white/10 sm:px-10">
      <Link href="/" className="flex items-center gap-3">
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
    </header>
  );
}
