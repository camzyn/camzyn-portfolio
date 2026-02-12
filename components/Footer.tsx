export default function Footer() {
  return (
    <footer className="border-t border-[#e5e5e5] mt-16">
      <div className="max-w-5xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between text-sm text-[#737373]">
          <p className="font-light">Built with Figma, Claude Code & Next.js</p>
          <a
            href="https://www.linkedin.com/in/camzyn/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#4b4b4b] transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
