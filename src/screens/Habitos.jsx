import React, { useState } from "react";
import BackButton from "../dino/components/BackButton";
import levels from "../dino/theme/levels";

export default function Habitos({ puntos, setPuntos, onBack }) {
  const currentLevel = levels[0];
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

  const [floatingXP, setFloatingXP] = useState([]);

  const handleClick = (valor, id) => {
    setPuntos((prev) => prev + valor);
    const newXP = { id: Date.now(), valor, habitId: id };
    setFloatingXP((prev) => [...prev, newXP]);
    setTimeout(() => {
      setFloatingXP((prev) => prev.filter((xp) => xp.id !== newXP.id));
    }, 1000);
  };

  return (
    <section
      className="app-bg"
      style={{
        backgroundImage: `url(${currentLevel.bg})`,
        justifyContent: "flex-start",
        paddingTop: "20px",
        color: "#FAE6B1",
        textShadow: "0 2px 3px rgba(0,0,0,0.7)",
      }}
    >
      <BackButton onClick={onBack} />

      {/* HUD */}
      <div className="hud" style={{ marginTop: "10px" }}>
        <div
          className="hud-points"
          style={{
            color: "#FAE6B1",
            textShadow: "0 2px 3px rgba(0,0,0,0.7)",
          }}
        >
          <span className="points" style={{ fontSize: "2rem" }}>
            {puntos}
          </span>
          <span
            className="level"
            style={{ fontSize: "1.2rem", marginLeft: "4px" }}
          >
            LVL 1
          </span>
        </div>
        <div
          className="hud-subtext"
          style={{ color: "#EBD69C", textShadow: "0 2px 3px rgba(0,0,0,0.6)" }}
        >
          PUNTOS HOY
        </div>

        <div
          className="xp-bar-frame"
          style={{
            width: "70%",
            height: "10px",
            background: "rgba(0,0,0,0.5)",
            border: "2px solid #C9A44A",
            borderRadius: "6px",
            boxShadow: "inset 0 1px 3px rgba(255,255,255,0.2)",
            margin: "6px auto",
          }}
        >
          <div
            className="xp-bar-fill"
            style={{
              width: `${xpRatio * 100}%`,
              height: "100%",
              background: "linear-gradient(90deg, #9AC27B, #E3C06E)",
              borderRadius: "4px",
              transition: "width 0.6s ease",
            }}
          ></div>
        </div>

        <div
          className="hud-subtext"
          style={{ color: "#EBD69C", textShadow: "0 2px 3px rgba(0,0,0,0.6)" }}
        >
          70 PUNTOS ESTA SEMANA
        </div>
      </div>

      {/* Héroe */}
      <div className="hero" style={{ margin: "10px 0 20px" }}>
        <img
          src="/assets/character/hero.gif"
          alt="El héroe"
          style={{
            width: "30vw",
            maxWidth: "140px",
            filter: "drop-shadow(0 4px 4px rgba(0,0,0,0.7))",
          }}
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
          position: "relative",
        }}
      >
        {habitos.map((h) => (
          <div key={h.id} style={{ position: "relative" }}>
            <button
              onClick={() => handleClick(h.puntos, h.id)}
              style={{
                width: "100%",
                background: "rgba(0, 0, 0, 0.8)",
                border: "2px solid #E3C06E",
                borderRadius: "8px",
                color: "#FAE6B1",
                fontFamily: "Cinzel, serif",
                fontSize: "0.95rem",
                padding: "10px 6px",
                boxShadow:
                  "0 3px 6px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.1)",
                textShadow: "0 2px 3px rgba(0,0,0,0.7)",
                transition: "transform 0.1s ease",
              }}
              onMouseDown={(e) =>
                (e.currentTarget.style.transform = "scale(0.95)")
              }
              onMouseUp={(e) =>
                (e.currentTarget.style.transform = "scale(1.0)")
              }
            >
              <div>{h.nombre}</div>
              <div
                style={{
                  color: "#9AFF84",
                  fontSize: "0.85rem",
                  textShadow: "0 1px 2px rgba(0,0,0,0.8)",
                }}
              >
                +{h.puntos}
              </div>
            </button>

            {/* Efecto de XP flotante */}
            {floatingXP
              .filter((xp) => xp.habitId === h.id)
              .map((xp) => (
                <div
                  key={xp.id}
                  className="xp-float"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "#9AFF84",
                    fontFamily: "Cinzel, serif",
                    fontWeight: "700",
                    textShadow: "0 2px 4px rgba(0,0,0,0.9)",
                    animation: "xpFloat 1s ease-out forwards",
                    pointerEvents: "none",
                  }}
                >
                  +{xp.valor} XP
                </div>
              ))}
          </div>
        ))}
      </div>

      {/* Animación */}
      <style>{`
        @keyframes xpFloat {
          0% {
            opacity: 0;
            transform: translate(-50%, -30%);
          }
          30% {
            opacity: 1;
            transform: translate(-50%, -60%);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -120%);
          }
        }
      `}</style>
    </section>
  );
}
