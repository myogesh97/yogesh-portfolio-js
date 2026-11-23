export const SECTION_IDS = ['work', 'about', 'experience', 'contact', 'resume'];

export const sectionMeta = {
  work: { label: 'Selected Work', title: 'Selected Work' },
  about: { label: 'About', title: 'About' },
  experience: { label: 'Experience', title: 'Experience' },
  contact: { label: 'Contact', title: 'Contact' },
  resume: { label: 'Résumé', title: 'Résumé' },
};

export const isSectionId = (value) => SECTION_IDS.includes(value);
