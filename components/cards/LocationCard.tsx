"use client";

import { toast } from "@/components/Toast";

type Props = {
  lat: number;
  lng: number;
  name: string;
  addr: string;
  icon?: string;
  distance?: string;
};

export function LocationCard({ lat, lng, name, addr, icon = "📍", distance }: Props) {
  const staticUrl = `https://staticmap.openstreetmap.de/staticmap.php?center=${lat},${lng}&zoom=15&size=400x180&maptype=mapnik&markers=${lat},${lng},red-pushpin`;
  const directionsUrl = `https://www.openstreetmap.org/directions?to=${lat}%2C${lng}#map=16/${lat}/${lng}`;

  const onClick = () => {
    window.open(directionsUrl, "_blank", "noopener,noreferrer");
    toast("Opening directions in OpenStreetMap");
  };

  return (
    <button
      type="button"
      className="loc-card"
      onClick={onClick}
      aria-label={`Open directions to ${name}`}
    >
      <div className="loc-map">
        {/* External static map; falls back to gradient if the host blocks it. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          loading="lazy"
          alt=""
          src={staticUrl}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        <div className="loc-pin" aria-hidden="true">
          <svg viewBox="0 0 32 40" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16 0 C7 0 0 7 0 16 c0 11 16 24 16 24 s16-13 16-24 C32 7 25 0 16 0 z"
              fill="#E8743D"
            />
            <circle cx="16" cy="15" r="6" fill="#fff" />
          </svg>
        </div>
      </div>
      <div className="loc-meta">
        <div className="loc-meta-ico" aria-hidden="true">
          {icon}
        </div>
        <div className="loc-meta-text">
          <div className="loc-meta-name">{name}</div>
          <div className="loc-meta-addr">
            {addr}
            {distance ? ` · ${distance}` : ""}
          </div>
        </div>
        <div className="loc-meta-go" aria-hidden="true">
          ▸
        </div>
      </div>
    </button>
  );
}
