"use client";

import { useCallback, useEffect, useReducer, useRef } from "react";
import type { ReactNode } from "react";

export type ChatItem =
  | { kind: "date"; id: string; text: string }
  | { kind: "typing"; id: string }
  | {
      kind: "bubble";
      id: string;
      side: "rx" | "tx";
      content: ReactNode;
      time?: string;
      ticked?: boolean;
      blueTick?: boolean;
      from?: string;
    };

type Action =
  | { type: "reset" }
  | { type: "push"; item: ChatItem }
  | { type: "remove"; id: string };

function reducer(state: ChatItem[], action: Action): ChatItem[] {
  switch (action.type) {
    case "reset":
      return [];
    case "push":
      return [...state, action.item];
    case "remove":
      return state.filter((i) => i.id !== action.id);
  }
}

export function nowTime() {
  const d = new Date();
  return d
    .toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true })
    .replace(" ", "")
    .toLowerCase();
}

let idCounter = 0;
const nextId = () => `chat-${++idCounter}`;

type PushBubbleOpts = {
  side?: "rx" | "tx";
  time?: string;
  ticked?: boolean;
  blueTick?: boolean;
  from?: string;
};

export function useChatEngine() {
  const [items, dispatch] = useReducer(reducer, []);
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    return () => {
      timeouts.current.forEach(clearTimeout);
      timeouts.current = [];
    };
  }, []);

  const reset = useCallback(() => {
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
    dispatch({ type: "reset" });
  }, []);

  const addDate = useCallback((text: string) => {
    dispatch({ type: "push", item: { kind: "date", id: nextId(), text } });
  }, []);

  const addBubble = useCallback((content: ReactNode, opts: PushBubbleOpts = {}) => {
    const id = nextId();
    dispatch({
      type: "push",
      item: {
        kind: "bubble",
        id,
        side: opts.side ?? "rx",
        content,
        time: opts.time ?? nowTime(),
        ticked: opts.ticked ?? (opts.side === "tx"),
        blueTick: opts.blueTick ?? (opts.side === "tx"),
        from: opts.from,
      },
    });
    return id;
  }, []);

  const typing = useCallback(
    (cb: () => void, delay = 700) => {
      const id = nextId();
      dispatch({ type: "push", item: { kind: "typing", id } });
      const t = setTimeout(() => {
        dispatch({ type: "remove", id });
        cb();
      }, delay);
      timeouts.current.push(t);
    },
    [],
  );

  const after = useCallback((delay: number, cb: () => void) => {
    const t = setTimeout(cb, delay);
    timeouts.current.push(t);
  }, []);

  return { items, reset, addDate, addBubble, typing, after };
}
