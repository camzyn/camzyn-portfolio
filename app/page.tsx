import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#1e1e1e] transition-colors duration-300">
      <Navigation sticky={true} />
      <div className="pt-32 pb-12">
        <Hero />
      </div>
      <Projects />
      <Contact />
    </div>
  );
}
