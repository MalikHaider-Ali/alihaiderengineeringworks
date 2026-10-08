import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { SectionHeading } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Contact and quotes", description: "Request a quote or speak to our team in Rawalpindi." };

export default function ContactPage() {
  return (
    <div className="wrap py-16 md:py-20">
      <SectionHeading title="Request a quote" intro="Tell us about your project. You can also call or message us directly." />
      <div className="mt-10 grid gap-10 lg:grid-cols-[3fr_2fr]">
        <ContactForm />
        <aside className="space-y-6">
          <div className="rounded-lg bg-navy-950 p-6 text-blue-100/80">
            <h2 className="text-2xl !text-white">Talk to us now</h2>
            <p className="mt-2"><a href={site.phoneHref} className="font-semibold text-white">{site.phone}</a></p>
            <p><a href={site.whatsappHref} className="font-semibold text-white">WhatsApp {site.mobile}</a></p>
          </div>
          <div className="rounded-lg border border-blue-100 p-6">
            <h2 className="text-xl">Office</h2>
            <p className="mt-1">{site.address}</p>
            <iframe title="Map of our office in Kamal Abad, Rawalpindi" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=Kamal+Abad+Rawalpindi&output=embed" className="mt-4 h-60 w-full rounded border-0" />
          </div>
        </aside>
      </div>
    </div>
  );
}
