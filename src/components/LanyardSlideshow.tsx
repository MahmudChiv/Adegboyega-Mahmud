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
  const buttonClass = "flex h-8 w-8 items-center justify-center rounded-full text-white/65 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent transition-colors";

  return (
    <div ref={containerRef} className="relative h-full w-full" role="region" aria-roledescription="carousel" aria-label="Photos of Mahmud">
      {!ready && (
        <div className="absolute left-1/2 top-[20%] h-[60%] w-[65%] max-w-[280px] -translate-x-1/2 overflow-hidden rounded-2xl border border-accent/25 bg-surface">
          <Image src={photo.url} alt="Mahmud Adegboyega" fill sizes="280px" priority className="object-cover" style={{ objectPosition: `${photo.focalX * 100}% 35%` }} />
        </div>
      )}
      <div className="absolute inset-x-0 top-0 bottom-16">
        <Lanyard
          frontImage={photo.url}
          backImage={photo.url}
          focalX={photo.focalX}
          onReady={() => setReady(true)}
          cardColor="#15181c"
          strapColor="#8b7bf7"
          metal="graphite"
          finish="glossy"
          size={0.58}
          strapLength={0.25}
          strapWidth={0.7}
          cornerRadius={0.35}
          damping={0.65}
          breeze={0.18}
        />
      </div>
      <div className="absolute bottom-0 inset-x-0 flex flex-col items-center gap-2">
        <p className="text-[10px] tracking-widest uppercase text-white/35">{ready ? "Drag to swing · Click to flip" : "A few moments, in photos"}</p>
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-surface/80 p-1 backdrop-blur-md">
          <button type="button" onClick={() => changeSlide(-1)} aria-label="Previous photo" className={buttonClass}><ChevronLeft size={15} /></button>
          <span className="min-w-20 text-center text-[11px] tracking-wider text-white/45" aria-live={paused ? "polite" : "off"} aria-atomic="true">
            <span className="text-accent">0{currentSlide + 1}</span> / 0{PHOTOS.length}
          </span>
          <button type="button" onClick={() => changeSlide(1)} aria-label="Next photo" className={buttonClass}><ChevronRight size={15} /></button>
          <span className="h-3 w-px bg-white/10" />
          <button type="button" onClick={() => setPaused((value) => !value)} aria-label={paused ? "Play slideshow" : "Pause slideshow"} className={buttonClass}>
            {paused ? <Play size={12} /> : <Pause size={12} />}
          </button>
        </div>
      </div>
    </div>
  );
}
