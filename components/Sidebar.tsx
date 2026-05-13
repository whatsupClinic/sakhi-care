"use client";

import clsx from "clsx";
import { SIDEBAR_ITEMS, type FlowName } from "@/lib/flow-info";

export function Sidebar({
  active,
  onPick,
}: {
  active: FlowName;
  onPick: (id: FlowName) => void;
}) {
  return (
    <nav className="sk-sidebar" aria-label="Flow picker">
      <div className="sb-logo" aria-label="SakhiCare">स</div>
      {SIDEBAR_ITEMS.map((item, i) => {
        if (item.id === "divider") {
          return <div key={`div-${i}`} className="sb-divider" aria-hidden="true" />;
        }
        return (
          <button
            key={item.id}
            type="button"
            className={clsx("sb-btn", active === item.id && "active")}
            onClick={() => onPick(item.id)}
            aria-label={item.tip}
          >
            <span aria-hidden="true">{item.icon}</span>
            <span className="sb-tip">{item.tip}</span>
          </button>
        );
      })}
    </nav>
  );
}
