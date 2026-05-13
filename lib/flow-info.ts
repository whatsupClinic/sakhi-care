export type FlowName =
  | "consult"
  | "phone"
  | "intake"
  | "rx"
  | "asha"
  | "records"
  | "schemes"
  | "emergency";

export type FlowInfo = {
  title: string;
  body: string;
};

export const FLOW_INFO: Record<FlowName, FlowInfo> = {
  consult: {
    title: "FREE CONSULTATION",
    body:
      "Voice-first multilingual triage via Bhashini ASR + Eka Care LLM. Routes to PHC, ASHA, or Anganwadi based on intent. Cost to user: <code>Rs.0</code>.",
  },
  phone: {
    title: "PHONE → WHATSAPP BRIDGE",
    body:
      "74% of rural women on WhatsApp but 38% still use feature phones. IVR helpline <code>1800-180-1234</code> deflects to WhatsApp via SMS click-to-chat.",
  },
  intake: {
    title: "9-CATEGORY INTAKE",
    body:
      "Conversational case-taking across 9 women's health categories — Menstrual, PCOS, Pregnancy, Anaemia, Nutrition, Skin, Mental, Postpartum, Other. ICMR-grounded.",
  },
  rx: {
    title: "PHC + e-RX · ABHA-LINKED",
    body:
      "Dr. Pillai prescribes from Eka.care DocAssist. IFA + Folic Acid for anaemia. Rx auto-pushed to patient WhatsApp; deep links to Jan Aushadhi store locator.",
  },
  asha: {
    title: "ASHA + ANGANWADI FOLLOW-UP",
    body:
      "Replaces SakhiDidi mentorship with NHM-certified ASHA workers + ICDS Anganwadi sevikas — the only statutory community health workers in rural India.",
  },
  records: {
    title: "ABHA HEALTH VAULT",
    body:
      "NDHM/ABHA-linked records on Eka.care. Past prescriptions, ANC visits, lab uploads, vaccination — all retrievable on WhatsApp.",
  },
  schemes: {
    title: "SCHEME NAVIGATOR",
    body:
      "Auto-matches 13 women-and-child schemes from <code>NHM</code>, <code>WCD</code>, <code>MoHFW</code>: PMMVY, JSY, JSSK, PMSMA, SUMAN, PMJAY, POSHAN 2.0, RBSK, UIP, SSY, BBBP, OSC. Source: <code>nhm.gov.in</code>, <code>wcd.gov.in</code>, <code>pmjay.gov.in</code>.",
  },
  emergency: {
    title: "EMERGENCY RED-FLAG",
    body:
      "Hard-coded keyword bypass before LLM (CCIM §4.5). Parallel dispatch: <code>108</code> ambulance + ASHA (0.8km) + PHC. Average response: 8 min.",
  },
};

export const SIDEBAR_ITEMS: Array<
  | { id: FlowName; icon: string; tip: string }
  | { id: "divider" }
> = [
  { id: "consult", icon: "💬", tip: "Free Consultation" },
  { id: "phone", icon: "☎️", tip: "Feature-phone Bridge" },
  { id: "intake", icon: "📋", tip: "9-Category Intake" },
  { id: "divider" },
  { id: "rx", icon: "👩‍⚕️", tip: "PHC + e-Rx (ABHA)" },
  { id: "asha", icon: "🤝", tip: "ASHA & Anganwadi Follow-up" },
  { id: "records", icon: "📁", tip: "ABHA Health Vault" },
  { id: "divider" },
  { id: "schemes", icon: "🏛️", tip: "Scheme Navigator" },
  { id: "emergency", icon: "🚨", tip: "Emergency Triage" },
];
