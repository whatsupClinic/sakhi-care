"use client";

import { useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import { ChatArea } from "@/components/chat/ChatArea";
import { RxCard } from "@/components/cards/RxCard";
import { useChatEngine } from "@/lib/chat-engine";
import { useFlowContext } from "@/lib/flow-context";
import { toast } from "@/components/Toast";

type DrugCode = "IFA" | "B12" | "Calcium";

const DRUG_INFO: Record<DrugCode, { name: string; fit: string; dosage: string; price: string }> = {
  IFA: {
    name: "Iron + Folic Acid",
    fit: "★ MoHFW protocol fit",
    dosage: "1 tab × 100 days",
    price: "₹38",
  },
  B12: {
    name: "Vitamin B12 1500mcg",
    fit: "★ Confirmed deficiency",
    dosage: "1 tab daily × 30 days",
    price: "₹38",
  },
  Calcium: {
    name: "Calcium 500mg",
    fit: "Adjunct · Anganwadi can provide",
    dosage: "1 tab × 90 days",
    price: "free",
  },
};

export function RxFlow() {
  const engine = useChatEngine();
  const { goTo, setSecondPhone, setHeaderSub } = useFlowContext();
  const [drugsAdded, setDrugsAdded] = useState<DrugCode[]>([]);
  const [sent, setSent] = useState(false);
  const [doctorMounted, setDoctorMounted] = useState(false);
  const [rxSent, setRxSent] = useState(false);

  const addDrug = useCallback((code: DrugCode) => {
    setDrugsAdded((cur) => {
      if (cur.includes(code)) return cur;
      toast(`${code} added to prescription`);
      return [...cur, code];
    });
  }, []);

  const sendRx = useCallback(() => {
    setDrugsAdded((cur) => {
      if (cur.length === 0) {
        toast("Doctor: pick at least one medicine to add");
        return cur;
      }
      setSent(true);
      setRxSent(true);
      return cur;
    });
  }, []);

  // Boot the consult narrative + show the doctor's phone.
  useEffect(() => {
    engine.reset();
    setHeaderSub("online · Dr. Pillai is with you");
    engine.after(100, () => {
      engine.addDate("Today · Consult in progress");
      engine.addBubble(
        <>
          <b>Dr. Pillai:</b> Savitri, your anaemia is confirmed. Hb 8.2 — moderate
          range. I&apos;m writing your prescription now.
        </>,
        { side: "rx", ticked: false },
      );

      engine.after(600, () => setDoctorMounted(true));

      engine.after(1500, () => {
        engine.typing(() => {
          engine.addBubble(
            <>
              On the right you can see Dr. Pillai&apos;s Eka.care DocAssist view. The AI
              is suggesting medicines — she taps to add each one to your
              prescription.
            </>,
            { side: "rx", ticked: false },
          );
        }, 600);
      });
    });

    return () => setSecondPhone({ kind: "hidden" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Push the latest doctor-view tree to the second phone whenever state changes.
  useEffect(() => {
    if (!doctorMounted) return;
    setSecondPhone({
      kind: "doctor",
      patient: "Savitri Devi",
      doctor: "Dr. Meena Pillai",
      children: (
        <DoctorEkaView
          drugsAdded={drugsAdded}
          sent={sent}
          onAddDrug={addDrug}
          onSendRx={sendRx}
        />
      ),
    });
  }, [doctorMounted, drugsAdded, sent, addDrug, sendRx, setSecondPhone]);

  // When the doctor sends Rx, push the Rx card into the patient chat.
  useEffect(() => {
    if (!rxSent) return;
    engine.after(800, () => {
      engine.typing(() => {
        const drugs = drugsAdded.map((code) => ({
          code,
          name: DRUG_INFO[code].name,
          dosage: DRUG_INFO[code].dosage,
          storeNote: DRUG_INFO[code].price,
        }));
        engine.addBubble(
          <RxCard
            rxId="Rx-2026-0512"
            doctor="Dr. Meena Pillai · PHC Madurai"
            patient="Savitri Devi"
            abha="91-2345-..."
            dx="Iron-deficiency anaemia (Hb 8.2)"
            drugs={drugs}
            onFindStore={() => toast("Opening Jan Aushadhi locator · 1.8 km")}
            onAshaVisit={() => goTo("asha")}
            onDrugClick={(code) =>
              toast(`Jan Aushadhi store · 1.8 km · ${DRUG_INFO[code as DrugCode].price}/month`)
            }
          />,
          { side: "rx", ticked: false },
        );

        engine.after(1200, () => {
          engine.addBubble(
            "Savitri, I've also sent a copy to Sunita (ASHA). She'll check on your medicines during her home visit tomorrow 🤝",
            { side: "rx", ticked: false },
          );
        });
      }, 700);
    });
    // We only want this to fire once when rxSent flips true.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rxSent]);

  return <ChatArea items={engine.items} />;
}

function DoctorEkaView({
  drugsAdded,
  sent,
  onAddDrug,
  onSendRx,
}: {
  drugsAdded: DrugCode[];
  sent: boolean;
  onAddDrug: (code: DrugCode) => void;
  onSendRx: () => void;
}) {
  return (
    <>
      <div className="eka-card">
        <div className="eka-card-label" style={{ color: "#023E4D" }}>
          👤 PATIENT · SOAP NOTE
        </div>
        <div className="soap-field">
          <strong>S:</strong> 34F, weakness + dizziness × 3 months. Heavy periods.
          Voice intake captured in Hindi.
        </div>
        <div className="soap-field">
          <strong>O:</strong> Hb 8.2 g/dL (mod anaemia). BP 100/65. ABHA:
          91-2345-6789-0123.
        </div>
        <div className="soap-field">
          <strong>A:</strong> Iron-deficiency anaemia + menorrhagia. Risk: pregnancy
          planning.
        </div>
        <div className="soap-field">
          <strong>P:</strong> IFA + Folic Acid + B12. ANC review at 6 weeks. ASHA
          home visit weekly.
        </div>
      </div>

      <div className="eka-card ai">
        <div className="eka-card-label" style={{ color: "#02C39A" }}>
          🤖 DOCASSIST · AI SUGGESTIONS
        </div>
        {(["IFA", "B12", "Calcium"] as const).map((code) => {
          const added = drugsAdded.includes(code);
          return (
            <button
              key={code}
              type="button"
              className={clsx("drug-item", added && "added")}
              style={{
                width: "100%",
                textAlign: "left",
                fontFamily: "inherit",
                cursor: added ? "default" : "pointer",
              }}
              onClick={() => onAddDrug(code)}
              disabled={added}
            >
              <div className="di-name">
                {DRUG_INFO[code].name}
                <span className="di-fit">{DRUG_INFO[code].fit}</span>
              </div>
              <div className={added ? "di-check" : "di-add"}>
                {added ? "✓" : "+"}
              </div>
            </button>
          );
        })}
        <button
          type="button"
          className={clsx("send-rx-btn", sent && "sent")}
          onClick={onSendRx}
          disabled={sent}
        >
          {sent ? "✓ Sent · Patient WhatsApp par" : "📤 Send Rx to Savitri · WhatsApp"}
        </button>
      </div>

      <div className="eka-card rx">
        <div className="eka-card-label" style={{ color: "var(--sk-saffron)" }}>
          🏪 JAN AUSHADHI · NEAREST
        </div>
        <div className="soap-field">
          📍 PMBJP Kendra · 1.8 km · ₹38 for full month IFA. Auto-locator link in
          patient Rx.
        </div>
      </div>
    </>
  );
}
