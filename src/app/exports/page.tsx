import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export const metadata = { title: "Export & Global Supply" };

const supplySteps = [
  ["01", "Inquiry", "Share the products, destination and requirements you have in mind."],
  ["02", "Product selection", "Explore suitable items from our product collection."],
  ["03", "Specification confirmation", "Confirm available product, packaging and documentation details."],
  ["04", "Quotation", "Receive a quotation based on the confirmed requirement."],
  ["05", "Order & dispatch", "Discuss order confirmation, packing and dispatch arrangements."],
];

export default function ExportsPage() {
  return (
    <>
      <section className="inner-hero dark-section simple-inner-hero"><div className="container inner-hero-content"><span className="eyebrow">SUPPLY / EXPORT / PARTNERSHIPS</span><h1>Indian excellence.<br /><em>Global reach.</em></h1><p>Connecting Indian food products with businesses at home and around the world, one conversation at a time.</p><span className="inner-hero-index">NASHIK, INDIA / GLOBAL INQUIRIES</span></div></section>
      <section className="section export-intro"><div className="container about-intro-grid"><div><span className="eyebrow">SUPPLY BUILT AROUND YOUR NEEDS</span><h2 className="section-heading">A reliable partner<br />for your <em>next step.</em></h2></div><div className="about-intro-copy"><p>We welcome product, bulk and international business inquiries. Tell us about your destination, product selection and packaging requirements, and our team can confirm available information and next steps.</p><p>Supply availability, documentation, shipment details and terms are confirmed individually. We do not make unsupported claims about destination markets, shipping partners or trade volumes.</p><Link className="text-link" href="/request-quote">Start a supply inquiry <ArrowUpRight size={15} /></Link></div></div></section>
      <section className="export-banner image-frame"><Image src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2200&q=85" alt="Packages and freight ready for shipment" fill unoptimized sizes="100vw" /><div className="export-banner-copy"><span className="eyebrow">INDIAN ORIGIN / INTERNATIONAL OPPORTUNITY</span><h2>From our home<br />to <em>your market.</em></h2><Link className="button" href="/request-quote">Discuss your requirements <ArrowRight size={15} /></Link></div></section>
      <section className="section supply-steps dark-section"><div className="container"><span className="eyebrow">A CLEAR PATH / OUR SUPPLY PROCESS</span><h2 className="section-heading">Good business<br />starts with <em>clarity.</em></h2><div className="journey-grid">{supplySteps.map(([number, title, copy]) => <article className="journey-step" key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div></div></section>
      <section className="subpage-cta"><div className="container subpage-cta-inner"><div><span className="eyebrow">BULK / EXPORT / CUSTOM PACKAGING</span><h2>Let&apos;s make a<br /><em>connection.</em></h2></div><Link className="button" href="/request-quote">Start an international inquiry <ArrowRight size={15} /></Link></div></section>
    </>
  );
}
