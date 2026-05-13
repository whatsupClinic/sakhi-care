"use client";

import { useCallback, useMemo, useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { InfoStrip } from "@/components/InfoStrip";
import { BrandStrip } from "@/components/BrandStrip";
import { ToastHost, toast } from "@/components/Toast";
import { PhoneFrame } from "@/components/phone/PhoneFrame";
import { WhatsAppHeader } from "@/components/phone/WhatsAppHeader";
import { InputBar } from "@/components/phone/InputBar";
import { SecondPhone, type SecondPhoneMode } from "@/components/SecondPhone";
import { SmsPanel, type SmsPanelState } from "@/components/SmsPanel";
import { FlowContext, type FlowOverlay } from "@/lib/flow-context";
import type { FlowName } from "@/lib/flow-info";
import { translate, LANG_NAMES, type Lang, type TKey } from "@/lib/i18n";

import { ConsultFlow } from "@/app/_flows/ConsultFlow";
import { PhoneBridgeFlow } from "@/app/_flows/PhoneBridgeFlow";
import { IntakeFlow } from "@/app/_flows/IntakeFlow";
import { RxFlow } from "@/app/_flows/RxFlow";
import { AshaFlow } from "@/app/_flows/AshaFlow";
import { RecordsFlow } from "@/app/_flows/RecordsFlow";
import { SchemesFlow } from "@/app/_flows/SchemesFlow";
import { EmergencyFlow } from "@/app/_flows/EmergencyFlow";

const FLOW_COMPONENTS: Record<FlowName, () => React.JSX.Element> = {
  consult: ConsultFlow,
  phone: PhoneBridgeFlow,
  intake: IntakeFlow,
  rx: RxFlow,
  asha: AshaFlow,
  records: RecordsFlow,
  schemes: SchemesFlow,
  emergency: EmergencyFlow,
};

export default function Home() {
  const [flow, setFlow] = useState<FlowName>("consult");
  const [headerSub, setHeaderSub] = useState<string>(translate("en", "hdrSub"));
  const [secondPhone, setSecondPhone] = useState<SecondPhoneMode>({ kind: "hidden" });
  const [smsPanel, setSmsPanel] = useState<SmsPanelState>({ kind: "hidden" });
  const [overlay, setOverlay] = useState<FlowOverlay>(null);
  const [lang, setLang] = useState<Lang>("en");

  const goTo = useCallback((next: FlowName) => {
    // reset all secondary surfaces on flow switch
    setSecondPhone({ kind: "hidden" });
    setSmsPanel({ kind: "hidden" });
    setOverlay(null);
    setFlow(next);
  }, []);

  const handleLangChange = useCallback(
    (l: Lang) => {
      setLang(l);
      toast(`${LANG_NAMES[l]} · re-rendering`);
      // Force flow remount so new lang strings pick up everywhere.
      setSecondPhone({ kind: "hidden" });
      setSmsPanel({ kind: "hidden" });
      setOverlay(null);
    },
    [],
  );

  const t = useCallback((key: TKey) => translate(lang, key), [lang]);

  const ctx = useMemo(
    () => ({
      goTo,
      setHeaderSub,
      setSecondPhone,
      setSmsPanel,
      setOverlay,
      lang,
      t,
    }),
    [goTo, lang, t],
  );

  const FlowComponent = FLOW_COMPONENTS[flow];
  // Remount the flow tree whenever lang or flow changes so all chat copy is rebuilt.
  const flowKey = `${flow}-${lang}`;

  return (
    <FlowContext.Provider value={ctx}>
      <Sidebar active={flow} onPick={goTo} />
      <InfoStrip flow={flow} lang={lang} onLangChange={handleLangChange} />
      <BrandStrip />

      <div className="sk-stage">
        <PhoneFrame id="main-phone">
          <WhatsAppHeader subtitle={headerSub} onBack={() => goTo(flow)} />
          <FlowComponent key={flowKey} />
          <InputBar placeholder={t("inputPlaceholder")} />
          {overlay}
        </PhoneFrame>

        <SecondPhone mode={secondPhone} />
        <SmsPanel state={smsPanel} />
      </div>

      <ToastHost />
    </FlowContext.Provider>
  );
}
