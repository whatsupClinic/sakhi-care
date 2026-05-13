"use client";

import clsx from "clsx";
import type { ReactNode } from "react";

export function FlowScreen({
  icon,
  title,
  variant = "saffron",
  onClose,
  children,
}: {
  icon: ReactNode;
  title: string;
  variant?: "saffron" | "asha" | "emergency" | "default";
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <div className="flow-screen" role="dialog" aria-label={title}>
      <div
        className={clsx(
          "flow-bar",
          variant === "saffron" && "saffron",
          variant === "asha" && "asha",
          variant === "emergency" && "emergency",
        )}
      >
        <div className="fl-ico" aria-hidden="true">
          {icon}
        </div>
        <span>{title}</span>
        <button
          type="button"
          className="flow-close"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>
      </div>
      <div className="flow-body">{children}</div>
    </div>
  );
}
