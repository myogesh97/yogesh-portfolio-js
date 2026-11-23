import { motion } from 'framer-motion';
import { Reveal } from '../../components/Reveal/Reveal';
import { experience } from '../../data/experience';
import { CONTENT_DELAY, EASE_SURFACE } from '../../lib/motion';
import styles from './ExperiencePanel.module.css';

const toMonths = (ym) => {
  const [y, m] = ym.split('-').map(Number);
  return y * 12 + (m - 1);
};

const duration = (role) => {
  const months = toMonths(role.end) - toMonths(role.start);
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts = [];
  if (years) parts.push(`${years} yr${years > 1 ? 's' : ''}`);
  if (rest) parts.push(`${rest} mo${rest > 1 ? 's' : ''}`);
  return parts.join(' ');
};

/** Proportional bar of every role on one axis. Decorative: the list below is the content. */
function Scale() {
  const chronological = [...experience].reverse();
  const start = toMonths(chronological[0].start);
  const end = toMonths(chronological[chronological.length - 1].end);
  const span = end - start;
  const firstYear = Math.floor(start / 12);
  const lastYear = Math.floor(end / 12);
  const years = Array.from({ length: lastYear - firstYear + 1 }, (_, i) => firstYear + i);

  return (
    <div className={styles.scale} aria-hidden="true">
      <div className={styles.bars}>
        {chronological.map((role, i) => (
          <motion.div
            key={role.id}
            className={styles.bar}
            style={{
              left: `${((toMonths(role.start) - start) / span) * 100}%`,
              width: `${((toMonths(role.end) - toMonths(role.start)) / span) * 100}%`,
              transformOrigin: 'left center',
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: EASE_SURFACE, delay: CONTENT_DELAY + 0.15 + i * 0.12 }}
          >
            <span className={styles.barLabel}>{role.company}</span>
          </motion.div>
        ))}
      </div>
      <div className={styles.ticks}>
        {years.map((year) => (
          <span
            key={year}
            className={styles.tick}
            style={{ left: `${Math.max(0, ((year * 12 - start) / span) * 100)}%` }}
          >
            {year}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ExperiencePanel() {
  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <h3 className={styles.title}>
          From WordPress themes and a React ordering app to accessibility-first government platforms.
        </h3>
        <Scale />
      </div>

      <ol className={styles.roles}>
        {experience.map((role, i) => (
          <Reveal as="li" key={role.id} className={styles.role} amount={0.2}>
            <div className={styles.when}>
              <span className={styles.range}>
                {role.startLabel} – {role.endLabel}
              </span>
              <span className={styles.duration}>{duration(role)}</span>
            </div>

            <div className={styles.what}>
              <div className={styles.roleHead}>
                <h4 className={styles.company}>
                  {role.company}
                  {i === 0 && <span className={styles.latest}>Most recent</span>}
                </h4>
                <p className={styles.position}>
                  {role.title} <span aria-hidden="true">·</span> {role.location}
                </p>
              </div>

              {role.summary && <p className={styles.summary}>{role.summary}</p>}

              <ul className={styles.points}>
                {role.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>

              <ul className={styles.stack} aria-label={`${role.company} stack`}>
                {role.stack.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
