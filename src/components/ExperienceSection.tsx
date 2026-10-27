"use client";

import { useState, useEffect } from "react";
import {
  WORK_EXPERIENCES,
  EDUCATION,
  LEETCODE_DATA,
  MILESTONES,
} from "@/data/experience";
import {
  Briefcase,
  GraduationCap,
  Award,
  Terminal,
  ExternalLink,
} from "lucide-react";

export default function ExperienceSection() {
  const [stats, setStats] = useState(LEETCODE_DATA);

  useEffect(() => {
    let isMounted = true;
    fetch("/api/leetcode")
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data && typeof data.totalSolved === "number") {
          setStats(data);
        }
      })
      .catch((err) => {
        console.warn("Using baseline LeetCode stats:", err);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const total = stats.totalSolved || 1;
  const easyPct = stats.totalSolved > 0 ? Math.round((stats.easy.solved / total) * 100) : 0;
  const medPct = stats.totalSolved > 0 ? Math.round((stats.medium.solved / total) * 100) : 0;
  const hardPct = stats.totalSolved > 0 ? Math.round((stats.hard.solved / total) * 100) : 0;

  return (
    <section
      id="experience"
      aria-label="Work Experience and Education"
      className="relative z-10 w-full py-24 sm:py-32 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto border-t border-white/8"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 gap-6">
        <div>
          <div className="font-mono text-xs tracking-widest text-accent uppercase mb-3 flex items-center gap-2">
            <span>[02]</span>
            <span className="text-white/40">//</span>
            <span>EXPERIENCE & BACKGROUND</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Experience & Education
          </h2>
        </div>
      </div>

      {/* Main Grid: Left = Experience & Education (7 cols), Right = LeetCode & Hackathons (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
        {/* LEFT COLUMN: Experience Timeline & Education */}
        <div className="lg:col-span-7 flex flex-col gap-12">
          {/* Work History */}
          <div>
            <div className="flex items-center gap-2 mb-8">
              <Briefcase className="w-4 h-4 text-white/60" />
              <h3 className="font-mono text-xs uppercase tracking-wider text-white/70 font-semibold">
                Experience
              </h3>
            </div>

            <div className="relative border-l border-white/10 pl-6 sm:pl-8 ml-2 flex flex-col gap-10">
              {WORK_EXPERIENCES.map((exp) => (
                <div key={exp.id} className="relative group">
                  {/* Subtle Node Marker */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3 h-3 rounded-full bg-[#0d0f11] border border-white/40 group-hover:border-white transition-colors" />

                  {/* Role Header */}
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1.5">
                    <h4 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                      {exp.role}
                    </h4>
                    <span className="font-mono text-xs text-white/40">
                      {exp.period}
                    </span>
                  </div>

                  {/* Company & Meta */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-white/50 mb-3 font-mono">
                    <span className="text-white/80 font-medium">{exp.company}</span>
                    <span>•</span>
                    <span>{exp.location}</span>
                    {exp.badge && (
                      <span className="px-2 py-0.5 rounded text-[10px] bg-white/5 border border-white/10 text-white/60">
                        {exp.badge}
                      </span>
                    )}
                  </div>

                  {/* Deliverables Bullet List (Faithful to CV) */}
                  <ul className="space-y-2 mb-4">
                    {exp.achievements.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-white/70 leading-relaxed font-sans">
                        <span className="font-mono text-white/30 text-[10px] mt-0.5 shrink-0">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/4 text-white/50 border border-white/6"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Card */}
          <div className="p-6 sm:p-7 rounded-2xl bg-[#121418] border border-white/8 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="w-4 h-4 text-white/60" />
              <h3 className="font-mono text-xs uppercase tracking-wider text-white/70 font-semibold">
                Education
              </h3>
            </div>

            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
              <h4 className="text-lg sm:text-xl font-bold text-white">
                {EDUCATION.degree}
              </h4>
              <span className="font-mono text-xs text-white/40">
                {EDUCATION.period}
              </span>
            </div>

            <p className="text-sm text-white/70 font-medium mb-3">
              {EDUCATION.institution} — <span className="text-white/40 text-xs font-mono">{EDUCATION.location}</span>
            </p>

            {EDUCATION.coursework && (
              <div>
                <span className="font-mono text-[10px] tracking-wider text-white/40 uppercase block mb-2">
                  Coursework:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {EDUCATION.coursework.map((course) => (
                    <span
                      key={course}
                      className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/4 text-white/55 border border-white/6"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: LeetCode & Hackathons */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          {/* LeetCode Live Data Card */}
          <div className="relative rounded-2xl bg-[#121418] border border-white/10 p-6 sm:p-7 shadow-2xl overflow-hidden">
            {/* Terminal Header */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/8">
              <div className="flex items-center gap-2 font-mono text-xs text-white/70">
                <Terminal className="w-3.5 h-3.5 text-white/50" />
                <span>LEETCODE</span>
              </div>
              <a
                href={stats.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 font-mono text-xs text-white/60 hover:text-white transition-colors"
                aria-label="View LeetCode Profile"
              >
                <span>@{stats.username}</span>
                <ExternalLink className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            {/* Total Problems Stat Hero */}
            <div className="flex items-end justify-between mb-6">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-white/40 block mb-1">
                  Problems Solved
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                    {stats.totalSolved}
                  </span>
                  <span className="font-mono text-xs text-white/40">PROBLEMS</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 font-mono text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>LIVE SYNCED</span>
              </div>
            </div>

            {/* Difficulty Breakdown Bars */}
            <div className="space-y-3.5">
              {/* Easy */}
              <div>
                <div className="flex justify-between font-mono text-xs mb-1">
                  <span className="text-white/80 font-medium">Easy</span>
                  <span className="text-white/60">
                    {stats.easy.solved}{" "}
                    <span className="text-white/30 text-[10px]">
                      {stats.totalSolved > 0 ? `(${easyPct}%)` : ""}
                    </span>
                  </span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white/80 rounded-full transition-all duration-500"
                    style={{ width: `${stats.totalSolved > 0 ? easyPct : 0}%` }}
                  />
                </div>
              </div>

              {/* Medium */}
              <div>
                <div className="flex justify-between font-mono text-xs mb-1">
                  <span className="text-white/60 font-medium">Medium</span>
                  <span className="text-white/60">
                    {stats.medium.solved}{" "}
                    <span className="text-white/30 text-[10px]">
                      {stats.totalSolved > 0 ? `(${medPct}%)` : ""}
                    </span>
                  </span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white/50 rounded-full transition-all duration-500"
                    style={{ width: `${stats.totalSolved > 0 ? medPct : 0}%` }}
                  />
                </div>
              </div>

              {/* Hard */}
              <div>
                <div className="flex justify-between font-mono text-xs mb-1">
                  <span className="text-white/40 font-medium">Hard</span>
                  <span className="text-white/60">
                    {stats.hard.solved}{" "}
                    <span className="text-white/30 text-[10px]">
                      {stats.totalSolved > 0 ? `(${hardPct}%)` : ""}
                    </span>
                  </span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white/25 rounded-full transition-all duration-500"
                    style={{ width: `${stats.totalSolved > 0 ? hardPct : 0}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Hackathons & Leadership */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-white/60" />
              <h3 className="font-mono text-xs uppercase tracking-wider text-white/70 font-semibold">
                Milestones & Hackathons
              </h3>
            </div>

            <div className="flex flex-col gap-3">
              {MILESTONES.map((milestone) => (
                <div
                  key={milestone.id}
                  className="p-4 sm:p-5 rounded-xl bg-[#121418] border border-white/8 hover:border-white/15 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3 mb-1.5">
                    <h4 className="text-sm font-semibold text-white">
                      {milestone.title}
                    </h4>
                    {milestone.badge && (
                      <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-white/5 text-white/60 border border-white/10 shrink-0">
                        {milestone.badge}
                      </span>
                    )}
                  </div>
                  <div className="font-mono text-xs text-white/40 mb-2">
                    {milestone.issuer}
                    {milestone.period ? ` • ${milestone.period}` : ""}
                  </div>
                  <p className="text-xs text-white/60 leading-relaxed font-sans">
                    {milestone.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
