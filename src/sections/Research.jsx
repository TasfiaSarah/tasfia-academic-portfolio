import { ArrowDown, BrainCircuit, Eye, HeartHandshake, ScanHeart, Users, Wifi } from 'lucide-react';
import research from '../data/research';
import Section from '../components/Section';

const icons = { interaction: Users, intelligence: BrainCircuit, medical: ScanHeart, vision: Eye, connected: Wifi, humanCentered: HeartHandshake };

export default function Research() {
  return (
    <Section
      id="research"
      number="02"
      title="Research Interests"
      eyebrow="PROSPECTIVE PHD DIRECTION"
      eyebrowAfterTitle
      subtitle="These interests bring together human-centered computing, machine learning, image-based analysis, and intelligent systems into an applied research direction focused on meaningful real-world problems."
    >
      <div className="grid auto-rows-fr gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {research.map(area => {
          const Icon = icons[area.icon];
          return (
            <article key={area.title} className="panel">
              <Icon size={24} strokeWidth={1.5} className="mb-5 text-teal-800 dark:text-teal-200" aria-hidden="true" />
              <h3 className="text-xl font-semibold">{area.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">{area.description}</p>
            </article>
          );
        })}
      </div>
      <a href="#publications" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-teal-800 underline-offset-4 hover:underline dark:text-teal-200">Explore scholarly publications<ArrowDown size={16} aria-hidden="true" /></a>
    </Section>
  );
}
