import React from "react";

/**
 * Card medieval — para mostrar hábitos, estadísticas o textos.
 * Usa bordes biselados, textura pergamino y sombras suaves.
 */
export default function Card({ children, style }) {
  return (
    <div
      className="card-medieval"
      style={style}
    >
      {children}
    </div>
  );
}
