import { BriefcaseBusiness, ExternalLink, GraduationCap, Users } from 'lucide-react';
import experience from '../data/experience';
import Section from '../components/Section';

const roleIcons = { Lecturer: GraduationCap, 'Industrial Trainee': BriefcaseBusiness, 'Management Lead': Users };

export default function Experience() {
  return <Section id="experience" number="04" eyebrow="ACADEMIC, INDUSTRY, AND LEADERSHIP EXPERIENCE" title="Professional Experience" eyebrowAfterTitle subtitle="A journey across university teaching, industry exposure, and technology-focused leadership.">
    <ol className="space-y-5">
      {experience.map(item => {
        const Icon = roleIcons[item.role];
        return <li key={item.role}>
        <article className="rounded-xl border border-slate-300 bg-[#fffdf8]/80 p-5 shadow-sm transition-colors hover:border-teal-700/60 dark:border-white/15 dark:bg-[#151e21]/75 dark:hover:border-teal-300/40 sm:p-7">
          <div className="grid items-start gap-2 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-x-6">
            <h3 className="flex min-w-0 items-center gap-3 text-xl font-semibold leading-7 text-slate-900 dark:text-slate-100 sm:text-2xl"><Icon size={22} strokeWidth={1.5} className="shrink-0 text-teal-800 dark:text-teal-200" aria-hidden="true" />{item.role}</h3>
            <p className="whitespace-nowrap font-mono text-sm font-medium text-amber-800 dark:text-amber-200 sm:justify-self-end sm:text-right">{item.period}</p>
          </div>
          <p className="mt-2 whitespace-pre-line text-base font-medium leading-7 text-slate-700 dark:text-slate-300">{item.organization}</p>
          <p className="mt-3 w-full whitespace-normal text-sm leading-7 text-slate-600 dark:text-slate-400">{item.description}</p>
          {(item.link || item.certificate) && <div className="mt-4 flex flex-wrap gap-3">
            {[item.link, item.certificate].filter(Boolean).map(link => <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-slate-400 px-4 py-2.5 text-sm font-medium text-teal-800 transition-colors hover:border-teal-800 hover:bg-teal-800 hover:text-white dark:border-white/20 dark:text-teal-200 dark:hover:border-teal-200 dark:hover:bg-teal-200 dark:hover:text-slate-950"><span>{link.label}</span><ExternalLink size={18} aria-hidden="true" /></a>)}
          </div>}
        </article>
      </li>;
      })}
    </ol>
  </Section>;
}
