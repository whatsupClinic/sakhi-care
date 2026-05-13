"use client";

import { useEffect, useRef } from "react";
import type { ChatItem } from "@/lib/chat-engine";

export function ChatArea({ items }: { items: ChatItem[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const t = setTimeout(() => {
      el.scrollTop = el.scrollHeight;
    }, 50);
    return () => clearTimeout(t);
  }, [items]);

  return (
    <div className="wa-chat" ref={ref}>
      {items.map((item) => {
        if (item.kind === "date") {
          return (
            <div key={item.id} className="chat-date">
              <span>{item.text}</span>
            </div>
          );
        }
        if (item.kind === "typing") {
          return (
            <div key={item.id} className="typing-bubble" aria-label="Typing">
              <div className="tdot" />
              <div className="tdot" />
              <div className="tdot" />
            </div>
          );
        }
        return (
          <div key={item.id} className={`bbl ${item.side}`}>
            {item.from && <div className="bbl-from">{item.from}</div>}
            {item.content}
            {item.time && (
              <div className="bbl-meta">
                <span className="bbl-time">{item.time}</span>
                {item.ticked && (
                  <span className={`tick${item.blueTick ? " blue" : ""}`}>✓✓</span>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
