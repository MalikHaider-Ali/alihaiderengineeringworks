import { z } from "zod";
import { services } from "./data";

// Shared by the client form and the API route, so rules never drift apart.
export const serviceOptions = services.map((s) => s.title) as [string, ...string[]];

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80),
  email: z.email("Enter a valid email address").max(120),
  phone: z.string().trim().min(7, "Enter a phone number").max(20).regex(/^[+\d\s()-]+$/, "Use digits, spaces and + only"),
  company: z.string().trim().max(100).optional(),
  service: z.enum(serviceOptions, "Choose a service"),
  message: z.string().trim().min(10, "Tell us a little more (at least 10 characters)").max(2000),
  website: z.string().optional(), // honeypot: real users never fill this
});

export type ContactInput = z.infer<typeof contactSchema>;
