import React from "react";

export default function Card({ children, style = {}, ...rest }) {
  return (
    <div
      {...rest}
      style={{
        background: "rgba(255,255,255,0.8)",
        border: "1px solid #E5E5EA",
        borderRadius: 16,
        padding: 16,
        boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
        backdropFilter: "blur(10px)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

