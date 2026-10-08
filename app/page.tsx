import Image from "next/image";
import Link from "next/link";
import HeroScene from "@/components/HeroScene";
import Reveal from "@/components/Reveal";
import { Badge, ButtonLink, Metric, SectionHeading } from "@/components/ui";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { clients, projects, sectors, services, values } from "@/lib/data";
import { site } from "@/lib/site";

// One client logo tile. Logos sit on white with a hairline border so mixed backgrounds look consistent.
function LogoTile({ name, logo, decorative }: { name: string; logo: string; decorative?: boolean }) {
  return (
    <div className="relative h-32 w-60 shrink-0 rounded-lg border border-blue-100 bg-white md:h-44 md:w-80">
      <Image src={logo} alt={decorative ? "" : name} fill sizes="320px" className="object-contain p-4" />
    </div>
  );
}

export default function Home() {
  const featured = [projects[0], projects[1], projects[5], projects[7]];
  return (
    <>
      {/* Hero: 3D power grid behind left-aligned copy */}
      <section className="relative overflow-hidden text-white">
        <HeroScene />
        <div className="wrap relative py-20 md:py-32">
          <Reveal><Badge>Contractor, Manufacturers & General Order Supplier</Badge></Reveal>
          <Reveal><Badge>Repairing & Maintenance of Electrical and Mechanical Systems</Badge></Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 max-w-3xl text-4xl !text-white md:text-6xl">Turnkey electrical infrastructure and integrated security engineering</h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl text-lg text-blue-100/80">
              From 132 kV substation work to CCTV and access control, we design, install, test and maintain systems for hotels, hospitals, schools and commercial buildings.
            </p>
          </Reveal>
          <Reveal delay={0.3} className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/contact" variant="inverse">Request a quote</ButtonLink>
            <ButtonLink href="/projects" variant="outlineDark">See our work</ButtonLink>
          </Reveal>
          {/* TODO: replace with verified figures from the client (years in business, projects completed) */}
          <Reveal delay={0.4} className="mt-16 grid max-w-3xl gap-8 sm:grid-cols-3">
            <Metric value="132 kV" label="Highest voltage level in our project portfolio" />
            <Metric value="6" label="Service disciplines under one roof" />
            <Metric value="In-house" label="Design team with full CAD facilities" />
          </Reveal>
        </div>
      </section>

      {/* Sectors */}
      <section className="wrap py-20">
        <Reveal><SectionHeading title="Sectors we serve" intro="Our experience covers projects as varied as these." /></Reveal>
        <Reveal className="mt-10 grid border-l border-t border-blue-100 sm:grid-cols-2 lg:grid-cols-4">
          {sectors.map((s) => <div key={s} className="border-b border-r border-blue-100 p-6 font-heading text-xl font-semibold text-navy-900">{s}</div>)}
        </Reveal>
      </section>

      {/* Capabilities as a ruled list */}
      <section className="bg-blue-100/40 py-20">
        <div className="wrap">
          <Reveal><SectionHeading title="What we do" intro="Complete electrical and security scope, managed by one team." /></Reveal>
          <div className="mt-10">
            {services.map((s) => (
              <Link key={s.id} href={`/services#${s.id}`} className="grid gap-2 border-t border-blue-100 bg-white/0 py-5 transition-colors hover:bg-blue-100/60 md:grid-cols-[1fr_2fr] md:px-3">
                <h3 className="text-2xl">{s.title}</h3>
                <p>{s.summary}</p>
              </Link>
            ))}
            <div className="border-t border-blue-100" />
          </div>
        </div>
      </section>

      {/* Featured projects with real site photos */}
      <section className="wrap py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Reveal><SectionHeading title="Work on site" intro="Photos from our own projects." /></Reveal>
          <ButtonLink href="/projects" variant="secondary">View all projects</ButtonLink>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {featured.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <figure className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-navy-900">
                <Image src={`/projects/${p.image}.jpg`} alt={p.title} fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950 to-transparent p-5 pt-16 text-white">
                  <div className="text-sm text-blue-100/80">{p.category}</div>
                  <div className="font-heading text-2xl font-semibold">{p.title}</div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-navy-950 py-20 text-blue-100/80">
        <div className="wrap">
          <Reveal><SectionHeading dark title="Safety, reliability, responsiveness" intro="These are the values behind every installation, and how we want to be judged." /></Reveal>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="border-t border-white/15 pt-5">
                <h3 className="text-2xl !text-white">{v.title}</h3>
                <p className="mt-2">{v.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-12 max-w-2xl border-l-2 border-blue-500 pl-4">
            After each completed project, clients can score our workmanship and management through our web-based survey. We use it to keep improving.
          </p>
        </div>
      </section>

      {/* Client logos: the list is repeated so the loop always fills wide screens */}
      <section className="py-20" aria-label="Our clients">
        <div className="wrap"><Reveal><SectionHeading title="Our clients" intro="Organizations that have trusted us with their electrical and security work." /></Reveal></div>
        <div className="mt-10 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <InfiniteSlider gap={24} duration={40} durationOnHover={90}>
            {[0, 1, 2].flatMap((round) =>
              clients.map((c) => <LogoTile key={`${round}-${c.name}`} name={c.name} logo={c.logo} decorative={round > 0} />)
            )}
          </InfiniteSlider>
        </div>
      </section>

      {/* Final CTA */}
      <section className="wrap py-20">
        <div className="rounded-lg border border-blue-100 bg-blue-100/40 p-8 md:p-12">
          <h2 className="max-w-2xl text-3xl md:text-4xl">Talk to our engineers about your project</h2>
          <p className="mt-3 max-w-xl text-lg">Tell us what you need. We will discuss the scope, the programme and the budget with you.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href="/contact">Request a quote</ButtonLink>
            <ButtonLink href={site.phoneHref} variant="secondary">Call {site.phone}</ButtonLink>
            <ButtonLink href={site.whatsappHref} variant="secondary">Message on WhatsApp</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}