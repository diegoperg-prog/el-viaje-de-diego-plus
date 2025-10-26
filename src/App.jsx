import React, { useState, useEffect } from "react";
import levels from "./dino/theme/levels";
import XPBar from "./dino/components/XPBar";
import Particles from "./dino/components/Particles";
import TransitionView from "./dino/components/TransitionView";

// Pantallas separadas
import Habitos from "./screens/Habitos";
import Estadisticas from "./screens/Estadisticas";
import Viaje from "./screens/Viaje";
import Recompensa from "./screens/Recompensa";

import "./App.css";

export default function App() {
  const [pantalla, setPantalla] = useState("home");
  const [puntos, setPuntos] = useState(0);
  const [racha, setRacha] = useState(22);
  const [fechaHoy, setFechaHoy] = useState("");
  const [mensajeDiario, setMensajeDiario] = useState("");
  const [historial, setHistorial] = useState([]);

  // --- Cargar datos iniciales ---
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("camino_diego_data") || "{}");
    if (stored.puntos) setPuntos(stored.puntos);
    if (stored.racha) setRacha(stored.racha);
    if (stored.historial) setHistorial(stored.historial);
  }, []);

  // --- Guardar automáticamente ---
  useEffect(() => {
    localStorage.setItem(
      "camino_diego_data",
      JSON.stringify({ puntos, racha, historial })
    );
  }, [puntos, racha, historial]);

  // --- Fecha actual ---
  useEffect(() => {
    const hoy = new Date();
    const fecha = hoy.toISOString().split("T")[0]; // YYYY-MM-DD
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

  // --- Manejar registro XP diario ---
  const registrarXP = (valor) => {
    const hoy = new Date().toISOString().split("T")[0];
    setHistorial((prev) => {
      const existe = prev.find((r) => r.fecha === hoy);
      if (existe) {
        return prev.map((r) =>
          r.fecha === hoy ? { ...r, xp: r.xp + valor } : r
        );
      } else {
        return [...prev, { fecha: hoy, xp: valor }];
      }
    });
  };

  // --- Enviar funciones a pantallas ---
  const handleAddXP = (valor) => {
    setPuntos((prev) => prev + valor);
    registrarXP(valor);
  };

  // --- Render de pantallas ---
  const renderPantalla = () => {
    switch (pantalla) {
      case "habitos":
        return (
          <Habitos
            puntos={puntos}
            setPuntos={handleAddXP}
            onBack={() => setPantalla("home")}
          />
        );
      case "estadisticas":
        return (
          <Estadisticas
            historial={historial}
            onBack={() => setPantalla("home")}
          />
        );
      case "viaje":
        return <Viaje nivel={nivelActual} onBack={() => setPantalla("home")} />;
      case "recompensa":
        return <Recompensa onBack={() => setPantalla("home")} />;
      default:
        return (
          <section
            className="app-bg"
            style={{
              backgroundImage: `url(${currentLevel.bg})`,
            }}
          >
            {/* HUD Superior */}
            <div className="hud">
              <div className="hud-points">
                <span className="points">{puntos}</span>
                <span className="level">LVL {nivelActual}</span>
              </div>
              <div className="hud-subtext">puntos hoy</div>
              <div className="xp-bar-frame">
                <div
                  className="xp-bar-fill"
                  style={{ width: `${xpRatio * 100}%` }}
                ></div>
              </div>
              <div className="hud-subtext">70 puntos esta semana</div>
            </div>

            {/* Héroe */}
            <div className="hero">
              <img
                src="/assets/character/hero.gif"
                alt="El héroe"
                draggable="false"
              />
              <div className="hero-name">Diego, el Héroe</div>
            </div>

            {/* Mensaje motivacional */}
            <p className="motivacion">{mensajeDiario}</p>

            {/* Botones principales */}
            <div className="buttons-grid">
              <button className="btn-medieval" onClick={() => setPantalla("habitos")}>
                Hábitos
              </button>
              <button
                className="btn-medieval"
                onClick={() => setPantalla("estadisticas")}
              >
                Estadísticas
              </button>
              <button className="btn-medieval" onClick={() => setPantalla("viaje")}>
                Viaje
              </button>
              <button
                className="btn-medieval"
                onClick={() => setPantalla("recompensa")}
              >
                Recompensa
              </button>
            </div>

            {/* Nivel actual */}
            <div className="nivel-texto">
              Nivel {nivelActual}: {currentLevel.name}
            </div>

            {/* Footer */}
            <p className="footer">
              Día {fechaHoy.split("-").reverse().join("/")} — Racha: {racha} días
            </p>

            <Particles color={currentLevel.to} />
          </section>
        );
    }
  };

  return (
    <TransitionView keyProp={pantalla}>
      {renderPantalla()}
    </TransitionView>
  );
}
