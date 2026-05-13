import Link from "next/link";
import Image from "next/image";

export default function Landing() {
  return (
    <main className="landing">
      <nav className="landing-nav">
        <div className="landing-nav-brand">
          <Image src="/logo.png" alt="" width={36} height={36} priority />
          <span>SakhiCare</span>
        </div>
        <div className="landing-nav-links">
          <a href="https://github.com/whatsupClinic/sakhi-care" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <Link href="/demo">Live demo</Link>
        </div>
      </nav>

      <section className="landing-hero">
        <Image
          src="/logo.png"
          alt="SakhiCare logo"
          width={220}
          height={220}
          priority
          className="landing-logo"
        />

        <div className="landing-eyebrow">WhatsApp Telemedicine · Rural Women&apos;s Health</div>

        <h1 className="landing-title">
          A free doctor in <span className="accent">every village</span>,
          <br />
          one WhatsApp message away.
        </h1>

        <p className="landing-tagline">हर सखी की आवाज़ · हर सखी की सेहत</p>

        <p className="landing-blurb">
          Voice-first triage in Hindi, Marathi, Tamil, and English. ABHA-linked records,
          ASHA &amp; Anganwadi follow-up, and 13 government schemes — all inside the chat
          app rural India already uses.
        </p>

        <Link href="/demo" className="landing-cta">
          Launch interactive demo
          <span className="landing-cta-arrow" aria-hidden="true">→</span>
        </Link>

        <div className="landing-meta">
          <span className="dot" aria-hidden="true" />
          8 flows · 4 languages · no signup · ₹0
        </div>

        <div className="landing-pills">
          <span className="landing-pill">🤰 <strong>PMMVY</strong> ₹5,000</span>
          <span className="landing-pill">🛡️ <strong>Ayushman Bharat</strong> ₹5L</span>
          <span className="landing-pill">🏥 JSY · JSSK · PMSMA · SUMAN</span>
          <span className="landing-pill">🥬 POSHAN 2.0</span>
          <span className="landing-pill">💉 UIP / Indradhanush</span>
          <span className="landing-pill">📞 181 · 108 · 1098</span>
        </div>
      </section>

      <section className="landing-features">
        <article className="landing-feature">
          <div className="landing-feature-ico" aria-hidden="true">💬</div>
          <h3>Voice-first, multilingual</h3>
          <p>
            Bhashini ASR captures voice notes in 4 languages. No app to install, no
            account to make.
          </p>
        </article>
        <article className="landing-feature">
          <div className="landing-feature-ico" aria-hidden="true">👩‍⚕️</div>
          <h3>PHC + e-Rx + ABHA</h3>
          <p>
            Routes to PHC doctor in &lt; 6 min. AI-assisted prescriptions via Eka.care.
            Records auto-saved to ABHA.
          </p>
        </article>
        <article className="landing-feature">
          <div className="landing-feature-ico" aria-hidden="true">🤝</div>
          <h3>ASHA + Anganwadi loop</h3>
          <p>
            Real human follow-up. D+1 home visit, D+3 check-in, D+14 nutrition session
            — coordinated end-to-end.
          </p>
        </article>
        <article className="landing-feature">
          <div className="landing-feature-ico" aria-hidden="true">🏛️</div>
          <h3>Scheme navigator</h3>
          <p>
            Auto-matches 13 govt women-and-child schemes from NHM, WCD, MoHFW. ASHA
            files the paperwork for you.
          </p>
        </article>
        <article className="landing-feature">
          <div className="landing-feature-ico" aria-hidden="true">🚨</div>
          <h3>Emergency parallel dispatch</h3>
          <p>
            Red-flag keywords bypass the LLM. Sends 108 + ASHA (0.8 km) + PHC at once.
            Average response: 8 min.
          </p>
        </article>
        <article className="landing-feature">
          <div className="landing-feature-ico" aria-hidden="true">☎️</div>
          <h3>Works on feature phones</h3>
          <p>
            IVR helpline at <code>1800-180-1234</code> deflects to WhatsApp via SMS
            click-to-chat. Nobody left out.
          </p>
        </article>
      </section>

      <footer className="landing-foot">
        <div>
          SakhiCare ·{" "}
          <a
            href="https://github.com/whatsupClinic/sakhi-care"
            target="_blank"
            rel="noreferrer"
          >
            github.com/whatsupClinic/sakhi-care
          </a>
        </div>
        <div>Prototype · Not a real medical service · No PHI collected.</div>
      </footer>
    </main>
  );
}
