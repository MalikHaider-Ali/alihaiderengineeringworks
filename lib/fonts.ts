import { Archivo_Narrow, Public_Sans } from "next/font/google";

// Self-hosted by Next.js at build time: no external font requests for visitors.
export const archivo = Archivo_Narrow({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-archivo", display: "swap" });
export const publicSans = Public_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-public", display: "swap" });
