"use client";

import { createContext, useContext } from "react";
import type { SecondPhoneMode } from "@/components/SecondPhone";
import type { SmsPanelState } from "@/components/SmsPanel";
import type { FlowName } from "@/lib/flow-info";
import type { Lang, TKey } from "@/lib/i18n";

export type FlowOverlay = React.ReactNode | null;

export type FlowContextValue = {
  goTo: (flow: FlowName) => void;
  setHeaderSub: (sub: string) => void;
  setSecondPhone: (mode: SecondPhoneMode) => void;
  setSmsPanel: (state: SmsPanelState) => void;
  setOverlay: (overlay: FlowOverlay) => void;
  lang: Lang;
  t: (key: TKey) => string;
};

export const FlowContext = createContext<FlowContextValue | null>(null);

export function useFlowContext() {
  const ctx = useContext(FlowContext);
  if (!ctx) throw new Error("useFlowContext used outside provider");
  return ctx;
}
