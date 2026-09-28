import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import publications from '../data/publications';
import SectionHeader from '../components/SectionHeader';

const categories = ['All', 'Journal', 'Conference', 'Accepted', 'Ongoing'];

function getDoi(url) {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    return ['doi.org', 'dx.doi.org'].includes(parsed.hostname) ? decodeURIComponent(parsed.pathname.slice(1)) : null;
  } catch {
    return null;
  }
}

export default function Publications() {
  const [category, setCategory] = useState('All');
  const visible = category === 'All' ? publications : publications.filter(paper => category === 'Journal' ? paper.type === 'Journal' || paper.type === 'Ongoing' : paper.type === category);

  return (
    <section id="publications" aria-labelledby="publications-title" className="section-shell">
      <SectionHeader
        id="publications-title"
        number="05"
        title="Publications"
        subtitle="Research Output"
        intro="Research spanning human–computer interaction, accessibility, machine learning, computer vision, and medical image analysis."
      />

      <div role="group" aria-label="Filter publications by type" className="mb-7 flex flex-wrap gap-2">
        {categories.map(type => <button key={type} type="button" aria-pressed={category === type} aria-controls="publication-results" onClick={() => setCategory(type)} className={`rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors ${category === type ? 'border-teal-800 bg-teal-800 text-white dark:border-teal-200 dark:bg-teal-200 dark:text-slate-950' : 'border-slate-400 bg-white/60 text-slate-700 hover:border-teal-800 hover:bg-teal-100 hover:text-teal-950 dark:border-white/20 dark:bg-[#10181b]/80 dark:text-slate-300 dark:hover:border-teal-200/60 dark:hover:bg-teal-200/10 dark:hover:text-teal-100'}`}>{type}</button>)}
      </div>
      <p role="status" className="sr-only">Showing {visible.length} {category === 'All' ? '' : category.toLowerCase()} publications.</p>

      <div id="publication-results" className="space-y-4">
        {visible.map(publication => {
          const doi = getDoi(publication.url);
          return (
            <article key={publication.label} className="rounded-lg border border-slate-400/80 bg-[#fffdf8]/85 p-5 transition-colors duration-200 hover:border-teal-800 hover:bg-teal-50 focus-within:border-teal-800 focus-within:bg-teal-50 dark:border-white/20 dark:bg-[#10181b]/85 dark:hover:border-teal-200/60 dark:hover:bg-[#172d30] dark:focus-within:border-teal-200/60 dark:focus-within:bg-[#172d30] sm:p-7">
              <div className="mb-4 flex flex-wrap gap-2">
                    <span className="rounded-full border border-teal-700/50 bg-teal-50 px-3 py-1 text-xs font-medium text-teal-900 dark:border-teal-200/30 dark:bg-teal-200/5 dark:text-teal-200">{publication.type}</span>
                    {publication.topics?.map(topic => <span key={topic} className="rounded-full border border-slate-400/70 px-3 py-1 text-xs font-medium text-slate-700 dark:border-white/20 dark:text-slate-300">{topic}</span>)}
                  </div>
              <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 sm:gap-7">
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold leading-7 text-slate-900 dark:text-slate-100 sm:text-xl sm:leading-8">
                    <span className="mr-2 font-mono text-xs font-semibold text-amber-800 dark:text-amber-200">[{publication.label}]</span>
                    {publication.url ? <a href={publication.url} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:text-teal-800 hover:underline dark:hover:text-teal-200">{publication.title}</a> : publication.title}
                  </h3>
                  {publication.venue && <p className="mt-4 text-base leading-7 text-slate-700 dark:text-slate-300">{publication.venue}</p>}
                  {publication.authors && <p className="mt-2 text-sm font-medium leading-6 text-slate-600 dark:text-slate-400">{publication.authors}</p>}
                  {doi && <p className="mt-2 break-words text-sm leading-6 text-slate-600 dark:text-slate-400">DOI: {doi}</p>}
                  {publication.details && <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{publication.details}</p>}
                </div>
                <div className="flex flex-col items-end gap-4 self-start">
                  {publication.year && <p className="font-mono text-sm font-semibold text-amber-800 dark:text-amber-200">{publication.year}</p>}
                  {publication.url && <a href={publication.url} target="_blank" rel="noopener noreferrer" aria-label={`Open publication: ${publication.title}`} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-slate-400 px-4 py-2.5 text-base font-medium text-slate-800 transition-colors hover:border-teal-800 hover:bg-teal-800 hover:text-white dark:border-white/20 dark:text-slate-200 dark:hover:border-teal-200 dark:hover:bg-teal-200 dark:hover:text-slate-950"><ExternalLink size={18} aria-hidden="true" />Link</a>}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
