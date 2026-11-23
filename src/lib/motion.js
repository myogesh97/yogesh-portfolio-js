/**
 * One motion vocabulary for the whole site.
 * Curves are tuned to feel physical without bounce.
 */

/** Fast start, long settle. Used for surfaces that move a long way. */
export const EASE_SURFACE = [0.32, 0.72, 0, 1];
/** General purpose ease-out for content. */
export const EASE_OUT = [0.22, 1, 0.36, 1];

/** Card becoming a panel. */
export const surfaceOpen = { type: 'tween', duration: 0.62, ease: EASE_SURFACE };
/** Panel collapsing back into its card. Slightly quicker: returning should feel light. */
export const surfaceClose = { type: 'tween', duration: 0.5, ease: EASE_SURFACE };

/** Delay before panel content starts, so text never renders mid-morph. */
export const CONTENT_DELAY = 0.28;

export const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};

export const stagger = (step = 0.06, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: step, delayChildren: delay } },
});
