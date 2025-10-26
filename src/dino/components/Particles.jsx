import React, { useMemo } from "react";

export default function Particles({ count = 10, color = "#F6D673" }) {
  const points = useMemo(() => Array.from({ length: count }).map((_, i) => ({
    top: Math.random() * 100,
    left: Math.random() * 100,
    delay: i * 0.6,
  })), [count]);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      <style>{`@keyframes floatUp{from{transform:translateY(0);opacity:.7}to{transform:translateY(-80vh);opacity:0}}`}</style>
      {points.map((p, i) => (
        <div key={i} style={{
          position: "absolute",
          width: 4,
          height: 4,
          borderRadius: 999,
          background: color,
          opacity: 0.7,
          top: p.top + "%",
          left: p.left + "%",
          animation: `floatUp 6s linear ${p.delay}s infinite`,
        }} />
      ))}
    </div>
  );
}

