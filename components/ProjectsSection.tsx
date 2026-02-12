import ProjectCard from "./ProjectCard";

export default function ProjectsSection() {
  const projects = [
    {
      title: "Viewrail",
      imageSrc: "/images/viewrail.jpg",
      badge: "Coming soon",
    },
    {
      title: "CAMZYN Studio",
      imageSrc: "/images/camzyn-studio.jpg",
      badge: "Coming soon",
    },
    {
      title: "Landings",
      imageSrc: "/images/landings.jpg",
      badge: "Coming soon",
    },
  ];

  return (
    <section className="max-w-3xl mx-auto px-6 mb-16">
      <h2 className="text-xs font-extralight font-mono text-[#737373] tracking-wider uppercase mb-8">
        Select work
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard
            key={project.title}
            title={project.title}
            imageSrc={project.imageSrc}
            badge={project.badge}
          />
        ))}
      </div>
    </section>
  );
}
