import React, { useState, useEffect } from "react";
import levels from "./dino/theme/levels";
import XPBar from "./dino/components/XPBar";
import Button from "./dino/components/Button";
import Particles from "./dino/components/Particles";
import TransitionView from "./dino/components/TransitionView";

// Pantallas separadas
import Habitos from "./screens/Habitos";
import Estadisticas from "./screens/Estadisticas";
import Viaje from "./screens/Viaje";
import Recompensa from "./screens/Recompensa";

// ======================================================
// 🚀 El viaje de Diego+ — App.jsx consolidado (versión final)
// ======================================================
export default function App() {
  // --- Estado base ---
  const [pantalla, setPantalla] = useState("home");
  const [puntos, setPuntos] = useState(0);
  const [racha, setRacha] = useState(0);
  const [fechaHoy, setFechaHoy] = useState("");
  const [mensajeDiario, setMensajeDiario] = useState("");
  const [historial, setHistorial] = useState([]);

  // --- Carga inicial ---
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("camino_diego_data") || "{}");
    if (stored.puntos) setPuntos(stored.puntos);
    if (stored.racha) setRacha(stored.racha);
    if (stored.historial) setHistorial(stored.historial);
  }, []);

  // --- Guardado automático ---
  useEffect(() => {
    localStorage.setItem(
      "camino_diego_data",
      JSON.stringify({ puntos, racha, historial })
    );
  }, [puntos, racha, historial]);

  // --- Fecha actual ---
  useEffect(() => {
    const hoy = new Date();
    const fecha = hoy.toLocaleDateString("es-UY", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
    setFechaHoy(fecha);
  }, []);

  // --- Nivel y XP ---
  const nivel = Math.floor(puntos / 1000) + 1;
  const nivelActual = Math.min(6, nivel);
  const xpNivel = puntos % 1000;
  const xpRatio = xpNivel / 1000;
  const currentLevel = levels[nivelActual - 1];

  // --- Mensaje diario ---
  useEffect(() => {
    const frases = [
      "Cada paso deja una huella ⚡",
      "El ritmo importa más que la velocidad 🧭",
      "Constancia > Motivación 💪",
      "Todo gran viaje comienza con un hábito 🌱",
    ];
    setMensajeDiario(frases[Math.floor(Math.random() * frases.length)]);
  }, [nivelActual]);

  // --- Render de pantallas ---
  const renderPantalla = () => {
    switch (pantalla) {
      case "habitos":
        return <Habitos puntos={puntos} setPuntos={setPuntos} />;
      case "estadisticas":
        return <Estadisticas historial={historial} />;
      case "viaje":
        return <Viaje nivel={nivelActual} />;
      case "recompensa":
        return <Recompensa />;
      default:
        return (
          <section
            style={{
              minHeight: "100vh",
              maxWidth: 390,
              margin: "0 auto",
              position: "relative",
              color: "#1C1C1E",
              background: `linear-gradient(180deg, ${currentLevel.from}, ${currentLevel.to})`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              overflow: "hidden",
              transition: "background 1s ease-in-out",
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
              <div style={{ fontSize: 10, fontFamily: "Poppins, system-ui" }}>
                LVL {nivelActual}
              </div>
              <XPBar value={xpRatio} from={currentLevel.from} to={currentLevel.to} />
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
              <div
                style={{
                  marginTop: 8,
                  fontSize: 14,
                  fontFamily: "Poppins, system-ui",
                }}
              >
                Diego, el Héroe
              </div>
            </div>

            {/* Mensaje motivacional */}
            <p
              style={{
                fontSize: 12,
                fontStyle: "italic",
                color: currentLevel.text,
                textAlign: "center",
                margin: "0 24px 24px",
              }}
            >
              {mensajeDiario}
            </p>

            {/* Botones principales */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
                width: "86%",
                zIndex: 1,
              }}
            >
              <Button onClick={() => setPantalla("habitos")}>Hábitos</Button>
              <Button onClick={() => setPantalla("estadisticas")}>
                Estadísticas
              </Button>
              <Button onClick={() => setPantalla("viaje")}>Viaje</Button>
              <Button onClick={() => setPantalla("recompensa")}>Recompensa</Button>
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
              {fechaHoy} — Racha: {racha} días
            </div>

            {/* Partículas decorativas */}
            <Particles color={currentLevel.to} />
          </section>
        );
    }
  };

  // --- Render con transición suave ---
  return (
    <TransitionView keyProp={pantalla}>
      {renderPantalla()}
    </TransitionView>
  );
}
