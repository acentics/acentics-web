"use client";

import { createContext, useContext } from "react";

export const SiteContext = createContext({
  openModal: () => {},
  onReady: (cb) => cb(),
  scrollTo: () => {},
});

export function useSite() {
  return useContext(SiteContext);
}
