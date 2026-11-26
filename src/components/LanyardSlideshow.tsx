"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import Lanyard from "./Lanyard";

const PHOTOS = [
  { url: "/images/MyPhotos/me1.png", focalX: 0.5 },
  { url: "/images/MyPhotos/Me3-optimized.jpg", focalX: 0.5 },
  { url: "/images/MyPhotos/me2.png", focalX: 0.5 },
  { url: "/images/MyPhotos/Mahmud.jpeg", focalX: 0.82 },
];

export default function LanyardSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = true;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    if (containerRef.current) observer.observe(containerRef.current);
    const timer = window.setInterval(() => {
      if (!paused && visible && !document.hidden && !motion.matches) {
        setCurrentSlide((slide) => (slide + 1) % PHOTOS.length);
      }
    }, 4200);
    return () => {
      window.clearInterval(timer);
      observer.disconnect();
    };
  }, [paused, currentSlide]);

  const photo = PHOTOS[currentSlide];
  const changeSlide = (direction: number) => {
    setPaused(true);
    setCurrentSlide((slide) => (slide + direction + PHOTOS.length) % PHOTOS.length);
  };
  const buttonClass = "lanyard-control";

  return (
    <div ref={containerRef} className="relative h-full w-full" role="region" aria-roledescription="carousel" aria-label="Photos of Mahmud">
      {!ready && (
        <div className="absolute left-1/2 top-[13%] h-[72%] w-[72%] max-w-[340px] -translate-x-1/2 overflow-hidden rounded-2xl border border-accent/25 bg-surface">
          <Image src={photo.url} alt="Mahmud Adegboyega" fill sizes="340px" priority className="object-cover" style={{ objectPosition: `${photo.focalX * 100}% 35%` }} />
        </div>
      )}
      <div className="absolute inset-x-0 top-0 bottom-16">
        <Lanyard
          frontImage={photo.url}
          backImage={photo.url}
          focalX={photo.focalX}
          onReady={() => setReady(true)}
          cardColor="#b7c396"
          strapColor="#b7c396"
          metal="graphite"
          finish="glossy"
          size={0.78}
          strapLength={0.05}
          strapWidth={0.7}
          cornerRadius={0.35}
          damping={0.65}
          breeze={0.18}
        />
      </div>
      <div className="absolute bottom-0 inset-x-0 flex flex-col items-center gap-2">
        <p className="lanyard-hint">{ready ? "Drag to swing · Click to flip" : "A few moments, in photos"}</p>
        <div className="lanyard-controls">
          <button type="button" onClick={() => changeSlide(-1)} aria-label="Previous photo" className={buttonClass}><ChevronLeft size={15} /></button>
          <span className="min-w-20 text-center text-[11px] tracking-wider text-text-muted" aria-live={paused ? "polite" : "off"} aria-atomic="true">
            <span className="font-bold text-text">0{currentSlide + 1}</span> / 0{PHOTOS.length}
          </span>
          <button type="button" onClick={() => changeSlide(1)} aria-label="Next photo" className={buttonClass}><ChevronRight size={15} /></button>
          <span className="h-3 w-px bg-black/20" />
          <button type="button" onClick={() => setPaused((value) => !value)} aria-label={paused ? "Play slideshow" : "Pause slideshow"} className={buttonClass}>
            {paused ? <Play size={12} /> : <Pause size={12} />}
          </button>
        </div>
      </div>
    </div>
  );
}
