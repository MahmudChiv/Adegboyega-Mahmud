"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";

// Dynamically import 3D Canvas with ssr: false so server render is instant
const KernelMonolithCanvas = dynamic(
  () => import("@/components/KernelMonolithCanvas"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[380px] sm:min-h-[500px] flex items-center justify-center">
        <div className="w-24 h-36 rounded-lg border border-white/10 animate-pulse bg-white/[0.02]" />
      </div>
    ),
  }
);

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-32 pb-12 px-6 sm:px-8 lg:px-12 overflow-hidden border-b border-white/[0.06]"
    >
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="max-w-7xl mx-auto h-full w-full grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-8 px-6 sm:px-8 lg:px-12 opacity-[0.03]">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-full border-r border-white" />
          ))}
        </div>
      </div>

      {/* Main Hero Split */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center flex-1 my-auto">
        {/* Left Column: Monumental Typography & Manifesto (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-8 z-10">
          {/* Eyebrow index */}
          <div className="flex items-center gap-3 font-mono text-xs text-white/50 tracking-wider">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="text-white/80 font-medium">AVAILABLE FOR HIRE</span>
            <span className="text-white/20">—</span>
            <span className="text-white/40">LAGOS, NIGERIA</span>
          </div>

          {/* Monumental Headline */}
          <div className="space-y-3">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-normal tracking-[-0.04em] text-white leading-[0.95]">
              Mahmud <br />
              <span className="font-light text-white/90">Adegboyega</span>
            </h1>
            <p className="font-mono text-xs sm:text-sm tracking-wider text-[var(--accent)] uppercase">
              SOFTWARE ENGINEER
            </p>
          </div>

          {/* Positioning Narrative */}
          <p className="text-base sm:text-lg lg:text-xl font-light text-white/70 leading-relaxed max-w-xl">
            Full-stack engineer building production-ready software for startups, Africa’s
            businesses and informal economy, with a focus on solving real problems for real people
            and a long-term goal of founding a major African startup.
          </p>

          {/* Action Row */}
          <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6 font-mono text-xs tracking-wider">
            <Link
              href="#projects"
              className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>EXPLORE SELECTED WORK</span>
              <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
            </Link>

            <a
              href="https://wa.me/2348164247735"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 px-4 py-3.5 rounded-full border border-white/15 hover:border-white/40 text-white/80 hover:text-white transition-all"
            >
              <span>WHATSAPP</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <a
              href="mailto:mahmud.adegboyega@gmail.com"
              className="group inline-flex items-center gap-1.5 px-4 py-3.5 rounded-full border border-white/15 hover:border-white/40 text-white/80 hover:text-white transition-all"
            >
              <span>EMAIL</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Right Column: Unbounded Atmospheric 3D Canvas (5 cols) */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          {/* Spatial Ambient Radial Glow */}
          <div className="absolute w-[360px] sm:w-[480px] h-[360px] sm:h-[480px] rounded-full bg-gradient-to-tr from-[var(--accent)]/15 via-[var(--accent-warm)]/10 to-transparent blur-3xl pointer-events-none -z-10" />

          {/* 3D Canvas Viewport (Free-floating, no boxed card container) */}
          <div
            id="hero-3d-slot"
            data-slot="hero"
            className="w-full h-[400px] sm:h-[520px] lg:h-[600px] relative flex items-center justify-center"
          >
            <KernelMonolithCanvas />
          </div>
        </div>
      </div>
    </section>
  );
}
