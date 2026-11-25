import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

export const metadata: Metadata = { title: "Contact Us" };

export default function ContactPage() {
  const officeMap = "https://maps.google.com/?q=Plot+No.+3+Pinewood+Apartment+Dhatrak+Phata+Panchavati+Nashik+422003";
  const factoryMap = "https://maps.google.com/?q=Gat+No.+129%2F2%2F1+Derle+Wasti+Adgaon+Road+Mhasrul+Nashik+422004";

  return (
    <>
      <section className="contact-hero dark-section"><div className="container"><span className="eyebrow">CONTACT / LET’S CONNECT</span><h1>Let&apos;s build<br />something <em>good.</em></h1><p>Have a product question, business inquiry or supply requirement? We&apos;d be glad to hear from you.</p></div></section>
      <section className="section contact-page"><div className="container contact-layout">
        <div className="contact-details">
          <span className="eyebrow">GET IN TOUCH / OUR TEAM</span><h2 className="section-heading">Start a<br /><em>conversation.</em></h2>
          <a className="contact-detail" href="tel:+919422611322"><Phone size={17} /><div><span>CALL OUR TEAM</span><strong>+91 94226 11322</strong></div><ArrowUpRight size={15} /></a>
          <a className="contact-detail" href="tel:+917709301156"><Phone size={17} /><div><span>ALTERNATE NUMBER</span><strong>+91 77093 01156</strong></div><ArrowUpRight size={15} /></a>
          <a className="contact-detail" href="mailto:krushiglobalfoods@gmail.com"><Mail size={17} /><div><span>EMAIL</span><strong>krushiglobalfoods@gmail.com</strong></div><ArrowUpRight size={15} /></a>
          <div className="address-card"><MapPin size={17} /><div><span>OFFICE</span><p>Plot No. 3, Pinewood Apartment, Near Shivaji Light House, Dhatrak Phata, Balram Nagar, Panchavati, Nashik – 422003.</p><a href={officeMap} target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={13} /></a></div></div>
          <div className="address-card"><MapPin size={17} /><div><span>FACTORY</span><p>Gat No. 129/2/1, Derle Wasti, Opposite Shabnam Fruits, Adgaon Road, Mhasrul, Panchavati, Nashik – 422004.</p><a href={factoryMap} target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={13} /></a></div></div>
        </div>
        <div className="contact-form-panel"><span className="eyebrow">SEND A MESSAGE / WE’LL BE IN TOUCH</span><h2>How can we<br /><em>help you?</em></h2><ContactForm /></div>
      </div></section>
    </>
  );
}
