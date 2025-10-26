import React from "react";

export default function XPBar({ value = 0.5, from = "#3E7C59", to = "#F6D673" }) {
  const pct = Math.max(0, Math.min(1, value)) * 100;
  return (
    <div style={{ width: "75%", height: 8, background: "#D1D1D6", borderRadius: 999, overflow: "hidden" }}>
      <div
        style={{
          width: pct + "%",
          height: "100%",
          background: `linear-gradient(90deg, ${from}, ${to})`,
          transition: "width 400ms ease-in-out",
        }}
      />
    </div>
  );
}

