/**
 * Everything personal lives here. Change positioning, links and copy
 * without touching any component.
 *
 * Any value starting with "YOUR_" is treated as "not set" and renders
 * as a muted placeholder instead of a broken link.
 */

export const profile = {
  name: 'Yogesh Meena',
  firstName: 'Yogesh',
  lastName: 'Meena',
  role: 'Frontend Engineer',

  /** Short focus line under the name. Reorder to change emphasis. */
  focus: ['Accessibility', 'Design Systems', 'Enterprise UI'],

  /** One sentence shown on the home screen. */
  headline:
    'I build accessible interfaces for complex, regulated products: multi-role workflows, government platforms, and the release pipelines that ship them.',

  location: 'Jaipur, India',
  timeZone: 'Asia/Kolkata',
  timeZoneLabel: 'IST',

  availability: {
    open: true,
    label: 'Open to frontend roles',
    detail: 'Remote preferred. Hybrid or on\u2011site available.', // \u2011: non-breaking hyphen
  },

  yearsOfExperience: '6+',

  links: {
    email: 'm.yogesh0197@gmail.com',
    linkedin: 'https://linkedin.com/in/yogesh-m',
    github: 'https://github.com/myogesh97',
  },

  /** Asset paths. Replace the files in /public, not these strings. */
  assets: {
    photo: '/images/profile.jpg',
    resume: '/resume.pdf',
    resumeFileName: 'Yogesh_Meena_Frontend_Engineer.pdf',
  },
};

/** About panel copy. The statement reveals word by word. */
export const about = {
  statement:
    'I am a frontend engineer with six years of shipping production UI. Most of that time has gone into government platforms where accessibility is a legal requirement, workflows branch across several user roles, and a regression reaches thousands of people.',
  paragraphs: [
    'At MTX Group I owned frontend delivery across licensing, education and incident-management systems in the US and Australia. That meant building reusable component systems, auditing and fixing accessibility at scale, and re-architecting the Bitbucket pipelines that took every release from Dev through QA and UAT to production.',
    'Before that I worked on performance: rebuilding a 60+ page PHP portal in Next.js and bringing load time down from 4s to 1.5s, and handling the full frontend for a gaming portal and an escrow payments dashboard.',
  ],
  figures: [
    { value: '145+', label: 'production screens delivered' },
    { value: '350+', label: 'accessibility issues resolved' },
    { value: '85+', label: 'UI defects fixed' },
    { value: '$0', label: 'per-user deployment cost, down from ~$200 a month' },
  ],
};

export const isPlaceholder = (value) => value.startsWith('YOUR_');
