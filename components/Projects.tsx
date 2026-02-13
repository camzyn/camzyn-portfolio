import ProjectCard from "./ProjectCard";

const projects = [
  {
    id: 1,
    title: "Viewrail",
    role: "Lead UX Designer",
    dateRange: "June – July 2025",
    summary: "Redesigning a legacy quoting experience used by tens of thousands of customers",
    imageUrl: "/images/viewrail.jpg",
    tags: ["User Experience", "Design Systems", "AI-accelerated"],
    link: "/projects/viewrail-digital-quote",
    comingSoon: true
  },
  {
    id: 3,
    title: "CAMZYN Studio",
    role: "Lead Product Designer",
    dateRange: "2020 - Present",
    summary: "Leads end-to-end web development projects delivering accessible, responsive, scalable digital experiences that boost engagement and growth for clients.",
    imageUrl: "/images/camzyn-studio.jpg",
    tags: ["Service Design", "Web Development"],
    link: "/projects/camzyn-studio",
    comingSoon: true
  },
  {
    id: 2,
    title: "Landings",
    role: "Product Designer",
    dateRange: "2023 - 2024",
    summary: "Designed and shipped a suite of conversion-optimized landing page templates, increasing user activation and reducing time-to-market for marketing campaigns.",
    imageUrl: "/images/landings.jpg",
    tags: ["Product Design", "Marketing", "Conversion Optimization"],
    link: "/projects/landings",
    comingSoon: true
  }
];

export default function Projects() {
  return (
    <section id="projects" className="mb-16 md:mb-24">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-neutral-500 dark:text-neutral-400 text-xs uppercase tracking-wider mb-8 font-[family-name:var(--font-family-mono)] transition-colors duration-300">Select work</h2>
        <div className="space-y-8">
          {projects.map((project) => (
            <div key={project.id}>
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
