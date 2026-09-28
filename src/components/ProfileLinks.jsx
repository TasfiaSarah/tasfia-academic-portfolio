import { FileText, Code2, GraduationCap, BriefcaseBusiness, Mail, ArrowUpRight } from 'lucide-react';
import profile from '../data/profile';
export default function ProfileLinks() {
  const links = [
    { label: 'View CV', href: profile.cvUrl, icon: FileText, primary: true },
    { label: 'GitHub', href: profile.links?.github, icon: Code2 },
    { label: 'Google Scholar', href: profile.links?.googleScholar, icon: GraduationCap },
    { label: 'LinkedIn', href: profile.links?.linkedin, icon: BriefcaseBusiness },
    { label: 'Email me', href: profile.emails?.personal || profile.emails?.academic, icon: Mail, email: true },
  ];
  return <div className="flex flex-wrap gap-3">{links.filter(link => link.href).map(({ label, href, icon: Icon, primary, email }) => <a key={label} href={email ? `mailto:${href}` : href} target={email ? undefined : '_blank'} rel={email ? undefined : 'noreferrer'} className={primary ? 'button-primary' : 'button-secondary'}><Icon size={16} aria-hidden="true" />{label}<ArrowUpRight size={15} aria-hidden="true" /></a>)}</div>;
}


