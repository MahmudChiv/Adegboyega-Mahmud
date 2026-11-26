import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <div className="relative min-h-screen text-text">
      {/* Fixed Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main id="main" className="relative flex flex-col">
        {/* Hero with interactive photo lanyard */}
        <Hero />

        {/* Selected Production Projects / Things I Have Shipped */}
        <ProjectsSection />

        {/* Experience and personal background */}
        <ExperienceSection />

        {/* Contact Section & Real-time Colophon */}
        <ContactSection />
      </main>
    </div>
  );
}
