import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type ProductCardProps = {
  product: {
    name: string;
    slug: string;
    category: string;
    categorySlug: string;
    image: string;
    description: string;
  };
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card">
      <Link className="product-card-image image-frame" href={`/products/${product.slug}`} aria-label={`View ${product.name}`}>
        <Image src={product.image} alt={`${product.name} ingredients`} width={640} height={500} unoptimized />
        <span className="product-card-arrow" aria-hidden="true"><ArrowUpRight size={18} /></span>
      </Link>
      <div className="product-card-info">
        <span className="product-category">{product.category}</span>
        <h3><Link href={`/products/${product.slug}`}>{product.name}</Link></h3>
        <p>{product.description}</p>
        <div className="product-card-links">
          <Link href={`/products/${product.slug}`}>Product details <span aria-hidden="true">→</span></Link>
          <Link href={`/request-quote?product=${encodeURIComponent(product.name)}&category=${product.categorySlug}`}>Request quote</Link>
        </div>
      </div>
    </article>
  );
}
