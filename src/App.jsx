import { AnimatePresence, LayoutGroup, MotionConfig, motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AmbientBackground } from './components/AmbientBackground/AmbientBackground';
import { GlassPanel } from './components/GlassPanel/GlassPanel';
import { projects } from './data/projects';
import { sectionMeta } from './data/sections';
import { usePanelNavigation } from './hooks/usePanelNavigation';
import { useSurfaceRadius } from './lib/surface';
import { AboutPanel } from './sections/About/AboutPanel';
import { ContactPanel } from './sections/Contact/ContactPanel';
import { ExperiencePanel } from './sections/Experience/ExperiencePanel';
import { Home } from './sections/Home/Home';
import { ResumePanel } from './sections/Resume/ResumePanel';
import { WorkPanel } from './sections/Work/WorkPanel';
import styles from './App.module.css';

export default function App() {
  const nav = usePanelNavigation();
  const radius = useSurfaceRadius();

  // A deep link (/#work) opens a panel with no card to grow from.
  const openedByLink = useRef(nav.panel !== null);
  // First-load entrance plays once; cards returning from a panel skip it.
  const [firstLoad, setFirstLoad] = useState(true);
  const [restoreFocusTo, setRestoreFocusTo] = useState(null);
  const previous = useRef(nav.panel);

  useEffect(() => {
    const t = window.setTimeout(() => setFirstLoad(false), 1600);
    return () => window.clearTimeout(t);
  }, []);

  // Track closes from any source (button, Esc, browser back) for focus restoration.
  useEffect(() => {
    if (previous.current && !nav.panel) {
      setRestoreFocusTo(previous.current);
      openedByLink.current = false;
    }
    if (nav.panel) setRestoreFocusTo(null);
    previous.current = nav.panel;
    document.body.classList.toggle('is-locked', nav.panel !== null);
  }, [nav.panel]);

  const open = useCallback(
    (id) => {
      setFirstLoad(false);
      nav.open(id);
    },
    [nav],
  );

  const renderSection = (id) => {
    switch (id) {
      case 'work':
        return <WorkPanel slug={nav.project} onSelect={nav.setProject} />;
      case 'about':
        return <AboutPanel />;
      case 'experience':
        return <ExperiencePanel />;
      case 'contact':
        return <ContactPanel />;
      case 'resume':
        return <ResumePanel />;
    }
  };

  const headerEnd = (id) => {
    if (id !== 'work') return null;
    const index = Math.max(
      0,
      projects.findIndex((p) => p.slug === nav.project),
    );
    return (
      <span className="tabular" aria-hidden="true">
        {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
      </span>
    );
  };

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">
        Skip to sections
      </a>

      <AmbientBackground />

      <LayoutGroup>
        <Home
          activePanel={nav.panel}
          restoreFocusTo={restoreFocusTo}
          animateIn={firstLoad && !openedByLink.current}
          radius={radius.card}
          onOpen={open}
        />

        <AnimatePresence>
          {nav.panel && (
            <motion.div
              key="scrim"
              className={styles.scrim}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.5 } }}
              exit={{ opacity: 0, transition: { duration: 0.45 } }}
              onClick={nav.close}
              aria-hidden="true"
            />
          )}
        </AnimatePresence>

        <AnimatePresence >
          {nav.panel && (
            <GlassPanel
              key={nav.panel}
              id={nav.panel}
              label={sectionMeta[nav.panel].label}
              radius={radius.panel}
              fromCard={!openedByLink.current}
              onClose={nav.close}
              headerEnd={headerEnd(nav.panel)}
            >
              {renderSection(nav.panel)}
            </GlassPanel>
          )}
        </AnimatePresence>
      </LayoutGroup>
    </MotionConfig>
  );
}
