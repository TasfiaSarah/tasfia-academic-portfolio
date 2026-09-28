import { ArrowUpRight, BriefcaseBusiness, GraduationCap, Mail, MapPin, Phone } from 'lucide-react';
import profile from '../data/profile';
import Section from '../components/Section';

export default function Contact() {
  const items = [
    ['Academic Email', profile.emails?.academic, `mailto:${profile.emails?.academic}`, Mail],
    ['Personal Email', profile.emails?.personal, `mailto:${profile.emails?.personal}`, Mail],
    ['Phone', profile.phone, `tel:${profile.phone?.replace(/[^+\d]/g, '')}`, Phone],
    ['LinkedIn', profile.links?.linkedin, profile.links?.linkedin, BriefcaseBusiness],
    ['Google Scholar', profile.links?.googleScholar, profile.links?.googleScholar, GraduationCap],
    ['Location', profile.location, null, MapPin],
  ].filter(([, value]) => value);
  const openEmail = event => {
    event.preventDefault();
    window.location.href = 'mailto:tasfiaakter@cse.mist.ac.bd';
  };

  return <><Section id="contact" number="10" eyebrow="RESEARCH & ACADEMIC CONNECTIONS" title="Contact" subtitle="Open to PhD opportunities, research collaborations, and academic conversations in Human–Computer Interaction, machine learning, computer vision, medical image analysis, and intelligent systems."><div className="panel max-w-3xl"><p className="mb-7 font-serif text-3xl text-slate-900 dark:text-[#f0eee6]">Let’s connect.</p><div className="grid gap-5 sm:grid-cols-2">{items.map(([label, value, href, Icon]) => <div key={label}><p className="eyebrow mb-2 flex items-center gap-2"><Icon size={17} className="text-teal-800 dark:text-teal-200" aria-hidden="true" />{label}</p>{href ? <a href={href} target={label === 'LinkedIn' || label === 'Google Scholar' ? '_blank' : undefined} rel="noopener noreferrer" className="text-sm text-teal-800 dark:text-teal-200 sm:text-base">{label === 'LinkedIn' || label === 'Google Scholar' ? `${label} Profile` : value}</a> : <p className="text-sm text-slate-600 dark:text-slate-400 sm:text-base">{value}</p>}</div>)}</div><a href="mailto:tasfiaakter@cse.mist.ac.bd" onClick={openEmail} className="group button-primary mt-8 rounded-xl px-6 transition-transform duration-200 motion-safe:hover:-translate-y-0.5"><Mail size={18} className="transition-transform duration-200 motion-safe:group-hover:translate-x-1" aria-hidden="true" />Send Email</a></div></Section><footer className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-6 py-8 text-xs text-slate-600 dark:text-slate-400 lg:px-10"><p>© {new Date().getFullYear()} {profile.name}</p><a href="#home" className="flex items-center gap-2 hover:text-teal-900 dark:hover:text-teal-200">Back to top <ArrowUpRight size={14} aria-hidden="true" /></a></footer></>;
}

