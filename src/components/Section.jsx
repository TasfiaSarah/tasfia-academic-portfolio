import { motion as Motion, useReducedMotion } from 'framer-motion';
import SectionHeader from './SectionHeader';

export default function Section({ id, number, eyebrow, title, subtitle, featured = false, children }) {
  const reduced = useReducedMotion();
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`section-shell ${featured ? 'relative border-t-2 border-t-teal-700 bg-teal-900/[0.025] dark:border-t-teal-300/60 dark:bg-teal-300/[0.025]' : ''}`}
    >
      <Motion.div
        initial={reduced ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.08 }}
        transition={{ duration: 0.45 }}
      >
        <SectionHeader id={`${id}-title`} number={number} title={title} subtitle={eyebrow} intro={subtitle} />
        {children}
      </Motion.div>
    </section>
  );
}
