import { useEffect, useRef } from 'react';
import { useFinePointer } from '../../hooks/useMediaQuery';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import styles from './AmbientBackground.module.css';

/**
 * Static tonal depth plus one very soft light that trails the cursor.
 * The light is a CSS custom property transition: no animation loop,
 * nothing runs while the pointer is still.
 */
export function AmbientBackground() {
  const ref = useRef(null);
  const fine = useFinePointer();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!fine || reduced) return;
    let frame = 0;
    const onMove = (event) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const node = ref.current;
        if (!node) return;
        node.style.setProperty('--lx', `${(event.clientX / window.innerWidth) * 100}%`);
        node.style.setProperty('--ly', `${(event.clientY / window.innerHeight) * 100}%`);
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
    };
  }, [fine, reduced]);

  return (
    <div ref={ref} className={styles.root} aria-hidden="true">
      <div className={styles.band} />
      <div className={styles.bandSoft} />
      <div className={styles.light} />
      <div className={styles.grain} />
      <div className={styles.vignette} />
    </div>
  );
}
