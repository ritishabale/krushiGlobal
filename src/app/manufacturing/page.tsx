import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = { title: "Manufacturing & Processing" };

const stages = [
  ["01", "Raw material sourcing", "The journey begins with understanding ingredient origin and the requirements for each product."],
  ["02", "Material inspection", "Raw materials are reviewed against the product and customer requirements being discussed."],
  ["03", "Cleaning & sorting", "Preparation and sorting are considered as part of the product-specific process."],
  ["04", "Processing", "Processing methods and product details are confirmed for the relevant ingredient."],
  ["05", "Quality inspection", "Product and quality details are discussed and confirmed as part of each inquiry."],
  ["06", "Packaging", "Packaging format and requirements are discussed for the intended market and use."],
  ["07", "Storage & dispatch", "Supply timing and dispatch arrangements are confirmed with the customer."],
];

export default function ManufacturingPage() {
  return (
    <>
      <section className="inner-hero dark-section simple-inner-hero"><div className="container inner-hero-content"><span className="eyebrow">HOW WE WORK / MANUFACTURING</span><h1>Precision in<br />every <em>process.</em></h1><p>Careful preparation begins with understanding the product, its purpose and the details that matter to your business.</p><span className="inner-hero-index">PROCESS / 01—07</span></div></section>
      <section className="section">
        <div className="container manufacturing-intro">
          <div className="manufacturing-photo image-frame"><Image src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=85" alt="Team member working with equipment in a clean processing space" fill unoptimized sizes="(max-width: 760px) 100vw, 55vw" /></div>
          <div><span className="eyebrow">FROM RAW MATERIAL TO FINISHED PRODUCT</span><h2 className="section-heading">A process built<br />around <em>care.</em></h2><p className="section-copy">Every product has its own characteristics. Our conversations about processing, handling and packaging are shaped around the product and the requirements shared by each customer.</p><p className="section-copy">Contact us to discuss product-specific processing information and confirm the details available for your inquiry.</p><Link className="text-link" href="/request-quote">Discuss a product requirement <ArrowRight size={15} /></Link></div>
        </div>
      </section>
      <section className="section process-timeline dark-section"><div className="container"><span className="eyebrow">A THOUGHTFUL FLOW / PROCESS OVERVIEW</span><h2 className="section-heading">From selection<br />to <em>dispatch.</em></h2><div className="journey-grid">{stages.map(([number, title, copy]) => <article className="journey-step" key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div><p className="disclosure-note">This overview describes a typical supply conversation. Product-specific methods, facility details and quality controls are confirmed directly with our team.</p></div></section>
      <section className="subpage-cta"><div className="container subpage-cta-inner"><div><span className="eyebrow">PROCESS / PACKAGING / SUPPLY</span><h2>Let&apos;s talk about<br /><em>your product.</em></h2></div><Link className="button" href="/request-quote">Request product details <ArrowRight size={15} /></Link></div></section>
    </>
  );
}
