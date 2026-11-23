import { Download } from 'lucide-react';
import { experience } from '../../data/experience';
import { profile } from '../../data/profile';
import { projects } from '../../data/projects';
import styles from './previews.module.css';

/* Quiet previews inside each home card. All decorative (aria-hidden on
   the card body); the card's label and description carry the meaning. */

export function AboutPreview() {
  return (
    <span className={styles.about}>
      <span className={styles.bigFigure}>
        {profile.yearsOfExperience}
        <span className={styles.unit}>yrs</span>
      </span>
      <span className={styles.caption}>of production frontend across government and enterprise platforms</span>
    </span>
  );
}

/** Projects listed on short laptop screens; previews.module.css hides the rest. */
const SHORT_LIST = 3;

export function WorkPreview() {
  return (
    <span className={styles.work}>
      <span className={styles.workHead}>
        <span className="eyebrow">Case studies</span>
        <span className={styles.count}>{String(projects.length).padStart(2, '0')}</span>
      </span>
      <span className={styles.workList}>
        {projects.map((p, i) => (
          <span key={p.slug} className={styles.workItem} style={{ transitionDelay: `${i * 30}ms` }}>
            <span className={styles.workIndex}>{String(i + 1).padStart(2, '0')}</span>
            <span className={styles.workName}>{p.title}</span>
            <span className={styles.workRegion}>{p.region ?? ''}</span>
          </span>
        ))}
        {projects.length > SHORT_LIST && (
          <span className={styles.workMore}>+ {projects.length - SHORT_LIST} more</span>
        )}
      </span>
    </span>
  );
}

const toMonths = (ym) => {
  const [y, m] = ym.split('-').map(Number);
  return y * 12 + (m - 1);
};

export function ExperiencePreview() {
  const start = Math.min(...experience.map((r) => toMonths(r.start)));
  const end = Math.max(...experience.map((r) => toMonths(r.end)));
  const span = end - start;
  const first = experience[experience.length - 1].startLabel.split(' ')[1];
  const last = experience[0].endLabel.split(' ')[1];

  return (
    <span className={styles.experience}>
      <span className={styles.track}>
        {[...experience].reverse().map((role) => (
          <span
            key={role.id}
            className={styles.segment}
            style={{
              left: `${((toMonths(role.start) - start) / span) * 100}%`,
              width: `${((toMonths(role.end) - toMonths(role.start)) / span) * 100}%`,
            }}
          />
        ))}
      </span>
      <span className={styles.years}>
        <span>{first}</span>
        <span>{last}</span>
      </span>
    </span>
  );
}

export function ContactPreview() {
  return (
    <span className={styles.contact}>
      <span className={styles.contactLead}>{profile.availability.label}.</span>
      <span className={styles.caption}>{profile.availability.detail}</span>
    </span>
  );
}

export function ResumePreview() {
  return (
    <span className={styles.resume}>
      <span className="eyebrow">PDF</span>
      <Download size={16} strokeWidth={1.5} className={styles.resumeIcon} />
    </span>
  );
}
