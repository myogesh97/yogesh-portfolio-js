import { ArrowUpRight, Check, Copy, Download } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Reveal } from '../../components/Reveal/Reveal';
import { isPlaceholder, profile } from '../../data/profile';
import { useLocalTime } from '../../hooks/useLocalTime';
import styles from './ContactPanel.module.css';

const displayUrl = (url) => url.replace(/^https?:\/\/(www\.)?/, '');

export function ContactPanel() {
  const time = useLocalTime(profile.timeZone);
  const [copied, setCopied] = useState(false);
  const { email, linkedin, github } = profile.links;

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(t);
  }, [copied]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  // Unset links show a reminder in development and are left out of production.
  const channels = [
    { key: 'linkedin', label: 'LinkedIn', value: linkedin },
    { key: 'github', label: 'GitHub', value: github },
  ].filter((c) => import.meta.env.DEV || !isPlaceholder(c.value));

  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <p className={styles.status}>
          <span className={styles.dot} aria-hidden="true" />
          {profile.availability.label}
        </p>
        <h3 className={styles.title}>
          Email is the quickest way to reach me. I work from {profile.location.split(',')[0]}, where it is {time}{' '}
          {profile.timeZoneLabel}.
        </h3>
        <p className={styles.detail}>{profile.availability.detail}</p>
      </div>

      <ul className={styles.list}>
        <Reveal as="li" className={styles.row}>
          <span className={styles.rowLabel}>Email</span>
          {isPlaceholder(email) ? (
            <span className={styles.missing}>Add your email in src/data/profile.js</span>
          ) : (
            <span className={styles.emailLine}>
              <a className={styles.value} href={`mailto:${email}`}>
                {email}
              </a>
              <button type="button" className={styles.copy} onClick={copyEmail}>
                {copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </span>
          )}
        </Reveal>

        {channels.map((c, i) => (
          <Reveal as="li" key={c.key} className={styles.row} delay={(i + 1) * 0.05}>
            <span className={styles.rowLabel}>{c.label}</span>
            {isPlaceholder(c.value) ? (
              <span className={styles.missing}>Add your {c.label} URL in src/data/profile.js</span>
            ) : (
              <a className={styles.value} href={c.value} target="_blank" rel="noreferrer">
                {displayUrl(c.value)}
                <ArrowUpRight size={22} strokeWidth={1.4} className={styles.arrow} aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
          </Reveal>
        ))}

        <Reveal as="li" className={styles.row} delay={0.15}>
          <span className={styles.rowLabel}>Résumé</span>
          <a className={styles.value} href={profile.assets.resume} download={profile.assets.resumeFileName}>
            Download PDF
            <Download size={20} strokeWidth={1.4} className={styles.arrow} aria-hidden="true" />
          </a>
        </Reveal>
      </ul>

      <p className={styles.live} role="status" aria-live="polite">
        {copied ? 'Email address copied to clipboard' : ''}
      </p>
    </div>
  );
}
