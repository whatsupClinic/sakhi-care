import Link from "next/link";
import Image from "next/image";

export default function Landing() {
  return (
    <main className="landing">
      <nav className="landing-nav">
        <div className="landing-nav-brand">
          <Image src="/logo.png" alt="" width={26} height={26} priority />
          <span>SakhiCare</span>
        </div>
        <div className="landing-nav-links">
          <a
            href="https://github.com/whatsupClinic/sakhi-care"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <Link href="/demo">Open demo →</Link>
        </div>
      </nav>

      <section className="landing-hero">
        <div className="landing-eyebrow">हर सखी की आवाज़ · हर सखी की सेहत</div>

        <h1 className="landing-title">
          A free doctor in every village,
          <br />
          <span className="underline">one WhatsApp message away.</span>
        </h1>

        <p className="landing-blurb">
          Voice-first triage in Hindi, Marathi, Tamil and English. ABHA-linked
          records, ASHA and Anganwadi follow-up, and thirteen government schemes —
          inside the chat app rural India already uses.
        </p>

        <Link href="/demo" className="landing-cta">
          Open the demo
          <span className="arrow" aria-hidden="true">→</span>
        </Link>
        <a
          className="landing-secondary"
          href="https://github.com/whatsupClinic/sakhi-care"
          target="_blank"
          rel="noreferrer"
        >
          Read the code
        </a>

        <div className="landing-facts">
          <div>
            <strong>8</strong>
            interactive flows
          </div>
          <div>
            <strong>4</strong>
            languages
          </div>
          <div>
            <strong>13</strong>
            govt schemes
          </div>
          <div>
            <strong>₹0</strong>
            to the user
          </div>
        </div>
      </section>

      <footer className="landing-foot">
        <div>
          Prototype ·{" "}
          <a
            href="https://github.com/whatsupClinic/sakhi-care"
            target="_blank"
            rel="noreferrer"
          >
            github.com/whatsupClinic/sakhi-care
          </a>
        </div>
        <div>Not a medical service. No PHI collected.</div>
      </footer>
    </main>
  );
}
