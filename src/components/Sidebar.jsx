import { useEffect, useRef, useState } from 'react';
import { MapPin, Menu, X } from 'lucide-react';
import profile from '../data/profile';
import ThemeToggle from './ThemeToggle';

const sections = ['Intro', 'About', 'Research', 'Education', 'Experience', 'Publications', 'Projects', 'Awards', 'Teaching', 'Skills', 'Contact'];
const sectionId = label => label === 'Intro' ? 'home' : label.toLowerCase();

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const menuButton = useRef(null);

  useEffect(() => {
    const updateActive = () => {
      const sections = [...document.querySelectorAll('main section[id]')];
      const current = sections.filter(section => section.getBoundingClientRect().top <= 160).at(-1);
      if (current) setActive(current.id);
    };
    const main = document.getElementById('main');
    window.addEventListener('scroll', updateActive, { passive: true });
    main?.addEventListener('scroll', updateActive, { passive: true });
    updateActive();
    return () => {
      window.removeEventListener('scroll', updateActive);
      main?.removeEventListener('scroll', updateActive);
    };
  }, []);

  useEffect(() => {
    const close = event => {
      if (event.key === 'Escape' && open) {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [open]);

  return (
    <aside className="portfolio-sidebar sticky top-0 z-50 border-b border-slate-700 bg-[#f3f1e9] dark:border-white/10 dark:bg-[#0d1417] md:fixed md:inset-y-0 md:left-0 md:flex md:h-screen md:w-64 md:flex-col md:border-b-0 md:border-r">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-teal-200 focus:p-3 focus:text-slate-950">Skip to content</a>
      <div className="sidebar-heading flex min-h-20 items-center justify-between gap-4 px-6 py-3 md:block md:min-h-0 md:px-6 md:py-5">
        <a href="#home" onClick={() => setOpen(false)} className="block">
          <p className="eyebrow text-teal-800 dark:text-teal-200">Academic Portfolio</p>
          <p className="sidebar-name mt-2 text-lg font-semibold tracking-tight md:text-xl">{profile.name}</p>
        </a>
        <p className="sidebar-title mt-2 hidden text-xs leading-5 text-slate-600 dark:text-slate-400 md:block">{profile.title}</p>
        <button ref={menuButton} type="button" onClick={() => setOpen(!open)} aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="sidebar-menu" className="rounded-lg p-3 text-teal-800 dark:text-teal-200 md:hidden">{open ? <X size={22} /> : <Menu size={22} />}</button>
      </div>
      <div id="sidebar-menu" className={`${open ? 'flex' : 'hidden'} min-h-0 flex-col px-6 pb-4 md:flex md:flex-1`}>
        <p className="mb-3 text-xs leading-5 text-slate-600 dark:text-slate-400 md:hidden">{profile.title}</p>
        <nav aria-label="Main navigation" className="sidebar-navigation grid grid-cols-2 gap-x-3 border-t border-slate-700 pt-3 md:flex md:flex-col dark:border-white/10">
          {sections.map((label, index) => {
            const id = sectionId(label);
            return <a key={id} href={`#${id}`} onClick={() => setOpen(false)} aria-current={active === id ? 'location' : undefined} className={`flex items-center gap-3 rounded-md border-l-2 px-3 py-2 text-sm transition-colors hover:bg-teal-800/5 hover:text-teal-800 dark:hover:bg-teal-200/5 dark:hover:text-teal-200 ${active === id ? 'border-teal-700 bg-teal-800/5 font-medium text-teal-900 dark:border-teal-300 dark:bg-teal-200/5 dark:text-teal-200' : 'border-transparent text-slate-600 dark:text-slate-400'}`}><span className="font-mono text-[11px]">{String(index).padStart(2, '0')}</span>{label}</a>;
          })}
        </nav>
        <div className="sidebar-bottom mt-auto pt-4">
          <div className="border-t border-slate-700 pt-3 dark:border-white/10">
            {profile.location && <p className="mb-2 flex items-start gap-2 text-xs leading-5 text-slate-600 dark:text-slate-400"><MapPin size={14} className="mt-1 shrink-0" aria-hidden="true" />{profile.location}</p>}
            <div className="flex items-center justify-between"><span className="eyebrow">Appearance</span><ThemeToggle /></div>
          </div>
        </div>
      </div>
    </aside>
  );
}

