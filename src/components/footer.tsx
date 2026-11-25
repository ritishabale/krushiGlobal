import Link from "next/link";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";

const footerLinks = [
  ["Our story", "/about"],
  ["Product catalogue", "/products"],
  ["Special products", "/special-products"],
  ["Manufacturing", "/manufacturing"],
  ["Quality", "/quality"],
  ["Export & supply", "/exports"],
  ["Request a quote", "/request-quote"],
  ["Download catalogue", "/catalogue"],
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <Link className="brand footer-logo" href="/">
            <span className="brand-mark">K<span>.</span></span>
            <span className="brand-copy">
              <strong>KRUSHI GLOBAL</strong>
              <small>FOODS AND SPICES</small>
            </span>
          </Link>
          <p>Indian ingredients, thoughtfully prepared for homes, kitchens and businesses near and far.</p>
          <span className="footer-tagline">Healthy Food, Healthy Life.</span>
        </div>
        <div className="footer-column">
          <span className="footer-label">DISCOVER</span>
          {footerLinks.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
        </div>
        <div className="footer-column footer-contact">
          <span className="footer-label">GET IN TOUCH</span>
          <a href="tel:+919422611322"><Phone size={14} /> +91 94226 11322</a>
          <a href="tel:+917709301156"><Phone size={14} /> +91 77093 01156</a>
          <a href="mailto:krushiglobalfoods@gmail.com">krushiglobalfoods@gmail.com</a>
          <div className="footer-address">
            <MapPin size={14} />
            <span>Plot No. 3, Pinewood Apartment, Near Shivaji Light House, Dhatrak Phata, Panchavati, Nashik – 422003</span>
          </div>
          <div className="footer-address">
            <MapPin size={14} />
            <span>Gat No. 129/2/1, Derle Wasti, Opp. Shabnam Fruits, Adgaon Road, Mhasrul, Nashik – 422004</span>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 Krushi Global Foods and Spices. All rights reserved.</span>
        <a href="https://www.krushiglobalfoods.com" target="_blank" rel="noreferrer">
          KRUSHIGLOBALFOODS.COM <ArrowUpRight size={12} />
        </a>
      </div>
    </footer>
  );
}
