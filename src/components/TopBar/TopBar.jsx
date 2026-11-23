import { motion } from 'framer-motion';
import { profile } from '../../data/profile';
import { useLocalTime } from '../../hooks/useLocalTime';
import { EASE_OUT } from '../../lib/motion';
import styles from './TopBar.module.css';

export function TopBar({ animateIn }) {
  const time = useLocalTime(profile.timeZone);

  return (
    <motion.header
      className={styles.bar}
      initial={animateIn ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.1 }}
    >
      <span className={styles.name}>{profile.name}</span>
      <span className={styles.role}>{profile.role}</span>
      <span className={styles.clock}>
        {profile.location.split(',')[0]} <span aria-hidden="true">·</span> <time className="tabular">{time}</time>
        <span className="sr-only"> {profile.timeZoneLabel}</span>
      </span>
      {profile.availability.open && (
        <span className={styles.status}>
          <span className={styles.dot} aria-hidden="true" />
          <span className={styles.statusText}>{profile.availability.label}</span>
        </span>
      )}
    </motion.header>
  );
}
