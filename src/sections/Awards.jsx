import { Award, ExternalLink, Medal, Trophy } from 'lucide-react';
import awards from '../data/awards';
import Section from '../components/Section';
export default function Awards() {
  return (
    <Section id="awards" number="07" eyebrow="RECOGNITION" title="Honors and Awards"
      subtitle="A selected record of academic distinction, research recognition, and competition achievements.">
      <div className="grid items-stretch gap-5 sm:grid-cols-4 xl:grid-cols-12">
        {awards.map((award, index) => {
          const Icon = [Award, Award, Medal, Trophy, Medal][index];
          return (
            <article key={award.title}
              className={`flex min-w-0 flex-col rounded-xl border border-slate-300 bg-[#fffdf8]/80 p-5 shadow-sm transition-colors hover:border-teal-700/60 dark:border-white/15 dark:bg-[#151e21]/75 dark:hover:border-teal-300/40 ${award.compact ? 'sm:col-span-4 xl:col-span-6' : 'sm:col-span-2 xl:col-span-4'}`}>
              {award.compact ? (
                <div className="flex items-start gap-3">
                  <Icon size={23} strokeWidth={1.5} className="mt-1 shrink-0 text-teal-800 dark:text-teal-200" aria-hidden="true" />
                  <div className="flex min-w-0 flex-1 items-baseline gap-3">
                    <h3 className="min-w-0 text-lg font-semibold leading-7 text-slate-900 dark:text-slate-100">{award.title}</h3>
                    <p className="shrink-0 font-mono text-xs font-semibold text-amber-800 dark:text-amber-200">{award.period}</p>
                  </div>
                </div>
              ) : <>
              <div className="mb-5 flex items-center justify-between gap-3">
                <span className="rounded-lg bg-teal-800/5 p-2.5 text-teal-800 dark:bg-teal-200/5 dark:text-teal-200">
                  <Icon size={23} strokeWidth={1.5} aria-hidden="true" />
                </span>
                <p className="whitespace-nowrap font-mono text-xs font-semibold text-amber-800 dark:text-amber-200">{award.period}</p>
              </div>
              <h3 className="text-lg font-semibold leading-7 text-slate-900 dark:text-slate-100">{award.title}</h3>
              <p className="mt-3 text-sm font-medium leading-6 text-teal-800 dark:text-teal-100/80">{award.organization}</p>
              </>}
              <p className={`${award.compact ? 'mt-3 sm:pl-9' : 'mt-4'} text-sm leading-7 text-slate-600 dark:text-slate-400`}>{award.description}</p>
              {award.certificate && (
                <div className={`mt-auto ${award.compact ? 'pt-4 sm:pl-9' : 'pt-6'}`}>
                  <a href={award.certificate} target="_blank" rel="noopener noreferrer"
                    aria-label={`Certificate: ${award.title} (opens in a new tab)`}
                    className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-slate-400 px-4 py-2.5 text-sm font-medium text-teal-800 transition-colors hover:border-teal-800 hover:bg-teal-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 dark:border-white/20 dark:text-teal-200 dark:hover:border-teal-200 dark:hover:bg-teal-200 dark:hover:text-slate-950 dark:focus-visible:ring-offset-slate-950">
                    <span>Certificate</span>
                    <ExternalLink size={18} className="shrink-0" aria-hidden="true" />
                  </a>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </Section>
  );
}

