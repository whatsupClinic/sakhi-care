type Props = {
  subtitle: string;
  onBack?: () => void;
};

export function WhatsAppHeader({ subtitle, onBack }: Props) {
  return (
    <div className="wa-hdr">
      <button
        type="button"
        className="wa-hdr-back"
        onClick={onBack}
        aria-label="Back"
      >
        ‹
      </button>
      <div className="wa-hdr-av" aria-hidden="true">
        स
      </div>
      <div className="wa-hdr-info">
        <div className="wa-hdr-name">
          SakhiCare <span className="wa-verified" aria-label="Verified business">✓</span>
        </div>
        <div className="wa-hdr-sub">{subtitle}</div>
      </div>
      <div className="wa-hdr-icons" aria-hidden="true">
        <span>📹</span>
        <span>📞</span>
      </div>
    </div>
  );
}
