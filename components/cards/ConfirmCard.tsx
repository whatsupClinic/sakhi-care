import type { ReactNode } from "react";

export type ConfirmRow = { label: string; value: ReactNode };

export function ConfirmCard({
  icon = "✅",
  title,
  detail,
  rows,
  footer,
}: {
  icon?: string;
  title: string;
  detail?: ReactNode;
  rows: ConfirmRow[];
  footer?: ReactNode;
}) {
  return (
    <div className="confirm-card">
      <div className="cc-head">
        <div className="cc-ico" aria-hidden="true">{icon}</div>
        <div className="cc-title">{title}</div>
      </div>
      {detail && <div className="cc-detail">{detail}</div>}
      {rows.map((r, i) => (
        <div key={i} className="cc-row">
          <span>{r.label}</span>
          <strong>{r.value}</strong>
        </div>
      ))}
      {footer && <div className="cc-foot">{footer}</div>}
    </div>
  );
}
