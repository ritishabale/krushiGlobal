export type ProductCategory = {
  name: string;
  slug: string;
  description: string;
  image: string;
  products: string[];
};

const photos = {
  spices:
    "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=85",
  chilli:
    "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=1200&q=85",
  turmeric:
    "https://images.unsplash.com/photo-1615485500704-8e990f9900f4?auto=format&fit=crop&w=1200&q=85",
  grains:
    "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1200&q=85",
  seeds:
    "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=1200&q=85",
  honey:
    "https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&w=1200&q=85",
  vegetables:
    "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=85",
  oil:
    "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=1200&q=85",
};

export const categories: ProductCategory[] = [
  {
    name: "Spices & Masalas",
    slug: "spices-masalas",
    description: "Indian spices and culinary blends, selected for kitchens around the world.",
    image: photos.spices,
    products: [
      "Turmeric", "Red Chilli", "Biryani Masala", "Kitchen King", "Kolhapuri Masala",
      "Garam Masala", "Ginger Powder", "Cumin Powder", "Pav Bhaji Masala",
      "Kashmiri Chilli Powder", "Garlic Powder", "Fennel Powder", "Misal Masala",
      "Coriander Powder", "Curry Masala", "Black Cardamom Powder", "Goda Masala",
      "Turmeric Powder", "Sambar Powder", "Chilli 65 Masala", "Green Cardamom Powder",
      "Shahi Garam Masala", "Jeera Powder", "Mutton Chukka Masala", "Kasuri Methi",
      "Tea Masala", "Paruppu Podi", "Sabji Masala", "Black Pepper", "Dry Ginger Powder",
      "Hyderabadi Biryani", "Fish Masala", "Mandhi Masala", "Amchur Powder",
      "Curry Leaves Podi", "Kulambu Masala", "Peri Peri Masala", "Chaat Masala",
      "Tandoori Masala", "White Pepper Powder", "Fish Fry Masala", "Clove Powder",
      "Punjabi Masala", "Meat Masala", "Malvani Masala", "Chicken Masala",
      "Rasam Powder", "Idli Podi", "Cinnamon Powder",
    ],
  },
  {
    name: "Dehydrated Powders",
    slug: "dehydrated-powders",
    description: "Versatile vegetable ingredients for food service, manufacturing and home kitchens.",
    image: photos.vegetables,
    products: [
      "Garlic Powder", "Onion Flakes", "Onion Powder", "Ginger Powder",
      "Moringa Powder", "Tomato Powder", "Bittergourd Powder", "Carrot Powder",
      "Beetroot Powder", "Red Chilli Powder",
    ],
  },
  {
    name: "Flour, Millets & Grains",
    slug: "flour-millets-grains",
    description: "A thoughtful collection of grains and millets for everyday nourishment.",
    image: photos.grains,
    products: [
      "Krushi Aata", "Jowar", "Bajra", "Little Millet", "Kodo Millet",
      "Quinoa", "Foxtail Millet", "Ragi",
    ],
  },
  {
    name: "Pulses & Seeds",
    slug: "pulses-seeds",
    description: "Staple pulses and nutrient-rich seeds for homes and food businesses.",
    image: photos.seeds,
    products: ["Chana", "Flax Seeds", "Chia Seeds", "Tur Dal", "Moong Dal", "Pumpkin Seeds"],
  },
  {
    name: "Special Products",
    slug: "special-products",
    description: "A curated selection of pantry favourites and value-added ingredients.",
    image: photos.honey,
    products: [
      "Raw Honey", "Kaju Honey", "Mix Dry Fruit Honey", "Almond Honey", "Gir Cow Ghee",
      "Garlic Flakes", "Peeled Garlic", "Ginger Garlic Paste", "Coffee Premix",
    ],
  },
  {
    name: "Cold-Pressed Oils",
    slug: "cold-pressed-oils",
    description: "Explore our range of traditional cooking oils. Product claims are confirmed per item.",
    image: photos.oil,
    products: [
      "Groundnut Oil", "Coconut Oil", "Sesame Oil", "Mustard Oil", "Castor Oil", "Flaxseed Oil",
    ],
  },
];

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");

export const products = categories.flatMap((category) =>
  category.products.map((name) => ({
    name,
    slug: `${category.slug}-${slugify(name)}`,
    category: category.name,
    categorySlug: category.slug,
    image:
      name.toLowerCase().includes("turmeric")
        ? photos.turmeric
        : name.toLowerCase().includes("chilli")
          ? photos.chilli
          : category.image,
    description: `A versatile ${name.toLowerCase()} selection for culinary use and food preparation.`,
  })),
);

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
