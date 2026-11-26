"use client";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import CTAIcon from "./CTAIcon";
import BrandMark from "./BrandMark";

const links = [
  ["Work", "#projects"],
  ["Experience", "#experience"],
  ["About", "#about"],
  ["Contact", "#contact"],
];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  return (
    <header className="site-header">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="shell nav-row">
        <a href="#hero" className="brand" aria-label="Mahmud Adegboyega, home">
          <BrandMark />
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([label, url]) => (
            <a key={url} href={url}>
              {label}
            </a>
          ))}
        </nav>
        <a
          className="button button-small nav-contact"
          href="mailto:mahmud.adegboyega@gmail.com"
        >
          Let’s talk <CTAIcon />
        </a>
        <button
          ref={toggleRef}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav
          id="mobile-nav"
          className="mobile-nav shell"
          aria-label="Mobile navigation"
        >
          {links.map(([label, url]) => (
            <a key={url} href={url} onClick={() => setOpen(false)}>
              {label}
              <CTAIcon />
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
