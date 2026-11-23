import { useCallback, useEffect, useState } from 'react';
import { isSectionId } from '../data/sections';

const parse = (hash) => {
  const [section, project] = hash.replace(/^#\/?/, '').split('/');
  if (section && isSectionId(section)) return { panel: section, project: project || null };
  return { panel: null, project: null };
};

const toHash = (panel, project) => `#${panel}${project ? `/${project}` : ''}`;

/**
 * Active panel state, mirrored to the URL hash so every section is
 * deep-linkable (/#work, /#work/msde) and the browser back button closes
 * a panel instead of leaving the site.
 */
export function usePanelNavigation() {
  const [state, setState] = useState(() => parse(window.location.hash));

  useEffect(() => {
    const sync = () => setState(parse(window.location.hash));
    window.addEventListener('popstate', sync);
    window.addEventListener('hashchange', sync);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener('hashchange', sync);
    };
  }, []);

  const open = useCallback((panel, project = null) => {
    window.history.pushState({ panel: true }, '', toHash(panel, project));
    setState({ panel, project });
  }, []);

  const close = useCallback(() => {
    setState({ panel: null, project: null });
    if (window.history.state?.panel) {
      window.history.back();
    } else {
      // Arrived by deep link: clear the hash without leaving the site.
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }, []);

  const setProject = useCallback((project) => {
    setState((prev) => {
      if (!prev.panel) return prev;
      window.history.replaceState(window.history.state, '', toHash(prev.panel, project));
      return { ...prev, project };
    });
  }, []);

  return { ...state, open, close, setProject };
}
