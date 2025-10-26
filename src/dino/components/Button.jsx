import React from "react";

export default function Button({ children, kind = "primary", style = {}, ...rest }) {
  const variants = {
    primary: {
      background: "linear-gradient(180deg, #E6B450, #FFF5E1)",
      color: "#1C1C1E",
      border: "1px solid #E5E5EA",
    },
  };
  return (
    <button
      {...rest}
      style={{
        padding: "14px 16px",
        borderRadius: 14,
        fontFamily: "Poppins, system-ui",
        fontSize: 14,
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
        cursor: "pointer",
        ...variants[kind],
        ...style,
      }}
    >
      {children}
    </button>
  );
}

