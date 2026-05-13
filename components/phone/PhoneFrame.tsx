import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  homeIndicatorDark?: boolean;
  id?: string;
};

export function PhoneFrame({ children, homeIndicatorDark, id }: Props) {
  return (
    <div className="phone" id={id}>
      <div className="phone-btn left mute" />
      <div className="phone-btn left vol-up" />
      <div className="phone-btn left vol-down" />
      <div className="phone-btn right power" />
      <div className="phone-screen">
        <div className="dynamic-island">
          <div className="di-camera" />
          <div className="di-dot" />
        </div>
        <StatusBar />
        {children}
        <div className={`home-indicator${homeIndicatorDark ? " dark" : ""}`} />
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="status-bar">
      <div className="sb-time">9:41</div>
      <div className="sb-icons">
        <div className="sb-signal">
          <i /><i /><i /><i />
        </div>
        <svg className="sb-wifi" width="15" height="11" viewBox="0 0 15 11" fill="none" aria-hidden="true">
          <path d="M7.5 1.5C9.7 1.5 11.7 2.3 13.2 3.7L14 2.9C12.3 1.2 10 0.3 7.5 0.3S2.7 1.2 1 2.9L1.8 3.7C3.3 2.3 5.3 1.5 7.5 1.5Z" fill="white" />
          <path d="M7.5 4.5C8.9 4.5 10.2 5 11.2 6L12 5.2C10.8 4 9.2 3.3 7.5 3.3S4.2 4 3 5.2L3.8 6C4.8 5 6.1 4.5 7.5 4.5Z" fill="white" />
          <path d="M7.5 7.5C8.1 7.5 8.6 7.7 9 8.1L9.8 7.3C9.2 6.7 8.4 6.3 7.5 6.3S5.8 6.7 5.2 7.3L6 8.1C6.4 7.7 6.9 7.5 7.5 7.5Z" fill="white" />
          <circle cx="7.5" cy="9.5" r="0.9" fill="white" />
        </svg>
        <div className="sb-battery"><i /></div>
      </div>
    </div>
  );
}
