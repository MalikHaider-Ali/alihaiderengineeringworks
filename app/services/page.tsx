import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { Badge, ButtonLink, Metric } from "@/components/ui";
import { services } from "@/lib/data";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description: "Substations, protection, security, lighting, voice and data, maintenance and CAD design.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Expanded hero: copy and metrics on the left, real site photo on the right, quick links along the bottom */}
      <section className="blueprint relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/50" />

        <div className="wrap relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.25fr_1fr]">
          <div>
            <Reveal><Badge>Our services</Badge></Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-6 max-w-3xl text-4xl !text-white md:text-6xl">Electrical and security engineering, from design to maintenance</h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-xl text-lg text-blue-100/80">
                We deliver pre-designed and design-and-build projects on programme and within budget. One team handles the design, installation, testing and long-term upkeep of your power and security systems.
              </p>
            </Reveal>
            <Reveal delay={0.3} className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/contact" variant="inverse">Request a quote</ButtonLink>
              <ButtonLink href={site.phoneHref} variant="outlineDark">Call {site.phone}</ButtonLink>
            </Reveal>
            {/* TODO: confirm these figures with the client */}
            <Reveal delay={0.4} className="mt-12 grid max-w-2xl gap-8 sm:grid-cols-3">
              <Metric value="6" label="Service disciplines" />
              <Metric value="MV and LV" label="Substation and distribution work" />
              <Metric value="In-house" label="Design with full CAD facilities" />
            </Reveal>
          </div>

          <Reveal delay={0.2} className="hidden lg:block">
            <figure className="relative aspect-[4/5] overflow-hidden rounded-lg border border-white/15 bg-navy-900">
              <Image src="/projects/panels-11kv.jpg" alt="11 kV switchgear panels installed in a substation room" fill priority sizes="40vw" className="object-cover" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950 to-transparent p-5 pt-16 text-sm text-blue-100/90">
                11 kV switchgear panels, installed and tested by our crews
              </figcaption>
            </figure>
          </Reveal>
        </div>

        {/* Quick links to each service section */}
        <nav aria-label="Service categories" className="relative border-t border-white/10 bg-navy-950/60">
          <div className="wrap flex gap-x-8 overflow-x-auto">
            {services.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="whitespace-nowrap py-4 text-sm font-medium text-blue-100/80 hover:text-white">{s.title}</a>
            ))}
          </div>
        </nav>
      </section>

      {/* Service details as ruled rows */}
      <div className="wrap py-16 md:py-20">
        {services.map((s) => (
          <Reveal key={s.id}>
            <section id={s.id} className="scroll-mt-40 grid gap-6 border-t border-blue-100 py-10 md:grid-cols-[1fr_2fr]">
              <div><h2 className="text-3xl">{s.title}</h2><p className="mt-3">{s.summary}</p></div>
              <ul className="grid gap-x-8 sm:grid-cols-2">
                {s.items.map((i) => <li key={i} className="border-b border-blue-100 py-3 font-medium text-navy-900">{i}</li>)}
              </ul>
            </section>
          </Reveal>
        ))}

        <div className="mt-6 flex flex-wrap items-center gap-4 rounded-lg border border-blue-100 bg-blue-100/40 p-8">
          <div className="flex-1"><h2 className="text-2xl">Not sure which service you need?</h2><p className="mt-1">Describe the building and we will advise.</p></div>
          <ButtonLink href="/contact">Request a quote</ButtonLink>
        </div>
      </div>
    </>
  );
}