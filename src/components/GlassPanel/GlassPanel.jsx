import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { cx } from '../../lib/cx';
import { CONTENT_DELAY, EASE_OUT, surfaceClose, surfaceOpen } from '../../lib/motion';
import { PANEL_EDGE } from '../../lib/surface';
import styles from './GlassPanel.module.css';
import { PanelScrollContext } from './PanelScrollContext';

/**
 * The expanded state of a card. Same layoutId as the card, so the surface
 * morphs instead of a modal appearing. Content waits for the surface to
 * settle, then rises in; on close it clears first so the surface can
 * collapse cleanly back into the card.
 *
 * Props
 * @param {string} id          Section id. Must match the card's id so the layoutIds pair up.
 * @param {string} label       Panel title (same text as the card label).
 * @param {number} radius      Corner radius in px.
 * @param {boolean} fromCard   True when opened by clicking a card. False on a deep link (/#work),
 *                             where there is no card to grow from, so it fades in instead.
 * @param {() => void} onClose Called by the Home button, Esc key and scrim click.
 * @param {React.ReactNode} headerEnd Optional content for the right side of the header.
 * @param {React.ReactNode} children  The section content.
 */
export function GlassPanel({ id, label, radius, fromCard, onClose, headerEnd, children }) {
  const dialogRef = useRef(null);
  const scrollRef = useRef(null);
  const closeRef = useRef(null);
  const titleId = `panel-title-${id}`;

  useFocusTrap(dialogRef, true);

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
    <div className={styles.layer}>
      <motion.div
        ref={dialogRef}
        layoutId={`surface-${id}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={cx('glass', styles.panel)}
        style={{ borderRadius: radius, boxShadow: PANEL_EDGE }}
        initial={fromCard ? false : { opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, transition: { ...surfaceClose, duration: 0.42 } }}
        transition={{ layout: surfaceOpen, default: { duration: 0.6, ease: EASE_OUT } }}
      >
        <div className={styles.header}>
          <motion.button
            ref={closeRef}
            type="button"
            className={styles.close}
            onClick={onClose}
            aria-label={`Close ${label} and return home`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: CONTENT_DELAY * 0.6, duration: 0.3 } }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
          >
            <ArrowLeft size={16} strokeWidth={1.6} aria-hidden="true" />
            <span>Home</span>
          </motion.button>

          <motion.h2
            id={titleId}
            layoutId={`label-${id}`}
            className={styles.title}
            transition={{ layout: surfaceOpen }}
          >
            {label}
          </motion.h2>

          <motion.div
            className={styles.headerEnd}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: CONTENT_DELAY, duration: 0.3 } }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
          >
            {headerEnd}
            <kbd className={styles.kbd} aria-hidden="true">
              Esc
            </kbd>
          </motion.div>
        </div>

        <PanelScrollContext.Provider value={scrollRef}>
          <motion.div
            ref={scrollRef}
            className={styles.scroll}
            tabIndex={0}
            aria-label={`${label} content`}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0, transition: { delay: CONTENT_DELAY, duration: 0.7, ease: EASE_OUT } }}
            exit={{ opacity: 0, y: 12, transition: { duration: 0.14 } }}
          >
            {children}
          </motion.div>
        </PanelScrollContext.Provider>
      </motion.div>
    </div>
  );
}
