import { AnimatePresence } from 'framer-motion';
import { useRef } from 'react';
import { usePanelScroll } from '../../components/GlassPanel/PanelScrollContext';
import { getProject, projects, shortEngagements } from '../../data/projects';
import { cx } from '../../lib/cx';
import { CaseStudy } from './CaseStudy';
import styles from './WorkPanel.module.css';

/**
 * Opens straight into the lead case study. A persistent index lets you
 * jump anywhere; "Next project" at the foot of each study pages through.
 *
 * Props
 * @param {string|null} slug               Project in the URL (/#work/msde), or null for the first one.
 * @param {(slug: string) => void} onSelect Called when a project is picked from the index or "Next".
 */
export function WorkPanel({ slug, onSelect }) {
  const current = getProject(slug ?? undefined) ?? projects[0];
  const index = projects.indexOf(current);
  const next = projects[(index + 1) % projects.length];
  const scroll = usePanelScroll();
  const switched = useRef(false);

  const select = (target) => {
    if (target === current.slug) return;
    switched.current = true;
    onSelect(target);
  };

  return (
    <div className={styles.layout}>
      <nav className={styles.rail} aria-label="Projects">
        <p className={cx('eyebrow', styles.railTitle)}>Index</p>
        <ol className={styles.railList}>
          {projects.map((project, i) => {
            const active = project.slug === current.slug;
            return (
              <li key={project.slug}>
                <button
                  type="button"
                  className={cx(styles.railItem, active && styles.railItemActive)}
                  aria-current={active ? 'true' : undefined}
                  onClick={() => select(project.slug)}
                >
                  <span className={styles.railIndex}>{String(i + 1).padStart(2, '0')}</span>
                  <span className={styles.railText}>
                    <span className={styles.railName}>{project.title}</span>
                    <span className={styles.railClient}>{project.client.split(' · ')[0]}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
        <p className={styles.railNote}>{shortEngagements}</p>
      </nav>

      <div className={styles.stage}>
        <AnimatePresence
          mode="wait"
          initial={false}
          onExitComplete={() => {
            if (scroll?.current) scroll.current.scrollTop = 0;
          }}
        >
          <CaseStudy
            key={current.slug}
            project={current}
            index={index}
            total={projects.length}
            next={next}
            onNext={() => select(next.slug)}
            focusOnMount={switched.current}
          />
        </AnimatePresence>
      </div>
    </div>
  );
}
