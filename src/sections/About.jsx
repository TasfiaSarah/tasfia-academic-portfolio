import { GraduationCap, Medal } from 'lucide-react';
import about from '../data/about';
import Section from '../components/Section';

const metricCardClass = 'panel transition-[transform,background-color,border-color,box-shadow] duration-200 hover:border-teal-700 hover:bg-teal-50 hover:shadow-lg hover:shadow-teal-900/10 motion-safe:hover:-translate-y-0.5 dark:hover:border-teal-300/70 dark:hover:bg-[#172d30]';

export default function About() {
  return (
    <Section id="about" number="01" eyebrow="Academic Biography" title="About" subtitle={about.intro}>
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <dl className="grid gap-4">
          <div className={metricCardClass}>
            <dt className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-300">
              <GraduationCap size={20} className="text-teal-800 dark:text-teal-200" aria-hidden="true" />
              B.Sc. CGPA
            </dt>
            <dd className="mt-4 text-3xl font-semibold tracking-tight text-teal-900 dark:text-teal-100">
              3.83 <span className="text-xl font-medium text-slate-600 dark:text-slate-400">/ 4.00</span>
            </dd>
          </div>
          <div className={metricCardClass}>
            <dt className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-300">
              <Medal size={20} className="text-teal-800 dark:text-teal-200" aria-hidden="true" />
              Class Rank
            </dt>
            <dd className="mt-4 text-3xl font-semibold tracking-tight text-teal-900 dark:text-teal-100">
              4th <span className="text-xl font-medium text-slate-600 dark:text-slate-400">out of 88</span>
            </dd>
          </div>
        </dl>
        <article className="panel" aria-labelledby="about-biography-title">
          <h3 id="about-biography-title" className="mb-5 text-xl font-medium text-slate-900 dark:text-slate-100">Research and teaching</h3>
          <div className="space-y-5 text-base leading-8 text-slate-700 dark:text-slate-300">
            {about.biography.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </article>
      </div>
    </Section>
  );
}


