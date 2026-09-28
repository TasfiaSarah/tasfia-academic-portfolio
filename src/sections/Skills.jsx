import { BrainCircuit, Code2, Cpu, Wrench } from 'lucide-react';
import skills from '../data/skills';
import Section from '../components/Section';

const icons = { code: Code2, brain: BrainCircuit, cpu: Cpu, tools: Wrench };

export default function Skills() {
  return <Section id="skills" number="09" eyebrow="TECHNICAL TOOLKIT" title="Skills" subtitle="Skills span programming, AI/ML, image analysis, embedded systems, software tools, and development environments."><div className="grid auto-rows-fr gap-5 md:grid-cols-2 lg:grid-cols-4">{skills.map(skill => { const Icon = icons[skill.icon]; return <article key={skill.title} className="panel flex h-full flex-col"><Icon size={24} strokeWidth={1.6} className="mb-5 text-teal-800 dark:text-teal-200" aria-hidden="true" /><h3 className="text-lg font-semibold">{skill.title}</h3><div className="mt-5 flex flex-wrap gap-2">{skill.items.map(item => <span className="tag" key={item}>{item}</span>)}</div></article>; })}</div></Section>;
}
