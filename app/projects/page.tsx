import type { Metadata } from "next";
import ProjectGrid from "@/components/ProjectGrid";
import { SectionHeading } from "@/components/ui";

export const metadata: Metadata = { title: "Projects", description: "Photos from our substation, cabling, panel, transmission line and lighting projects." };

export default function ProjectsPage() {
  return (
    <div className="wrap py-16 md:py-20">
      <SectionHeading title="Projects" intro="Real photos from our sites. Filter by type of work." />
      <div className="mt-10"><ProjectGrid /></div>
    </div>
  );
}
