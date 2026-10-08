"use client";
import { useState } from "react";
import { contactSchema, serviceOptions } from "@/lib/validation";

type Errors = Record<string, string[] | undefined>;
const field = "mt-1.5 block min-h-11 w-full rounded border border-blue-100 bg-white px-3 text-navy-900 placeholder:text-slate-600/60 focus:border-blue-500 focus:outline-2 focus:outline-blue-500/30";

export default function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [serverError, setServerError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    // Validate on the client for fast feedback; the server validates again.
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) { setErrors(parsed.error.flatten().fieldErrors); return; }
    setErrors({}); setStatus("sending"); setServerError("");

    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(parsed.data) });
      const json = await res.json();
      if (!res.ok) { setErrors(json.fields ?? {}); setServerError(json.error ?? "Something went wrong"); setStatus("error"); return; }
      form.reset(); setStatus("done");
    } catch { setServerError("Network error. Please call us instead."); setStatus("error"); }
  }

  const err = (k: string) => errors[k]?.[0] && <p id={`${k}-err`} className="mt-1 text-sm text-red-700">{errors[k]![0]}</p>;
  const a11y = (k: string) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${k}-err` : undefined });

  if (status === "done")
    return <div role="status" className="rounded-lg border border-blue-500 bg-blue-100/50 p-6"><h2 className="text-2xl">Request sent</h2><p className="mt-2">Thank you. Our team will contact you shortly.</p></div>;

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 rounded-lg border border-blue-100 p-6 md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="font-semibold text-navy-900">Full name<input name="name" autoComplete="name" className={field} {...a11y("name")} />{err("name")}</label>
        <label className="font-semibold text-navy-900">Company (optional)<input name="company" autoComplete="organization" className={field} />{err("company")}</label>
        <label className="font-semibold text-navy-900">Email<input name="email" type="email" autoComplete="email" className={field} {...a11y("email")} />{err("email")}</label>
        <label className="font-semibold text-navy-900">Phone<input name="phone" type="tel" autoComplete="tel" placeholder="+92 300 1234567" className={field} {...a11y("phone")} />{err("phone")}</label>
      </div>
      <label className="font-semibold text-navy-900">Service needed
        <select name="service" defaultValue="" className={field} {...a11y("service")}>
          <option value="" disabled>Choose a service</option>
          {serviceOptions.map((s) => <option key={s}>{s}</option>)}
        </select>{err("service")}
      </label>
      <label className="font-semibold text-navy-900">Project details
        <textarea name="message" rows={5} placeholder="Type of building, location, scope and timeline" className={`${field} py-3`} {...a11y("message")} />{err("message")}
      </label>
      {/* Honeypot: hidden from people, tempting for bots */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px]" />
      {serverError && <p role="alert" className="text-red-700">{serverError}</p>}
      <button type="submit" disabled={status === "sending"} className="min-h-11 rounded border border-navy-700 bg-navy-700 px-5 font-semibold text-white hover:bg-navy-900 disabled:opacity-60 sm:w-fit">
        {status === "sending" ? "Sending..." : "Send request"}
      </button>
    </form>
  );
}
