import Image from "next/image";

interface ProjectCardProps {
  title: string;
  imageSrc: string;
  badge?: string;
  objectPosition?: string;
}

export default function ProjectCard({ title, imageSrc, badge, objectPosition = "center" }: ProjectCardProps) {
  return (
    <article className="bg-[#fafafa] rounded-2xl pt-6 px-6 pb-6 flex flex-col gap-3 w-full">
      <div className="flex items-center justify-between h-7">
        <h3 className="text-sm font-medium text-[#4b4b4b]">{title}</h3>
        {badge && (
          <div className="flex items-center gap-1 text-sm text-[#4b4b4b]">
            <span>{badge}</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#4b4b4b]"
            >
              <path
                d="M8 12L12 8L8 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>
      <div className="border border-[#e5e5e5] rounded-[14px] overflow-hidden bg-white p-px">
        <div className="relative w-full h-[400px] rounded-[8px] overflow-hidden">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover"
            style={{ objectPosition }}
            sizes="100vw"
          />
        </div>
      </div>
    </article>
  );
}
