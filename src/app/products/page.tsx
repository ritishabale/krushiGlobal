import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ProductBrowser } from "@/components/product-browser";
import { categories, products } from "@/lib/catalogue";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse spices, masalas, dehydrated ingredients, millets, pulses, specialty foods and oils from Krushi Global Foods.",
};

export default function ProductsPage() {
  return (
    <>
      <section className="catalogue-hero dark-section">
        <div className="container catalogue-hero-inner">
          <div><span className="eyebrow">THE KRUSHI COLLECTION / PRODUCT ARCHIVE</span><h1>Good things,<br />grown from <em>nature.</em></h1><p>Browse our current product collection. For availability, specifications and packaging, start a conversation with our team.</p></div>
          <div className="catalogue-aside"><span>COLLECTION</span><strong>01—06</strong><small>PRODUCT FAMILIES</small><span className="catalogue-aside-line" /><small>INDIAN ORIGIN / SUPPLY BY INQUIRY</small></div>
        </div>
      </section>
      <section className="section products-page">
        <div className="container">
          <nav className="category-pills" aria-label="Product categories">
            <Link href="/products">All collections</Link>
            {categories.map((item) => <Link href={`/products?category=${item.slug}`} key={item.slug}>{item.name}</Link>)}
          </nav>
          <Suspense fallback={<div className="empty-results">Loading product catalogue…</div>}>
            <ProductBrowser items={products} groups={categories} />
          </Suspense>
          <div className="coming-soon"><div><span className="eyebrow">IN DEVELOPMENT / EXPANDING OUR RANGE</span><h2>Dehydrated fruits<br />& vegetables, <em>coming soon.</em></h2><p>Ask us about future product developments and let us know what your business needs.</p></div><Link className="text-link" href="/contact">Talk to our team <ArrowUpRight size={15} /></Link></div>
          <div className="catalogue-download"><div><span className="eyebrow">NEED A CATALOGUE?</span><h2>Let&apos;s find the right<br />details for <em>you.</em></h2><p>Request a product catalogue or a tailored selection for your business.</p></div><Link className="button" href="/catalogue">Explore catalogue options <ArrowRight size={15} /></Link></div>
        </div>
      </section>
    </>
  );
}
