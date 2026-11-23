import { Download, ExternalLink } from 'lucide-react';
import { Reveal } from '../../components/Reveal/Reveal';
import { experience } from '../../data/experience';
import { profile } from '../../data/profile';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import styles from './ResumePanel.module.css';

export function ResumePanel() {
  // Inline PDF viewers are unreliable on phones; show a summary there instead.
  const canPreview = useMediaQuery('(min-width: 900px)');
  const { resume, resumeFileName } = profile.assets;

  return (
    <div className={styles.wrap}>
      <div className={styles.side}>
        <h3 className={styles.title}>
          {profile.name}
          <span className={styles.subtitle}>
            {profile.role} · {profile.yearsOfExperience} years
          </span>
        </h3>

        <div className={styles.actions}>
          <a className={styles.primary} href={resume} download={resumeFileName}>
            <Download size={18} strokeWidth={1.6} aria-hidden="true" />
            Download résumé
          </a>
          <a className={styles.secondary} href={resume} target="_blank" rel="noreferrer">
            Open in new tab
            <ExternalLink size={15} strokeWidth={1.6} aria-hidden="true" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>

        <Reveal className={styles.summary}>
          <h4 className="eyebrow">At a glance</h4>
          <ol className={styles.timeline}>
            {experience.map((role) => (
              <li key={role.id}>
                <span className={styles.tlCompany}>{role.company}</span>
                <span className={styles.tlRole}>{role.title}</span>
                <span className={styles.tlDates}>
                  {role.startLabel} – {role.endLabel}
                </span>
              </li>
            ))}
          </ol>
          <p className={styles.format}>PDF · 1 page</p>
        </Reveal>
      </div>

      {canPreview && (
        <Reveal className={styles.preview} amount={0.05} delay={0.1}>
          <object
            data={`${resume}#view=FitH&toolbar=0&navpanes=0`}
            type="application/pdf"
            className={styles.object}
            aria-label="Résumé preview"
          >
            <div className={styles.fallback}>
              <p>Your browser can’t show the PDF inline.</p>
              <a href={resume} download={resumeFileName}>
                Download it instead
              </a>
            </div>
          </object>
        </Reveal>
      )}
    </div>
  );
}
