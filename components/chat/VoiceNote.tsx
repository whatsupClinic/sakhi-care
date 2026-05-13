export function VoiceNote({
  seconds,
  played = false,
  transcript,
}: {
  seconds: number;
  played?: boolean;
  transcript?: string;
}) {
  const bars = Array.from({ length: 26 }, (_, i) => {
    const h = 4 + Math.abs(Math.sin(i * 1.3) * 14);
    return (
      <div
        key={i}
        className={`vn-bar${played ? " played" : ""}`}
        style={{ height: `${h}px` }}
      />
    );
  });

  return (
    <>
      <div className="vn-row">
        <div className="vn-mic" aria-hidden="true">▶</div>
        <div className="vn-wave">{bars}</div>
        <span className="vn-time">0:{String(seconds).padStart(2, "0")}</span>
      </div>
      {transcript && (
        <div
          style={{
            fontSize: 11,
            color: "#54656f",
            marginTop: 2,
            fontStyle: "italic",
          }}
        >
          {transcript}
        </div>
      )}
    </>
  );
}
