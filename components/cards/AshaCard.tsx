import type { ReactNode } from "react";

export function AshaCard({
  name = "Sunita Devi",
  role = "ASHA · NHM-certified · Jhansi",
  initial = "S",
  body,
  tags,
  action,
  onActionClick,
}: {
  name?: string;
  role?: string;
  initial?: string;
  body: ReactNode;
  tags?: string[];
  action?: ReactNode;
  onActionClick?: () => void;
}) {
  return (
    <div className="asha-card">
      <div className="asha-top">
        <div className="asha-av" aria-hidden="true">{initial}</div>
        <div>
          <div className="asha-name">{name}</div>
          <div className="asha-role">{role}</div>
        </div>
      </div>
      <div className="asha-body">
        {body}
        {tags && tags.length > 0 && (
          <div className="asha-tags">
            {tags.map((t) => (
              <span key={t} className="asha-tag">
                {t}
              </span>
            ))}
          </div>
        )}
        {action && (
          <div
            className="asha-action"
            onClick={onActionClick}
            role={onActionClick ? "button" : undefined}
            tabIndex={onActionClick ? 0 : undefined}
            onKeyDown={(e) => {
              if (onActionClick && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault();
                onActionClick();
              }
            }}
          >
            {action}
          </div>
        )}
      </div>
    </div>
  );
}
