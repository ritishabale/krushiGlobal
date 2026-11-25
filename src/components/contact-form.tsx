"use client";

import { z } from "zod";
import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const schema = z.object({
  fullName: z.string().trim().min(2, "Please enter your name."),
  companyName: z.string().trim().max(180),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z.string().trim().regex(/^[+\d\s().-]{7,24}$/, "Enter a valid phone number."),
  message: z.string().trim().min(10, "Please add a little more detail.").max(3000),
  website: z.string(),
});

export function ContactForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [reference, setReference] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const formData = new FormData(event.currentTarget);
    const parsed = schema.safeParse(Object.fromEntries(formData.entries()));
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check your details.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "We could not send your message.");
      setReference(result.reference);
      event.currentTarget.reset();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (reference) {
    return <div className="contact-success" role="status"><CheckCircle2 size={26} /><h3>Message received.</h3><p>Thank you. Your reference is <strong>{reference}</strong>.</p></div>;
  }

  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <label className="form-field"><span>Full name *</span><input name="fullName" autoComplete="name" required /></label>
      <label className="form-field"><span>Company</span><input name="companyName" autoComplete="organization" /></label>
      <label className="form-field"><span>Email *</span><input name="email" type="email" autoComplete="email" required /></label>
      <label className="form-field"><span>Phone *</span><input name="phone" type="tel" autoComplete="tel" required /></label>
      <label className="form-field"><span>How can we help? *</span><textarea name="message" rows={5} minLength={10} required /></label>
      <div className="honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      {error && <p className="form-error" role="alert">{error}</p>}
      <button className="button" disabled={loading} type="submit">{loading ? "Sending message..." : "Send message"} <ArrowRight size={15} /></button>
    </form>
  );
}
