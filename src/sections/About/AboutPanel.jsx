import { motion } from 'framer-motion';
import { Reveal } from '../../components/Reveal/Reveal';
import { about, profile } from '../../data/profile';
import { certifications, skills } from '../../data/skills';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { CONTENT_DELAY } from '../../lib/motion';
import styles from './AboutPanel.module.css';

/** Statement that brightens word by word once the panel settles. */
function Statement({ text }) {
  const reduced = useReducedMotion();
  const words = text.split(' ');

  if (reduced) return <p className={styles.statement}>{text}</p>;

  return (
    <p className={styles.statement}>
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          aria-hidden="true"
          initial={{ opacity: 0.16 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: CONTENT_DELAY + 0.2 + i * 0.022, ease: 'easeOut' }}
        >
          {word}{' '}
        </motion.span>
      ))}
    </p>
  );
}

export function AboutPanel() {
  return (
    <div className={styles.wrap}>
      <section className={styles.intro} aria-label="Profile">
        <Statement text={about.statement} />
      </section>

      <section className={styles.split} aria-label="Background">
        <Reveal className={styles.copy}>
          {about.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Reveal>

        <ul className={styles.figures}>
          {about.figures.map((f, i) => (
            <Reveal as="li" key={f.label} className={styles.figure} delay={i * 0.06}>
              <span className={styles.figureValue}>{f.value}</span>
              <span className={styles.figureLabel}>{f.label}</span>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className={styles.capabilities} aria-labelledby="capabilities-title">
        <Reveal className={styles.sectionHead}>
          <h3 id="capabilities-title" className={styles.sectionTitle}>
            Capabilities
          </h3>
          <p className={styles.sectionNote}>Grouped by what they are for, not by logo.</p>
        </Reveal>

        <div className={styles.groups}>
          {skills.map((group, i) => (
            <Reveal key={group.title} className={styles.group} delay={(i % 3) * 0.06}>
              <h4 className={styles.groupTitle}>
                <span className={styles.groupNo}>{String(i + 1).padStart(2, '0')}</span>
                {group.title}
              </h4>
              <p className={styles.groupNote}>{group.note}</p>
              <ul className={styles.items}>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal as="section" className={styles.footer}>
        <div>
          <h3 className="eyebrow">Certification</h3>
          {certifications.map((c) => (
            <p key={c}>{c}</p>
          ))}
        </div>
        <div>
          <h3 className="eyebrow">Based in</h3>
          <p>{profile.location}</p>
        </div>
        <div>
          <h3 className="eyebrow">Availability</h3>
          <p>{profile.availability.detail}</p>
        </div>
      </Reveal>
    </div>
  );
}
