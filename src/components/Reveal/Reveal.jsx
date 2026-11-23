import { motion } from 'framer-motion';
import { EASE_OUT } from '../../lib/motion';
import { usePanelScroll } from '../GlassPanel/PanelScrollContext';

/** Fades and lifts content into place as it scrolls into the open panel. *
 * Props
 * @param {React.ReactNode} children
 * @param {string} [className]
 * @param {number} [delay=0]     Seconds to wait before animating.
 * @param {number} [y=20]        Distance in px the content rises from.
 * @param {number} [amount=0.25] Share of the element (0 to 1) that must be visible before it reveals.
 * @param {'div'|'section'|'li'|'header'|'footer'} [as='div'] Which HTML element to render.
 */
export function Reveal({ children, className, delay = 0, y = 20, amount = 0.25, as = 'div' }) {
  const root = usePanelScroll();
  const Component = motion[as];

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ root: root ?? undefined, once: true, amount }}
      transition={{ duration: 0.8, ease: EASE_OUT, delay }}
    >
      {children}
    </Component>
  );
}
