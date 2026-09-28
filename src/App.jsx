import Sidebar from './components/Sidebar';
import Starfield from './components/Starfield';
import Hero from './sections/Hero';
import About from './sections/About';
import Research from './sections/Research';
import Education from './sections/Education';
import Experience from './sections/Experience';
import Publications from './sections/Publications';
import Projects from './sections/Projects';
import Awards from './sections/Awards';
import Teaching from './sections/Teaching';
import Skills from './sections/Skills';
import Contact from './sections/Contact';

export default function App() {
  return <><Starfield /><Sidebar /><main id="main" tabIndex={-1} className="relative z-10 min-w-0 md:ml-64 md:h-screen md:overflow-y-auto md:scroll-smooth md:scroll-pt-8 motion-reduce:scroll-auto"><Hero /><About /><Research /><Education /><Experience /><Publications /><Projects /><Awards /><Teaching /><Skills /><Contact /></main></>;
}


