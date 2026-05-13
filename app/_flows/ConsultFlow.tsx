"use client";

import { useEffect } from "react";
import { ChatArea } from "@/components/chat/ChatArea";
import { VoiceNote } from "@/components/chat/VoiceNote";
import { QuickReplies } from "@/components/chat/QuickReplies";
import { AshaCard } from "@/components/cards/AshaCard";
import { ConfirmCard } from "@/components/cards/ConfirmCard";
import { LocationCard } from "@/components/cards/LocationCard";
import { useChatEngine } from "@/lib/chat-engine";
import { useFlowContext } from "@/lib/flow-context";
import { toast } from "@/components/Toast";

// Inline HTML helper for translation strings that include <b>/<br> markup from the source.
function Html({ html }: { html: string }) {
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

export function ConsultFlow() {
  const engine = useChatEngine();
  const { goTo, setHeaderSub, t } = useFlowContext();

  const pickDuration = (d: string) => {
    engine.addBubble(d, { side: "tx" });
    engine.typing(() => {
      engine.addBubble(
        <>
          <Html html={t("docReady")} />
          <br />
          <br />
          <ConfirmCard
            title={t("confirmTitle")}
            detail={t("confirmDetail")}
            rows={[
              { label: t("confirmDoctorK"), value: t("confirmDoctorV") },
              { label: t("confirmLangsK"), value: t("confirmLangsV") },
              { label: t("confirmAbhaK"), value: t("confirmAbhaV") },
            ]}
            footer={t("confirmFoot")}
          />
          <QuickReplies
            replies={[
              {
                label: t("btnJoinVideo"),
                variant: "saffron",
                onClick: () => toast(t("toastOpeningCall")),
              },
              {
                label: t("btnShowDoctorView"),
                onClick: () => goTo("rx"),
              },
            ]}
          />
        </>,
        { side: "rx", ticked: false },
      );
    }, 1000);
  };

  const pickGroup = (grp: string) => {
    engine.addBubble(grp, { side: "tx" });
    setHeaderSub(t("hdrFinding"));
    engine.typing(() => {
      setHeaderSub(t("hdrJoined"));
      engine.addBubble(
        <>
          <Html html={t("queueLine")} />
          <br />
          <br />
          <div
            style={{
              background: "#e8f5e9",
              borderRadius: 7,
              padding: "9px 11px",
              borderLeft: "3px solid var(--sk-asha)",
              fontSize: 12,
              lineHeight: 1.55,
            }}
          >
            <Html html={t("queueWait")} />
            <br />
            <Html html={t("queuePos")} />
            <br />
            <Html html={t("queueTip")} />
          </div>
        </>,
        { side: "rx", ticked: false },
      );

      engine.after(1500, () => {
        engine.typing(() => {
          engine.addBubble(
            <>
              {t("askDuration")}
              <QuickReplies
                replies={[
                  { label: t("dur1week"), variant: "saffron", onClick: () => pickDuration(t("dur1week")) },
                  { label: t("dur1month"), variant: "saffron", onClick: () => pickDuration(t("dur1month")) },
                  { label: t("dur3months"), variant: "saffron", onClick: () => pickDuration(t("dur3months")) },
                  { label: t("durNotSure"), variant: "saffron", onClick: () => pickDuration(t("durNotSure")) },
                ]}
              />
            </>,
            { side: "rx", ticked: false },
          );
        }, 700);
      });
    }, 1100);
  };

  const pickConsult = () => {
    engine.addBubble(t("userTalkDoctor"), { side: "tx" });
    engine.after(300, () => {
      engine.typing(() => {
        engine.addBubble(
          <>
            {t("askWhatsWrong")}
            <QuickReplies
              replies={[
                { label: t("catPeriods"), variant: "saffron", onClick: () => pickGroup(t("catPeriods")) },
                { label: t("catPregnancy"), variant: "saffron", onClick: () => pickGroup(t("catPregnancy")) },
                { label: t("catWeakness"), variant: "saffron", onClick: () => pickGroup(t("catWeakness")) },
                { label: t("catPain"), variant: "saffron", onClick: () => pickGroup(t("catPain")) },
                { label: t("catAllCategories"), onClick: () => goTo("intake") },
              ]}
            />
          </>,
          { side: "rx", ticked: false },
        );
      }, 600);
    });
  };

  const pickAsha = () => {
    engine.addBubble(t("userConnectAsha"), { side: "tx" });
    engine.after(300, () => {
      engine.typing(() => {
        engine.addBubble(
          <>
            <AshaCard
              name={t("ashaTitle")}
              role={t("ashaRole")}
              body={<Html html={t("ashaIntro")} />}
              tags={[
                t("ashaTagAnc"),
                t("ashaTagIfa"),
                t("ashaTagSchemes"),
                t("ashaTagHomeVisits"),
              ]}
              action={
                <>
                  📞{" "}
                  <div>
                    <strong>{t("ashaCallStrong")}</strong>
                    <br />
                    {t("ashaCallSub")}
                  </div>
                </>
              }
              onActionClick={() => goTo("asha")}
            />
            <LocationCard
              lat={25.4501}
              lng={78.5712}
              name={t("ashaSubCentreName")}
              addr={t("ashaSubCentreAddr")}
              icon="🤝"
              distance="0.8 km"
            />
          </>,
          { side: "rx", ticked: false },
        );
      }, 700);
    });
  };

  useEffect(() => {
    engine.reset();
    setHeaderSub(t("hdrSub"));
    engine.after(100, () => {
      engine.addDate(t("todayConsult"));
      engine.addBubble(
        <VoiceNote seconds={8} transcript={`"${t("voiceGreeting")}"`} />,
        { side: "tx" },
      );
      engine.typing(() => {
        engine.addBubble(
          <>
            <Html html={t("sakhiGreeting")} />
            <QuickReplies
              replies={[
                { label: t("btnConsultNow"), variant: "saffron", onClick: pickConsult },
                { label: t("btnConnectAsha"), variant: "saffron", onClick: pickAsha },
                { label: t("btnMyRecords"), onClick: () => goTo("records") },
                { label: t("btnHelp"), onClick: () => toast(t("helplineToast")) },
              ]}
            />
          </>,
          { side: "rx", from: "SakhiCare", ticked: false },
        );
      }, 800);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <ChatArea items={engine.items} />;
}
