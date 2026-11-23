import { motion } from 'framer-motion';
import { useState } from 'react';
import { profile } from '../../data/profile';
import { cx } from '../../lib/cx';
import { EASE_OUT } from '../../lib/motion';
import { GLASS_EDGE } from '../../lib/surface';
import styles from './PhotoTile.module.css';

/**
 * Portrait as part of the grid, not a round avatar. Replace
 * /public/images/profile.jpg to change it. Until then it shows a
 * monogram on a tonal field.
 */
export function PhotoTile({ className, radius, animateIn }) {
  const [state, setState] = useState('loading');

  return (
    <motion.figure
      className={cx('glass', styles.tile, className)}
      style={{ borderRadius: radius, boxShadow: GLASS_EDGE }}
      data-state={state}
      initial={animateIn ? { opacity: 0, y: 24 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.45 + 5 * 0.07 }}
    >
      {state !== 'missing' && (
        <img
          className={styles.image}
          src={profile.assets.photo}
          alt={`Portrait of ${profile.name}`}
          decoding="async"
          onLoad={() => setState('loaded')}
          onError={() => setState('missing')}
        />
      )}
      {state === 'missing' && (
        <span className={styles.monogram} role="img" aria-label={`${profile.name}, portrait coming soon`}>
          <span aria-hidden="true">
            {profile.firstName[0]}
            {profile.lastName[0]}
          </span>
          {import.meta.env.DEV && <code className={styles.hint}>public{profile.assets.photo}</code>}
        </span>
      )}
      <span className={styles.shade} aria-hidden="true" />
    </motion.figure>
  );
}
