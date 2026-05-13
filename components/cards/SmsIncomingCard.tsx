export function SmsIncomingCard({
  from,
  body,
  link,
  ctaLabel,
  onCtaClick,
}: {
  from: string;
  body: string;
  link: string;
  ctaLabel: string;
  onCtaClick: () => void;
}) {
  return (
    <div className="sms-incoming">
      <div className="smsi-top">📱 SMS RECEIVED · {from}</div>
      <div className="smsi-body">
        {body}
        <br />
        <span className="smsi-link">{link}</span>
        <button
          type="button"
          className="smsi-cta"
          onClick={onCtaClick}
          style={{ border: "none", width: "100%", fontFamily: "inherit" }}
        >
          {ctaLabel}
        </button>
      </div>
    </div>
  );
}
