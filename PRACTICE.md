# Rebuild plan: React first, then TypeScript

This folder is the finished site. You learn by rebuilding it yourself in a new folder, using this one only as the answer key.

```bash
cd ~/Desktop
npm create vite@latest portfolio-rebuild -- --template react
cd portfolio-rebuild && npm install
npm install framer-motion lucide-react @fontsource-variable/geist @fontsource-variable/geist-mono
```

Copy over only `src/data/`, `src/styles/` and `public/`. Content and CSS are not the skill you are practising. Every `.jsx` and hook you type yourself.

## Rules

1. Type it yourself. No copy-paste from the answer key.
2. Try for 30 minutes before opening the matching file here. If you're still stuck, read it, close it, and write it again from memory.
3. Keep `npm run lint` clean. The hooks rules are there to teach you, not to annoy you.
4. At the end of each phase, explain every file you wrote out loud in under 2 minutes, as if an interviewer asked "walk me through this". If you can't, the phase isn't done.

## Phases

About 2 to 3 focused hours a day. Roughly 3 weeks for React, then 2 for TypeScript.

| Phase | Days | Build | React concepts | Answer key | Done when |
|---|---|---|---|---|---|
| 1 | 1–3 | Static home screen: top bar, name, 5 cards and photo tile, all text coming from `data/` | JSX, components, props, `.map()` with `key`, CSS Modules, composition with `children` | `sections/Home/*`, `components/TopBar` | Home matches the finished site with no animation and no hard-coded copy |
| 2 | 4–5 | Clicking a card opens a plain full-screen panel; a Home button closes it | `useState`, lifting state up, passing callbacks down, conditional rendering, `switch` to pick the panel | `App.jsx` (`renderSection`), `sections/*Panel.jsx` | All 5 panels open and close, one at a time |
| 3 | 6–7 | Esc closes the panel, page scroll locks while open, live Jaipur clock | `useEffect`, dependency arrays, cleanup functions, why a listener without cleanup leaks | `GlassPanel.jsx` effects, `hooks/useLocalTime.js` | Open and close 20 times: no duplicate listeners, clock still correct |
| 4 | 8–9 | Focus moves into the panel on open, returns to the card on close, Tab can't leave the panel | `useRef`, DOM access, custom hooks | `hooks/useFocusTrap.js`, `GlassCard.jsx` (`restoreFocus`) | Whole site usable with keyboard only |
| 5 | 10–11 | URL follows the panel (`/#work/msde`), back button closes it, deep links work | Custom hook design, `useCallback`, syncing React with the browser, `useSyncExternalStore` | `hooks/usePanelNavigation.js`, `hooks/useMediaQuery.js` | Reloading `/#about` opens About; Back closes it |
| 6 | 12–13 | Work panel: project index, case study, Next project, scroll reveals | `createContext` / `useContext`, derived state, component `key` to reset state | `sections/Work/*`, `GlassPanel/PanelScrollContext.js`, `components/Reveal` | Every project reachable from the index and from Next |
| 7 | 14–16 | Card grows into the panel and collapses back | Framer Motion `layoutId`, `AnimatePresence`, `MotionConfig reducedMotion` | `GlassCard.jsx`, `GlassPanel.jsx`, `lib/motion.js` | Transition works both ways, and reduced motion makes it instant |

## Then TypeScript

Convert your own rebuild, not this folder. Compare with `~/Desktop/yogesh-portfolio`.

| Step | Convert | You learn |
|---|---|---|
| 1 | `data/*.js` → `.ts` | `interface`, optional fields (`region?`), `as const`, union types from arrays (`SectionId`) |
| 2 | `lib/` and `hooks/` | Typing function parameters and return values, `RefObject`, generics in `useState<...>` |
| 3 | Components, smallest first (`Reveal`, `Media`, `TopBar`) | Props interfaces, `ReactNode`, event types (`PointerEvent<HTMLButtonElement>`) |
| 4 | `App`, `GlassPanel`, `WorkPanel` | Typing callbacks, context values, exhaustive `switch` over a union |
| 5 | Turn on `strict` and fix every error | Where JavaScript was quietly letting bugs through |

## What this doesn't cover

Testing. Most senior frontend job descriptions ask for Jest or Vitest with React Testing Library. Once phase 5 is done, add Vitest and write tests for `usePanelNavigation` and the focus trap. They're small, pure and easy to test, which makes them a good first target.
