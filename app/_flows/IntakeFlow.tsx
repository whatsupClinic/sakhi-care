"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { ChatArea } from "@/components/chat/ChatArea";
import { QuickReplies } from "@/components/chat/QuickReplies";
import { FlowScreen } from "@/components/chat/FlowScreen";
import { ConfirmCard } from "@/components/cards/ConfirmCard";
import { useChatEngine } from "@/lib/chat-engine";
import { useFlowContext } from "@/lib/flow-context";
import { toast } from "@/components/Toast";

const CATEGORIES: Array<{ id: string; label: string; icon: string }> = [
  { id: "Menstrual", label: "Menstrual", icon: "🩸" },
  { id: "PCOS", label: "PCOS", icon: "🌿" },
  { id: "Pregnancy", label: "Pregnancy", icon: "🤰" },
  { id: "Postpartum", label: "Postpartum", icon: "👶" },
  { id: "Anaemia", label: "Anaemia", icon: "🩺" },
  { id: "Nutrition", label: "Nutrition", icon: "🥬" },
  { id: "Skin", label: "Skin / Hair", icon: "✨" },
  { id: "Mental", label: "Mental health", icon: "🧠" },
  { id: "Other", label: "Other", icon: "➕" },
];

const SYMPTOMS = [
  "Weakness",
  "Tiredness, fatigue",
  "Dizziness",
  "Breathlessness",
  "Heavy menstrual bleeding",
  "Pale skin / nails",
];
const DEFAULT_SYMPTOMS = ["Weakness", "Tiredness, fatigue", "Dizziness"];

export function IntakeFlow() {
  const engine = useChatEngine();
  const { goTo, setOverlay, setHeaderSub } = useFlowContext();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    engine.reset();
    setHeaderSub("online · women's health helpline");
    engine.after(100, () => {
      engine.addDate("Today · Detailed intake");
      engine.addBubble("I need a full checkup", { side: "tx" });
      engine.typing(() => {
        engine.addBubble(
          <>
            Sure Savitri. Let me run a quick intake form — 2 minutes.
            <QuickReplies
              replies={[
                {
                  label: "📋 Start the form",
                  variant: "saffron",
                  onClick: () => setShowForm(true),
                },
              ]}
            />
          </>,
          { side: "rx", from: "SakhiCare", ticked: false },
        );
      }, 700);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (showForm) {
      setOverlay(<IntakeOverlay onClose={() => setShowForm(false)} onSubmit={onSubmit} />);
    } else {
      setOverlay(null);
    }
    return () => setOverlay(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showForm]);

  function onSubmit(payload: {
    category: string;
    symptoms: string[];
    duration: string;
    severity: number;
  }) {
    setShowForm(false);
    engine.addBubble(
      `Form submitted · ${payload.category} · ${payload.symptoms.length} symptoms · ${payload.duration} · severity ${payload.severity}/3`,
      { side: "tx" },
    );
    setHeaderSub("sending to Dr. Pillai...");
    engine.typing(() => {
      setHeaderSub("online · Dr. Pillai is reviewing");
      engine.addBubble(
        <>
          <ConfirmCard
            title="Intake complete"
            detail={`📋 ${payload.category} · ${payload.severity}/3 severity`}
            rows={[
              { label: "Symptoms", value: payload.symptoms.join(", ") },
              { label: "Duration", value: payload.duration },
              { label: "Routed to", value: "Dr. Pillai (PHC)" },
              { label: "ABHA", value: "auto-linked ✓" },
            ]}
            footer="Dr. Pillai will see you in 6 minutes. Sunita (ASHA) has also been notified for follow-up."
          />
          <QuickReplies
            replies={[
              {
                label: "👩‍⚕️ Show me what the doctor sees",
                variant: "saffron",
                onClick: () => goTo("rx"),
              },
            ]}
          />
        </>,
        { side: "rx", ticked: false },
      );
    }, 1100);
  }

  return <ChatArea items={engine.items} />;
}

function IntakeOverlay({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (p: { category: string; symptoms: string[]; duration: string; severity: number }) => void;
}) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [category, setCategory] = useState("Anaemia");
  const [symptoms, setSymptoms] = useState<string[]>(DEFAULT_SYMPTOMS);
  const [duration, setDuration] = useState("3+ months");
  const [severity, setSeverity] = useState(2);

  function toggleSymptom(s: string) {
    setSymptoms((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]));
  }

  return (
    <FlowScreen
      icon="📋"
      title={`Step ${step} of 3 · ${
        step === 1 ? "Pick a category" : step === 2 ? "Symptoms" : "Duration & severity"
      }`}
      onClose={onClose}
    >
      {step === 1 && (
        <>
          <div className="fl-title">What&apos;s the issue?</div>
          <div className="fl-sub">9 categories · ICMR-grounded</div>
          <div className="sg-grid">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                className={clsx("sg-btn", category === c.id && "sel")}
                onClick={() => setCategory(c.id)}
              >
                <span className="sg-ico" aria-hidden="true">{c.icon}</span>
                {c.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="fl-submit saffron"
            onClick={() => setStep(2)}
          >
            Continue →
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <div className="fl-title">Which symptoms do you have?</div>
          <div className="fl-sub">{category} · tap all that apply</div>
          {SYMPTOMS.map((s) => {
            const on = symptoms.includes(s);
            return (
              <button
                key={s}
                type="button"
                className={clsx("chk-item", on && "on-saffron")}
                style={{ width: "100%", textAlign: "left" }}
                onClick={() => toggleSymptom(s)}
              >
                <div className={clsx("chkbox", on && "on-saffron")}>{on ? "✓" : ""}</div>
                {s}
              </button>
            );
          })}
          <button
            type="button"
            className="fl-submit saffron"
            onClick={() => {
              if (symptoms.length === 0) {
                toast("Pick at least one symptom");
                return;
              }
              setStep(3);
            }}
          >
            Continue →
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <div className="fl-title">How long has this been going on?</div>
          <div className="type-row" style={{ marginBottom: 14 }}>
            {["1 week", "1 month", "3+ months"].map((d) => (
              <button
                key={d}
                type="button"
                className={clsx("type-btn", duration === d && "sel")}
                onClick={() => setDuration(d)}
              >
                {d}
              </button>
            ))}
          </div>
          <div className="sl-label">How severe?</div>
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
            className="fl-submit saffron"
            onClick={() => onSubmit({ category, symptoms, duration, severity })}
          >
            Submit · Send to doctor →
          </button>
        </>
      )}
    </FlowScreen>
  );
}
