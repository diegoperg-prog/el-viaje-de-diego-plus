import React from "react";
import BackButton from "../dino/components/BackButton";
import levels from "../dino/theme/levels";

export default function Habitos({ puntos, setPuntos, onBack }) {
  const currentLevel = levels[0]; // Bosque Místico (puede venir como prop)
  const xpRatio = (puntos % 1000) / 1000;

  const habitos = [
    { id: 1, nombre: "Entrené", puntos: 10 },
    { id: 2, nombre: "Caminé 30 min", puntos: 5 },
    { id: 3, nombre: "Comí saludable", puntos: 5 },
    { id: 4, nombre: "Dormí 7h+", puntos: 5 },
    { id: 5, nombre: "Sin pantallas", puntos: 5 },
    { id: 6, nombre: "Reflexioné", puntos: 5 },
    { id: 7, nombre: "Tarea laboral", puntos: 10 },
    { id: 8, nombre: "Aprendí algo", puntos: 5 },
  ];

  const handleClick = (valor) => {
    setPuntos((prev) => prev + valor);
  };

  return (
    <section
      className="app-bg"
      style={{
        backgroundImage: `url(${currentLevel.bg})`,
        justifyContent: "flex-start",
        paddingTop: "20px",
      }}
    >
      <BackButton onClick={onBack} />

      {/* HUD */}
      <div className="hud" style={{ marginTop: "10px" }}>
        <div className="hud-points">
          <span className="points" style={{ fontSize: "2rem" }}>
            {puntos}
          </span>
          <span className="level" style={{ fontSize: "1.2rem" }}>
            LVL 1
          </span>
        </div>
        <div className="hud-subtext">PUNTOS HOY</div>
        <div className="xp-bar-frame" style={{ width: "70%", height: "10px" }}>
          <div
            className="xp-bar-fill"
            style={{ width: `${xpRatio * 100}%` }}
          ></div>
        </div>
        <div className="hud-subtext">70 PUNTOS ESTA SEMANA</div>
      </div>

      {/* Héroe */}
      <div className="hero" style={{ margin: "10px 0 20px" }}>
        <img
          src="/assets/character/hero.gif"
          alt="El héroe"
          style={{ width: "30vw", maxWidth: "140px" }}
          draggable="false"
        />
      </div>

      {/* Grilla de hábitos */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "12px 16px",
          width: "80%",
          maxWidth: "400px",
          margin: "0 auto 20px",
        }}
      >
        {habitos.map((h) => (
          <button
            key={h.id}
            onClick={() => handleClick(h.puntos)}
            style={{
              background: "rgba(0,0,0,0.75)",
              border: "2px solid #C9A44A",
              borderRadius: "6px",
              color: "#E3C06E",
              fontFamily: "Cinzel, serif",
              fontSize: "0.95rem",
              padding: "10px 4px",
              boxShadow:
                "0 2px 4px rgba(0,0,0,0.5), inset 0 1px 2px rgba(255,255,255,0.15)",
              transition: "transform 0.1s ease",
            }}
            onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
            onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
          >
            <div>{h.nombre}</div>
            <div style={{ color: "#9AC27B", fontSize: "0.85rem" }}>
              +{h.puntos}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
