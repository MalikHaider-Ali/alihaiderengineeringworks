# Ali Haider Engineering Works website

Next.js (App Router) · Tailwind CSS v4 · Motion (Framer Motion) · Lenis · Three.js via React Three Fiber

## Run it
1. `npm install`
2. `cp .env.example .env.local` and fill in `RESEND_API_KEY`, `MAIL_FROM`, `MAIL_TO`
3. `npm run dev` then open http://localhost:3000
4. Before deploying: `npm run typecheck && npm run build`

## Structure
- `app/` pages (home, services, projects, about, contact) and `app/api/contact` (validated, rate-limited)
- `components/` UI, Navbar, Footer, `HeroScene` + `PowerGrid` (3D), `ProjectGrid`, `ContactForm`
- `lib/data.ts` all content. `lib/site.ts` contact details. `lib/validation.ts` form rules (shared client and server)
- `app/globals.css` design tokens (navy and white palette)
- `public/projects/` real photos from the company profile

## Before launch (client must confirm)
- Email, final phone and WhatsApp numbers in `lib/site.ts`
- Real figures for the hero metrics in `app/page.tsx` (marked TODO)
- Certifications (PEC, ISO) only if the client holds them
- Add missing photos (bus way image in the profile is too small to use)
