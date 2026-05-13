import clsx from "clsx";
import type { ReactNode } from "react";

export type QuickReply = {
  label: ReactNode;
  onClick: () => void;
  variant?: "default" | "saffron" | "asha";
};

export function QuickReplies({
  replies,
  style,
}: {
  replies: QuickReply[];
  style?: React.CSSProperties;
}) {
  return (
    <div className="qr-wrap" style={style}>
      {replies.map((r, i) => (
        <button
          key={i}
          type="button"
          className={clsx("qr-btn", r.variant === "saffron" && "saffron", r.variant === "asha" && "asha")}
          onClick={r.onClick}
        >
          {r.label}
        </button>
      ))}
    </div>
  );
}
