import React from "react";
import Card from "../dino/components/Card";

export default function Estadisticas({ historial = [] }) {
  const dias = historial.length || 7;

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "32px 0",
      }}
    >
      <h2 style={{ fontFamily: "Poppins", fontSize: 18, marginBottom: 16 }}>
        Estadísticas semanales
      </h2>

      <Card style={{ width: 300, textAlign: "center" }}>
        <p style={{ fontSize: 14, marginBottom: 4 }}>
          Días registrados: {dias}
        </p>
        <p style={{ fontSize: 14 }}>Promedio diario: {(dias * 10).toFixed(0)} XP</p>
        <p style={{ fontSize: 12, color: "#6E6E73", marginTop: 12 }}>
          (Gráfico en desarrollo)
        </p>
      </Card>
    </section>
  );
}
