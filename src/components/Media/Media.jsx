import { useState } from 'react';
import { cx } from '../../lib/cx';
import styles from './Media.module.css';

/**
 * Image with a reserved frame and an honest placeholder. Drop a file at
 * `src` and it appears; until then the frame is clearly marked as empty.
 * In development the placeholder also prints the exact path to fill.
 *
 * Props
 * @param {string} src                 Image path inside /public, e.g. /images/projects/mo-pro/cover.jpg
 * @param {string} alt                 Alt text describing the image.
 * @param {string} [ratio='16 / 10']   CSS aspect-ratio. Reserves space so nothing jumps on load.
 * @param {string} [className]
 * @param {boolean} [priority=false]   Load immediately (hero images). Everything else lazy-loads.
 * @param {string} [placeholderLabel]  Short text shown in the placeholder.
 * @param {string} [objectPosition='center'] Which part of the image to keep when cropping.
 * @param {number} [width]             Intrinsic width, paired with height so the browser reserves space.
 * @param {number} [height]
 * @param {'figure'|'div'} [as='figure'] Use 'div' when a parent already provides the <figure>.
 */
export function Media({
  src,
  alt,
  ratio = '16 / 10',
  className,
  priority = false,
  placeholderLabel,
  objectPosition = 'center',
  width,
  height,
  as: Frame = 'figure',
}) {
  const [state, setState] = useState('loading');

  return (
    <Frame className={cx(styles.frame, className)} style={{ aspectRatio: ratio }} data-state={state}>
      {src && state !== 'missing' && (
        <img
          className={styles.image}
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          style={{ objectPosition }}
          onLoad={() => setState('loaded')}
          onError={() => setState('missing')}
        />
      )}

      {(!src || state === 'missing') && (
        <div className={styles.placeholder} role="img" aria-label={`Image coming soon: ${alt}`}>
          <span className={styles.placeholderText}>
            <span className="eyebrow">Image to come</span>
            {placeholderLabel && <span className={styles.placeholderLabel}>{placeholderLabel}</span>}
            {import.meta.env.DEV && <code className={styles.path}>public{src}</code>}
          </span>
        </div>
      )}
    </Frame>
  );
}
