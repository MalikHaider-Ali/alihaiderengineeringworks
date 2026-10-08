"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { nav, site } from "@/lib/site";
import Logo from "./Logo";
import { ButtonLink } from "./ui";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Utility bar */}
      <div className="hidden bg-navy-950 text-[13px] text-blue-100/80 md:block">
        <div className="wrap flex h-9 items-center justify-between">
          <a href={site.phoneHref} className="hover:text-white">{site.phone}</a>
          <span>{site.address}</span>
        </div>
      </div>

      <div className="border-b border-blue-100 bg-white/95 backdrop-blur">
        {/* Taller bar (80px mobile, 96px desktop) so the logo has room */}
        <div className="wrap flex h-20 items-center justify-between gap-4 lg:h-24">
          {/* shrink-0 stops the logo from being squeezed by the menu */}
          <Link href="/" aria-label="Ali Haider Engineering Works, home" onClick={() => setOpen(false)} className="flex shrink-0 items-center">
            <Logo className="h-14 md:h-16 lg:h-[72px]" />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {nav.map((l) => (
              <Link key={l.href} href={l.href} aria-current={pathname === l.href ? "page" : undefined}
                className={`rounded px-3 py-2 text-[15px] font-medium hover:bg-blue-100 ${pathname === l.href ? "bg-blue-100 text-navy-900" : "text-slate-600"}`}>
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <ButtonLink href={site.phoneHref} variant="secondary" className="hidden xl:inline-flex">Call us</ButtonLink>
            <ButtonLink href="/contact" className="hidden sm:inline-flex">Request a quote</ButtonLink>
            <button type="button" aria-expanded={open} aria-controls="mobile-menu" aria-label="Menu" onClick={() => setOpen(!open)}
              className="grid size-11 place-items-center rounded border border-blue-100 text-navy-900 lg:hidden">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                {open ? <path d="M4 4l12 12M16 4L4 16" /> : <path d="M3 6h14M3 10h14M3 14h14" />}
              </svg>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav id="mobile-menu" aria-label="Mobile" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-blue-100 bg-white lg:hidden">
              <div className="wrap flex flex-col py-3">
                {nav.map((l) => (
                  <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="border-b border-blue-100 py-3 font-medium text-navy-900">{l.label}</Link>
                ))}
                <ButtonLink href="/contact" onClick={() => setOpen(false)} className="mt-4">Request a quote</ButtonLink>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}