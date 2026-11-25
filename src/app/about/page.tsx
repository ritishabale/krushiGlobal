import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export const metadata = { title: "About Us" };

const journey = [
  ["01", "Farmer sourcing", "Building close relationships and understanding where ingredients begin."],
  ["02", "Raw material selection", "Carefully reviewing materials before they enter the next step."],
  ["03", "Cleaning & processing", "Preparing products with thoughtful handling and attention to detail."],
  ["04", "Quality inspection", "Reviewing product requirements and confirming details with care."],
  ["05", "Packaging", "Discussing suitable formats for your intended market and use."],
  ["06", "Distribution & export", "Coordinating supply conversations for domestic and global customers."],
];

export default function AboutPage() {
  return (
    <>
      <section className="inner-hero dark-section">
        <div className="container inner-hero-content">
          <span className="eyebrow">ABOUT KRUSHI / OUR STORY</span>
          <h1>Our roots.<br />Our promise.<br />Our <em>journey.</em></h1>
          <p>Indian food heritage, shaped by thoughtful sourcing, careful preparation and a belief in lasting partnerships.</p>
          <span className="inner-hero-index">EST. / NASHIK, INDIA</span>
        </div>
        <div className="inner-hero-image image-frame">
          <Image src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1800&q=85" alt="Golden-hour farmland in India" fill priority unoptimized sizes="100vw" />
          <span className="image-caption">A CONNECTION TO THE LAND / INDIA</span>
        </div>
      </section>

      <section className="section">
        <div className="container about-intro-grid">
          <div><span className="eyebrow">OUR PHILOSOPHY / FOOD WITH PURPOSE</span><h2 className="section-heading">A good ingredient<br />brings people <em>together.</em></h2></div>
          <div className="about-intro-copy">
            <p>KRUSHI GLOBAL FOODS AND SPICES is an Indian food business bringing together spices, masalas, dehydrated ingredients, grains, pulses and specialty products for customers at home and around the world.</p>
            <p>Our work begins with an appreciation of origin and ends with a conversation about the needs of each customer. We focus on clear communication, thoughtful handling and supply options suited to each inquiry.</p>
            <Link className="text-link" href="/products">Explore our product range <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>

      <section className="section about-promise dark-section">
        <div className="container about-promise-grid">
          <div><span className="eyebrow">WHAT GUIDES US / OUR PROMISE</span><h2 className="section-heading">Rooted in <em>India.</em><br />Open to the world.</h2></div>
          <div className="promise-list">
            {[
              ["Our vision", "Share thoughtfully prepared Indian food products with domestic and international markets."],
              ["Our mission", "Build trust through carefully sourced ingredients, attentive service and lasting partnerships."],
              ["Our values", "Respect for people, transparency in conversation and care in every product inquiry."],
            ].map(([title, copy]) => <article key={title}><Check size={17} /><div><h3>{title}</h3><p>{copy}</p></div></article>)}
          </div>
        </div>
      </section>

      <section className="section journey-section">
        <div className="container">
          <span className="eyebrow">FROM FARM TO GLOBAL MARKETS / OUR JOURNEY</span>
          <h2 className="section-heading">Every step, <em>considered.</em></h2>
          <p className="section-copy">A clear view of the journey helps us understand what matters to you and how to move forward together.</p>
          <div className="journey-grid">
            {journey.map(([number, title, copy]) => <article className="journey-step" key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}
          </div>
        </div>
      </section>

      <section className="subpage-cta">
        <div className="container subpage-cta-inner"><div><span className="eyebrow">LET’S BUILD SOMETHING GOOD</span><h2>Tell us what you&apos;re<br /><em>looking for.</em></h2></div><Link className="button" href="/request-quote">Start an inquiry <ArrowRight size={15} /></Link></div>
      </section>
    </>
  );
}
