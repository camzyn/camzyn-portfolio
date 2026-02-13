import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

interface ProjectCardProps {
  title: string;
  role?: string;
  dateRange?: string;
  summary: string;
  imageUrl: string;
  tags?: string[];
  link: string;
  isFirst?: boolean;
  id?: number;
  comingSoon?: boolean;
}

export default function ProjectCard({ title, role, dateRange, summary, imageUrl, tags, link, isFirst, id, comingSoon }: ProjectCardProps) {
  // Determine object position based on project id
  const objectPosition = id === 1 ? 'top' : (id === 2 ? 'center' : 'top');
  const backgroundClass = id === 1 ? 'bg-white dark:bg-white' : 'bg-neutral-50 dark:bg-neutral-800';

  const content = (
    <article className="overflow-hidden w-full flex-shrink-0 bg-neutral-50 dark:bg-neutral-800 transition-colors rounded-2xl px-4 pt-4 pb-8 sm:px-6 sm:pt-6 sm:pb-12">
      <div className="h-[24px] sm:h-[28px] flex items-center justify-between mb-2 sm:mb-3">
        <h3 className="text-xs sm:text-sm font-[family-name:var(--font-family-body)] font-medium transition-opacity text-[rgb(75,75,75)] dark:text-[#e5e5e5]">
          {title}
        </h3>
        <div className="flex items-center gap-1 text-xs sm:text-sm font-[family-name:var(--font-family-body)] transition-opacity text-[rgb(75,75,75)] dark:text-[#e5e5e5]">
          <span>View case study</span>
          <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
        </div>
      </div>
      <div className={`rounded-lg sm:rounded-xl overflow-hidden relative lg:h-[405px] aspect-video lg:aspect-auto ${backgroundClass} transition-colors border-[1.5px] border-neutral-200 dark:border-neutral-700`}>
        <Image
          className="w-full h-full object-cover rounded-md"
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectPosition }}
        />
      </div>
    </article>
  );

  if (comingSoon) {
    return (
      <div className="block group flex-shrink-0 relative">
        <article className="overflow-hidden w-full flex-shrink-0 bg-neutral-50 dark:bg-neutral-800 transition-colors rounded-2xl px-4 pt-4 pb-8 sm:px-6 sm:pt-6 sm:pb-12">
          <div className="h-[24px] sm:h-[28px] flex items-center justify-between mb-2 sm:mb-3">
            <h3 className="text-xs sm:text-sm font-[family-name:var(--font-family-body)] font-medium transition-opacity text-[rgb(75,75,75)] dark:text-[#e5e5e5]">
              {title}
            </h3>
            <div className="flex items-center gap-1 text-xs sm:text-sm font-[family-name:var(--font-family-body)] transition-opacity text-[rgb(75,75,75)] dark:text-[#e5e5e5]">
              <span>Coming soon</span>
              <svg className="w-3 h-3 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 4h10l-5 8 5 8H7l5-8-5-8z" />
              </svg>
            </div>
          </div>
          <div className={`rounded-lg sm:rounded-xl overflow-hidden relative lg:h-[405px] aspect-video lg:aspect-auto ${backgroundClass} transition-colors border-[1.5px] border-neutral-200 dark:border-neutral-700`}>
            <Image
              className="w-full h-full object-cover rounded-md"
              src={imageUrl}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectPosition }}
            />
          </div>
        </article>
      </div>
    );
  }

  return (
    <Link
      href={link}
      className="block group flex-shrink-0 relative"
    >
      {content}
    </Link>
  );
}
