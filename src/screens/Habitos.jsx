import React from "react";
import Button from "../dino/components/Button";
import Card from "../dino/components/Card";

export default function Habitos({ puntos, setPuntos }) {
  const habitos = [
    { id: 1, nombre: "Entrenar", puntos: 10 },
    { id: 2, nombre: "Dormir bien", puntos: 10 },
    { id: 3, nombre: "Comer saludable", puntos: 5 },
    { id: 4, nombre: "Leer", puntos: 5 },
    { id: 5, nombre: "Meditar", puntos: 5 },
    { id: 6, nombre: "Evitar distracciones", puntos: 10 },
    { id: 7, nombre: "Planificar el día", puntos: 5 },
    { id: 8, nombre: "Cumplir objetivos", puntos: 10 },
    { id: 9, nombre: "Hacer algo creativo", puntos: 5 },
  ];

  const handleClick = (valor) => {
    setPuntos((prev) => prev + valor);
  };

  return (
    <section
      className="dino-appear"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        background: "rgba(255,255,255,0.4)",
        backdropFilter: "blur(8px)",
      }}
    >
      <h2 style={{ fontFamily: "Poppins", fontSize: 18, marginBottom: 16 }}>
        Tus hábitos de hoy
      </h2>

      {habitos.map((h) => (
        <Card
          key={h.id}
          style={{
            width: 280,
            textAlign: "center",
            padding: "12px 16px",
            animation: "dino-fade-in .4s ease-out both",
          }}
        >
          <div style={{ fontFamily: "Inter", fontSize: 14, marginBottom: 8 }}>
            {h.nombre}
          </div>
          <Button onClick={() => handleClick(h.puntos)}>+{h.puntos} XP</Button>
        </Card>
      ))}

      <div style={{ fontSize: 12, marginTop: 16, color: "#6E6E73" }}>
        Puntos totales: {puntos}
      </div>
    </section>
  );
}
