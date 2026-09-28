import { ArrowDown, BookOpen, Download, FolderKanban, Mail, MapPin } from 'lucide-react';
import profile from '../data/profile';

export default function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative overflow-hidden border-b border-slate-700 dark:border-white/10">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(15,118,110,0.05),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top_right,rgba(94,234,212,0.04),transparent_70%)]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 sm:px-10 xl:min-h-[780px] xl:grid-cols-[1.4fr_0.85fr] xl:gap-12 xl:px-14 xl:py-24">
        <div>
          <p className="eyebrow mb-8 flex items-center gap-4"><span className="font-mono text-teal-800 dark:text-teal-300">00</span> Intro / Academic Portfolio</p>
          <h1 id="hero-title" className="max-w-2xl text-5xl font-bold leading-[1.04] tracking-tight text-slate-900 dark:text-[#f0eee6] sm:text-6xl 2xl:text-7xl">{profile.name}</h1>
          <p className="mt-6 text-lg leading-8 text-teal-800 dark:text-teal-200">{profile.title}</p>
          {profile.location && <p className="mt-4 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400"><MapPin size={15} aria-hidden="true" />{profile.location}</p>}
          <p className="mt-7 max-w-xl text-base leading-8 text-slate-600 dark:text-slate-400">{profile.bio}</p>
          <div className="mt-6 flex flex-wrap gap-2" aria-label="Research interests">{profile.researchInterests.map(interest => <span key={interest} className="hero-interest-tag">{interest}</span>)}</div>
          <div className="mt-8 flex flex-wrap gap-3">
            {profile.cvUrl && <a href={profile.cvUrl} download className="button-primary"><Download size={16} aria-hidden="true" />Download CV</a>}
            <a href="#publications" className="button-secondary">View Publications<BookOpen size={16} aria-hidden="true" /></a>
            <a href="#projects" className="button-secondary">View Projects<FolderKanban size={16} aria-hidden="true" /></a>
            <a href="#contact" className="button-secondary">Contact<Mail size={16} aria-hidden="true" /></a>
          </div>
        </div>
        <div className="mx-auto w-full max-w-[365px] xl:ml-auto">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] bg-stone-200 dark:bg-slate-800"><img src={profile.image} alt={profile.name} fetchPriority="high" className="h-full w-full scale-[1.35] object-cover object-[50%_38%]" /></div>
          <div className="mt-7 flex items-center justify-between border-t border-slate-700 pt-4 dark:border-white/10"><span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-600 dark:text-slate-400">Research · Teaching · Technology</span><span className="h-1.5 w-1.5 rounded-full bg-teal-700 dark:bg-teal-300" /></div>
        </div>
        <a href="#research" className="flex w-fit items-center gap-3 text-xs text-slate-600 transition-colors hover:text-teal-900 dark:text-slate-400 dark:hover:text-teal-200 xl:col-span-2"><ArrowDown size={16} aria-hidden="true" />Explore my research</a>
      </div>
    </section>
  );
}
