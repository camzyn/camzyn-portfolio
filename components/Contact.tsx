export default function Contact() {
  return (
    <footer className="py-8 border-t border-neutral-200 dark:border-neutral-700 px-6 md:flex-shrink-0 transition-colors duration-300" style={{ borderWidth: '1.5px' }}>
      <div className="flex gap-6 justify-end items-center">
        <p className="text-neutral-500 dark:text-neutral-400 font-[family-name:var(--font-family-body)] mr-auto transition-colors duration-300" style={{ fontSize: '13px' }}>
          Built with Figma, Claude Code & Next.js
        </p>
        <a
          href="https://www.linkedin.com/in/camzyn/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors font-[family-name:var(--font-family-body)]"
          style={{ fontSize: '13px' }}
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
