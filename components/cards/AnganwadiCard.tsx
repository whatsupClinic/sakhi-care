import type { ReactNode } from "react";

export function AnganwadiCard({
  name,
  role,
  initial,
  body,
  action,
  onActionClick,
}: {
  name: string;
  role: string;
  initial: string;
  body: ReactNode;
  action?: ReactNode;
  onActionClick?: () => void;
}) {
  return (
    <div className="angan-card">
      <div className="angan-top">
        <div className="angan-av" aria-hidden="true">{initial}</div>
        <div>
          <div className="angan-name">{name}</div>
          <div className="angan-role">{role}</div>
        </div>
      </div>
      <div className="angan-body">
        {body}
        {action && (
          <div
            className="angan-action"
            onClick={onActionClick}
            role={onActionClick ? "button" : undefined}
            tabIndex={onActionClick ? 0 : undefined}
          >
            {action}
          </div>
        )}
      </div>
    </div>
  );
}
