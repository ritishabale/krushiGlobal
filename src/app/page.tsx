import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, BadgeCheck, Boxes, Globe2, Leaf, MoveUpRight } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { categories, products } from "@/lib/catalogue";

const heroImage =
  "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1800&q=90";
const facilityImage =
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1400&q=85";

const values = [
  { number: "01", icon: <Leaf size={18} />, title: "Thoughtful sourcing", copy: "Ingredients selected with care, respect for origin and a focus on lasting partnerships." },
  { number: "02", icon: <BadgeCheck size={18} />, title: "Quality in every step", copy: "A considered approach to handling, processing and presentation from start to dispatch." },
  { number: "03", icon: <Boxes size={18} />, title: "Flexible supply", copy: "Bulk and customized packaging conversations shaped around your product requirements." },
  { number: "04", icon: <Globe2 size={18} />, title: "India to the world", copy: "An Indian food business ready to discuss domestic and international supply opportunities." },
];

export default function Home() {
  const featured = ["Turmeric Powder", "Red Chilli Powder", "Garlic Powder", "Moringa Powder", "Kitchen King", "Biryani Masala"]
    .map((name) => products.find((product) => product.name === name))
    .filter((product): product is (typeof products)[number] => Boolean(product));

  return (
    <>
      <section className="hero">
        <div className="hero-glow" aria-hidden="true" />
        <div className="container hero-content">
          <div className="hero-copy">
            <span className="hero-pill"><span /> INDIAN ORIGIN · GLOBAL EXCELLENCE</span>
            <h1 className="hero-title">Nature&apos;s goodness,<br />crafted for the <em>world.</em></h1>
            <p className="hero-description">
              Premium Indian spices, authentic masalas, dehydrated ingredients, grains, pulses and specialty foods — thoughtfully prepared for markets near and far.
            </p>
            <span className="hero-tech">PREMIUM FOOD INGREDIENTS <i>/</i> INTERNATIONAL SUPPLY</span>
            <div className="hero-actions">
              <Link className="button" href="/products">Explore our products <ArrowRight size={15} /></Link>
              <Link className="button button-outline" href="/request-quote">Request consignment details</Link>
            </div>
            <div className="hero-metadata">
              <div><span>01</span><strong>PRODUCT ORIGIN</strong><small>INDIA</small></div>
              <div><span>02</span><strong>OUR APPROACH</strong><small>QUALITY FOCUSED</small></div>
              <div><span>03</span><strong>PACKAGING</strong><small>DISCUSS OPTIONS</small></div>
              <div><span>04</span><strong>SUPPLY</strong><small>DOMESTIC & GLOBAL</small></div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image image-frame">
              <Image src={heroImage} alt="A warm, editorial arrangement of Indian spices and seeds" fill priority unoptimized sizes="(max-width: 760px) 100vw, 55vw" />
              <div className="hero-image-shade" />
              <div className="hero-image-caption"><span>ORIGIN / INDIA</span><span>COLLECTION NO. 01</span></div>
            </div>
            <div className="hero-stamp"><span>PURELY</span><strong>KRUSHI</strong><span>INDIAN ORIGIN</span></div>
            <div className="hero-tags">
              <span>CAREFULLY SELECTED</span><span>THOUGHTFULLY PROCESSED</span><span>READY TO DISCUSS</span>
            </div>
            <div className="hero-note">
              <span className="eyebrow">BOTANICAL PANTRY</span>
              <p>Ingredients with a story<br />worth sharing.</p>
              <Link href="/about" aria-label="Learn about our story"><MoveUpRight size={18} /></Link>
            </div>
          </div>
        </div>
        <a className="hero-scroll" href="#foundation"><ArrowDown size={14} /> SCROLL TO EXPLORE</a>
      </section>

      <section className="section foundation" id="foundation">
        <div className="container foundation-grid">
          <div className="foundation-copy">
            <span className="eyebrow">ABOUT KRUSHI / OUR FOUNDATION</span>
            <h2 className="section-heading">Rooted in nature.<br />Driven by <em>purpose.</em></h2>
            <p className="section-copy">
              KRUSHI GLOBAL FOODS AND SPICES brings together Indian spices, masalas, dehydrated ingredients, grains, pulses and specialty products for customers at home and around the world.
            </p>
            <p className="section-copy">
              We believe good food begins with thoughtful sourcing and careful handling. Tell us what you need, and our team will help you explore the right products and supply options.
            </p>
            <Link className="text-link" href="/about">Explore our story <ArrowUpRight size={15} /></Link>
            <div className="foundation-values">
              <div><span>OUR VISION</span><p>Share thoughtfully prepared Indian food products with domestic and international markets.</p></div>
              <div><span>OUR MISSION</span><p>Build trust through carefully sourced ingredients, attentive service and lasting partnerships.</p></div>
            </div>
          </div>
          <div className="foundation-visual">
            <div className="foundation-image image-frame">
              <Image src={facilityImage} alt="Food manufacturing team at work in a bright processing facility" width={900} height={1100} unoptimized />
            </div>
            <div className="image-index"><span>FIELD NOTES</span><span>01 — 06</span></div>
            <div className="image-quote"><span>“</span><p>Good food starts with good choices.</p></div>
          </div>
        </div>
      </section>

      <section className="section collection-section">
        <div className="container">
          <div className="section-topline"><span className="eyebrow">ARCHIVE 01 / OUR PRODUCT COLLECTION</span><Link className="text-link" href="/products">View all products <ArrowUpRight size={15} /></Link></div>
          <div className="collection-intro">
            <h2 className="section-heading">The finest<br />from <em>nature.</em></h2>
            <p className="section-copy">A considered collection of Indian flavours, pantry essentials and specialty ingredients for everyday kitchens and ambitious food businesses.</p>
          </div>
          <div className="category-grid">
            {categories.map((category, index) => (
              <Reveal className="category-reveal" delay={index * 0.04} key={category.slug}>
              <Link className={`category-card category-card-${index + 1}`} href={`/products?category=${category.slug}`}>
                <div className="category-card-image image-frame">
                  <Image src={category.image} alt={`${category.name} ingredients`} fill unoptimized sizes="(max-width: 760px) 100vw, 33vw" />
                  <span className="category-index">0{index + 1}</span>
                </div>
                <div className="category-card-copy">
                  <span>{category.slug.replaceAll("-", " ").toUpperCase()}</span>
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                  <span className="category-explore">EXPLORE COLLECTION <ArrowUpRight size={14} /></span>
                </div>
              </Link>
              </Reveal>
            ))}
          </div>
          <div className="collection-footer"><span>PRODUCT CATEGORIES <strong>06</strong></span><Link className="button button-dark-outline" href="/products">Browse the catalogue <ArrowRight size={15} /></Link></div>
        </div>
      </section>

      <section className="section featured-section">
        <div className="container">
          <div className="section-topline"><span className="eyebrow">A FEW FAVOURITES / SELECTED INGREDIENTS</span><span className="mono-note">CURATED FOR YOUR PANTRY</span></div>
          <div className="featured-heading">
            <h2 className="section-heading">Nature&apos;s finest<br /><em>selections.</em></h2>
            <p className="section-copy">Explore a small selection from our catalogue. Product specifications and packaging can be discussed with our team.</p>
          </div>
          <div className="card-grid featured-grid">
            {featured.map((product, index) => <Reveal key={product.slug} delay={index * 0.04}><ProductCard product={product} /></Reveal>)}
          </div>
          <div className="centered-cta"><Link className="button button-dark-outline" href="/products">Explore all products <ArrowRight size={15} /></Link></div>
        </div>
      </section>

      <section className="section values-section dark-section">
        <div className="container values-layout">
          <div className="values-heading">
            <span className="eyebrow">WHY KRUSHI / A BETTER WAY FORWARD</span>
            <h2 className="section-heading">Built on care.<br />Rooted in <em>trust.</em></h2>
            <p className="section-copy">A dependable food supply relationship is built one thoughtful detail at a time.</p>
            <Link className="button button-outline" href="/quality">Our approach to quality <ArrowRight size={15} /></Link>
          </div>
          <div className="values-grid">
            {values.map((value, index) => (
              <Reveal className="value-reveal" delay={index * 0.05} key={value.number}>
              <article className="value-card">
                <div className="value-card-top"><span>{value.number}</span>{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.copy}</p>
              </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section special-section">
        <div className="container">
          <div className="special-heading">
            <div><span className="eyebrow">SPECIAL PRODUCTS / A LITTLE SOMETHING DIFFERENT</span><h2 className="section-heading">Beyond everyday<br /><em>ingredients.</em></h2></div>
            <div><p className="section-copy">A curated range of pantry favourites and traditional oils. Confirm product details and claims with our team.</p><Link className="text-link" href="/special-products">Explore special products <ArrowUpRight size={15} /></Link></div>
          </div>
          <div className="card-grid special-grid">
            {["Raw Honey", "Mix Dry Fruit Honey", "Gir Cow Ghee", "Ginger Garlic Paste"].map((name, index) => {
              const product = products.find((item) => item.name === name);
              return product ? <Reveal key={product.slug} delay={index * 0.04}><ProductCard product={product} /></Reveal> : null;
            })}
          </div>
          <div className="oil-collection">
            <div><span className="eyebrow">COLLECTION / COLD-PRESSED OILS</span><h3>Rooted in <em>tradition.</em></h3></div>
            <div className="oil-tags">{["Groundnut", "Coconut", "Sesame", "Mustard", "Castor", "Flaxseed"].map((oil) => <span key={oil}>{oil} oil</span>)}</div>
            <Link href="/special-products#oils" aria-label="Explore cold-pressed oils"><ArrowUpRight size={18} /></Link>
          </div>
        </div>
      </section>

      <section className="section process-section">
        <div className="container">
          <div className="process-heading">
            <span className="eyebrow">FROM PROCESSING TO SHIPMENT / OUR APPROACH</span>
            <h2 className="section-heading">Made to move<br />with <em>care.</em></h2>
            <p className="section-copy">Have a product or supply requirement in mind? Start a conversation with our team about processing, packaging and dispatch.</p>
          </div>
          <div className="process-grid">
            {[
              ["01", "Sourcing & selection", "Tell us what you’re looking for and we’ll help identify the right products."],
              ["02", "Specification & packing", "Discuss product details and packaging requirements with our team."],
              ["03", "Order & dispatch", "We’ll coordinate next steps and share the information you need to move forward."],
            ].map(([number, title, copy]) => (
              <article className="process-step" key={number}>
                <span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div><ArrowUpRight size={17} />
              </article>
            ))}
          </div>
          <div className="process-banner image-frame">
            <Image src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2000&q=85" alt="Carefully packed goods ready for distribution" fill unoptimized sizes="100vw" />
            <div className="process-banner-overlay"><span className="eyebrow">INDIAN ORIGIN · THOUGHTFUL SUPPLY</span><h3>Good things,<br /><em>going places.</em></h3><Link className="button" href="/exports">Explore export supply <ArrowRight size={15} /></Link></div>
            <span className="banner-coordinate">NASHIK · INDIA / 20°00&apos;N 73°47&apos;E</span>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="container final-cta-inner">
          <div><span className="eyebrow">LET’S BEGIN A CONVERSATION</span><h2>Let&apos;s grow<br /><em>together.</em></h2></div>
          <div className="final-cta-copy"><p>Looking for a dependable food ingredients partner? Tell us about your product inquiry, bulk requirement or business opportunity.</p><div><Link className="button" href="/request-quote">Request a quote <ArrowRight size={15} /></Link><Link className="button button-outline" href="/contact">Contact our team</Link></div></div>
        </div>
        <span className="cta-watermark">KG</span>
      </section>
    </>
  );
}
