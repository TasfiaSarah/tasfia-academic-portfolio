import { useState } from 'react';
import { ExternalLink, ImageIcon, Play } from 'lucide-react';
import projects from '../data/projects';
import Section from '../components/Section';

function Github({ size = 18, ...props }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-4.3 1.3-4.3-2.5-6-3m12 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 19 4.77 5.07 5.07 0 0 0 18.91 1S17.73.65 15 2.48a13.38 13.38 0 0 0-7 0C5.27.65 4.09 1 4.09 1A5.07 5.07 0 0 0 4 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 8 18.13V22" />
  </svg>;
}

function ProjectImage({ project }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="aspect-video overflow-hidden border-b border-slate-300/70 bg-gradient-to-br from-teal-50 to-slate-100 dark:border-white/10 dark:from-teal-950/40 dark:to-slate-900/60">
      {project.image && !failed ? (
        <img src={project.image} alt={`${project.title} project preview`}
          className="h-full w-full object-cover object-center"
          loading="lazy" decoding="async" onError={() => setFailed(true)} />
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-3 text-teal-800/65 dark:text-teal-200/60">
          <ImageIcon size={32} strokeWidth={1.25} aria-hidden="true" />
          <span className="text-xs tracking-wide">Project preview coming soon</span>
        </div>
      )}
    </div>
  );
}

export default function Projects() {
  const groups = [
    { id: 'demos', items: projects.filter(project => project.actionUrl && project.actionType !== 'code' && !project.tags.includes('Rover Project')), columns: 'sm:grid-cols-2 xl:grid-cols-3' },
    { id: 'rovers', items: projects.filter(project => project.tags.includes('Rover Project')), columns: 'sm:grid-cols-2' },
    { id: 'code', items: projects.filter(project => project.actionType === 'code'), columns: 'sm:grid-cols-2' },
    { id: 'additional', items: projects.filter(project => !project.actionUrl), columns: 'sm:grid-cols-2 xl:grid-cols-3' },
  ];
  return (
    <Section id="projects" number="06" eyebrow="RESEARCH-BACKED SYSTEMS" title="Notable Projects"
      subtitle="Selected projects spanning intelligent systems, human-centered technology, image analysis, IoT, and interactive computing.">
      <div className="space-y-6">
      {groups.map(group => <div key={group.id} className={`grid gap-6 ${group.columns}`}>
        {group.items.map(project => {
          const actions = [
            ...(project.actionUrl ? [{ label: project.actionLabel, url: project.actionUrl, type: project.actionType }] : []),
          ];
          return (
            <article key={project.title} className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-slate-300 bg-[#fffdf8]/80 shadow-sm transition-colors hover:border-teal-700/60 dark:border-white/15 dark:bg-[#151e21]/75 dark:hover:border-teal-300/40">
              {(project.image || project.actionUrl) && <ProjectImage key={project.image} project={project} />}
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="min-w-0 text-xl font-semibold leading-7 text-slate-900 dark:text-slate-100">{project.title}</h3>
                  <span className="shrink-0 pt-1 font-mono text-xs font-semibold leading-5 text-amber-800 dark:text-amber-200">{project.period}</span>
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">{project.description}</p>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${project.title} technologies`}>
                  {project.tags.map(tag => <li key={tag} className="tag">{tag}</li>)}
                </ul>
                {actions.length > 0 && (
                  <div className="mt-auto flex flex-wrap gap-3 pt-6">
                    {actions.map(action => {
                      const ActionIcon = action.type === 'video' ? Play : action.type === 'code' ? Github : ExternalLink;
                      return <a key={action.url} href={action.url} target="_blank" rel="noopener noreferrer"
                      aria-label={`${action.label}: ${project.title} (opens in a new tab)`}
                      className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-slate-400 px-4 py-2.5 text-sm font-medium text-teal-800 transition-colors hover:border-teal-800 hover:bg-teal-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 dark:border-white/20 dark:text-teal-200 dark:hover:border-teal-200 dark:hover:bg-teal-200 dark:hover:text-slate-950 dark:focus-visible:ring-offset-slate-950">
                      <ActionIcon size={18} aria-hidden="true" />
                      {action.label}
                    </a>;
                    })}
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>)}
      </div>
    </Section>
  );
}


