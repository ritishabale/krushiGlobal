"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  ["About", "/about"],
  ["Products", "/products"],
  ["Manufacturing", "/manufacturing"],
  ["Quality", "/quality"],
  ["Exports", "/exports"],
  ["Contact", "/contact"],
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" href="/" aria-label="Krushi Global Foods home" onClick={() => setOpen(false)}>
          <span className="brand-mark">K<span>.</span></span>
          <span className="brand-copy">
            <strong>KRUSHI GLOBAL</strong>
            <small>BOTANICAL INGREDIENTS · EXPORT GRADE</small>
          </span>
        </Link>
        <button
          aria-expanded={open}
          aria-label={open ? "Close navigation" : "Open navigation"}
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          type="button"
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav className={`main-nav${open ? " is-open" : ""}`} aria-label="Main navigation">
          {links.map(([label, href]) => (
            <Link
              aria-current={pathname === href ? "page" : undefined}
              href={href}
              key={href}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link className="nav-cta" href="/request-quote" onClick={() => setOpen(false)}>
            Request a Quote <span aria-hidden="true">↗</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
