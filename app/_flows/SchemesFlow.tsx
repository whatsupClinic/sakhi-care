"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { ChatArea } from "@/components/chat/ChatArea";
import { QuickReplies } from "@/components/chat/QuickReplies";
import { FlowScreen } from "@/components/chat/FlowScreen";
import { AshaCard } from "@/components/cards/AshaCard";
import { SchemeMatchCard } from "@/components/cards/SchemeMatchCard";
import { useChatEngine } from "@/lib/chat-engine";
import { useFlowContext } from "@/lib/flow-context";
import { SCHEMES, SCHEME_CATEGORIES, type Scheme, type SchemeCategory } from "@/lib/schemes";

type BrowserMode = "list" | "detail";

export function SchemesFlow() {
  const engine = useChatEngine();
  const { setOverlay, setHeaderSub } = useFlowContext();
  const [browserOpen, setBrowserOpen] = useState(false);
  const [browserMode, setBrowserMode] = useState<BrowserMode>("list");
  const [activeCat, setActiveCat] = useState<SchemeCategory | "all">("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const askAsha = () => {
    engine.addBubble("✅ Yes, have Sunita do it", { side: "tx" });
    engine.typing(() => {
      engine.addBubble(
        <AshaCard
          name="Notified Sunita Devi ✓"
          role="ASHA · home visit tomorrow 10 AM"
          body={
            <>
              Sunita will be at your home at 10 AM tomorrow. Please keep these ready:
              <div style={{ margin: "7px 0", lineHeight: 1.85, fontSize: 11.5 }}>
                ✓ Aadhaar card
                <br />
                ✓ Bank passbook (Jan Dhan account is fine too)
                <br />
                ✓ MCP / ANC card
                <br />✓ Husband&apos;s Aadhaar (needed for JSY)
              </div>
            </>
          }
          action={
            <>
              📋{" "}
              <div>
                <strong>Form draft saved</strong>
                <br />
                In Sunita&apos;s SakhiCare app — she&apos;ll fill it tomorrow
              </div>
            </>
          }
        />,
        { side: "rx", ticked: false },
      );
    }, 900);
  };

  const askDocs = () => {
    engine.addBubble("📄 What documents do I need?", { side: "tx" });
    engine.typing(() => {
      engine.addBubble(
        <div style={{ fontSize: 12.5, lineHeight: 1.75 }}>
          <b>PMMVY (₹5,000):</b>
          <br />• Aadhaar (yours + husband&apos;s)
          <br />• Bank passbook
          <br />• MCP card
          <br />• LMP date / ultrasound report
          <br />
          <br />
          <b>JSY (₹1,400):</b>
          <br />• Registered BPL family card
          <br />• PHC delivery proof (after delivery)
          <br />
          <br />
          <b>Ayushman Bharat (₹5L cover):</b>
          <br />• Aadhaar + SECC eligibility (auto-checked)
          <br />
          <br />
          💡 Sunita (ASHA) has all the forms — you just need to share the documents.
        </div>,
        { side: "rx", ticked: false },
      );
    }, 800);
  };

  const askAshaForScheme = (s: Scheme) => {
    engine.addBubble(`Help me apply for ${s.name}`, { side: "tx" });
    engine.typing(() => {
      engine.addBubble(
        <AshaCard
          name="Notified Sunita Devi ✓"
          role={`${s.name} application · home visit scheduled`}
          body={
            <>
              Sunita will help you apply for <b>{s.name}</b> during her next visit.
              {s.docs && (
                <>
                  {" "}
                  Keep these ready:
                  <div style={{ margin: "7px 0", lineHeight: 1.85, fontSize: 11.5 }}>
                    {s.docs.map((d) => (
                      <span key={d}>
                        ✓ {d}
                        <br />
                      </span>
                    ))}
                  </div>
                </>
              )}
            </>
          }
          action={
            <>
              📋{" "}
              <div>
                <strong>Application drafted</strong>
                <br />
                {s.apply}
              </div>
            </>
          }
        />,
        { side: "rx", ticked: false },
      );
    }, 800);
  };

  useEffect(() => {
    engine.reset();
    setHeaderSub("online · scheme navigator");
    engine.after(100, () => {
      engine.addDate("Today · Scheme matching");
      engine.addBubble("Show me government schemes I'm eligible for", { side: "tx" });
      engine.typing(() => {
        engine.addBubble(
          <>
            One moment, checking your ABHA profile...
            <div
              style={{
                background: "#f0f2f5",
                borderRadius: 7,
                padding: "8px 11px",
                marginTop: 6,
                fontSize: 11.5,
                lineHeight: 1.6,
              }}
            >
              ABHA: 91-2345-... ✓
              <br />
              Age: 34 · Village: Jhansi (UP)
              <br />
              Status: <b>Pregnant · 16 weeks</b>
            </div>
          </>,
          { side: "rx", from: "SakhiCare · Scheme Navigator", ticked: false },
        );

        engine.after(1600, () => {
          engine.typing(() => {
            engine.addBubble(
              <>
                <SchemeMatchCard
                  totalAmount="₹11,400"
                  totalLabel="cash + ₹5L hospital cover + free services"
                  count={8}
                  rows={[
                    { name: "🤰 PMMVY · Matru Vandana", amount: "₹5,000" },
                    { name: "🏥 JSY · Rural delivery (UP)", amount: "₹1,400" },
                    { name: "🛡️ Ayushman Bharat · PMJAY", amount: "₹5,00,000" },
                    { name: "💊 JSSK · Free delivery + meds", amount: "FREE" },
                    { name: "📅 PMSMA · Free ANC (9th)", amount: "FREE" },
                    { name: "🌸 SUMAN · 14 services", amount: "FREE" },
                    { name: "🥬 POSHAN 2.0 · THR + Calcium", amount: "FREE" },
                    { name: "💉 UIP · Td vaccine (you)", amount: "FREE" },
                  ]}
                  ashaStrip={
                    "Sunita (ASHA) will visit tomorrow morning and fill out all the forms for you."
                  }
                />
                <QuickReplies
                  replies={[
                    {
                      label: "🔍 Explore all 13 schemes",
                      variant: "saffron",
                      onClick: () => {
                        setBrowserMode("list");
                        setActiveCat("all");
                        setBrowserOpen(true);
                      },
                    },
                    {
                      label: "✅ Yes, have Sunita do it",
                      variant: "asha",
                      onClick: askAsha,
                    },
                    {
                      label: "📄 What documents do I need?",
                      onClick: askDocs,
                    },
                  ]}
                />
              </>,
              { side: "rx", ticked: false },
            );
          }, 800);
        });
      }, 700);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!browserOpen) {
      setOverlay(null);
      return;
    }
    if (browserMode === "list") {
      setOverlay(
        <SchemeBrowserList
          activeCat={activeCat}
          onCatChange={setActiveCat}
          onPick={(id) => {
            setSelectedId(id);
            setBrowserMode("detail");
          }}
          onClose={() => setBrowserOpen(false)}
        />,
      );
    } else if (selectedId) {
      setOverlay(
        <SchemeDetail
          scheme={SCHEMES[selectedId]}
          onBack={() => setBrowserMode("list")}
          onClose={() => setBrowserOpen(false)}
          onAskAsha={() => {
            setBrowserOpen(false);
            askAshaForScheme(SCHEMES[selectedId]);
          }}
        />,
      );
    }
    return () => setOverlay(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [browserOpen, browserMode, activeCat, selectedId]);

  return <ChatArea items={engine.items} />;
}

function SchemeBrowserList({
  activeCat,
  onCatChange,
  onPick,
  onClose,
}: {
  activeCat: SchemeCategory | "all";
  onCatChange: (c: SchemeCategory | "all") => void;
  onPick: (id: string) => void;
  onClose: () => void;
}) {
  const items = Object.entries(SCHEMES).filter(
    ([, s]) => activeCat === "all" || s.cat === activeCat,
  );

  return (
    <FlowScreen icon="🏛️" title="Government schemes" onClose={onClose}>
      <div className="fl-title">Schemes for women &amp; children</div>
      <div className="fl-sub">13 schemes · Govt of India · scraped from official sources</div>
      <div className="scheme-cat-row">
        {SCHEME_CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            className={clsx("scheme-cat", activeCat === c.id && "on")}
            onClick={() => onCatChange(c.id)}
          >
            <span aria-hidden="true">{c.icon}</span>
            <span>{c.label}</span>
          </button>
        ))}
      </div>
      <div className="scheme-list">
        {items.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: 24,
              color: "#667781",
              fontSize: 11.5,
            }}
          >
            No schemes in this category yet
          </div>
        ) : (
          items.map(([id, s]) => (
            <button
              key={id}
              type="button"
              className="scheme-list-item"
              onClick={() => onPick(id)}
              style={{ fontFamily: "inherit", textAlign: "left" }}
            >
              <div className="sl-ico" aria-hidden="true">{s.icon}</div>
              <div className="sl-mid">
                <div className="sl-name">{s.name}</div>
                <div className="sl-sub">{s.summary}</div>
              </div>
              <div className={clsx("sl-amt", s.amtClass && s.amtClass)}>{s.amount}</div>
            </button>
          ))
        )}
      </div>
    </FlowScreen>
  );
}

