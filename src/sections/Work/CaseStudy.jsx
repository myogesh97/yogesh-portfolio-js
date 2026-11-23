import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Reveal } from '../../components/Reveal/Reveal';
import { Screenshot } from '../../components/Screenshot/Screenshot';
import { EASE_OUT } from '../../lib/motion';
import styles from './CaseStudy.module.css';

const pad = (n) => String(n).padStart(2, '0');

/**
 * Props
 * @param {object} project      One entry from data/projects.js.
 * @param {number} index        Its position (0-based) in the list.
 * @param {number} total        How many projects there are.
 * @param {object} next         The project that "Next project" goes to.
 * @param {() => void} onNext   Called when "Next project" is clicked.
 * @param {boolean} focusOnMount Move focus to the title on mount (after switching projects),
 *                               so keyboard and screen reader users land on the new content.
 */
export function CaseStudy({ project, index, total, next, onNext, focusOnMount }) {
  const titleRef = useRef(null);
  const titleId = `case-${project.slug}`;

  useEffect(() => {
    if (focusOnMount) titleRef.current?.focus({ preventScroll: true });
  }, [focusOnMount]);

  const meta = [
    { term: 'Role', value: project.role },
    { term: 'Engagement', value: `${project.hours} hours` },
    { term: 'Delivered at', value: project.company },
    { term: 'Region', value: project.region },
  ].filter((item) => Boolean(item.value));

  return (
    <motion.article
      className={styles.study}
      aria-labelledby={titleId}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } }}
      exit={{ opacity: 0, y: -12, transition: { duration: 0.22, ease: EASE_OUT } }}
    >
      {/* ---- Title ---- */}
      <header className={styles.head}>
        <p className={styles.kicker}>
          <span className="tabular">
            {pad(index + 1)} / {pad(total)}
          </span>
          <span className={styles.kickerRule} aria-hidden="true" />
          <span>{project.client}</span>
        </p>
        <h3 id={titleId} ref={titleRef} tabIndex={-1} className={styles.title}>
          {project.title}
        </h3>
        <p className={styles.summary}>{project.summary}</p>
      </header>

      {/* ---- Hero image ---- */}
      <Reveal className={styles.hero} amount={0.1} delay={0.08}>
        <Screenshot
          src={project.images.cover}
          alt={project.images.alt}
          caption={project.images.caption}
          aspectRatio="2 / 1"
          priority
          placeholderLabel={project.shortName}
        />
      </Reveal>

      {/* ---- Facts ---- */}
      <Reveal>
        <dl className={styles.meta} data-count={meta.length}>
          {meta.map(({ term, value }) => (
            <div key={term} className={styles.metaItem}>
              <dt className="eyebrow">{term}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <Reveal className={styles.tags}>
        <ul className={styles.tagList} aria-label="Focus areas">
          {project.focus.map((tag) => (
            <li key={tag} className={styles.tagStrong}>
              {tag}
            </li>
          ))}
        </ul>
        <ul className={styles.tagList} aria-label="Stack">
          {project.stack.map((tag) => (
            <li key={tag} className={styles.tag}>
              {tag}
            </li>
          ))}
        </ul>
      </Reveal>

      {/* ---- Narrative ---- */}
      <div className={styles.chapters}>
        <Reveal as="section" className={styles.chapter}>
          <h4 className={styles.chapterTitle}>
            <span className={styles.chapterNo}>A</span> Context
          </h4>
          <p className={styles.lead}>{project.context}</p>
        </Reveal>

        <Reveal as="section" className={styles.chapter}>
          <h4 className={styles.chapterTitle}>
            <span className={styles.chapterNo}>B</span> My contribution
          </h4>
          <ol className={styles.contribution}>
            {project.contribution.map((item, i) => (
              <li key={item}>
                <span className={styles.itemNo} aria-hidden="true">
                  {pad(i + 1)}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>

      {project.figures && project.figures.length > 0 && (
        <Reveal as="section" className={styles.figures}>
          <h4 className="sr-only">Key figures</h4>
          <ul className={styles.figureGrid} data-count={project.figures.length}>
            {project.figures.map((figure) => (
              <li key={figure.label} className={styles.figure}>
                <span className={styles.figureValue}>{figure.value}</span>
                <span className={styles.figureLabel}>{figure.label}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      )}

      {/* ---- Supporting images ---- */}
      <div className={styles.details}>
        {project.images.details.map((src, i) => (
          <Reveal key={src} delay={i * 0.08} amount={0.15}>
            <Screenshot
              src={src}
              alt={project.images.detailAlts?.[i] ?? `${project.images.alt}, detail ${i + 1}`}
              caption={project.images.caption}
              aspectRatio="2 / 1"
              placeholderLabel="Detail"
            />
          </Reveal>
        ))}
      </div>

      {/* ---- Next ---- */}
      <Reveal as="footer" className={styles.nextWrap} amount={0.4}>
        <button type="button" className={styles.next} onClick={onNext}>
          <span className="eyebrow">Next project</span>
          <span className={styles.nextRow}>
            <span className={styles.nextTitle}>{next.title}</span>
            <ArrowRight className={styles.nextArrow} size={28} strokeWidth={1.25} aria-hidden="true" />
          </span>
          <span className={styles.nextClient}>{next.client}</span>
        </button>
      </Reveal>
    </motion.article>
  );
}
