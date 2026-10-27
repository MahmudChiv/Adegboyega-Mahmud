"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0c]/85 backdrop-blur-md border-b border-white/8 py-4"
          : "bg-transparent border-b border-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Brand Identity */}
          <Link
            href="/"
            className="flex items-baseline gap-3 group focus:outline-none"
          >
            <span className="font-mono text-xs tracking-widest text-accent font-semibold">
              [MA]
            </span>
            <span className="text-sm font-medium tracking-tight text-white group-hover:text-white/80 transition-colors">
              Mahmud Adegboyega
            </span>
          </Link>

          {/* Editorial Index Links */}
          <nav className="hidden md:flex items-center gap-8 font-mono text-xs tracking-wider">
            <Link
              href="#projects"
              className="text-white/60 hover:text-white transition-colors"
            >
              01 // WORK
            </Link>
            <Link
              href="#experience"
              className="text-white/60 hover:text-white transition-colors"
            >
              02 // TRACK RECORD
            </Link>
            <Link
              href="#contact"
              className="text-white/60 hover:text-white transition-colors"
            >
              03 // CONTACT
            </Link>
          </nav>

          {/* Right Direct Outreach Cluster */}
          <div className="hidden sm:flex items-center gap-5 font-mono text-xs">
            {/* Status Indicator */}
            <div className="flex items-center gap-2 text-white/50">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-sage opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent-sage" />
              </span>
              <span className="text-[11px] tracking-wide text-white/50">AVAILABLE</span>
            </div>

            <div className="h-3 w-[1px] bg-white/15" />

            {/* WhatsApp */}
            <a
              href="https://wa.me/2348164247735"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1 text-white/70 hover:text-white transition-colors"
            >
              <span>WHATSAPP</span>
              <ArrowUpRight className="w-3 h-3 text-white/40 group-hover:text-white transition-colors" />
            </a>

            {/* Email */}
            <a
              href="mailto:mahmud.adegboyega@gmail.com"
              className="group flex items-center gap-1 text-white/70 hover:text-white transition-colors"
            >
              <span>EMAIL</span>
              <ArrowUpRight className="w-3 h-3 text-white/40 group-hover:text-white transition-colors" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white/70 hover:text-white p-1 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a0c]/98 border-b border-white/8 px-6 pt-6 pb-8 space-y-6">
          <div className="flex items-center gap-2 font-mono text-[11px] text-white/50">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-sage" />
            <span>AVAILABLE FOR PRODUCTION ROLES</span>
          </div>

          <nav className="flex flex-col space-y-4 font-mono text-sm tracking-wider">
            <Link
              href="#projects"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white/70 hover:text-white transition-colors"
            >
              01 // WORK
            </Link>
            <Link
              href="#experience"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white/70 hover:text-white transition-colors"
            >
              02 // TRACK RECORD
            </Link>
            <Link
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white/70 hover:text-white transition-colors"
            >
              03 // CONTACT
            </Link>
          </nav>

          <div className="pt-4 border-t border-white/8 flex items-center gap-6 font-mono text-xs">
            <a
              href="https://wa.me/2348164247735"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-white/80 hover:text-white"
            >
              <span>WHATSAPP</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="mailto:mahmud.adegboyega@gmail.com"
              className="flex items-center gap-1 text-white/80 hover:text-white"
            >
              <span>EMAIL</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
