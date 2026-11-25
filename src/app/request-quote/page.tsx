import type { Metadata } from "next";
import { Suspense } from "react";
import { InquiryForm } from "@/components/inquiry-form";
import { ArrowUpRight, Clock3, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Request a Quote",
  description: "Share your product and supply requirements with Krushi Global Foods and Spices.",
};

export default function RequestQuotePage() {
  return (
    <>
      <section className="quote-hero dark-section"><div className="container quote-hero-inner"><div><span className="eyebrow">REQUEST A QUOTE / BUSINESS INQUIRY</span><h1>Tell us what<br />you&apos;re <em>looking for.</em></h1><p>Share a few details about your product, volume and destination. Our team will follow up to discuss the next steps.</p></div><div className="quote-hero-note"><span>YOUR INQUIRY</span><ArrowUpRight size={19} /><p>A clear brief helps us understand your needs and respond with the right information.</p></div></div></section>
      <section className="section quote-section"><div className="container quote-layout"><aside className="quote-sidebar"><span className="eyebrow">A GOOD PLACE TO START</span><h2>Let&apos;s get<br /><em>the details.</em></h2><p>Tell us what matters most. Product availability, specifications and packaging are confirmed for every inquiry.</p><div className="quote-assurance"><ShieldCheck size={17} /><span>Your information is used to respond to your inquiry.</span></div><div className="quote-assurance"><Clock3 size={17} /><span>We&apos;ll follow up using your preferred contact details.</span></div><div className="quote-sidebar-contact"><span>NEED TO TALK?</span><a href="tel:+919422611322">+91 94226 11322 <ArrowUpRight size={13} /></a><a href="mailto:krushiglobalfoods@gmail.com">krushiglobalfoods@gmail.com <ArrowUpRight size={13} /></a></div></aside><div className="quote-form-panel"><Suspense fallback={<div className="empty-results">Loading inquiry form…</div>}><InquiryForm /></Suspense></div></div></section>
    </>
  );
}
