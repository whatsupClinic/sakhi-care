export type IvrOption = { key: number; label: string };

export function IvrCard({
  number = "1800-180-1234",
  caption = "SakhiCare Helpline · incoming call",
  intro,
  options,
  onPress,
}: {
  number?: string;
  caption?: string;
  intro: string;
  options: IvrOption[];
  onPress: (key: number) => void;
}) {
  return (
    <div className="ivr-card">
      <div className="ivr-top">
        <div className="ivr-icon" aria-hidden="true">📞</div>
        <div>
          <div className="ivr-num">{number}</div>
          <div className="ivr-sub">{caption}</div>
        </div>
      </div>
      <div className="ivr-body">
        <b>{intro}</b>
        <br />
        IVR plays the greeting and asks her to choose:
        {options.map((o) => (
          <button
            key={o.key}
            type="button"
            className="ivr-press"
            onClick={() => onPress(o.key)}
          >
            <strong>{o.key}</strong>
            <span>{o.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
