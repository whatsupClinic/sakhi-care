"use client";

import { useEffect } from "react";
import { ChatArea } from "@/components/chat/ChatArea";
import { IvrCard } from "@/components/cards/IvrCard";
import { SmsIncomingCard } from "@/components/cards/SmsIncomingCard";
import { useChatEngine } from "@/lib/chat-engine";
import { useFlowContext } from "@/lib/flow-context";
import { toast } from "@/components/Toast";

const LABELS: Record<number, string> = {
  1: "Consultation",
  2: "ASHA worker",
  3: "Schemes",
  4: "Emergency",
};

export function PhoneBridgeFlow() {
  const engine = useChatEngine();
  const { goTo, setSmsPanel } = useFlowContext();

  useEffect(() => {
    engine.reset();
    setSmsPanel({ kind: "hidden" });
    engine.after(100, () => {
      engine.addDate("Today · IVR helpline call");
      engine.addBubble(
        <IvrCard
          intro="Savitri called from a feature phone (Jio Bharat)."
          options={[
            { key: 1, label: "Book a free consultation" },
            { key: 2, label: "Talk to my ASHA worker" },
            { key: 3, label: "Government scheme info" },
            { key: 4, label: "🚨 Emergency" },
          ]}
          onPress={onPress}
        />,
        { side: "rx", ticked: false },
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onPress(n: number) {
    engine.addBubble(
      <>
        Pressed: <b>{n}</b> — {LABELS[n]}
      </>,
      { side: "tx" },
    );

    if (n === 4) {
      engine.after(800, () => goTo("emergency"));
      return;
    }

    engine.typing(() => {
      engine.addBubble(
        <i>&ldquo;We&apos;re sending you a WhatsApp link via SMS. Tap it to continue.&rdquo;</i>,
        { side: "rx", ticked: false },
      );
      engine.after(900, () => showSms());
    }, 700);
  }

  function showSms() {
    setSmsPanel({
      kind: "shown",
      title: "SMS — Click-to-chat",
      sub: "Sent in 4 seconds",
      body: (
        <>
          <strong>SakhiCare</strong> · Free consultation
          <br />
          <br />
          Hi Savitri, you called our helpline. Tap the link to continue on WhatsApp:
          <br />
          <br />
          <span className="sms-link">https://wa.me/911800180123?text=Start</span>
          <br />
          <br />
          Free · English/Hindi · No app download.
          <div className="sms-recv">📲 Tap to open WhatsApp</div>
        </>
      ),
    });

    engine.after(1100, () => {
      engine.addBubble(
        <SmsIncomingCard
          from="+91 1800-180-1234"
          body="Hi Savitri, to continue on WhatsApp:"
          link="wa.me/911800180123"
          ctaLabel="💬 Open WhatsApp"
          onCtaClick={() => {
            toast("Opening WhatsApp · consultation starting");
            engine.after(800, () => goTo("consult"));
          }}
        />,
        { side: "rx", ticked: false },
      );
    });
  }

  return <ChatArea items={engine.items} />;
}
