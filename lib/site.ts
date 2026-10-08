// Single source of truth for contact details. Verified against the company profile.
export const site = {
  name: "Ali Haider Engineering Works",
  phone: "+92 322 3222326",
  phoneHref: "tel:+923223222326",
  mobile: "+92 322 3222326",
  whatsappHref: "https://wa.me/923223222326",
  address: "House No. 264/2, Street No. 5, Kamal Abad, Rawalpindi",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About and team" },
  { href: "/contact", label: "Contact" },
];
