import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, MessageCircle } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { getProduct, products } from "@/lib/catalogue";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  return product
    ? { title: product.name, description: `${product.name} from Krushi Global Foods and Spices. Ask us about product details and supply options.` }
    : { title: "Product" };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = products.filter((item) => item.categorySlug === product.categorySlug && item.slug !== product.slug).slice(0, 3);
  const whatsappText = encodeURIComponent(`Hello Krushi Global Foods and Spices,\n\nI am interested in your ${product.name}.\n\nPlease share the product specifications, available packaging options and quotation.\n\nThank you.`);

  return (
    <>
      <section className="product-detail-hero">
        <div className="container product-detail-grid">
          <div className="product-detail-image image-frame">
            <Image src={product.image} alt={`${product.name} product ingredients`} fill priority unoptimized sizes="(max-width: 760px) 100vw, 55vw" />
            <span className="image-caption">KRUSHI COLLECTION / {product.category.toUpperCase()}</span>
          </div>
          <div className="product-detail-copy">
            <Link className="back-link" href="/products"><ArrowLeft size={14} /> All products</Link>
            <span className="eyebrow">{product.category.toUpperCase()} / PRODUCT PROFILE</span>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <div className="product-detail-meta"><div><span>PRODUCT CATEGORY</span><strong>{product.category}</strong></div><div><span>PRODUCT ORIGIN</span><strong>India</strong></div></div>
            <div className="product-detail-cta"><Link className="button" href={`/request-quote?product=${encodeURIComponent(product.name)}&category=${product.categorySlug}`}>Request a quote <ArrowRight size={15} /></Link><a className="button button-dark-outline" href={`https://wa.me/919422611322?text=${whatsappText}`} target="_blank" rel="noreferrer"><MessageCircle size={15} /> WhatsApp inquiry</a></div>
            <p className="specs-note">Specifications, processing information, packaging and availability are confirmed for each inquiry. Please contact our team for current product details.</p>
          </div>
        </div>
      </section>
      <section className="product-detail-info section">
        <div className="container product-info-grid">
          <div><span className="eyebrow">PRODUCT OVERVIEW / A CLOSER LOOK</span><h2 className="section-heading">A versatile pantry<br /><em>ingredient.</em></h2></div>
          <div><p className="section-copy">{product.name} is part of our {product.category.toLowerCase()} collection, serving culinary use and food preparation. Our team can discuss your intended application, volume and destination to help confirm suitable product details.</p><div className="specification-panel"><span className="eyebrow">DETAILS BY INQUIRY</span><div><span>PRODUCT ORIGIN</span><strong>India</strong></div><div><span>APPLICATION</span><strong>Discuss with our team</strong></div><div><span>PACKAGING</span><strong>Options on request</strong></div><div><span>SPECIFICATION</span><strong>Confirmed per product</strong></div></div></div>
        </div>
      </section>
      {related.length > 0 && <section className="section related-section"><div className="container"><span className="eyebrow">MORE FROM THIS COLLECTION</span><h2 className="section-heading">You may also <em>like.</em></h2><div className="card-grid">{related.map((item) => <ProductCard key={item.slug} product={item} />)}</div></div></section>}
    </>
  );
}
