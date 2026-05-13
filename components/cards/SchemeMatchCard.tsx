export type SchemeMatchRow = {
  name: string;
  amount: string;
};

export function SchemeMatchCard({
  totalAmount,
  totalLabel,
  count,
  rows,
  ashaStrip,
}: {
  totalAmount: string;
  totalLabel: string;
  count: number;
  rows: SchemeMatchRow[];
  ashaStrip: string;
}) {
  return (
    <div className="scheme-card">
      <div className="scheme-top">
        <div>
          <div className="scheme-label">YOU QUALIFY FOR</div>
          <div className="scheme-amount">{totalAmount}</div>
          <div className="scheme-label">{totalLabel}</div>
        </div>
        <div style={{ textAlign: "right", fontSize: 11, opacity: 0.9 }}>
          {count} schemes
          <br />
          matched
        </div>
      </div>
      <div className="scheme-body">
        {rows.map((r, i) => (
          <div key={i} className="scheme-row">
            <span className="sch-name">{r.name}</span>
            <span className="sch-amt">{r.amount}</span>
          </div>
        ))}
      </div>
      <div className="scheme-asha-strip">🤝 {ashaStrip}</div>
    </div>
  );
}
