"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Mic, X, ChevronRight, ChevronLeft } from "lucide-react";
import { PROJECTS, type Project } from "@/data/projects";
import CTAIcon from "./CTAIcon";
import ScrollIcon from "./ScrollIcon";

const summaries = [
  "Bookkeeping that starts with a voice note. Built for traders who run their business on WhatsApp.",
  "Connecting clients with local artisans, with voice-powered job requests and payment protection.",
  "Helping teams find committed collaborators through GitHub activity and adaptive AI interviews.",
];
export default function ProjectsSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState<Project | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    const sticky = stickyRef.current;
    const stage = track?.querySelector<HTMLElement>(".project-stage");
    if (!track || !sticky || !stage) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const updateActive = () => {
      const distance = stage.scrollWidth - stage.clientWidth;
      const index =
        distance > 0
          ? Math.round((stage.scrollLeft / distance) * (PROJECTS.length - 1))
          : 0;
      setActive((previous) => (previous === index ? previous : index));
    };
    const paint = () => {
      frame = 0;
      track.dataset.reduced = String(reduced.matches);
      track.dataset.enhanced = String(!reduced.matches);
      const distance = Math.max(0, stage.scrollWidth - stage.clientWidth);
      track.dataset.overflow = String(distance > 1);
      // Native vertical page scrolling drives the row at every viewport size.
      const enhanced = !reduced.matches && distance > 1;
      track.dataset.enhanced = String(enhanced);
      track.style.setProperty("--project-travel", `${distance}px`);
      if (enhanced) {
        const top = parseFloat(getComputedStyle(sticky).top) || 0;
        const travel = Math.max(1, track.offsetHeight - sticky.offsetHeight);
        const progress = Math.max(
          0,
          Math.min(1, (top - track.getBoundingClientRect().top) / travel),
        );
        stage.scrollLeft = progress * distance;
      }
      updateActive();
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    reduced.addEventListener("change", schedule);
    stage.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      stage.removeEventListener("scroll", updateActive);
      reduced.removeEventListener("change", schedule);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  const jump = (index: number) => {
    const track = trackRef.current;
    const sticky = stickyRef.current;
    const stage = track?.querySelector<HTMLElement>(".project-stage");
    if (!track || !sticky || !stage) return;
    const progress =
      Math.max(0, Math.min(PROJECTS.length - 1, index)) / (PROJECTS.length - 1);
    if (track.dataset.enhanced !== "true") {
      stage.scrollTo({
        left: progress * (stage.scrollWidth - stage.clientWidth),
        behavior: "smooth",
      });
      return;
    }
    const top = parseFloat(getComputedStyle(sticky).top) || 0;
    window.scrollTo({
      top:
        window.scrollY +
        track.getBoundingClientRect().top -
        top +
        progress * (track.offsetHeight - sticky.offsetHeight),
      behavior: "instant",
    });
  };
  const openStudy = (project: Project) => {
    setSelected(project);
    dialogRef.current?.showModal();
  };

  return (
    <section id="projects" className="projects-section">
      <div ref={trackRef} className="project-track">
        <div ref={stickyRef} className="project-sticky shell">
          <div className="section-heading project-heading">
            <div>
              <h2>
                Selected <span className="outlined-word">work.</span>
              </h2>
            </div>
            <div className="project-header-actions">
              <div className="project-navigation">
                <button
                  type="button"
                  onClick={() => jump(active - 1)}
                  disabled={active === 0}
                  aria-label="Previous project"
                >
                  <ChevronLeft size={22} />
                </button>
                <span aria-live="polite" aria-atomic="true">
                  0{active + 1} / 0{PROJECTS.length}
                </span>
                <button
                  type="button"
                  onClick={() => jump(active + 1)}
                  disabled={active === PROJECTS.length - 1}
                  aria-label="Next project"
                >
                  <ChevronRight size={22} />
                </button>
              </div>
            </div>
          </div>
          <div className="project-stage">
            {PROJECTS.map((project, i) => (
              <article
                className={`project-card project-tone-${i}`}
                key={project.id}
                aria-label={`${project.title}, project ${i + 1} of ${PROJECTS.length}`}
              >
                <div className="project-visual">
                  <div className="project-windowbar">
                    <span>
                      <i />
                      <i />
                      <i />
                    </span>
                    <span>
                      {project.title.toUpperCase()}
                    </span>
                  </div>
                  {project.previewImage && !project.isPlaceholder ? (
                    <div className="project-image">
                      <Image
                        src={project.previewImage}
                        alt={`${project.title} application screenshot`}
                        fill
                        sizes="(min-width: 768px) 40vw, 90vw"
                        className="object-cover object-top"
                      />
                    </div>
                  ) : (
                    <div className="voice-demo">
                      <span className="demo-label">
                        ILLUSTRATIVE CONVERSATION
                      </span>
                      <div className="voice-brand">
                        yauwa<span>ai</span>
                        <small>Your business. In your own words.</small>
                      </div>
                      <div className="voice-message">
                        <Mic size={24} />
                        <div>
                          <div className="waveform" aria-hidden="true">
                            {[
                              25, 65, 40, 80, 100, 45, 70, 35, 90, 50, 75, 30,
                            ].map((height, index) => (
                              <i key={index} style={{ height: `${height}%` }} />
                            ))}
                          </div>
                          <p>“I sell 3 bags of rice for ₦90k.”</p>
                        </div>
                      </div>
                      <div className="voice-reply">
                        Sale recorded.<strong>3 bags of rice · ₦90,000</strong>
                        <span>
                          One voice note. One less thing to worry about.
                        </span>
                      </div>
                      <span className="demo-footer">
                        WHATSAPP → VOICE → RECORD
                      </span>
                    </div>
                  )}
                </div>
                <div className="project-copy">
                  <p className="eyebrow">
                    {i === 0
                      ? "VOICE AI / COMMERCE"
                      : i === 1
                        ? "MARKETPLACE / FINTECH"
                        : "DEVELOPER TOOLS / AI"}
                  </p>
                  <h3>{project.title}</h3>
                  <p className="project-summary">{summaries[i]}</p>
                  <div className="tags">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <div className="project-actions">
                    {(project.liveUrl || project.whatsappUrl) && (
                      <a
                        className="button button-small"
                        href={project.liveUrl || project.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {project.liveUrl ? "Live product" : "Try on WhatsApp"}
                        <CTAIcon />
                      </a>
                    )}
                    <button
                      className="text-link"
                      onClick={() => openStudy(project)}
                    >
                      Inside the build <CTAIcon />
                    </button>
                  </div>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="source-link"
                    >
                      View source on GitHub <CTAIcon />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
      <dialog
        ref={dialogRef}
        className="project-dialog"
        aria-labelledby="study-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current?.close();
        }}
      >
        <div className="dialog-heading">
          <div>
            <p className="eyebrow">BUILD NOTES / {selected?.number}</p>
            <h3 id="study-title">{selected?.title}</h3>
          </div>
          <button
            className="dialog-close"
            aria-label="Close project details"
            onClick={() => dialogRef.current?.close()}
          >
            <X />
          </button>
        </div>
        {selected && (
          <div className="dialog-content" data-lenis-prevent>
            <h4>Who it’s for</h4>
            <p>{selected.audience}</p>
            <h4>The product</h4>
            <p>{selected.solution}</p>
            <h4>Technical decisions</h4>
            <p>{selected.architecture}</p>
            <h4>Stack</h4>
            <div className="tags">
              {selected.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <a
              className="button button-small"
              href={selected.liveUrl || selected.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore the product <CTAIcon />
            </a>
          </div>
        )}
      </dialog>
    </section>
  );
}
