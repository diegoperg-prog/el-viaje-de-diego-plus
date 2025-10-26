import React from "react";

export default function BackButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="btn-back"
      aria-label="Volver al inicio"
    >
      ← Volver
    </button>
  );
}
