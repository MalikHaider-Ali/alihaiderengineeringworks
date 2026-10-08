import Image from "next/image";
import { cn } from "@/lib/utils";

export default function Logo({ light = false, className = "" }: { light?: boolean; className?: string }) {
  return (
    <Image
      src={light ? "/logo-light.png" : "/logo.png"}
      alt="Ali Haider Engineering Works"
      width={1000}   // your file's real width
      height={120}  // your file's real height
      priority
      unoptimized   // serve the file as it is, so replacing it updates immediately
      className={cn("h-12 w-auto md:h-14 lg:h-16", className)}
    />
  );
}