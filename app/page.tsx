import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import ProjectsSection from "../components/ProjectsSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0a0a0a]">
      <Navigation />
      <Hero />
      <ProjectsSection />
      <Footer />
    </main>
  );
}