import React from "react";
import levels from "../theme/levels";
import XPBar from "../components/XPBar";
import Button from "../components/Button";
import Card from "../components/Card";
import Particles from "../components/Particles";

export default function Home({ level = 1, xp = 0.5, streak = 22, dateLabel = "Día 26 de Octubre" }) {
  const lv = levels.find((l) => l.id === level) || levels[0];

  return (
    <section
      style={{
        minHeight: "100vh",
        maxWidth: 390,
        margin: "0 auto",
        position: "relative",
        color: "#1C1C1E",
        background: `linear-gradient(180deg, ${lv.from}, ${lv.to})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          width: "100%",
          textAlign: "center",
          padding: "12px 0",
          borderBottom: "1px solid #E5E5EA",
          background: "rgba(255,255,255,0.4)",
          backdropFilter: "blur(8px)",
          zIndex: 1,
        }}
      >
        <div style={{ fontSize: 10, fontFamily: "Poppins, system-ui" }}>LVL {lv.id}</div>
        <XPBar value={xp} from={lv.from} to={lv.to} />
      </div>

      {/* Avatar */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "24px 0",
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: 999,
            background: "#ffffffc8",
            border: "2px solid #fff",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          }}
        />
        <div style={{ marginTop: 8, fontSize: 14, fontFamily: "Poppins, system-ui" }}>
          Diego, el Héroe
        </div>
      </div>

      {/* Insight */}
      <p
        style={{
          fontSize: 12,
          fontStyle: "italic",
          color: lv.text,
          textAlign: "center",
          margin: "0 24px 24px",
        }}
      >
        Nivel {lv.id}: {lv.name}
      </p>

      {/* Buttons grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          width: "86%",
          zIndex: 1,
        }}
      >
        <Button>Hábitos</Button>
        <Button>Estadísticas</Button>
        <Button>Viaje</Button>
        <Button>Recompensa</Button>
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: "auto",
          marginBottom: 24,
          fontSize: 12,
          color: "#6E6E73",
          zIndex: 1,
        }}
      >
        {dateLabel} — Racha: {streak} días
      </div>

      {/* Partículas decorativas */}
      <Particles color={lv.to} />
    </section>
  );
}

