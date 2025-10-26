import React from "react";
import levels from "../dino/theme/levels";
import Card from "../dino/components/Card";

export default function Viaje({ nivel = 1 }) {
  const actual = levels[nivel - 1];

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(180deg, ${actual.from}, ${actual.to})`,
        color: actual.text,
        textAlign: "center",
      }}
    >
      <h2 style={{ fontFamily: "Poppins", fontSize: 20, marginBottom: 8 }}>
        Tu viaje
      </h2>
      <Card style={{ width: 300, background: "rgba(255,255,255,0.8)" }}>
        <p style={{ fontSize: 14 }}>Nivel actual: {actual.name}</p>
        <p style={{ fontSize: 12, marginTop: 8 }}>
          Cada nivel refleja tu constancia y progreso 🌱
        </p>
      </Card>
    </section>
  );
}
