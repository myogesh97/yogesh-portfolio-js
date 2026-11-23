import { useMediaQuery } from '../hooks/useMediaQuery';

/**
 * Edge treatment for glass surfaces. Passed through Framer's style prop
 * (not CSS) so layout animations can scale-correct the hairline and
 * radius while a card morphs into a panel. A CSS border would visibly
 * stretch mid-transition.
 */
export const GLASS_EDGE =
  'inset 0 0 0 1px rgba(255,255,255,0.07), inset 0 1px 0 0 rgba(255,255,255,0.07), 0 1px 1px rgba(0,0,0,0.3), 0 24px 48px -24px rgba(0,0,0,0.65)';

export const PANEL_EDGE =
  'inset 0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 0 rgba(255,255,255,0.09), 0 1px 1px rgba(0,0,0,0.3), 0 40px 120px -20px rgba(0,0,0,0.8)';

/** Numeric radii. Framer can only correct numbers, not CSS variables. */
export function useSurfaceRadius() {
  const compact = useMediaQuery('(max-width: 639px)');
  return compact ? { card: 18, panel: 0 } : { card: 22, panel: 28 };
}
