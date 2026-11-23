import { motion } from 'framer-motion';
import { GlassCard } from '../../components/GlassCard/GlassCard';
import { TopBar } from '../../components/TopBar/TopBar';
import { profile } from '../../data/profile';
import { sectionMeta } from '../../data/sections';
import { EASE_SURFACE, EASE_OUT } from '../../lib/motion';
import styles from './Home.module.css';
import { PhotoTile } from './PhotoTile';
import { AboutPreview, ContactPreview, ExperiencePreview, ResumePreview, WorkPreview } from './previews';

const CARDS = [
  {
    id: 'about',
    className: styles.about,
    description: 'Profile, capabilities and focus areas.',
    Preview: AboutPreview,
  },
  {
    id: 'work',
    className: styles.work,
    description: 'Six case studies from government and enterprise platforms.',
    Preview: WorkPreview,
  },
  {
    id: 'contact',
    className: styles.contact,
    description: 'Email, LinkedIn and availability.',
    Preview: ContactPreview,
  },
  {
    id: 'experience',
    className: styles.experience,
    description: 'Roles from 2019 to 2026.',
    Preview: ExperiencePreview,
  },
  { id: 'resume', className: styles.resume, description: 'Preview and download the PDF.', Preview: ResumePreview },
];

/** Word that rises out of a mask on first load. */
function MaskWord({ children, delay, animateIn }) {
  return (
    <span className={styles.mask}>
      <motion.span
        className={styles.maskInner}
        initial={animateIn ? { y: '108%' } : false}
        animate={{ y: '0%' }}
        transition={{ duration: 1.1, ease: EASE_SURFACE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/**
 * Props
 * @param {string|null} activePanel     Id of the open panel, or null on the home screen.
 * @param {string|null} restoreFocusTo  Id of the card that should take focus (after a panel closes).
 * @param {boolean} animateIn           Play the first-load entrance animation.
 * @param {number} radius               Card corner radius in px.
 * @param {(id: string) => void} onOpen Opens a section.
 */
export function Home({ activePanel, restoreFocusTo, animateIn, radius, onOpen }) {
  return (
    <main id="main" className={styles.home} inert={activePanel !== null}>
      <TopBar animateIn={animateIn} />

      <section className={styles.hero} aria-labelledby="hero-name">
        <h1 id="hero-name" className={styles.name}>
          <MaskWord delay={0.05} animateIn={animateIn}>
            {profile.firstName}
          </MaskWord>{' '}
          <MaskWord delay={0.14} animateIn={animateIn}>
            {profile.lastName}
          </MaskWord>
        </h1>

        <motion.div
          className={styles.intro}
          initial={animateIn ? { opacity: 0, y: 12 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.35 }}
        >
          <p className={styles.focus}>
            <span className="sr-only">{profile.role}. Focus: </span>
            {profile.focus.map((item, i) => (
              <span key={item} className={styles.focusItem}>
                {i > 0 && (
                  <span className={styles.sep} aria-hidden="true">
                    ·
                  </span>
                )}
                {item}
              </span>
            ))}
          </p>
          <p className={styles.headline}>{profile.headline}</p>
        </motion.div>
      </section>

      <nav className={styles.grid} aria-label="Sections">
        {CARDS.map(({ id, className, description, Preview }, order) =>
          activePanel === id ? (
            // Holds the grid cell while the card lives on as the open panel.
            <div key={id} className={className} aria-hidden="true" />
          ) : (
            <GlassCard
              key={id}
              id={id}
              label={sectionMeta[id].label}
              description={description}
              className={className}
              radius={radius}
              order={order}
              animateIn={animateIn}
              restoreFocus={restoreFocusTo === id}
              onOpen={onOpen}
            >
              <Preview />
            </GlassCard>
          ),
        )}
        <PhotoTile className={styles.photo} radius={radius} animateIn={animateIn} />
      </nav>
    </main>
  );
}
