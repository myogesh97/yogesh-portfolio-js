import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useFinePointer } from '../../hooks/useMediaQuery';
import { cx } from '../../lib/cx';
import { EASE_OUT, surfaceClose } from '../../lib/motion';
import { GLASS_EDGE } from '../../lib/surface';
import styles from './GlassCard.module.css';

/**
 * A home-screen card. It shares a layoutId with its GlassPanel, so when
 * it is replaced by the panel Framer animates one continuous surface
 * from the card's rectangle to the viewport, and back again on close.
 *
 * Props
 * @param {string} id            Section id ('work', 'about', ...). Also builds the shared layoutId.
 * @param {string} label         Visible card label. Travels into the panel header when opened.
 * @param {string} description   Extra sentence read by screen readers after the label.
 * @param {string} className     Grid placement class from Home.module.css.
 * @param {number} radius        Corner radius in px (a number, so Framer can animate it).
 * @param {number} order         Position in the first-load entrance stagger.
 * @param {boolean} animateIn    Play the first-load entrance. False when the card returns from a panel.
 * @param {boolean} restoreFocus Focus this card on mount. True right after its panel closes.
 * @param {(id: string) => void} onOpen Called with the id when the card is clicked.
 * @param {React.ReactNode} children    Decorative preview shown inside the card.
 */
export function GlassCard({
  id,
  label,
  description,
  className,
  radius,
  order,
  animateIn,
  restoreFocus,
  onOpen,
  children,
}) {
  const ref = useRef(null);
  const fine = useFinePointer();

  useEffect(() => {
    if (restoreFocus) ref.current?.focus({ preventScroll: true });
  }, [restoreFocus]);

  const trackPointer = (event) => {
    if (!fine) return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`);
  };

  const descriptionId = `card-desc-${id}`;

  return (
    <motion.button
      ref={ref}
      type="button"
      layoutId={`surface-${id}`}
      className={cx('glass', styles.card, className)}
      style={{ borderRadius: radius, boxShadow: GLASS_EDGE }}
      initial={animateIn ? { opacity: 0, y: 24 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        layout: surfaceClose,
        default: { duration: 0.9, ease: EASE_OUT, delay: 0.45 + order * 0.07 },
      }}
      onClick={() => onOpen(id)}
      onPointerMove={trackPointer}
      aria-haspopup="dialog"
      aria-describedby={descriptionId}
    >
      <span className={styles.highlight} aria-hidden="true" />

      <motion.span
        layout="position"
        className={styles.body}
        aria-hidden="true"
        initial={animateIn ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: animateIn ? 0 : 0.32 }}
      >
        {children}
      </motion.span>

      <motion.span layout="position" className={styles.footer}>
        <motion.span layoutId={`label-${id}`} className={styles.label} transition={{ layout: surfaceClose }}>
          {label}
        </motion.span>
        <ArrowUpRight className={styles.arrow} size={18} strokeWidth={1.5} aria-hidden="true" />
      </motion.span>

      <span id={descriptionId} className="sr-only">
        {description}
      </span>
    </motion.button>
  );
}
