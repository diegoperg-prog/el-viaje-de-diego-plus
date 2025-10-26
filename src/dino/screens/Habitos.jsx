import React from "react";
import Card from "../dino/components/Card";
import Button from "../dino/components/Button";
import BackButton from "../dino/components/BackButton";
import levels from "../dino/theme/levels";

export default function Habitos({ puntos, setPuntos, onBack }) {
  const currentLevel = levels[0]; // Nivel actual (puede pasarse como prop)
  const habitos = [
    { id: 1, nombre: "Entrenar", puntos: 10 },
    { id: 2, nombre: "Dormir bien", puntos: 10 },
    { id: 3, nombre: "Comer saludable", puntos: 5 },
    { id: 4, nombre: "Leer", puntos: 5 },
    { id: 5, nombre: "Meditar", puntos: 5 },
  ];

  const handleClick = (valor) => setPuntos((prev) => prev + valor);

  return (
    <section
      className="app-bg"
      style={{
        backgroundImage: `url(${currentLevel.bg})`,
      }}
    >
      <BackButton onClick={onBack} />

      <h2 style={{ fontFamily: "Cinzel", color: "#E3C06E", margin: "60px 0 16px" }}>
        Tus hábitos
      </h2>

      {habitos.map((h) => (
        <Card key={h.id} style={{ width: 280, textAlign: "center", marginBottom: 12 }}>
          <div style={{ fontFamily: "EB Garamond", fontSize: 16, marginBottom: 8 }}>
            {h.nombre}
          </div>
          <Button onClick={() => handleClick(h.puntos)}>+{h.puntos} XP</Button>
        </Card>
      ))}

      <p className="footer">Puntos totales: {puntos}</p>
    </section>
  );
}
