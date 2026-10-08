import Link from "next/link";
import { site, nav } from "@/lib/site";
import { services } from "@/lib/data";
import Logo from "./Logo";

export default function Footer() {
  const h = "mb-3 font-heading text-lg font-semibold text-white";
  const a = "block py-1 text-blue-100/70 hover:text-white";
  return (
    <footer className="bg-navy-950 text-sm text-blue-100/70">
      <div className="wrap grid gap-10 py-14 md:grid-cols-4">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs">Electrical and security contractors delivering quality, well-managed installations in Rawalpindi and beyond.</p>
        </div>
        <div><h3 className={h}>Services</h3>{services.map((s) => <Link key={s.id} href={`/services#${s.id}`} className={a}>{s.title}</Link>)}</div>
        <div><h3 className={h}>Company</h3>{nav.map((l) => <Link key={l.href} href={l.href} className={a}>{l.label}</Link>)}</div>
        <div>
          <h3 className={h}>Contact</h3>
          <address className="not-italic">
            <p>{site.address}</p>
            <a href={site.phoneHref} className={a}>{site.phone}</a>
            <a href={site.whatsappHref} className={a}>WhatsApp: {site.mobile}</a>
          </address>
        </div>
      </div>
      <div className="border-t border-white/10 py-5"><div className="wrap">&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</div></div>
    </footer>
  );
}
