import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { SectionHeading } from "@/components/ui";
import { principles, team, values } from "@/lib/data";

export const metadata: Metadata = { title: "About and team", description: "Our values, principles and the team behind Ali Haider Engineering Works." };

export default function AboutPage() {
  return (
    <div className="wrap py-16 md:py-20">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <SectionHeading title="Controlled, well-managed and easy to work with"
          intro="We deliver quality electrical and security services in a closely controlled, professional manner, from pre-designed projects to full design and build. Our contract management keeps installations on programme and within budget." />
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg"><Image src="/projects/substation.jpg" alt="Substation switchyard with power transformer" fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover" priority /></div>
      </div>

      <section className="mt-20 grid gap-8 md:grid-cols-3">
        {values.map((v) => <Reveal key={v.title}><div className="border-t-4 border-navy-700 pt-4"><h2 className="text-2xl">{v.title}</h2><p className="mt-2">{v.text}</p></div></Reveal>)}
      </section>

      <section className="mt-20">
        <h2 className="text-3xl">Our core principles</h2>
        <div className="mt-6">
          {principles.map((p) => (
            <div key={p.title} className="grid gap-1 border-t border-blue-100 py-4 hover:bg-blue-100/40 md:grid-cols-[1fr_3fr] md:px-3">
              <h3 className="text-xl">{p.title}</h3><p>{p.text}</p>
            </div>
          ))}
          <div className="border-t border-blue-100" />
        </div>
      </section>

      <section className="mt-20">
        <h2 className="text-3xl">Our team</h2>
        <div className="mt-6 grid gap-x-8 sm:grid-cols-2">
          {team.map((m) => (
            <div key={m.name} className="flex items-baseline justify-between gap-4 border-t border-blue-100 py-4">
              <span className="font-semibold text-navy-900">{m.name}</span><span className="text-right text-sm">{m.role}</span>
            </div>
          ))}
        </div>
        <p className="mt-6">Supported by our project engineers and site staff.</p>
      </section>
    </div>
  );
}
