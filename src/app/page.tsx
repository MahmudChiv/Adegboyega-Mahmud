import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-bg text-text">
      {/* Fixed Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative flex flex-col">
        {/* Hero Section with 3D Photo Slideshow Monolith */}
        <Hero />

        {/* Selected Production Projects / Things I Have Shipped */}
        <ProjectsSection />

        {/* Commercial Experience, Education & Algorithmic Rigor */}
        <ExperienceSection />

        {/* Contact Section & Real-time Colophon */}
        <ContactSection />
      </main>
    </div>
  );
}
