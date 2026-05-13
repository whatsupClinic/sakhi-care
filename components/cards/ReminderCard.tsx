import type { ReactNode } from "react";

export type ReminderDetail = {
  borderColor: string;
  background: string;
  content: ReactNode;
};

export function ReminderCard({
  accent,
  topBg,
  topLabel,
  body,
  details,
}: {
  accent: string;
  topBg: string;
  topLabel: ReactNode;
  body?: ReactNode;
  details?: ReminderDetail[];
}) {
  return (
    <div className="reminder-card" style={{ borderLeftColor: accent }}>
      <div className="rem-top" style={{ background: topBg }}>
        {topLabel}
      </div>
      <div className="rem-body">
        {body}
        {details?.map((d, i) => (
          <div
            key={i}
            className="rem-detail"
            style={{ borderLeftColor: d.borderColor, background: d.background }}
          >
            {d.content}
          </div>
        ))}
      </div>
    </div>
  );
}
