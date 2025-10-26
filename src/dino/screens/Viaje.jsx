import React from "react";
import BackButton from "../dino/components/BackButton";
import Card from "../dino/components/Card";
import levels from "../dino/theme/levels";

export default function Viaje({ nivel = 1, onBack }) {
  const actual = levels[nivel - 1] || levels[0];

  return (
    <section
      className="app-bg"
      style={{
        backgroundImage: `url(${actual.bg})`,
      }}
    >
      <BackButton onClick={onBack} />

      <h2 style={{ fontFamily: "Cinzel", color: "#E3C06E", margin: "60px 0 16px" }}>
        Tu viaje
      </h2>

      <Card style={{ width: 300, textAlign: "center", background: "rgba(0,0,0,0.4)" }}>
        <p style={{ fontSize: 16, color: "#E3C06E" }}>
          Nivel actual: {actual.name}
        </p>
        <p style={{ fontSize: 14, marginTop: 8, color: "#9AC27B" }}>
          Cada nivel representa una etapa de tu camino 🌿
        </p>
      </Card>
    </section>
  );
}
