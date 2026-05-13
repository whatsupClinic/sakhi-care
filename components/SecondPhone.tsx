"use client";

import type { ReactNode } from "react";
import { PhoneFrame } from "@/components/phone/PhoneFrame";

export type SecondPhoneMode =
  | { kind: "hidden" }
  | { kind: "doctor"; patient: string; doctor: string; children: ReactNode }
  | { kind: "asha"; urgent?: boolean; children: ReactNode };

export function SecondPhone({ mode }: { mode: SecondPhoneMode }) {
  if (mode.kind === "hidden") return null;

  return (
    <div className="second-phone-wrap">
      <PhoneFrame id="second-phone">
        <div className="second-content">
          {mode.kind === "doctor" ? (
            <>
              <div className="eka-hdr">
                <div className="eka-logo" aria-hidden="true">🩺</div>
                <div>
                  <div className="eka-title">Eka.care · SakhiCare DocAssist</div>
                  <div className="eka-sub">
                    {mode.doctor} · viewing {mode.patient}
                  </div>
                </div>
                <div className="eka-badge">● AI ON</div>
              </div>
              <div className="eka-body">{mode.children}</div>
            </>
          ) : (
            <>
              <div className="asha-hdr">
                <div className="asha-logo" aria-hidden="true">S</div>
                <div>
                  <div className="asha-h-title">Sunita Devi · ASHA</div>
                  <div className="asha-h-sub">NHM · Jhansi Block · 0.8 km</div>
                </div>
                <div className="asha-h-badge">
                  {mode.urgent ? "🚨 URGENT" : "● ON DUTY"}
                </div>
              </div>
              <div className="asha-feed">{mode.children}</div>
            </>
          )}
        </div>
      </PhoneFrame>
    </div>
  );
}
