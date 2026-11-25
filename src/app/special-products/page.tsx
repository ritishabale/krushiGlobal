import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { categories, products } from "@/lib/catalogue";

export const metadata: Metadata = { title: "Special Products" };

const specials = categories.find((category) => category.slug === "special-products");

export default function SpecialProductsPage() {
  const specialProducts = products.filter((product) => product.categorySlug === "special-products");
  const oilProducts = products.filter((product) => product.categorySlug === "cold-pressed-oils");
  return (
    <>
      <section className="inner-hero dark-section special-hero"><div className="container inner-hero-content"><span className="eyebrow">THE KRUSHI COLLECTION / SPECIAL PRODUCTS</span><h1>Beyond everyday<br /><em>ingredients.</em></h1><p>A carefully curated range of pantry favourites, value-added ingredients and traditional oils.</p><span className="inner-hero-index">COLLECTION / SPECIAL SELECTIONS</span></div><div className="inner-hero-image image-frame"><Image src={specials?.image ?? ""} alt="Honey and pantry ingredients" fill priority unoptimized sizes="100vw" /><span className="image-caption">A THOUGHTFUL PANTRY / INDIA</span></div></section>
      <section className="section special-page"><div className="container"><span className="eyebrow">A CURATED COLLECTION / 01</span><h2 className="section-heading">A touch of <em>something special.</em></h2><p className="section-copy">Explore the current list of specialty products. Ingredients, availability and packaging are confirmed for each inquiry.</p><div className="card-grid special-grid">{specialProducts.map((product) => <ProductCard key={product.slug} product={product} />)}</div></div></section>
      <section className="section oil-section dark-section" id="oils"><div className="container oil-page-grid"><div><span className="eyebrow">COLLECTION / COLD-PRESSED OILS</span><h2 className="section-heading">Tradition in<br />every <em>pour.</em></h2><p className="section-copy">Explore our selection of cooking oils. Processing and product claims are confirmed individually; only verified details are shared for each product.</p><div className="oil-promise">PRODUCT DETAILS / AVAILABLE ON REQUEST</div></div><div className="card-grid oil-grid">{oilProducts.map((product) => <ProductCard key={product.slug} product={product} />)}</div></div></section>
      <section className="subpage-cta"><div className="container subpage-cta-inner"><div><span className="eyebrow">SPECIAL PRODUCTS / SUPPLY DETAILS</span><h2>Find the right<br /><em>fit for you.</em></h2></div><Link className="button" href="/request-quote">Ask for product details <ArrowRight size={15} /></Link></div></section>
    </>
  );
}