function SchemeDetail({
  scheme: s,
  onBack,
  onClose,
  onAskAsha,
}: {
  scheme: Scheme;
  onBack: () => void;
  onClose: () => void;
  onAskAsha: () => void;
}) {
  return (
    <FlowScreen icon="🏛️" title="Government schemes" onClose={onClose}>
      <div className="scheme-detail-head">
        <button
          type="button"
          className="sd-back"
          onClick={onBack}
          aria-label="Back to list"
        >
          ←
        </button>
        <div className="sd-ico" aria-hidden="true">{s.icon}</div>
        <div className="sd-text">
          <div className="sd-name">{s.name}</div>
          <div className="sd-full">{s.fullName}</div>
          <div className="sd-min">{s.ministry}</div>
        </div>
      </div>
      <div className={clsx("sd-amount-card", s.amtClass)}>
        <div className="sd-amount-big">{s.amount}</div>
        <div className="sd-amount-note">{s.amtNote}</div>
      </div>
      <div style={{ fontSize: 12, color: "#54656f", lineHeight: 1.5, marginBottom: 4 }}>
        {s.summary}
      </div>

      <div className="sd-section">Eligibility</div>
      <ul className="sd-list">
        {s.eligibility.map((e) => (
          <li key={e}>{e}</li>
        ))}
      </ul>

      <div className="sd-section">What you get</div>
      <ul className="sd-list">
        {s.entitlements.map((e) => (
          <li key={e}>{e}</li>
        ))}
      </ul>

      {s.docs && (
        <>
          <div className="sd-section">Documents needed</div>
          <ul className="sd-list docs">
            {s.docs.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </>
      )}

      <div className="sd-meta">
        <span className="sd-meta-k">Apply</span>
        <span className="sd-meta-v">{s.apply}</span>
        {s.helpline && (
          <>
            <span className="sd-meta-k">Helpline</span>
            <span className="sd-meta-v">{s.helpline}</span>
          </>
        )}
        {s.portal && (
          <>
            <span className="sd-meta-k">Portal</span>
            <span className="sd-meta-v">{s.portal}</span>
          </>
        )}
      </div>

      <button type="button" className="sd-cta" onClick={onAskAsha}>
        🤝 Ask Sunita (ASHA) to help with this
      </button>
    </FlowScreen>
  );
}
