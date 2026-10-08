"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { nav, site } from "@/lib/site";
import Logo from "./Logo";
import { ButtonLink } from "./ui";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Accessibility: Escape closes the menu and returns focus to the menu button;
  // the menu also closes if the window grows to desktop width.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); toggleRef.current?.focus(); }
    };
    const onResize = () => { if (window.innerWidth >= 1024) setOpen(false); };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("resize", onResize); };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Utility bar (tablet and desktop only) */}
      <div className="hidden bg-navy-950 text-[13px] text-blue-100/80 md:block">
        <div className="wrap flex h-9 items-center justify-between">
          <a href={site.phoneHref} className="hover:text-white">{site.phone}</a>
          <span>{site.address}</span>
        </div>
      </div>

      <div className="border-b border-blue-100 bg-white/95 backdrop-blur">
        <div className="wrap flex h-20 items-center justify-between gap-4 lg:h-24">
          <Link href="/" aria-label="Ali Haider Engineering Works, home" onClick={close} className="flex shrink-0 items-center">
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

          {/* Call and quote buttons: desktop only. On mobile they live inside the menu. */}
          <div className="flex shrink-0 items-center gap-2">
            <ButtonLink href={site.phoneHref} variant="secondary" className="hidden xl:inline-flex">Call us</ButtonLink>
            <ButtonLink href="/contact" className="hidden lg:inline-flex">Request a quote</ButtonLink>
            <button ref={toggleRef} type="button" aria-expanded={open} aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}
              className="grid size-11 place-items-center rounded border border-blue-100 text-navy-900 lg:hidden">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                {open ? <path d="M4 4l12 12M16 4L4 16" /> : <path d="M3 6h14M3 10h14M3 14h14" />}
              </svg>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav id="mobile-menu" aria-label="Mobile" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-blue-100 bg-white lg:hidden">
              {/* Scrolls inside the menu if the phone screen is short */}
              <div className="wrap flex max-h-[calc(100svh-5rem)] flex-col overflow-y-auto py-3">
                {nav.map((l) => (
                  <Link key={l.href} href={l.href} onClick={close} aria-current={pathname === l.href ? "page" : undefined}
                    className={`flex min-h-12 items-center border-b border-blue-100 font-medium ${pathname === l.href ? "text-navy-700" : "text-navy-900"}`}>
                    {l.label}
                  </Link>
                ))}
                <div className="mt-4 grid gap-2 pb-2">
                  <ButtonLink href="/contact" onClick={close}>Request a quote</ButtonLink>
                  <ButtonLink href={site.phoneHref} variant="secondary">Call {site.phone}</ButtonLink>
                  <ButtonLink href={site.whatsappHref} variant="secondary">Message on WhatsApp</ButtonLink>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}