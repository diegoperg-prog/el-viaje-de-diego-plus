import React from "react";
import Card from "./Card";

export default function Modal({ open, onClose, title, children }) {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
      }}
    >
      <Card
        style={{
          width: 320,
          maxWidth: "90%",
          cursor: "default",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <h3
            style={{
              margin: "0 0 8px 0",
              fontFamily: "Poppins, system-ui",
              fontSize: 18,
            }}
          >
            {title}
          </h3>
        )}
        <div style={{ fontSize: 14 }}>{children}</div>
      </Card>
    </div>
  );
}

