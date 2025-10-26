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

/**
 * 📊 Estadísticas del héroe
 * Muestra la evolución XP diaria y base para futuros insights.
 */
export default function Estadisticas({ historial = [], onBack }) {
  const currentLevel = levels[0];

  // Datos simulados o reales desde historial
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
    // Datos mock si aún no hay historial
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

  // Calcular total y promedio
  const totalXP = data.reduce((acc, d) => acc + d.xp, 0);
  const promedio = (totalXP / data.length).toFixed(1);

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
        Evolución de XP en los últimos 7 días
      </p>

      {/* Gráfico */}
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
            <YAxis
              hide
              domain={[0, "dataMax + 20"]}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                background: "rgba(0,0,0,0.8)",
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
              activeDot={{ r: 6, stroke: "#FFF", strokeWidth: 1 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Resumen */}
      <Card style={{ width: 320, margin: "0 auto 20px" }}>
        <p style={{ fontFamily: "Cinzel", fontSize: "1.1rem", marginBottom: 4 }}>
          Total XP semanal: <span style={{ color: "#9AFF84" }}>{totalXP}</span>
        </p>
        <p style={{ fontFamily: "EB Garamond", fontSize: "1rem" }}>
          Promedio diario: {promedio} XP
        </p>
      </Card>

      {/* Próximos módulos */}
      <Card
        style={{
          width: 320,
          margin: "0 auto",
