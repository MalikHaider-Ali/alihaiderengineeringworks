import { site } from "@/lib/site";

// Mobile-only quick actions. Square buttons with 44px+ touch targets.
export default function FloatingContact() {
  const cls = "grid size-12 place-items-center rounded border border-navy-900 bg-navy-700 text-white shadow-[0_8px_16px_-4px_rgba(10,17,40,0.25)]";
  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-2 md:hidden">
      <a href={site.whatsappHref} aria-label="Message us on WhatsApp" className={cls}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h16a1 1 0 011 1v11a1 1 0 01-1 1H9l-5 4V5a1 1 0 011-1z" /></svg>
      </a>
      <a href={site.phoneHref} aria-label="Call us" className={cls}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M6.600 10.800a15 15 0 006.600 6.600l2.200-2.200a1 1 0 011-.25c1.100.4 2.300.6 3.600.6a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.500a1 1 0 011 1c0 1.300.2 2.500.6 3.600a1 1 0 01-.25 1z" /></svg>
      </a>
    </div>
  );
}
