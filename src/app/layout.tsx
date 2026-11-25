import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { WhatsAppButton } from "@/components/whatsapp-button";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.krushiglobalfoods.com"),
  title: {
    default: "Krushi Global Foods & Spices | Indian Ingredients, Worldwide",
    template: "%s | Krushi Global Foods",
  },
  description:
    "Explore Indian spices, masalas, dehydrated ingredients, grains, pulses and specialty foods from Krushi Global Foods and Spices.",
  openGraph: {
    title: "Krushi Global Foods & Spices",
    description: "Indian ingredients, thoughtfully prepared for the world.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <Header />
        <a className="skip-link" href="#main-content">Skip to content</a>
        <main id="main-content">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
