# Yogesh Meena · Portfolio

React 19, Vite, plain JavaScript (JSX), Framer Motion. No router, no UI kit.

A TypeScript version of the same site lives in `~/Desktop/yogesh-portfolio`. Use it as the answer key when you move to TypeScript. See `PRACTICE.md` for the rebuild plan.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # builds to dist/
npm run lint       # catches hook mistakes and unused variables
npm run preview    # serve the production build locally
```

`dist/` is static. Deploy it to Vercel, Netlify or any static host.

## Where things live

| What | Where |
| --- | --- |
| Name, headline, focus line, availability, email / LinkedIn / GitHub | `src/data/profile.js` |
| About copy and headline figures | `src/data/profile.js` (`about`) |
| Case studies | `src/data/projects.js` |
| Roles and dates | `src/data/experience.js` |
| Capability groups and certification | `src/data/skills.js` |
| Headshot | `public/images/profile.jpg` |
| Project images | `public/images/projects/<slug>/cover.jpg`, `detail-1.jpg`, `detail-2.jpg` |
| Résumé | `public/resume.pdf` |
| Colours, type scale, radii, curves | `src/styles/tokens.css`, `src/lib/motion.js` |

Any link value starting with `YOUR_` renders as "not set" instead of a broken link.
Missing images show a labelled placeholder. In `npm run dev` the placeholder also prints the exact file path to fill.

## Structure

```
src/
  App.jsx                     active panel, scrim, focus restoration
  components/
    GlassCard/                home card (shared layoutId with its panel)
    GlassPanel/               expanded surface: dialog, focus trap, Esc, scroll root
    Reveal/                   in-view reveal inside the open panel
    Media/                    image frame with honest placeholder
    TopBar/  AmbientBackground/
  sections/
    Home/                     hero, card grid, card previews, portrait tile
    Work/                     index rail + case study + next project
    About/  Experience/  Contact/  Resume/
  data/                       all content
  hooks/                      usePanelNavigation, useFocusTrap, useLocalTime, ...
  lib/                        motion curves, glass edge, helpers
  styles/                     tokens + global
```

## How card → panel works

1. Each home card is a `motion.button` with `layoutId="surface-<id>"`.
2. Opening a section swaps that card for an empty grid cell and mounts a `GlassPanel` with the same `layoutId`. Framer Motion measures both and animates one surface from the card's rectangle to the viewport. The card label has its own shared `layoutId`, so it travels into the panel header.
3. Panel content waits ~280 ms (`CONTENT_DELAY`) so no text renders mid-morph, then rises in. A scrim dims and blurs the home screen behind it.
4. Closing reverses it: content clears first, the card remounts, and the surface collapses back into the same cell. Focus returns to that card.
5. The glass hairline and radius are passed through Framer's `style` prop, not CSS, so they are scale-corrected during the morph instead of stretching.

Every panel is deep-linkable: `/#work`, `/#work/dphhs`, `/#about`, `/#experience`, `/#contact`, `/#resume`. The browser back button closes a panel.

## Accessibility

Panels are `role="dialog"` with `aria-modal`, a focus trap, Esc to close and focus restoration. The home screen is `inert` while a panel is open. `prefers-reduced-motion` turns every transition into an instant state change. No hover-only interactions: every hover effect has a focus-visible equivalent.
