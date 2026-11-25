import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const message = encodeURIComponent("Hello Krushi Global Foods and Spices, I would like to know more about your products.");
  return (
    <a
      className="whatsapp-float"
      href={`https://wa.me/919422611322?text=${message}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Message Krushi Global Foods on WhatsApp"
    >
      <MessageCircle size={21} />
    </a>
  );
}
