import type { Metadata } from "next";
import "./globals.css";
import { archivo, publicSans } from "@/lib/fonts";
import { site } from "@/lib/site";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import FloatingContact from "@/components/FloatingContact";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Ali Haider Engineering Works | Electrical and security contractors, Rawalpindi", template: "%s | Ali Haider Engineering Works" },
  description: "Electrical installation, substations, CCTV, access control, maintenance and CAD design for hotels, hospitals, schools and commercial buildings in Rawalpindi.",
  openGraph: { type: "website", siteName: site.name, locale: "en_PK" },
};

// Structured data helps Google show the business correctly in local search
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ElectricalContractor",
  name: site.name,
  telephone: site.phone,
  address: { "@type": "PostalAddress", streetAddress: "House No. 264/2, Street No. 5, Kamal Abad", addressLocality: "Rawalpindi", addressCountry: "PK" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${publicSans.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <SmoothScroll>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <FloatingContact />
        </SmoothScroll>
      </body>
    </html>
  );
}
