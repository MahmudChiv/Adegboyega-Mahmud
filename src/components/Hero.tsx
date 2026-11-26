"use client";
import dynamic from "next/dynamic";
import CTAIcon from "./CTAIcon";
import BrandMark from "./BrandMark";
import ScrollIcon from "./ScrollIcon";
const LanyardSlideshow = dynamic(() => import("./LanyardSlideshow"), {
  ssr: false,
  loading: () => (
    <div className="lanyard-loading" aria-label="Loading photo lanyard">
      <BrandMark />
    </div>
  ),
});
export default function Hero() {
  return (
    <section id="hero" className="hero-section shell">
      <div className="hero-copy">
        <div className="eyebrow">
          <span className="status-dot" /> AVAILABLE FOR ROLES & PROJECTS
        </div>
        <p className="hero-intro">Hi, I’m Mahmud Adegboyega.</p>
        <h1>
          Useful software.
          <br />
          Built for <span className="headline-mark">real life.</span>
        </h1>
        <p className="hero-description">
          I’m a software engineer building production-ready software for
          startups, Africa’s businesses and informal economy. I turn real problems into
          working software.
        </p>
        <div className="hero-actions">
          <a className="button" href="#projects">
            Explore my work <CTAIcon />
          </a>
          <a
            className="button button-paper"
            href="mailto:mahmud.adegboyega@gmail.com"
          >
            Let’s talk <CTAIcon />
          </a>
        </div>
        <div className="hero-footnote">
          <span>LAGOS, NIGERIA</span>
          <span>IDEA → CODE → SHIPPED</span>
        </div>
      </div>
      <div className="hero-object">
        <span className="object-caption">
           THE PERSON BEHIND THE CODE
        </span>
        <div id="hero-3d-slot" data-slot="hero" className="lanyard-stage">
          <LanyardSlideshow />
        </div>
        <div className="identity-stamp">
          <strong>MA / 001</strong>
          <span>
            SOFTWARE ENGINEER
            <br />
            BUILDING WITH INTENT.
          </span>
        </div>
      </div>
      <div className="hero-bottom">
        <span>BUILT WITH CURIOSITY. SHIPPED WITH CARE.</span>
        <a href="#projects">
          SCROLL TO THE WORK <ScrollIcon direction="down" />
        </a>
      </div>
    </section>
  );
}
