export type RxDrug = {
  code: string;
  name: string;
  dosage: string;
  storeNote: string;
};

export function RxCard({
  rxId,
  doctor,
  patient,
  abha,
  dx,
  drugs,
  onFindStore,
  onAshaVisit,
  onDrugClick,
}: {
  rxId: string;
  doctor: string;
  patient: string;
  abha: string;
  dx: string;
  drugs: RxDrug[];
  onFindStore?: () => void;
  onAshaVisit?: () => void;
  onDrugClick?: (code: string) => void;
}) {
  return (
    <div className="rx-card">
      <div className="rx-top">
        <div className="rx-top-ico" aria-hidden="true">💊</div>
        <div className="rx-top-txt">
          <div className="rt">Prescription · {rxId}</div>
          <div className="rs">{doctor}</div>
        </div>
      </div>
      <div className="rx-patient">
        Patient: {patient} · ABHA: {abha}
      </div>
      <div className="rx-dx">Dx: {dx}</div>
      {drugs.map((d) => (
        <div
          key={d.code}
          className="rx-drug"
          onClick={() => onDrugClick?.(d.code)}
          role={onDrugClick ? "button" : undefined}
          tabIndex={onDrugClick ? 0 : undefined}
        >
          <div className="med-badge">{d.code}</div>
          <div className="rdn">
            {d.name}
            <span className="rdn-link">→ Jan Aushadhi</span>
          </div>
          <div className="rdd">{d.dosage}</div>
        </div>
      ))}
      <div className="rx-footer">
        <button type="button" className="rx-fb p" onClick={onFindStore}>
          🏪 Find Store
        </button>
        <button type="button" className="rx-fb s" onClick={onAshaVisit}>
          🤝 ASHA visit
        </button>
      </div>
    </div>
  );
}
