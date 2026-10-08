"use client";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { categories, projects } from "@/lib/data";

type Project = (typeof projects)[number];

// Filterable grid. Framer Motion animates the layout when a filter changes; a click opens a larger view.
export default function ProjectGrid() {
  const [active, setActive] = useState<(typeof categories)[number]>("All");
  const [open, setOpen] = useState<Project | null>(null);
  const list = projects.filter((p) => active === "All" || p.category === active);

  return (
    <>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects">
        {categories.map((c) => (
          <button key={c} type="button" aria-pressed={active === c} onClick={() => setActive(c)}
            className={`min-h-11 rounded border px-4 text-sm font-semibold transition-colors ${active === c ? "border-navy-900 bg-navy-900 text-white" : "border-blue-100 text-navy-900 hover:bg-blue-100"}`}>
            {c}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-8 grid gap-4 md:grid-cols-6">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <motion.button layout key={p.title} type="button" onClick={() => setOpen(p)}
              initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.3 }}
              className={`group relative overflow-hidden rounded-lg bg-navy-900 text-left ${i % 5 === 0 ? "aspect-[16/10] md:col-span-4" : "aspect-[4/3] md:col-span-2"}`}>
              <Image src={`/projects/${p.image}.jpg`} alt={p.title} fill sizes="(min-width:768px) 60vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950 to-transparent p-4 pt-14 text-white">
                <span className="block text-xs text-blue-100/80">{p.category}</span>
                <span className="block font-heading text-xl font-semibold">{p.title}</span>
              </span>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div role="dialog" aria-modal="true" aria-label={open.title} onClick={() => setOpen(null)}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] grid place-items-center bg-navy-950/90 p-4">
            <motion.div onClick={(e) => e.stopPropagation()} initial={{ y: 20 }} animate={{ y: 0 }} className="w-full max-w-3xl overflow-hidden rounded-xl border border-navy-700 bg-white">
              <div className="relative aspect-[16/10] bg-navy-950">
                <Image src={`/projects/${open.image}.jpg`} alt={open.title} fill sizes="768px" className="object-contain" />
              </div>
              <div className="flex items-start justify-between gap-4 p-6">
                <div><div className="text-sm">{open.category}</div><h3 className="text-2xl">{open.title}</h3><p className="mt-2">{open.text}</p></div>
                <button type="button" autoFocus onClick={() => setOpen(null)} className="min-h-11 rounded border border-blue-100 px-4 font-semibold text-navy-900 hover:bg-blue-100">Close</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
