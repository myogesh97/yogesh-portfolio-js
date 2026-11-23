import { createContext, useContext } from 'react';

/** The open panel's scroll container, used as the root for in-view reveals. */
export const PanelScrollContext = createContext(null);

export const usePanelScroll = () => useContext(PanelScrollContext);
