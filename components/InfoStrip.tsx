"use client";

import clsx from "clsx";
import { FLOW_INFO, type FlowName } from "@/lib/flow-info";

const LANGS: Array<{ code: "en" | "hi" | "mr" | "ta"; label: string }> = [
  { code: "en", label: "EN" },
  { code: "hi", label: "हिं" },
  { code: "mr", label: "मरा" },
  { code: "ta", label: "தமி" },
];

export function InfoStrip({
  flow,
  lang,
  onLangChange,
}: {
  flow: FlowName;
  lang: "en" | "hi" | "mr" | "ta";
  onLangChange: (l: "en" | "hi" | "mr" | "ta") => void;
}) {
  const info = FLOW_INFO[flow];
  return (
    <aside className="flow-info">
      <div className="lang-tabs" role="tablist" aria-label="Language">
        {LANGS.map((l) => (
          <button
            key={l.code}
            type="button"
            role="tab"
            aria-selected={lang === l.code}
            className={clsx("lang-tab", lang === l.code && "active")}
            onClick={() => onLangChange(l.code)}
          >
            {l.label}
          </button>
        ))}
      </div>
      <div className="fi-title">{info.title}</div>
      <div
        // body is sanitized internal content from FLOW_INFO; safe.
        dangerouslySetInnerHTML={{ __html: info.body }}
      />
    </aside>
  );
}
