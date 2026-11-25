import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

export const metadata = { title: "Quality Assurance" };

const commitments = [
  ["01", "Raw material review", "Discuss the ingredient, origin and product-specific requirements with our team."],
  ["02", "Careful processing", "Processing and handling details are confirmed for each product inquiry."],
  ["03", "Product information", "Specifications and quality documentation are shared when verified and available."],
  ["04", "Packaging considerations", "Packaging options are discussed in relation to your requirements and destination."],
];

export default function QualityPage() {
  return (
    <>
      <section className="inner-hero dark-section simple-inner-hero"><div className="container inner-hero-content"><span className="eyebrow">OUR APPROACH / QUALITY ASSURANCE</span><h1>Quality is<br />our <em>foundation.</em></h1><p>Clear product information, careful conversations and a commitment to confirming details before they are shared.</p><span className="inner-hero-index">QUALITY / OUR COMMITMENT</span></div></section>
      <section className="section quality-intro"><div className="container quality-intro-grid"><div className="quality-emblem"><ShieldCheck size={42} strokeWidth={1} /><span>CARE / CLARITY / CONFIDENCE</span></div><div><span className="eyebrow">A COMMITMENT TO TRANSPARENCY</span><h2 className="section-heading">Details you can<br /><em>count on.</em></h2><p className="section-copy">Product quality is specific to the product, process and documentation. We do not publish certification numbers, test results or shelf-life claims unless the relevant information is verified and available to share.</p><p className="section-copy">Ask our team about current product documentation, applicable food safety information and packaging details for your inquiry.</p></div></div></section>
      <section className="section dark-section quality-steps"><div className="container"><span className="eyebrow">OUR QUALITY CONVERSATION / 01—04</span><h2 className="section-heading">An open, considered<br /><em>approach.</em></h2><div className="journey-grid">{commitments.map(([number, title, copy]) => <article className="journey-step" key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div></div></section>
      <section className="certification-note"><div className="container certification-note-inner"><span className="eyebrow">CERTIFICATIONS / DOCUMENTATION</span><p>Certification marks and certificate documents are not displayed here because verified documents have not been provided for publication. Please contact our team for current, applicable documentation.</p><Link className="text-link" href="/contact">Ask about documentation <ArrowRight size={15} /></Link></div></section>
      <section className="subpage-cta"><div className="container subpage-cta-inner"><div><span className="eyebrow">QUALITY / PRODUCT INFORMATION</span><h2>Ask us for the<br /><em>right details.</em></h2></div><Link className="button" href="/request-quote">Talk to our team <ArrowRight size={15} /></Link></div></section>
    </>
  );
}
