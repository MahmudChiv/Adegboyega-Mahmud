"use client";

import { ARTICLES } from "@/data/writing";
import { BookOpen, ArrowUpRight, Clock, FileText, Check } from "lucide-react";

export default function WritingSection() {
  return (
    <section
      id="writing"
      aria-label="Engineering Notes and Technical Writing"
      className="relative z-10 w-full py-24 sm:py-32 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto border-t border-white/8"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 gap-6">
        <div>
          <div className="font-mono text-xs tracking-widest text-accent uppercase mb-3 flex items-center gap-2">
            <span>[03]</span>
            <span className="text-white/40">//</span>
            <span>ENGINEERING NOTES & THINKING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Architectural Breakdowns
          </h2>
        </div>
        <p className="max-w-md font-mono text-xs text-white/50 leading-relaxed">
          Documenting real tradeoffs, edge cases, and design choices encountered while shipping
          production software. Read the hook below, then dive into the full analysis on Medium.
        </p>
      </div>

      {/* Article Cards Grid */}
      <div className="flex flex-col gap-8 mb-16">
        {ARTICLES.map((article) => (
          <article
            key={article.id}
            className="group relative rounded-2xl bg-[#121418] border border-white/8 hover:border-white/20 transition-all duration-300 p-6 sm:p-8 lg:p-10 overflow-hidden"
          >
            {/* Ambient hover glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 flex flex-col gap-6">
              {/* Metadata Row */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-white/40 border-b border-white/6 pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-accent/15 text-accent font-bold text-[11px] flex items-center justify-center">
                    {article.number}
                  </span>
                  <span className="text-accent-warm font-medium tracking-wider uppercase text-[11px]">
                    {article.category}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-[11px]">
                  <span>{article.publishedAt}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-white/30" />
                    {article.readTime}
                  </span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <div>
                <a
                  href={article.mediumUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block group-hover:text-accent transition-colors"
                >
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight leading-snug mb-2">
                    {article.title}
                  </h3>
                </a>
                <p className="text-sm sm:text-base text-white/60 font-medium">
                  {article.subtitle}
                </p>
              </div>

              {/* Hook Excerpt Box */}
              <div className="p-4 sm:p-5 rounded-xl bg-[#0e1014] border border-white/5 relative">
                <div className="font-mono text-[10px] text-accent tracking-wider uppercase mb-2 flex items-center gap-1.5">
                  <FileText className="w-3 h-3 text-accent" />
                  <span>Excerpt & Problem Framing</span>
                </div>
                <p className="text-xs sm:text-sm text-white/75 leading-relaxed font-sans italic">
                  &ldquo;{article.excerpt}&rdquo;
                </p>
              </div>

              {/* Key Architectural Takeaways */}
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-white/40 block mb-2">
                  Key Architectural Learnings Covered:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {article.keyTakeaways.map((takeaway, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 p-2.5 rounded-lg bg-white/2 border border-white/5 text-[11px] text-white/65 leading-tight"
                    >
                      <Check className="w-3.5 h-3.5 text-accent-sage shrink-0 mt-0.5" />
                      <span>{takeaway}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Bar & Tags */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/6">
                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/5 text-white/50 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Continue Reading Button */}
                <a
                  href={article.mediumUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/15 hover:bg-accent/25 text-white border border-accent/30 font-mono text-xs transition-all duration-200 group-hover:border-accent/60"
                  aria-label={`Continue reading "${article.title}" on Medium`}
                >
                  <span>Continue reading on Medium</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Medium Publication Hub Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#14161d] via-[#101217] to-[#14161d] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6 text-accent" />
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-bold text-white mb-1">
              Follow Mahmud on Medium
            </h4>
            <p className="text-xs sm:text-sm text-white/50">
              In-depth essays on full-stack architecture, AI voice tooling, and building software for African markets.
            </p>
          </div>
        </div>

        <a
          href="https://medium.com/@mahmud.adegboyega"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-white/90 text-black font-semibold text-xs tracking-wide transition-colors"
        >
          <span>Visit Medium Profile</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </section>
  );
}

