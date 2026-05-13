export type DispatchChannel = {
  icon: string;
  title: string;
  detail: string;
  variant?: "default" | "asha";
  onClick?: () => void;
};

export function EmergencyDispatchCard({
  channels,
  tip,
}: {
  channels: DispatchChannel[];
  tip?: string;
}) {
  return (
    <div className="er-card">
      <div className="er-top">🚨 PARALLEL DISPATCH · 3 CHANNELS</div>
      <div className="er-body">
        <b>Savitri,</b> help is coming — we&apos;ve alerted three places at once.
        {channels.map((c, i) => (
          <div
            key={i}
            className={`er-action${c.variant === "asha" ? " asha" : ""}`}
            onClick={c.onClick}
            role={c.onClick ? "button" : undefined}
            tabIndex={c.onClick ? 0 : undefined}
          >
            <span aria-hidden="true">{c.icon}</span>
            <div>
              <strong>{c.title}</strong>
              <br />
              {c.detail}
            </div>
          </div>
        ))}
      </div>
      {tip && <div className="er-tip">{tip}</div>}
    </div>
  );
}
