import { Media } from '../Media/Media';
import styles from './Screenshot.module.css';

/** Intrinsic width/height from an aspect ratio, so the img reserves its box before it loads. */
function dimensions(aspectRatio) {
  const [w, h] = aspectRatio.split('/').map((n) => Number(n.trim()));
  const width = 1600;
  return { width, height: Math.round((width * h) / w) };
}

/**
 * A case study screenshot in a matted frame. Missing or broken images
 * fall back to Media's "Image to come" placeholder.
 *
 * Props
 * @param {string} src                       Image path inside /public.
 * @param {string} alt                       Alt text describing the screenshot. Required.
 * @param {string} [caption]                 Visible caption under the image.
 * @param {string} [aspectRatio='16 / 10']   CSS aspect-ratio of the image area.
 * @param {boolean} [priority=false]         Load immediately (the hero shot). Everything else lazy-loads.
 * @param {string} [placeholderLabel]        Short text shown in the placeholder.
 * @param {string} [className]
 */
export function Screenshot({ src, alt, caption, aspectRatio = '16 / 10', priority = false, placeholderLabel, className }) {
  const { width, height } = dimensions(aspectRatio);

  return (
    <figure className={[styles.frame, className].filter(Boolean).join(' ')}>
      <Media
        as="div"
        className={styles.media}
        src={src}
        alt={alt}
        ratio={aspectRatio}
        width={width}
        height={height}
        priority={priority}
        placeholderLabel={placeholderLabel}
        objectPosition="top"
      />
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}
