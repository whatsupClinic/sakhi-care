"use client";

import { useEffect, useState } from "react";

let externalShow: ((msg: string) => void) | null = null;

export function toast(msg: string) {
  externalShow?.(msg);
}

export function ToastHost() {
  const [msg, setMsg] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    externalShow = (m: string) => {
      setMsg(m);
      setVisible(true);
    };
    return () => {
      externalShow = null;
    };
  }, []);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(t);
  }, [visible, msg]);

  if (!msg) return null;
  return (
    <div className={`sk-toast${visible ? " show" : ""}`} role="status" aria-live="polite">
      {msg}
    </div>
  );
}
