import { useRef, useState } from 'react';
import { Code2, Database, GitBranch, Cpu, Expand, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { courseAreas, teachingPhotos } from '../data/teaching';
import Section from '../components/Section';

const icons = { programming: Code2, algorithms: GitBranch, systems: Database, logic: Cpu };

export default function Teaching() {
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);
  const [selected, setSelected] = useState(0);
  const photo = teachingPhotos[selected];

  function openPhoto(index, event) {
    triggerRef.current = event.currentTarget;
    setSelected(index);
    dialogRef.current.showModal();
  }

  function changePhoto(direction) {
    setSelected(current => (current + direction + teachingPhotos.length) % teachingPhotos.length);
  }

  function galleryPhoto(index) {
    const item = teachingPhotos[index];
    return (
      <button key={item.src} type="button" onClick={event => openPhoto(index, event)} aria-label={`View full-size photo: ${item.alt}`} className="group relative block w-full overflow-hidden rounded-xl border border-slate-400/50 bg-stone-100 text-left dark:border-white/15 dark:bg-[#151e21]">
        <img src={item.src} alt={item.alt} width={item.width} height={item.height} loading="lazy" decoding="async" style={{ objectPosition: item.position }} className="h-auto w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.01]" />
        <span aria-hidden="true" className="absolute bottom-3 right-3 rounded-full bg-slate-950/60 p-2 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"><Expand size={16} /></span>
      </button>
    );
  }

  return (
    <Section id="teaching" number="08" title="Teaching Experience" eyebrow="COURSE AREAS" eyebrowAfterTitle subtitle="Teaching has been one of the most rewarding parts of my academic journey. I see the classroom as a two-way space—an opportunity to help students build confidence in difficult concepts while constantly learning from their questions, perspectives, and ways of thinking.">
      <div className="grid gap-5 lg:grid-cols-2">
        {courseAreas.map(area => {
          const Icon = icons[area.icon];
          return <article key={area.title} className="panel">
            <Icon size={24} strokeWidth={1.5} className="mb-5 text-teal-800 dark:text-teal-200" aria-hidden="true" />
            <h3 className="text-xl font-semibold leading-7">{area.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">{area.description}</p>
            <ul className="mt-6 space-y-3">{area.courses.map(([code, title]) => <li key={code} className="border-l-2 border-teal-700/60 pl-3 text-sm leading-6 text-slate-700 dark:border-teal-300/40 dark:text-slate-300"><span className="font-mono text-xs font-medium text-teal-800 dark:text-teal-200">{code}</span><span className="mx-2 text-slate-400" aria-hidden="true">—</span>{title}</li>)}</ul>
          </article>;
        })}
      </div>

      <section aria-labelledby="classroom-title" className="mt-14 sm:mt-16">
        <h3 id="classroom-title" className="text-2xl font-medium tracking-tight sm:text-3xl">Memories with Students</h3>
        <p className="eyebrow mt-3">CLASSROOM & CAMPUS</p>
        <p className="mb-7 mt-4 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-400">Group photographs with my students, capturing shared moments in classrooms, labs, and around campus.</p>
        <div className="w-full">
          <div className="grid items-start gap-4 sm:grid-cols-[minmax(0,1.24fr)_minmax(0,1fr)]">
            <div className="space-y-4">{[3, 1].map(index => galleryPhoto(index))}</div>
            <div className="space-y-4">{[0, 2, 4].map(index => galleryPhoto(index))}</div>
          </div>
          <p className="mt-3 text-center text-xs text-slate-600 dark:text-slate-400">Select a photograph to view it in full.</p>
        </div>
      </section>

      <dialog ref={dialogRef} aria-label="Classroom photograph preview" onClose={() => triggerRef.current?.focus()} onClick={event => { if (event.target === event.currentTarget) dialogRef.current.close(); }} onKeyDown={event => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); changePhoto(event.key === 'ArrowRight' ? 1 : -1); } }} className="m-auto w-[94vw] max-w-6xl rounded-2xl border border-slate-300 bg-[#faf8f2] p-3 text-slate-900 shadow-2xl backdrop:bg-slate-950/80 backdrop:backdrop-blur-sm dark:border-white/15 dark:bg-[#101719] dark:text-slate-100 sm:p-5">
        <div className="mb-3 flex items-center justify-between gap-4">
          <p className="text-sm" aria-live="polite">Memories with students · {selected + 1} / {teachingPhotos.length}</p>
          <button type="button" onClick={() => dialogRef.current.close()} aria-label="Close photograph preview" className="rounded-lg p-2 hover:bg-teal-800/10 dark:hover:bg-teal-200/10"><X size={22} /></button>
        </div>
        <img src={photo.src} alt={photo.alt} className="max-h-[70vh] w-full rounded-lg object-contain" />
        <div className="mt-3 flex justify-between gap-4">
          <button type="button" onClick={() => changePhoto(-1)} className="button-secondary px-3 py-2"><ChevronLeft size={18} aria-hidden="true" />Previous</button>
          <button type="button" onClick={() => changePhoto(1)} className="button-secondary px-3 py-2">Next<ChevronRight size={18} aria-hidden="true" /></button>
        </div>
      </dialog>
    </Section>
  );
}


