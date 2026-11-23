import { useReducedMotion as useFramerReducedMotion } from 'framer-motion';

/**
 * Mirrors the OS "reduce motion" setting. MotionConfig reducedMotion="user"
 * already strips transform and layout animation globally; use this for the
 * few places that need a different code path (for example, skipping the
 * word-by-word text reveal entirely).
 */
export function useReducedMotion() {
  return useFramerReducedMotion() ?? false;
}
