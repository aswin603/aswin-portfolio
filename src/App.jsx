import { useState, useRef, useCallback, useEffect } from 'react';
import { useTheme } from './hooks/useTheme';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';

const OBSERVER_OPTIONS = {
  root: null,
  rootMargin: '0px 0px -80px 0px',
  threshold: 0.1,
};

function App() {
  const { theme, toggleTheme, isDark } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const timelineFillRef = useRef(null);
  const experienceRef = useRef(null);

  const scrollObserverRef = useRef(null);
  const getScrollObserver = useCallback(() => {
    if (scrollObserverRef.current) return scrollObserverRef.current;
    scrollObserverRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, OBSERVER_OPTIONS);
    return scrollObserverRef.current;
  }, []);

  const updateTimelineLine = useCallback(() => {
    const fill = timelineFillRef.current;
    const section = experienceRef.current;
    if (!fill || !section) return;

    const rect = section.getBoundingClientRect();
    const sectionTop = rect.top;
    const sectionHeight = rect.height;
    const sectionBottom = sectionTop + sectionHeight;
    const viewportHeight = window.innerHeight;

    if (sectionTop > viewportHeight) {
      fill.style.height = '0%';
      return;
    }
    if (sectionBottom <= 0) {
      fill.style.height = '100%';
      return;
    }

    const scrollRange = viewportHeight + sectionHeight;
    const scrolled = viewportHeight - sectionTop;
    let fillPercent = scrolled / scrollRange;
    fillPercent = Math.min(1, Math.max(0, fillPercent));
    fill.style.height = `${fillPercent * 100}%`;
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', updateTimelineLine, { passive: true });
    window.addEventListener('resize', updateTimelineLine);
    updateTimelineLine();
    return () => {
      window.removeEventListener('scroll', updateTimelineLine);
      window.removeEventListener('resize', updateTimelineLine);
    };
  }, [updateTimelineLine]);

  const handleNavClick = useCallback(() => {
    setMenuOpen(false);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  return (
    <>
      <div className="bg-orb bg-orb-1" aria-hidden="true" />
      <div className="bg-orb bg-orb-2" aria-hidden="true" />
      <div className="bg-orb bg-orb-3" aria-hidden="true" />

      <Header
        isDark={isDark}
        onToggleTheme={toggleTheme}
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen((o) => !o)}
        onNavClick={handleNavClick}
      />

      <main>
        <Hero />
        <About onObserve={getScrollObserver} />
        <Skills onObserve={getScrollObserver} />
        <TechStack onObserve={getScrollObserver} />
        <Projects onObserve={getScrollObserver} />
        <Experience
          onObserve={getScrollObserver}
          timelineFillRef={timelineFillRef}
          experienceRef={experienceRef}
        />
        <Contact onObserve={getScrollObserver} />
      </main>

      <Footer />
    </>
  );
}

export default App;
