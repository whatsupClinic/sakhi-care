# SakhiCare

> _Har Sakhi ki Awaaz · Har Sakhi ki Sehat_

Interactive demo of **SakhiCare** — a WhatsApp-first telemedicine platform for rural Indian women's health. Ported from a single-file HTML prototype to Next.js 16 + Tailwind v4, deployable on Vercel.

This is a **visual prototype**, not a real product. No real WhatsApp, ABHA, AI, or auth — every flow is a hand-crafted narrative on top of a phone-mockup UI. Built for pitch / demo audiences.

## What's inside

8 interactive flows surfaced from a left-side rail:

| # | Flow | What it shows |
|---|------|---------------|
| 1 | **Consult** | Voice-note triage → quick replies → PHC doctor queue |
| 2 | **Phone bridge** | Feature-phone IVR (1800-180-1234) → SMS click-to-chat → WhatsApp |
| 3 | **Intake** | 3-step bottom-sheet form: 9 categories → symptoms → duration/severity |
| 4 | **PHC e-Rx** | Patient phone + doctor's Eka.care DocAssist view (AI drug suggestions, send to WhatsApp) |
| 5 | **ASHA & Anganwadi** | D+1 home visit, D+3 check-in, D+14 Anganwadi nutrition session, three-worker care network |
| 6 | **ABHA vault** | Past Rx, lab, ANC, USG, vaccine — DPDPA 2023 framing |
| 7 | **Scheme navigator** | Auto-matches 13 govt schemes (PMMVY, JSY, JSSK, PMSMA, SUMAN, PMJAY, POSHAN 2.0, RBSK, UIP, SSY, BBBP, 181, OSC) + browser + per-scheme detail |
| 8 | **Emergency** | Voice → red-flag → parallel dispatch (108 + ASHA + PHC) + urgent SMS panel + ASHA's urgent feed |

## Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19**, **TypeScript 5**
- **Tailwind v4** (only as a base — most styling lives in `app/globals.css` with the prototype's authored CSS preserved)
- No backend, no database — all client state

## Run locally

```bash
npm install
npm run dev
# → http://localhost:3000
```

```bash
npm run lint      # ESLint
npm run build     # production build
npm start         # serve production build
```

## Deploy to Vercel

```bash
npm i -g vercel
vercel             # first run — link + deploy preview
vercel --prod      # production
```

Project config lives in `vercel.ts` (TypeScript-typed via `@vercel/config`).

## Project layout

```
app/
  layout.tsx           Root layout (fonts, metadata)
  globals.css          Design tokens + ported prototype CSS
  page.tsx             Main mock UI (sidebar + phone stage)
  _flows/              One file per flow
    ConsultFlow.tsx
    PhoneBridgeFlow.tsx
    IntakeFlow.tsx
    RxFlow.tsx
    AshaFlow.tsx
    RecordsFlow.tsx
    SchemesFlow.tsx
    EmergencyFlow.tsx
components/
  phone/               iPhone chrome + WhatsApp header + input bar
  chat/                ChatArea, FlowScreen overlay, QuickReplies, VoiceNote
  cards/               ASHA / Anganwadi / Rx / Scheme / Emergency / IVR / SMS / Reminder / Confirm
  Sidebar.tsx          Left-rail flow picker
  InfoStrip.tsx        Top-right contextual info + EN/HI/MR/TA tabs
  BrandStrip.tsx       Bottom-left tagline
  SecondPhone.tsx      Doctor (Eka.care) / ASHA (urgent feed) second phone
  SmsPanel.tsx         Floating SMS preview (used by phone-bridge + emergency)
  Toast.tsx            Bottom-center toast
lib/
  schemes.ts           13-scheme database (verbatim from prototype)
  flow-info.ts         Sidebar tooltips, info-strip copy, sidebar item list
  chat-engine.ts       useChatEngine() — bubble queue, typing, sequenced timing
  flow-context.ts      FlowContext (goTo, setHeaderSub, setSecondPhone, setSmsPanel, setOverlay)
```

## Languages

EN is fully implemented. HI / MR / TA tabs are visible — selecting one toasts "coming soon" and stays on English. Wire them up in `lib/flow-info.ts` and each flow's string literals when ready.

## What's intentionally fake

- No WhatsApp Business API
- No Bhashini / Eka.care / ABHA integrations
- No backend, no auth, no persistence
- "Emergency keyword bypass · CCIM §4.5" is a label — there's no keyword scanner
- Scheme matching is hard-coded for "16 weeks pregnant, UP" — not a rules engine

If you want any of these to be real, that's a separate project (likely 2–3 months of work including WABA approval and NHA Sandbox onboarding).

## Credits

Domain content (scheme eligibility / entitlements / helplines / portals) is drawn from official sources: NHM, WCD, MoHFW, NHA, India Post, and PIB releases — all preserved from the original prototype.
