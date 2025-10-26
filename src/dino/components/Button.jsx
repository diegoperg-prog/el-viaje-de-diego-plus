import React from "react";

/**
 * Botón medieval dorado
 * Mantiene coherencia con los botones principales del menú.
 */
export default function Button({ children, onClick, style }) {
  return (
    <button
      onClick={onClick}
      className="btn-medieval"
      style={style}
    >
      {children}
    </button>
  );
}
