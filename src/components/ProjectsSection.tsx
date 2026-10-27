"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, MessageSquare, Mic, Layers, ShieldCheck, CheckCircle2, Code2 } from "lucide-react";
import { PROJECTS, Project } from "@/data/projects";

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-28 px-6 sm:px-8 lg:px-12 border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs text-[var(--accent)] tracking-wider">
              <span>01 // PROVEN TRACK RECORD</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white">
              Things I Have Shipped
            </h2>
          </div>

          <div className="font-mono text-xs text-white/40 tracking-wider">
            <span>[CURATED: 03 PRODUCTION BUILDS]</span>
          </div>
        </div>

        {/* 2-Column Responsive Card Grid (Matching Reference Screenshot) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              className="group relative rounded-2xl bg-[#11141a] border border-white/[0.08] hover:border-white/20 transition-all duration-300 flex flex-col overflow-hidden hover:shadow-2xl hover:shadow-black/60"
            >
              {/* TOP HALF: Landing Page Preview Window */}
              <div className="relative w-full aspect-[16/10] bg-[#080a0e] overflow-hidden border-b border-white/[0.06] flex items-center justify-center">
                {/* Number Badge (Matching Screenshot Circle) */}
                <div className="absolute top-4 left-4 z-20 flex items-center justify-center w-9 h-9 rounded-full bg-emerald-500/90 text-black font-mono font-bold text-xs shadow-lg shadow-emerald-500/20 backdrop-blur-md">
                  {project.number}
                </div>

                {/* Status Pill on Top Right */}
                <div className="absolute top-4 right-4 z-20 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 font-mono text-[10px] text-white/70">
                  {project.statusBadge}
                </div>

                {/* Preview Content */}
                {project.previewImage && !project.isPlaceholder ? (
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={project.previewImage}
                      alt={`${project.title} live interface preview`}
                      fill
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    {/* Subtle gradient vignette overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#11141a] via-transparent to-black/20 opacity-40 group-hover:opacity-20 transition-opacity" />
                  </div>
                ) : (
                  /* High-Fidelity Yauwa AI Voice-Bot Placeholder Interface */
                  <div className="w-full h-full p-6 flex flex-col justify-between bg-gradient-to-br from-[#0c1017] via-[#090d13] to-[#121622] relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                    <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>WHATSAPP VOICE ENGINE</span>
                      </div>
                      <span className="text-white/40">PIDGIN TTS // V1.0</span>
                    </div>

                    <div className="my-auto space-y-3 max-w-sm">
                      {/* Simulated Audio Note Message */}
                      <div className="p-3 rounded-xl bg-white/[0.05] border border-white/10 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                          <Mic className="w-4 h-4" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between text-[11px] font-mono text-white/60">
                            <span>Voice Note: &quot;I sell 3 bag of rice for ₦90k&quot;</span>
                            <span>0:04</span>
                          </div>
                          {/* Audio Wave Bar */}
                          <div className="flex items-center gap-0.5 h-3">
                            {[40, 70, 95, 30, 85, 60, 100, 45, 90, 65, 35, 80, 50, 95].map((h, i) => (
                              <div
                                key={i}
                                className="w-1 bg-emerald-400/70 rounded-full"
                                style={{ height: `${h}%` }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Bot Response in Pidgin */}
                      <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 font-mono">
                        <span className="text-[10px] text-white/40 block mb-0.5">YAUWA BOT REPLY:</span>
                        &quot;Oga I don record am! 3 bags rice = ₦90,000. Balance updated.&quot;
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-white/40 pt-2 border-t border-white/5">
                      <span>LANDING PAGE UNDERWAY</span>
                      <span className="text-[var(--accent)]">LIVE BOT VIA WHATSAPP</span>
                    </div>
                  </div>
                )}
              </div>

              {/* BOTTOM HALF: Case Study Anatomy & Architecture Decisions */}
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 space-y-6">
                <div className="space-y-3">
                  {/* Title & Tagline */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-medium text-white group-hover:text-[var(--accent)] transition-colors flex items-center gap-2">
                        <span>{project.title}</span>
                      </h3>
                      <p className="text-xs font-mono text-white/40 mt-1">
                        {project.tagline}
                      </p>
                    </div>

                    {/* Quick Link Arrow */}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${project.title}`}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    )}
                    {project.whatsappUrl && (
                      <a
                        href={project.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Test ${project.title} on WhatsApp`}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-emerald-400 hover:text-emerald-300 transition-colors"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  {/* Problem & Solution Narrative */}
                  <p className="text-sm font-light text-white/70 leading-relaxed">
                    {project.solution}
                  </p>

                  {/* Architecture Highlight */}
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-white/60 font-mono space-y-1">
                    <span className="text-[10px] text-[var(--accent)] font-semibold block uppercase">
                      // Architectural Rationale
                    </span>
                    <p className="line-clamp-2 leading-relaxed">
                      {project.architecture}
                    </p>
                  </div>
                </div>

                {/* Tech Badges & Action Links */}
                <div className="space-y-4 pt-2 border-t border-white/[0.06]">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-[10px] font-mono font-medium text-white/60 tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-3 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-white text-black font-medium text-xs hover:bg-white/90 transition-all whitespace-nowrap"
                        >
                          <span>Live Product</span>
                          <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                        </a>
                      )}

                      {project.whatsappUrl && (
                        <a
                          href={project.whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-500 text-black font-medium text-xs hover:bg-emerald-400 transition-all whitespace-nowrap"
                        >
                          <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                          <span>Test on WhatsApp</span>
                        </a>
                      )}

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-xs transition-colors whitespace-nowrap"
                        >
                          <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                          </svg>
                          <span>GitHub Repo</span>
                        </a>
                      )}
                    </div>

                    <button
                      onClick={() => setSelectedProject(project)}
                      className="font-mono text-xs text-[var(--accent)] hover:text-white transition-colors underline underline-offset-4 whitespace-nowrap self-start sm:self-auto pt-1 sm:pt-0"
                    >
                      Case Study Spec →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Full Spec Modal / Drawer */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-[#0e1117] border border-white/15 p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono text-xs text-[var(--accent)]">{selectedProject.number} // DEEP DIVE</span>
                <h3 className="text-2xl font-bold text-white mt-1">{selectedProject.title}</h3>
                <p className="font-mono text-xs text-white/50">{selectedProject.tagline}</p>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm font-light leading-relaxed text-white/80">
              <div>
                <h4 className="font-mono text-xs uppercase text-white font-semibold mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  The Problem
                </h4>
                <p>{selectedProject.problem}</p>
              </div>

              <div>
                <h4 className="font-mono text-xs uppercase text-white font-semibold mb-1 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-[var(--accent)]" />
                  Who It&apos;s For
                </h4>
                <p>{selectedProject.audience}</p>
              </div>

              <div>
                <h4 className="font-mono text-xs uppercase text-white font-semibold mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Key Technical Decisions &amp; Architecture
                </h4>
                <p>{selectedProject.architecture}</p>
              </div>

              <div>
                <h4 className="font-mono text-xs uppercase text-white font-semibold mb-2">
                  Quantified Impact &amp; Engineering Metrics
                </h4>
                <ul className="space-y-1.5 font-mono text-xs text-white/70">
                  {selectedProject.metrics.map((m, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-sage)]" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex gap-2">
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white text-black font-medium text-xs"
                  >
                    <span>Visit Live Application</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
                {selectedProject.whatsappUrl && (
                  <a
                    href={selectedProject.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-500 text-black font-medium text-xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Launch WhatsApp Bot</span>
                  </a>
                )}
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className="font-mono text-xs text-white/50 hover:text-white"
              >
                Close Spec
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
