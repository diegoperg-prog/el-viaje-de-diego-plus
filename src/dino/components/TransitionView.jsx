import React, { useEffect, useState } from "react";

/**
 * TransitionView envuelve cualquier pantalla
 * y agrega animaciones tipo iOS al cambiar de vista.
 *
 * Props:
 * - keyProp: string (para identificar cada vista)
 * - children: contenido de la vista
 */
export default function TransitionView({ keyProp, children }) {
  const [prev, setPrev] = useState(children);
  const [displayed, setDisplayed] = useState(children);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (children !== prev) {
      setAnimating(true);
      setPrev(children);
      const timer = setTimeout(() => {
        setDisplayed(children);
        setAnimating(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [children, prev]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <div
        key={keyProp + "-old"}
        style={{
          position: "absolute",
          inset: 0,
          opacity: animating ? 0 : 1,
          transform: animating ? "translateX(-10px)" : "translateX(0)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
        }}
      >
        {displayed}
      </div>
      {animating && (
        <div
          key={keyProp + "-new"}
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0,
            transform: "translateX(20px)",
            animation: "slideIn 0.4s forwards ease",
          }}
        >
          {children}
        </div>
      )}
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
