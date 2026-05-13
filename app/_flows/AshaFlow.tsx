"use client";

import { useEffect } from "react";
import { ChatArea } from "@/components/chat/ChatArea";
import { QuickReplies } from "@/components/chat/QuickReplies";
import { AshaCard } from "@/components/cards/AshaCard";
import { AnganwadiCard } from "@/components/cards/AnganwadiCard";
import { ReminderCard } from "@/components/cards/ReminderCard";
import { LocationCard } from "@/components/cards/LocationCard";
import { useChatEngine } from "@/lib/chat-engine";
import { useFlowContext } from "@/lib/flow-context";
import { toast } from "@/components/Toast";

function Html({ html }: { html: string }) {
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

export function AshaFlow() {
  const engine = useChatEngine();
  const { setSecondPhone, setHeaderSub, t } = useFlowContext();

  const replyOk = () => {
    engine.addBubble("👍 All good, no side effects", { side: "tx" });
    engine.typing(() => {
      engine.addBubble(
        <>
          <b>Sunita:</b> Wonderful 🌸 Take milk or curd with your Calcium tablets.
          On D+14, Rekha (Anganwadi worker) will visit to discuss nutrition.
        </>,
        { side: "rx", ticked: false },
      );
    }, 800);
  };

  const replyIssue = () => {
    engine.addBubble("😖 I'm getting constipated", { side: "tx" });
    engine.typing(() => {
      engine.addBubble(
        <>
          <b>Sunita:</b> No worries — drink more water and have some papaya with the
          IFA. Let me message Dr. Pillai — she may want to adjust the dose.
        </>,
        { side: "rx", ticked: false },
      );
      engine.after(1200, () => {
        engine.addBubble(
          <ReminderCard
            accent="var(--sk-asha)"
            topBg="var(--sk-asha)"
            topLabel="🤝 ASHA → DOCTOR LOOP"
            body={
              <>
                Sunita has messaged Dr. Pillai. The doctor will reply within 2 hours.
                Nothing to worry about.
              </>
            }
          />,
          { side: "rx", ticked: false },
        );
      });
    }, 1000);
  };

  const showD3 = () => {
    engine.addDate("D+3 · ASHA WhatsApp check-in");
    engine.addBubble(
      <AshaCard
        role="D+3 follow-up"
        body={
          <>
            Hi Savitri, how are the IFA tablets going? Any side effects — stomach
            burning, constipation?
            <QuickReplies
              style={{ margin: "8px -12px -10px" }}
              replies={[
                {
                  label: "👍 All good, no side effects",
                  variant: "asha",
                  onClick: replyOk,
                },
                {
                  label: "😖 I'm getting constipated",
                  variant: "asha",
                  onClick: replyIssue,
                },
              ]}
            />
          </>
        }
      />,
      { side: "rx", ticked: false },
    );
  };

  const showD14 = () => {
    engine.addDate("D+14 · Anganwadi visit");
    engine.addBubble(
      <>
        <AnganwadiCard
          name={t("anganName")}
          role={t("anganRole")}
          initial="R"
          body={
            <>
              {t("anganIntro")}
              <div style={{ margin: "6px 0", lineHeight: 1.7, fontSize: 11.5 }}>
                • <Html html={t("anganTHR")} />
                <br />
                • <Html html={t("anganCalcium")} />
                <br />
                • <Html html={t("anganCard")} />
                <br />• {t("anganSession")}
              </div>
            </>
          }
        />
        <LocationCard
          lat={25.4484}
          lng={78.5685}
          name={t("anganLocName")}
          addr={t("anganLocAddr")}
          icon="🥬"
          distance="1.2 km"
        />
      </>,
      { side: "rx", ticked: false },
    );

    engine.after(1800, () => {
      engine.typing(() => {
        engine.addBubble(
          <ReminderCard
            accent="var(--sk-saffron)"
            topBg="var(--sk-saffron)"
            topLabel="🔔 YOUR CARE NETWORK · D+14"
            body={<>Three people are looking after you:</>}
            details={[
              {
                borderColor: "var(--sk-asha)",
                background: "var(--sk-asha-soft)",
                content: (
                  <>
                    🤝 <b>Sunita · ASHA</b>
                    <br />
                    Weekly home visits · NHM-certified
                  </>
                ),
              },
              {
                borderColor: "var(--sk-anganwadi)",
                background: "var(--sk-anganwadi-soft)",
                content: (
                  <>
                    🥬 <b>Rekha · Anganwadi worker</b>
                    <br />
                    Nutrition + Take-Home Ration · ICDS scheme
                  </>
                ),
              },
              {
                borderColor: "#075E54",
                background: "#e6f3f1",
                content: (
                  <>
                    👩‍⚕️ <b>Dr. Pillai · PHC</b>
                    <br />
                    ANC review every 4 weeks · ABHA-linked
                  </>
                ),
              },
            ]}
          />,
          { side: "rx", ticked: false },
        );
      }, 800);
    });
  };

  useEffect(() => {
    engine.reset();
    setHeaderSub("online · Sunita Devi (ASHA)");
    engine.after(100, () => {
      engine.addDate("D+1 · 6:00 PM · ASHA outreach");
      engine.addBubble(
        <AshaCard
          role="NHM-certified · your village worker"
          body={
            <>
              Hello Savitri 🙏 I&apos;m coming to your home at 6 PM today. I&apos;ve
              received the doctor&apos;s prescription.
            </>
          }
          tags={["IFA check", "BP / Pulse", "Calcium from Anganwadi"]}
        />,
        { side: "rx", ticked: false },
      );

      engine.after(700, () => {
        setSecondPhone({
          kind: "asha",
          children: <AshaFeed />,
        });
      });

      engine.after(2000, () => {
        engine.typing(() => {
          engine.addBubble(
            <>
              On the right is Sunita&apos;s ASHA view — she manages all her patients
              on the SakhiCare app.
              <QuickReplies
                replies={[
                  { label: "⏭ How did D+3 go?", variant: "asha", onClick: showD3 },
                  { label: "⏭ D+14 Anganwadi visit", variant: "asha", onClick: showD14 },
                ]}
              />
            </>,
            { side: "rx", from: "SakhiCare", ticked: false },
          );
        }, 700);
      });
    });

    return () => setSecondPhone({ kind: "hidden" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <ChatArea items={engine.items} />;
}

function AshaFeed() {
  return (
    <>
      <div className="asha-alert-card">
        <div className="asha-alert-label">📋 NEW · TODAY</div>
        <div className="asha-pt">Savitri Devi · 34F</div>
        <div className="asha-detail">
          Dr. Pillai · IFA + B12 + Calcium · Anaemia (Hb 8.2). Home visit scheduled.
        </div>
        <div className="asha-cta-row">
          <button
            type="button"
            className="asha-cta p"
            onClick={() => toast("Marked visited at 6:14 PM")}
          >
            ✓ Mark visited
          </button>
          <button
            type="button"
            className="asha-cta s"
            onClick={() => toast("Calling Dr. Pillai...")}
          >
            📞 Doctor
          </button>
        </div>
      </div>

      <div className="asha-alert-card">
        <div className="asha-alert-label">🤰 SCHEME ELIGIBLE</div>
        <div className="asha-pt">Savitri Devi · PMMVY</div>
        <div className="asha-detail">
          2nd trimester · eligible for ₹5,000. Need Aadhaar + bank passbook + MCP card.
        </div>
        <div className="asha-cta-row">
          <button
            type="button"
            className="asha-cta p"
            onClick={() => toast("PMMVY form draft saved")}
          >
            📋 Fill form
          </button>
        </div>
      </div>

      <div className="asha-alert-card">
        <div className="asha-alert-label">📅 D+14 REMINDER</div>
        <div className="asha-pt">3 patients in your block</div>
        <div className="asha-detail">
          Schedule Anganwadi nutrition session with Rekha Tai. Auto-batch route ready.
        </div>
      </div>
    </>
  );
}
