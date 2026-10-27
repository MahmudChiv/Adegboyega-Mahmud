"use client";

import { useState, useEffect } from "react";
import {
  Mail,
  MessageSquare,
  Copy,
  Check,
  ArrowUpRight,
  Clock,
  ArrowUp,
} from "lucide-react";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [lagosTime, setLagosTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-US", {
        timeZone: "Africa/Lagos",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setLagosTime(timeStr);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("mahmud.adegboyega@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      aria-label="Contact and Colophon"
      className="relative z-10 w-full pt-28 pb-16 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto border-t border-white/8"
    >
      {/* Section Header */}
      <div className="mb-16 sm:mb-20">
        <div className="font-mono text-xs tracking-widest text-accent uppercase mb-3 flex items-center gap-2">
          <span>[03]</span>
          <span className="text-white/40">//</span>
          <span>INITIATE CONTACT</span>
        </div>
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6">
          Let&apos;s Build Together.
        </h2>
        <p className="max-w-2xl text-base sm:text-lg text-white/60 leading-relaxed font-sans">
          Whether you&apos;re building a mission-critical startup, scaling software for
          Africa&apos;s informal economy, or looking for an engineer with foundational systems
          rigor — reach out directly via WhatsApp or Email.
        </p>
      </div>

      {/* Primary Action Channels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {/* WhatsApp Card */}
        <a
          href="https://wa.me/2348164247735"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative p-8 rounded-2xl bg-[#13161b] border border-white/10 hover:border-accent/50 transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-accent">
                <MessageSquare className="w-6 h-6" />
              </div>
              <span className="font-mono text-[11px] text-white/40 group-hover:text-accent flex items-center gap-1 transition-colors">
                DIRECT CHAT
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
            <span className="font-mono text-xs text-white/40 uppercase tracking-wider block mb-1">
              Instant Messaging
            </span>
            <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
              WhatsApp
            </div>
            <p className="text-sm text-white/60 mb-6">
              Fastest for direct questions, architecture discussions, or contract inquiries.
            </p>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-white/8 font-mono text-xs">
            <span className="text-white/70">+234 816 424 7735</span>
            <span className="text-accent underline underline-offset-4">Open Chat →</span>
          </div>
        </a>

        {/* Email Card */}
        <div className="relative p-8 rounded-2xl bg-[#13161b] border border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-accent">
                <Mail className="w-6 h-6" />
              </div>
              <button
                onClick={handleCopyEmail}
                className="font-mono text-[11px] text-white/40 hover:text-white flex items-center gap-1.5 transition-colors focus:outline-none"
                aria-label="Copy email address"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-accent-sage" />
                    <span className="text-accent-sage">COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>COPY EMAIL</span>
                  </>
                )}
              </button>
            </div>
            <span className="font-mono text-xs text-white/40 uppercase tracking-wider block mb-1">
              Direct Inbox
            </span>
            <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
              Email
            </div>
            <p className="text-sm text-white/60 mb-6">
              Best for detailed briefs, full-time offers, or pitch decks.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/8 font-mono text-xs">
            <a
              href="mailto:mahmud.adegboyega@gmail.com"
              className="text-white/80 hover:text-accent transition-colors truncate max-w-xs"
            >
              mahmud.adegboyega@gmail.com
            </a>
            <a
              href="mailto:mahmud.adegboyega@gmail.com"
              className="text-accent hover:text-white underline underline-offset-4 transition-colors"
            >
              Compose ↗
            </a>
          </div>
        </div>
      </div>

      {/* Real-time Status & Telemetry Bar */}
      <div className="p-6 rounded-2xl bg-[#0f1115] border border-white/8 mb-16 flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
          </span>
          <span className="text-white/70">
            CURRENT STATUS: <span className="text-white font-medium">AVAILABLE FOR COMMISSIONS & ROLES</span>
          </span>
        </div>

        <div className="flex items-center gap-6 text-white/50">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-white/40" />
            <span>LAGOS, NG (WAT / GMT+1):</span>
            <span className="text-white font-mono">{lagosTime || "12:00:00"}</span>
          </div>
        </div>
      </div>

      {/* Directory & Profile Outlets */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16 font-mono text-xs">
        <a
          href="https://github.com/MahmudChiv"
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 rounded-xl bg-white/2 border border-white/6 hover:border-white/20 hover:text-accent transition-colors flex items-center justify-between"
        >
          <span>GITHUB</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-white/40" />
        </a>
        <a
          href="https://leetcode.com/u/mahmud_chiv/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 rounded-xl bg-white/2 border border-white/6 hover:border-white/20 hover:text-accent transition-colors flex items-center justify-between"
        >
          <span>LEETCODE</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-white/40" />
        </a>
        <a
          href="https://medium.com/@mahmud.adegboyega"
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 rounded-xl bg-white/2 border border-white/6 hover:border-white/20 hover:text-accent transition-colors flex items-center justify-between"
        >
          <span>MEDIUM</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-white/40" />
        </a>
        <a
          href="https://wa.me/2348164247735"
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 rounded-xl bg-white/2 border border-white/6 hover:border-white/20 hover:text-accent transition-colors flex items-center justify-between"
        >
          <span>WHATSAPP</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-white/40" />
        </a>
      </div>

      {/* Colophon & Bottom Footer */}
      <div className="pt-8 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-white/40">
        <div>
          © 2026 Mahmud Adegboyega.
        </div>

        <button
          onClick={scrollToTop}
          className="flex items-center gap-1.5 text-white/50 hover:text-white transition-colors focus:outline-none"
          aria-label="Back to top of page"
        >
          <span>BACK TO TOP</span>
          <ArrowUp className="w-3 h-3" />
        </button>
      </div>
    </footer>
  );
}
