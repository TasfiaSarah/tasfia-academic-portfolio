import { MapPin } from 'lucide-react';
import education from '../data/education';
import Section from '../components/Section';

const pillClass = 'inline-flex max-w-full rounded-full border border-teal-700/60 bg-teal-50 px-3 py-1.5 text-sm font-medium leading-5 text-teal-900 dark:border-teal-300/40 dark:bg-teal-300/10 dark:text-teal-100';

export default function Education() {
  return (
    <Section id="education" number="03" eyebrow="Academic Foundation" title="Education" eyebrowAfterTitle>
      <ol>
        {education.map((item, index) => (
          <li key={item.degree} className={`relative pl-7 sm:pl-9 ${index < education.length - 1 ? 'pb-9' : ''}`}>
            {/* Each segment ends at the next heading's first-line center. */}
            {index < education.length - 1 && <span aria-hidden="true" className="absolute bottom-[-14px] left-[5px] top-[14px] w-px bg-amber-800/50 dark:bg-amber-200/35 sm:bottom-[-16px] sm:top-4" />}
            <span aria-hidden="true" className="absolute left-0 top-[9px] z-10 h-[11px] w-[11px] rounded-full border-2 border-[#faf8f2] bg-amber-800 shadow-sm ring-1 ring-amber-800 dark:border-[#101719] dark:bg-amber-200 dark:shadow-[0_0_8px_rgba(253,230,138,0.3)] dark:ring-amber-200/60 sm:top-[11px]" />
            <article>
              <div className="flex flex-col gap-2 lg:flex-row lg:items-baseline lg:justify-between lg:gap-6">
                <h3 className={`text-xl leading-7 sm:text-2xl sm:leading-8 ${index === 0 ? 'font-semibold text-teal-900 dark:text-teal-100' : 'font-medium text-slate-900 dark:text-slate-100'}`}>{item.institution}</h3>
                <p className="shrink-0 text-sm font-medium text-amber-800 dark:text-amber-200">{item.period}</p>
              </div>
              <p className="mt-2 text-base text-slate-700 dark:text-slate-300">{item.degree}</p>
              <p className="mt-2 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400"><MapPin size={14} aria-hidden="true" />{item.location}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.cgpa && <span className={pillClass}>CGPA {item.cgpa}</span>}
                {item.rank && <span className={pillClass}>Class Rank: {item.rank}</span>}
                {item.gpa && <span className={pillClass}>GPA {item.gpa}</span>}
                {item.achievement && <span className={pillClass}>{item.achievement}</span>}
                {item.thesis && <span className={pillClass}>Thesis: {item.thesis}</span>}
              </div>
            </article>
          </li>
        ))}
      </ol>
    </Section>
  );
}
