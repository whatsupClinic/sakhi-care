"use client";

import { useEffect } from "react";
import { ChatArea } from "@/components/chat/ChatArea";
import { useChatEngine } from "@/lib/chat-engine";
import { useFlowContext } from "@/lib/flow-context";
import { toast } from "@/components/Toast";

type RecordItem = {
  icon: string;
  name: string;
  tag: { label: string; cls: "rx" | "lab" | "anc" | "scan" };
  meta: string;
  onClick: () => void;
};

const RECORDS: RecordItem[] = [
  {
    icon: "💊",
    name: "Iron + Folic Acid · 100 days",
    tag: { label: "Rx", cls: "rx" },
    meta: "Dr. Meena Pillai · 12 May 2026",
    onClick: () => toast("Opening Rx · Dr. Pillai 12 May"),
  },
  {
    icon: "🧪",
    name: "CBC · Hb 8.2 g/dL",
    tag: { label: "Lab", cls: "lab" },
    meta: "PHC lab · 10 May 2026",
    onClick: () => toast("Opening lab report · Hb 8.2"),
  },
  {
    icon: "🤰",
    name: "MCP Card · ANC visits",
    tag: { label: "ANC", cls: "anc" },
    meta: "ICDS · last updated 8 May 2026",
    onClick: () => toast("Opening MCP card"),
  },
  {
    icon: "📷",
    name: "USG · 16 weeks",
    tag: { label: "Scan", cls: "scan" },
    meta: "PHC radiology · 5 May 2026",
    onClick: () => toast("Opening USG report"),
  },
  {
    icon: "💉",
    name: "TT-2 vaccine done",
    tag: { label: "ANC", cls: "anc" },
    meta: "ASHA Sunita · 2 May 2026",
    onClick: () => toast("Opening vaccination card"),
  },
];

export function RecordsFlow() {
  const engine = useChatEngine();
  const { setHeaderSub } = useFlowContext();

  useEffect(() => {
    engine.reset();
    setHeaderSub("online · ABHA vault");
    engine.after(100, () => {
      engine.addDate("Today · ABHA records");
      engine.addBubble("Show me my health records", { side: "tx" });
      engine.typing(() => {
        engine.addBubble(
          <>
            Here are all your records — auto-linked from ABHA.
            <br />
            <div style={{ marginTop: 7, fontSize: 11.5, color: "#54656f" }}>
              ABHA: 91-2345-6789-0123
            </div>
            <div style={{ marginTop: 9 }}>
              {RECORDS.map((r, i) => (
                <div
                  key={i}
                  className="rpt-item"
                  onClick={r.onClick}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      r.onClick();
                    }
                  }}
                >
                  <div className="rpt-ic" aria-hidden="true">{r.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div className="rpt-nm">
                      {r.name}{" "}
                      <span className={`rpt-tag ${r.tag.cls}`}>{r.tag.label}</span>
                    </div>
                    <div className="rpt-dt">{r.meta}</div>
                  </div>
                  <div className="rpt-dl" aria-hidden="true">⬇</div>
                </div>
              ))}
            </div>
          </>,
          { side: "rx", from: "SakhiCare · ABHA Vault", ticked: false },
        );

        engine.after(1500, () => {
          engine.addBubble(
            <div style={{ fontSize: 12, lineHeight: 1.5 }}>
              💚 All records belong to you. SakhiCare claims no rights over them —
              per DPDPA 2023.
              <br />
              You can download or delete anything anytime.
            </div>,
            { side: "rx", ticked: false },
          );
        });
      }, 700);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <ChatArea items={engine.items} />;
}
