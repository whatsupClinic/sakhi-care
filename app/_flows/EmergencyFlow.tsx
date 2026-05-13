"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { ChatArea } from "@/components/chat/ChatArea";
import { VoiceNote } from "@/components/chat/VoiceNote";
import { FlowScreen } from "@/components/chat/FlowScreen";
import { EmergencyDispatchCard } from "@/components/cards/EmergencyDispatchCard";
import { useChatEngine } from "@/lib/chat-engine";
import { useFlowContext } from "@/lib/flow-context";
import { toast } from "@/components/Toast";

const ER_SYMPTOMS = [
  "Heavy bleeding",
  "Dizziness / feeling faint",
  "Severe pain",
  "Difficulty breathing",
  "Very high fever (40°C+)",
];

const DEFAULT_ER: { symptoms: string[]; severity: number } = {
  symptoms: ["Heavy bleeding", "Dizziness / feeling faint"],
  severity: 3,
};

export function EmergencyFlow() {
  const engine = useChatEngine();
  const { setOverlay, setSecondPhone, setSmsPanel, setHeaderSub } = useFlowContext();
  const [triageOpen, setTriageOpen] = useState(false);

  useEffect(() => {
    engine.reset();
    setHeaderSub("online · women's health helpline");
    engine.after(100, () => {
      engine.addDate("Today · 11:47 PM (off PHC hours)");
      engine.addBubble(
        <VoiceNote
          seconds={6}
          transcript={`"Heavy bleeding... feeling dizzy..."`}
        />,
        { side: "tx" },
      );
      engine.typing(() => {
        engine.addBubble(
          <>
            🚨 <b>Red flag detected.</b>
            <br />
            Don&apos;t move — help is coming. 3 quick questions:
            <br />
            <small style={{ color: "#667781" }}>
              (Hard-coded keyword bypass · CCIM §4.5 · LLM skipped)
            </small>
          </>,
          { side: "rx", from: "SakhiCare", ticked: false },
        );
        engine.after(500, () => setTriageOpen(true));
      }, 600);
    });

    return () => {
      setSecondPhone({ kind: "hidden" });
      setSmsPanel({ kind: "hidden" });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (triageOpen) {
      setOverlay(<TriageOverlay onClose={() => setTriageOpen(false)} onSubmit={onSubmit} />);
    } else {
      setOverlay(null);
    }
    return () => setOverlay(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triageOpen]);

  function onSubmit(p: { symptoms: string[]; severity: number }) {
    setTriageOpen(false);
    engine.addBubble(
      `🚨 ${p.symptoms.join(", ")} · Severity ${p.severity}/3`,
      { side: "tx" },
    );
    setHeaderSub("parallel dispatch · 108 + ASHA + PHC");

    engine.typing(() => {
      setHeaderSub("help on the way · 8 min");
      engine.addBubble(
        <EmergencyDispatchCard
          channels={[
            {
              icon: "📞",
              title: "108 Ambulance · dispatched",
              detail: "ETA 14 min · free",
              onClick: () => toast("108 ambulance dispatched · ETA 14 min"),
            },
            {
              icon: "🤝",
              title: "Sunita Devi (ASHA) · calling",
              detail: "0.8 km · ETA 8 min · first responder",
              variant: "asha",
              onClick: () => toast("Sunita calling · 0.8 km · ETA 8 min"),
            },
            {
              icon: "🏥",
              title: "PHC Madurai · emergency on call",
              detail: "Dr. Pillai notified",
              onClick: () => toast("PHC Madurai emergency notified"),
            },
          ]}
          tip="💚 Until help arrives — lie on your left side. Raise your feet slightly. Don't drink water. Stay calm."
        />,
        { side: "rx", ticked: false },
      );

      engine.after(1200, () => showSms(p));
      engine.after(1800, () => showAshaUrgent(p));
    }, 1100);
  }

  function showSms(p: { symptoms: string[]; severity: number }) {
    setSmsPanel({
      kind: "shown",
      urgent: true,
      title: "SMS — ASHA + PHC urgent alert",
      sub: "Parallel dispatch · < 5 sec",
      body: (
        <>
          <strong>🚨 SAKHICARE EMERGENCY</strong>
          <br />
          <br />
          Patient: <strong>Savitri Devi</strong> · 34F
          <br />
          Phone: <strong>+91 98765 43210</strong>
          <br />
          Location: Jhansi · 0.8 km from you
          <br />
          <br />
          Symptoms: <strong>{p.symptoms.join(", ")}</strong>
          <br />
          Severity: <strong>{p.severity}/3</strong>
          <br />
          Pregnancy: <strong>2nd trimester</strong>
          <br />
          <br />
          108 dispatched · ETA 14 min
          <br />
          Please reach first as ASHA primary responder.
          <div className="sms-recv urgent">📲 Sunita acknowledged · en route</div>
        </>
      ),
    });
  }

  function showAshaUrgent(p: { symptoms: string[]; severity: number }) {
    setSecondPhone({
      kind: "asha",
      urgent: true,
      children: (
        <>
          <div className="asha-alert-card urgent">
            <div className="asha-alert-label urgent">🚨 URGENT · DISPATCH NOW</div>
            <div className="asha-pt">Savitri Devi · 34F · 2nd trimester</div>
            <div className="asha-detail">
              {p.symptoms.join(" + ")} · severity {p.severity}/3. 0.8 km from you.
              108 ambulance ETA 14 min — you reach first.
            </div>
            <div className="asha-cta-row">
              <button
                type="button"
                className="asha-cta urgent"
                onClick={() => toast("En route · ETA 8 min")}
              >
                🏃‍♀️ En route
              </button>
              <button
                type="button"
                className="asha-cta s"
                onClick={() => toast("Calling Savitri...")}
              >
                📞 Call
              </button>
            </div>
          </div>
          <div className="asha-alert-card">
            <div className="asha-alert-label">🏥 PHC LINK</div>
            <div className="asha-pt">Dr. Pillai on emergency call</div>
            <div className="asha-detail">
              Doctor briefed. ABHA record + last ANC pulled up. PHC ready when
              ambulance arrives.
            </div>
          </div>
          <div className="asha-alert-card">
            <div className="asha-alert-label">💾 ABHA RECORD</div>
            <div className="asha-pt">Auto-shared with 108 team</div>
            <div className="asha-detail">
              Hb 8.2 · 16 weeks pregnant · IFA + B12 since 12 May · O+ blood group.
            </div>
          </div>
        </>
      ),
    });
  }

  return <ChatArea items={engine.items} />;
}

function TriageOverlay({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (p: { symptoms: string[]; severity: number }) => void;
}) {
  const [symptoms, setSymptoms] = useState<string[]>(DEFAULT_ER.symptoms);
  const [severity, setSeverity] = useState(DEFAULT_ER.severity);

  function toggle(s: string) {
    setSymptoms((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]));
  }

  return (
    <FlowScreen
      icon="🚨"
      title="Urgent triage"
      variant="emergency"
      onClose={onClose}
    >
      <div className="fl-title">What&apos;s happening?</div>
      <div className="fl-sub">Tap all that apply</div>
      {ER_SYMPTOMS.map((s) => {
        const on = symptoms.includes(s);
        return (
          <button
            key={s}
            type="button"
            className={clsx("chk-item", on && "on")}
            style={{ width: "100%", textAlign: "left" }}
            onClick={() => toggle(s)}
          >
            <div className={clsx("chkbox", on && "on")}>{on ? "✓" : ""}</div>
            {s}
          </button>
        );
      })}
      <div className="sl-label" style={{ marginTop: 10 }}>
        How severe?
      </div>
      <div className="sev-row">
        {[1, 2, 3].map((n) => (
          <button
            key={n}
            type="button"
            className={clsx("sev-btn", `s${n}`, severity === n && "on")}
            onClick={() => setSeverity(n)}
          >
            {n} {n === 1 ? "Mild" : n === 2 ? "Moderate" : "Severe"}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="fl-submit emergency"
        onClick={() => {
          if (symptoms.length === 0) {
            toast("Pick at least one symptom");
            return;
          }
          onSubmit({ symptoms, severity });
        }}
      >
        🚨 Help me now
      </button>
    </FlowScreen>
  );
}
