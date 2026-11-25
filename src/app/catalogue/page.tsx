import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Download, Mail } from "lucide-react";
import { categories } from "@/lib/catalogue";

export const metadata: Metadata = {
  title: "Product Catalogue",
  description: "Browse the Krushi Global Foods product collections or ask for a tailored catalogue.",
};

export default function CataloguePage() {
  return (
    <>
      <section className="inner-hero dark-section simple-inner-hero"><div className="container inner-hero-content"><span className="eyebrow">PRODUCT CATALOGUE / COLLECTION GUIDE</span><h1>Find your next<br /><em>ingredient.</em></h1><p>Explore our product families and connect with our team for a current catalogue tailored to your needs.</p><span className="inner-hero-index">KRUSHI COLLECTION / 01—06</span></div></section>
      <section className="section catalogue-download-page"><div className="container"><div className="catalogue-availability"><div className="catalogue-document"><BookOpen size={36} strokeWidth={1} /><span>KGF / PRODUCT COLLECTION</span><small>PRODUCT FAMILIES / INDIA</small></div><div><span className="eyebrow">CATALOGUE AVAILABILITY</span><h2 className="section-heading">A catalogue<br />for your <em>business.</em></h2><p className="section-copy">A public company brochure has not been supplied for this website yet, so we are not offering a placeholder download. Contact our team to request current product information or a tailored selection.</p><Link className="button" href="/contact">Request a catalogue <Mail size={15} /></Link></div></div><div className="catalogue-category-list"><span className="eyebrow">BROWSE THE COLLECTION</span>{categories.map((category, index) => <Link href={`/products?category=${category.slug}`} key={category.slug}><span>0{index + 1}</span><strong>{category.name}</strong><small>{category.products.length} listed items</small><ArrowRight size={15} /></Link>)}</div><div className="catalogue-request"><div><Download size={20} /><div><h3>Looking for something specific?</h3><p>Tell us about your market, product focus and preferred format.</p></div></div><Link className="text-link" href="/request-quote">Request a tailored product list <ArrowRight size={14} /></Link></div></div></section>
    </>
  );
}
