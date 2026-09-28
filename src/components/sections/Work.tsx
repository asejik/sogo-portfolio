import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, X } from 'lucide-react';
import { projects, type Project } from '../../data/projects';

const TechList = ({ items }: { items: string[] }) => (
  <ul className="flex flex-wrap gap-2" aria-label="Built with">
    {items.map((t) => (
      <li key={t} className="text-[13px] text-stone border border-line rounded-full px-3 py-1">
        {t}
      </li>
    ))}
  </ul>
);

const CaseStudy = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const rows: [string, string][] = [
    ['The problem', project.situation],
    ['What I built', project.action],
    ['The result', project.result],
  ];

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end md:items-center justify-center p-0 md:p-6 bg-black/70"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full md:max-w-2xl max-h-[92vh] overflow-y-auto bg-sanctum-800 border border-line rounded-t-3xl md:rounded-3xl"
      >
        <div className="flex items-start justify-between gap-6 p-7 md:p-9 pb-0">
          <div>
            <p className="text-stone">{project.kind}</p>
            <h3 id="case-title" className="font-display text-ivory text-3xl md:text-4xl font-medium mt-1">
              {project.title}
            </h3>
          </div>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close case study"
            className="p-2 -mr-2 rounded-full text-stone hover:text-ivory hover:bg-sanctum-700"
          >
            <X size={22} />
          </button>
        </div>

        {project.image && (
          <img src={project.image} alt={`${project.title} screenshot`} className="mt-7 w-full aspect-[16/10] object-cover" />
        )}

        <dl className="p-7 md:p-9 space-y-7">
          {rows.map(([label, text]) => (
            <div key={label}>
              <dt className="text-gold-500 font-semibold mb-2">{label}</dt>
              <dd className="text-sanctum-300 text-[17px] leading-relaxed">{text}</dd>
            </div>
          ))}
          <div className="pt-2">
            <TechList items={project.techStack} />
          </div>
        </dl>

        {(project.liveLink || project.githubLink) && (
          <div className="flex flex-wrap gap-3 px-7 md:px-9 pb-9">
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gold-500 hover:bg-gold-400 text-ink font-semibold rounded-full"
              >
                Open the app <ExternalLink size={16} />
              </a>
            )}
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-line hover:border-stone text-ivory font-semibold rounded-full"
              >
                <Github size={16} /> View the code
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// How many "More projects" rows show before the "Show more" button
const MORE_VISIBLE = 4;

const Work = () => {
  const [active, setActive] = useState<Project | null>(null);
  const [showAll, setShowAll] = useState(false);
  const featured = projects.filter((p) => p.featured);
  const more = projects.filter((p) => !p.featured);
  const hiddenCount = more.length - MORE_VISIBLE;
  const visibleMore = showAll ? more : more.slice(0, MORE_VISIBLE);

  return (
    <section id="work" className="py-24 md:py-32 border-t border-line">
      <div className="max-w-6xl mx-auto px-6">
        <div className="md:flex md:items-end md:justify-between gap-10 mb-14">
          <h2 className="font-display text-ivory text-4xl md:text-6xl font-medium tracking-[-0.02em]">Selected work</h2>
          <p className="mt-4 md:mt-0 text-lg text-stone max-w-md">
            Apps that organisations and people use every day. Open any project to see the problem, what I built and how
            it turned out.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {featured.map((p) => (
            <button
              key={p.id}
              onClick={() => setActive(p)}
              className="group text-left bg-sanctum-800 hover:bg-sanctum-700 border border-line rounded-3xl overflow-hidden transition-colors"
            >
              {p.image && (
                <img src={p.image} alt="" className="w-full aspect-[16/10] object-cover border-b border-line" />
              )}
              <div className="p-7 md:p-8 flex flex-col h-full">
                <p className="text-stone">{p.kind}</p>
                <h3 className="font-display text-ivory text-3xl font-medium mt-1">{p.title}</h3>
                <p className="mt-4 text-[17px] leading-relaxed text-sanctum-300 max-w-md">{p.summary}</p>
                <div className="mt-6">
                  <TechList items={p.techStack} />
                </div>
                <span className="mt-7 text-gold-500 font-semibold underline-offset-4 group-hover:underline">
                  Read the case study
                </span>
              </div>
            </button>
          ))}
        </div>

        <h3 className="mt-20 mb-2 text-ivory text-xl font-semibold">More projects</h3>
        <ul id="more-projects" className="border-t border-line">
          {visibleMore.map((p) => (
            <li key={p.id} className="border-b border-line">
              <button
                onClick={() => setActive(p)}
                className="group w-full text-left py-6 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-baseline"
              >
                <span className="md:col-span-4 font-display text-ivory text-2xl font-medium group-hover:text-gold-400 transition-colors">
                  {p.title}
                </span>
                <span className="hidden md:block md:col-span-6 text-sanctum-300 leading-relaxed">{p.summary}</span>
                <span className="md:col-span-2 md:text-right text-stone text-sm">{p.kind}</span>
              </button>
            </li>
          ))}
        </ul>
        {hiddenCount > 0 && (
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            aria-expanded={showAll}
            aria-controls="more-projects"
            className="mt-8 px-6 py-3 border border-line hover:border-stone text-ivory font-semibold rounded-full transition-colors"
          >
            {showAll ? 'Show fewer' : `Show ${hiddenCount} more ${hiddenCount === 1 ? 'project' : 'projects'}`}
          </button>
        )}
      </div>

      {active && <CaseStudy project={active} onClose={() => setActive(null)} />}
    </section>
  );
};

export default Work;
