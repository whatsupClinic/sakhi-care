"use client";

import { toast } from "@/components/Toast";

export function InputBar({ placeholder = "Message" }: { placeholder?: string }) {
  return (
    <div className="wa-input-bar">
      <div className="wa-inp-pill">
        <button
          type="button"
          className="wa-emoji-btn"
          aria-label="Emoji"
          onClick={() => toast("Emoji picker")}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9.2" />
            <circle cx="9" cy="10" r="0.9" fill="currentColor" />
            <circle cx="15" cy="10" r="0.9" fill="currentColor" />
            <path d="M8.2 14.2c1 1.6 2.4 2.4 3.8 2.4s2.8-0.8 3.8-2.4" />
          </svg>
        </button>
        <div className="wa-inp-fake">{placeholder}</div>
        <div className="wa-inline-icons">
          <button
            type="button"
            className="wa-inline-btn"
            aria-label="Attach"
            onClick={() =>
              toast("Attach: Document · Camera · Gallery · Audio · Location · Contact")
            }
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20.5 11.5L11.6 20.4a5.4 5.4 0 0 1-7.6-7.6L13.5 3.3a3.6 3.6 0 0 1 5.1 5.1L9.4 17.6a1.8 1.8 0 0 1-2.5-2.5L14.5 7.4" />
            </svg>
          </button>
          <button
            type="button"
            className="wa-inline-btn"
            aria-label="Camera"
            onClick={() => toast("Camera")}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 8.5h3.2l1.4-2h8.8l1.4 2H21a1.5 1.5 0 0 1 1.5 1.5V18a1.5 1.5 0 0 1-1.5 1.5H3A1.5 1.5 0 0 1 1.5 18V10A1.5 1.5 0 0 1 3 8.5z" />
              <circle cx="12" cy="13.5" r="3.5" />
            </svg>
          </button>
        </div>
      </div>
      <button
        type="button"
        className="wa-send-btn"
        aria-label="Voice message"
        onClick={() => toast("Hold to record voice note")}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="9" y="3" width="6" height="11" rx="3" />
          <path d="M5.5 11a6.5 6.5 0 0 0 13 0" />
          <line x1="12" y1="17.5" x2="12" y2="21" />
          <line x1="9" y1="21" x2="15" y2="21" />
        </svg>
      </button>
    </div>
  );
}
