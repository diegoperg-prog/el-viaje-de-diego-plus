import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import BackButton from "../dino/components/BackButton";
import levels from "../dino/theme/levels";
import Card from "../dino/components/Card";

export default function Estadisticas({ historial = [], onBack }) {
  const currentLevel = levels[0];

  // --- Datos del gráfico XP diario ---
  const data = useMemo(() => {
    if (historial.length > 0) {
      return historial
        .slice(-7)
        .map((d) => ({
          fecha: new Date(d.fecha).toLocaleDateString("es-UY", {
            weekday: "short",
          }),
          xp: d.xp,
        }));
    }
    return [
      { fecha: "Lun", xp: 30 },
      { fecha: "Mar", xp: 45 },
      { fecha: "Mié", xp: 20 },
      { fecha: "Jue", xp: 55 },
      { fecha: "Vie", xp: 40 },
      { fecha: "Sáb", xp: 70 },
      { fecha: "Dom", xp: 65 },
    ];
  }, [historial]);

  const totalXP = data.reduce((acc, d) => acc + d.xp, 0);
  const promedio = (totalXP / data.length).toFixed(1);
  const maxDia = data.reduce((a, b) => (a.xp > b.xp ? a : b), data[0]);
  const minDia = data.reduce((a, b) => (a.xp < b.xp ? a : b), data[0]);

  // --- Ranking de hábitos ---
  const habitosGuardados = JSON.parse(
    localStorage.getItem("habitos_registrados") || "[]"
  );
  const ranking = Object.values(
    habitosGuardados.reduce((acc, h) => {
      acc[h.nombre] = acc[h.nombre] || { nombre: h.nombre, veces: 0, xp: 0 };
      acc[h.nombre].veces += 1;
      acc[h.nombre].xp += h.xp;
      return acc;
    }, {})
  )
    .sort((a, b) => b.veces - a.veces)
    .slice(0, 3);

  const habitoFuerte = ranking[0]?.nombre || "Ninguno";
  const habitoDebil = ranking[ranking.length - 1]?.nombre || "Ninguno";

  return (
    <section
      className="app-bg"
      style={{
        backgroundImage: `url(${currentLevel.bg})`,
        color: "#FAE6B1",
        textShadow: "0 2px 3px rgba(0,0,0,0.7)",
        paddingTop: "20px",
        justifyContent: "flex-start",
      }}
    >
      <BackButton onClick={onBack} />

      <h2
        style={{
          fontFamily: "Cinzel",
          color: "#E3C06E",
          margin: "60px 0 8px",
        }}
      >
        Salón del Progreso
      </h2>

      <p
        style={{
          fontFamily: "EB Garamond",
          fontSize: "1rem",
          marginBottom: "16px",
        }}
      >
        Evolución XP — Últimos 7 días
      </p>

      {/* 📈 Gráfico */}
      <div
        style={{
          width: "90%",
          maxWidth: 420,
          height: 220,
          background: "rgba(0,0,0,0.6)",
          border: "2px solid #E3C06E",
          borderRadius: 8,
          padding: "8px",
          margin: "0 auto 20px",
          boxShadow: "0 3px 6px rgba(0,0,0,0.5)",
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid stroke="rgba(255,255,255,0.1)" vertical={false} />
            <XAxis
              dataKey="fecha"
              tick={{ fill: "#FAE6B1", fontFamily: "Cinzel", fontSize: 12 }}
              axisLine={{ stroke: "#E3C06E" }}
              tickLine={false}
            />
            <YAxis hide domain={[0, "dataMax + 20"]} />
            <Tooltip
              contentStyle={{
                background: "rgba(0,0,0,0.85)",
                border: "1px solid #E3C06E",
                borderRadius: 6,
                color: "#FAE6B1",
                fontFamily: "EB Garamond",
              }}
            />
            <Line
              type="monotone"
              dataKey="xp"
              stroke="#E3C06E"
              strokeWidth={3}
              dot={{ fill: "#9AC27B", stroke: "#E3C06E", strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 📊 Ranking de hábitos */}
      <Card style={{ width: 320, margin: "0 auto 20px" }}>
        <p style={{ fontFamily: "Cinzel", marginBottom: 6, color: "#E3C06E" }}>
          🧾 Hábitos más recurrentes
        </p>
        {ranking.length > 0 ? (
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              fontFamily: "EB Garamond",
              fontSize: "0.95rem",
              color: "#FAE6B1",
            }}
          >
            {ranking.map((h, i) => (
              <li key={i} style={{ marginBottom: 4 }}>
                {i + 1}. {h.nombre} — {h.veces} veces ({h.xp} XP)
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ fontSize: "0.9rem", color: "#ccc" }}>
            Aún no completaste hábitos.
          </p>
        )}
      </Card>

      {/* 💬 Insights del sabio */}
      <Card
        style={{
          width: 320,
          margin: "0 auto 20px",
          background: "rgba(0,0,0,0.6)",
          color: "#E3C06E",
        }}
      >
        <p style={{ fontFamily: "Cinzel", marginBottom: 6 }}>
          🧙 Consejos del sabio
        </p>
        <p
          style={{
            fontFamily: "EB Garamond",
            fontSize: "0.95rem",
            lineHeight: 1.4,
            color: "#FAE6B1",
          }}
        >
          Tu hábito más fuerte es <b>{habitoFuerte}</b>.
          <br />
          El que menos energía recibió: <b>{habitoDebil}</b>.
          <br />
          Tu día más fuerte fue <b>{maxDia.fecha}</b> ({maxDia.xp} XP).
          <br />
          El más tranquilo: <b>{minDia.fecha}</b> ({minDia.xp} XP).
        </p>
      </Card>
    </section>
  );
}
