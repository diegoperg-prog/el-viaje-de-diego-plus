import React from "react";
import BackButton from "../dino/components/BackButton";
import Card from "../dino/components/Card";
import levels from "../dino/theme/levels";

export default function Estadisticas({ historial = [], onBack }) {
  const currentLevel = levels[0];

  return (
    <section
      className="app-bg"
      style={{
        backgroundImage: `url(${currentLevel.bg})`,
      }}
    >
      <BackButton onClick={onBack} />
      <h2 style={{ fontFamily: "Cinzel", color: "#E3C06E", margin: "60px 0 16px" }}>
        Estadísticas
      </h2>

      <Card style={{ width: 300, textAlign: "center" }}>
        <p style={{ fontSize: 14 }}>Días registrados: {historial.length || 7}</p>
        <p style={{ fontSize: 14 }}>
          Promedio diario: {(historial.length * 10).toFixed(0)} XP
        </p>
        <p style={{ fontSize: 12, color: "#9AC27B", marginTop: 12 }}>
          Próximamente: gráfico visual semanal 📊
        </p>
      </Card>
    </section>
  );
}
