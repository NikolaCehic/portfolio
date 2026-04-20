import { BgCanvas } from './components/BgCanvas/BgCanvas';
import { BootOverlay } from './components/BootOverlay/BootOverlay';
import { Cursor } from './components/Cursor/Cursor';
import { TopBar } from './components/TopBar/TopBar';
import { Hero } from './components/Hero/Hero';
import { About } from './components/About/About';
import { Skills } from './components/Skills/Skills';
import { Experience } from './components/Experience/Experience';
import { Projects } from './components/Projects/Projects';
import { Contact } from './components/Contact/Contact';
import { Footer } from './components/Footer/Footer';
import { ScrollProgress } from './components/ScrollProgress/ScrollProgress';
import { useSmoothScrollLinks } from './hooks/useSmoothScrollLinks';

export function App() {
  useSmoothScrollLinks();

  return (
    <>
      <BgCanvas />
      <ScrollProgress />
      <Cursor />
      <BootOverlay />
      <TopBar />
      <main className="page">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
