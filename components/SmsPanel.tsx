"use client";

import type { ReactNode } from "react";
import clsx from "clsx";

export type SmsPanelState =
  | { kind: "hidden" }
  | {
      kind: "shown";
      urgent?: boolean;
      title: string;
      sub: string;
      body: ReactNode;
    };

export function SmsPanel({ state }: { state: SmsPanelState }) {
  if (state.kind === "hidden") return null;
  return (
    <div className="sms-panel" role="complementary" aria-label="SMS preview">
      <div className={clsx("sms-hdr", state.urgent && "urgent")}>
        <span className="sms-hdr-ico" aria-hidden="true">📱</span>
        <div>
          <div className="sms-hdr-title">{state.title}</div>
          <div className="sms-hdr-sub">{state.sub}</div>
        </div>
      </div>
      <div className={clsx("sms-body", state.urgent && "urgent")}>{state.body}</div>
    </div>
  );
}
