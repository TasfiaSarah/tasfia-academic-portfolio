export default function SectionHeader({ id, number, title, subtitle, intro }) {
  return (
    <header className="mb-9">
      <p className="mb-3 font-mono text-xs font-semibold tracking-[0.22em] text-amber-800 dark:text-amber-200">{number}</p>
      <h2 id={id} className="text-4xl font-semibold leading-tight tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">{title}</h2>
      {subtitle && <p className="mt-3 text-xs font-semibold uppercase leading-6 tracking-[0.2em] text-teal-800 dark:text-teal-200">{subtitle}</p>}
      {intro && <p className="mt-6 text-base leading-8 text-slate-600 dark:text-slate-300">{intro}</p>}
    </header>
  );
}
