/**
 * Selected work. Source: Projects_Yogesh_Meena.pdf.
 *
 * Images: drop files into /public/images/projects/<slug>/
 *   cover.jpg, detail-1.jpg, detail-2.jpg
 * Missing files render a labelled placeholder, so nothing breaks.
 *
 * Before publishing client names or screenshots, confirm they are
 * cleared for public use under your employment agreement.
 *
 * Shape of each project:
 *   slug         url id, also the image folder name
 *   title        what the product is, in plain words (main heading)
 *   client       small label above the title
 *   shortName    short name for placeholders
 *   region       optional; hidden when missing
 *   company, role, hours, summary, context
 *   contribution list of strings
 *   stack, focus list of tag strings
 *   figures      optional list of { value, label }
 *   images       { cover, details: [..], alt, detailAlts?, caption? }
 *                detailAlts: optional alt text per detail image
 *                caption: optional caption shown under every image
 */

const img = (slug) => ({
  cover: `/images/projects/${slug}/cover.jpg`,
  details: [`/images/projects/${slug}/detail-1.jpg`, `/images/projects/${slug}/detail-2.jpg`],
});

export const projects = [
  {
    slug: 'mo-pro',
    title: 'Missouri Professional Licensing',
    client: 'MO PRO · State of Missouri',
    shortName: 'Professional Licensing',
    region: 'United States',
    company: 'MTX Group',
    role: 'Frontend Engineer / UX Consultant',
    hours: '2,166',
    summary: 'Modernising the state platform professionals use to apply for, renew and manage their licences.',
    context:
      'A multi-year engagement on the modernisation of a state-level licensing platform. Professionals across many licence types use it to apply, renew and manage their licences, and each flow branches by role, licence type and application state.',
    contribution: [
      'Built scalable UI components for multi-role dashboards',
      'Delivered WCAG-compliant interfaces across licensing workflows',
      'Designed reusable UI systems for complex conditional flows',
      'Worked with DevOps on CI/CD-based continuous releases',
    ],
    stack: ['Salesforce LWC', 'OmniStudio', 'JavaScript', 'SCSS', 'CI/CD'],
    focus: ['Accessibility', 'Component systems', 'Enterprise workflows'],
    figures: [{ value: '2,166', label: 'hours across a multi-year engagement' }],
    images: { ...img('mo-pro'), alt: 'Missouri Professional Licensing interface' },
  },
  {
    slug: 'msde',
    title: 'Maryland Longitudinal Data System',
    client: 'MSDE · Maryland State Department of Education',
    shortName: 'Longitudinal Data',
    region: 'United States',
    company: 'MTX Group',
    role: 'Frontend Engineer / Accessibility Specialist',
    hours: '1,353',
    summary: 'Accessibility and usability work on a system connecting student data across institutions.',
    context:
      'A longitudinal data system that connects student records across institutions. The interface is dominated by data-heavy dashboards, and accessibility compliance was a primary requirement rather than a final check.',
    contribution: [
      'Implemented accessibility fixes across data-heavy dashboards',
      'Redesigned UI for better usability across devices',
      'Ran accessibility audits and drove compliance improvements',
      'Delivered UI updates under compressed timelines',
    ],
    stack: ['Salesforce LWC', 'OmniStudio', 'JavaScript', 'SCSS', 'CI/CD'],
    focus: ['WCAG / Section 508', 'Mobile-first UI', 'Data dashboards'],
    figures: [{ value: '1,353', label: 'hours on the engagement' }],
    images: { ...img('msde'), alt: 'Maryland Longitudinal Data System interface' },
  },
  {
    slug: 'ga-sos',
    title: 'Georgia Licensing System',
    client: 'GA SOS · Georgia Secretary of State',
    shortName: 'Multi-domain Licensing',
    region: 'United States',
    company: 'MTX Group',
    role: 'Frontend Engineer',
    hours: '400',
    summary: 'Consistent, accessible UI across a licensing platform that serves multiple professional domains.',
    context:
      'A licensing platform covering multiple professional domains, used by both the public and administrative teams. The work centred on keeping the UI consistent and accessible across domains that had grown apart.',
    contribution: [
      'Developed responsive and accessible UI workflows',
      'Built dashboards for public users and administrative teams',
      'Improved usability across multiple licensing domains',
      'Worked with cross-functional teams through deployment cycles',
    ],
    stack: ['Salesforce LWC', 'OmniStudio', 'JavaScript', 'SCSS', 'CI/CD'],
    focus: ['Accessibility', 'Dashboard design', 'UI consistency'],
    images: { ...img('ga-sos'), alt: 'Georgia Licensing System interface' },
  },
  {
    slug: 'dphhs',
    title: 'Montana Child Care System',
    client: 'DPHHS · State of Montana',
    shortName: 'Child Care System',
    region: 'United States',
    company: 'MTX Group',
    role: 'Frontend Engineer / Accessibility Specialist',
    hours: '266',
    summary: 'An accessibility and UI remediation pass across every module of a child care platform.',
    context:
      'A child care system used by parents, providers and administrators. The brief was UI quality, accessibility compliance and cross-device usability across the whole application, module by module.',
    contribution: [
      'Resolved 250+ ADA accessibility issues across application modules',
      'Fixed 45+ UI inconsistencies',
      'Verified 30+ modules for accessibility and UI discrepancies',
      'Implemented responsive design across 4 breakpoints',
      'Managed deployments from Dev to QA, UAT and Prod with Bitbucket Pipelines',
    ],
    stack: ['Salesforce', 'JavaScript', 'SCSS', 'Bitbucket Pipelines'],
    focus: ['WCAG / ADA remediation', 'Responsive design', 'Release management'],
    figures: [
      { value: '250+', label: 'accessibility issues resolved' },
      { value: '45+', label: 'UI inconsistencies fixed' },
      { value: '30+', label: 'modules verified' },
      { value: '4', label: 'responsive breakpoints' },
    ],
    images: { ...img('dphhs'), alt: 'Montana Child Care System interface' },
  },
  {
    slug: 'rehab',
    title: 'Incident Management Portal',
    client: 'Rehab Groups',
    shortName: 'Incident Management',
    company: 'MTX Group',
    role: 'Frontend Engineer / Accessibility & Deployment',
    hours: '99',
    summary: 'A portal government employees use to file and track complaints on web and mobile.',
    context:
      'An incident management system used by government employees to file and track complaints across web and mobile devices. I owned the UI end to end, from design-system components through to the production deployment.',
    contribution: [
      'Built the UI from reusable LWC components aligned with design system standards',
      'Delivered WCAG / ADA compliance across every portal screen',
      'Implemented responsive layouts for tablet and mobile',
      'Deployed Dev to QA to Prod using headless JWT Salesforce authentication and Bitbucket Pipelines',
      'Worked across 85+ Figma frames spanning desktop, tablet and modal flows',
    ],
    stack: ['Salesforce LWC', 'OmniStudio', 'Design system', 'Bitbucket CI/CD'],
    focus: ['End-to-end ownership', 'Accessibility', 'Deployment automation'],
    figures: [{ value: '85+', label: 'Figma frames implemented' }],
    images: {
      ...img('rehab'),
      alt: 'Complaints dashboard with status totals and a list of recent cases',
      detailAlts: [
        'Multi-step complaint form showing inline validation errors and an error summary',
        'Complaint tracking screen on tablet and mobile with a progress timeline',
      ],
      // caption: 'Illustrative mockup, not a production screenshot.',
    },
  },
  {
    slug: 'safefood',
    title: 'SafefoodQLD LPI System',
    client: 'Queensland Government · Australia',
    shortName: 'Food Safety Platform',
    region: 'Australia',
    company: 'MTX Group',
    role: 'Frontend Engineer / UI & Accessibility',
    hours: '~80',
    summary: 'Accessibility and responsive UI improvements on an Australian government platform.',
    context:
      'UI and accessibility improvements for an Australian government platform built on Salesforce Vlocity. Changes had to land without regressions inside an established component environment.',
    contribution: [
      'Delivered WCAG / ADA improvements across platform screens',
      'Implemented responsive UI for mobile and tablet',
      'Fixed UI inconsistencies in Vlocity and LWC components',
      'Kept UI updates regression-safe within the Vlocity environment',
    ],
    stack: ['Salesforce Vlocity', 'LWC', 'JavaScript', 'CSS'],
    focus: ['Accessibility', 'Responsive design', 'Regression safety'],
    images: { ...img('safefood'), alt: 'SafefoodQLD LPI System interface' },
  },
];

/** Shown under the project index. */
export const shortEngagements =
  'Plus shorter 20- to 60-hour engagements: accessibility audits and fixes on healthcare, licensing and grants systems, and dashboards for education, workforce and benefits platforms.';

export const getProject = (slug) => projects.find((p) => p.slug === slug);
