import React, { useState } from "react";
import BackButton from "../dino/components/BackButton";
import Card from "../dino/components/Card";
import Button from "../dino/components/Button";
import levels from "../dino/theme/levels";

export default function Recompensa({ onBack }) {
  const [recompensa, setRecompensa] = useState(
    localStorage.getItem("recompensa") || ""
  );
  const currentLevel = levels[0];

  const handleChange = (e) => {
    const value = e.target.value;
    setRecompensa(value);
    localStorage.setItem("recompensa", value);
  };

  return (
    <section
      className="app-bg"
      style={{
        backgroundImage: `url(${currentLevel.bg})`,
      }}
    >
      <BackButton onClick={onBack} />
      <h2 style={{ fontFamily: "Cinzel", color: "#E3C06E", margin: "60px 0 16px" }}>
        Tu recompensa 🎯
      </h2>

      <Card style={{ width: 300, textAlign: "center" }}>
        <textarea
          placeholder="Escribí tu recompensa..."
          value={recompensa}
          onChange={handleChange}
          rows={4}
          style={{
            width: "100%",
            padding: 8,
            borderRadius: 8,
            border: "1px solid #E3C06E",
            background: "rgba(0,0,0,0.3)",
            color: "#E3C06E",
            fontFamily: "EB Garamond",
            resize: "none",
          }}
        />
        <Button style={{ marginTop: 12 }}>Guardar</Button>
      </Card>

      {recompensa && (
        <p style={{ fontSize: 14, color: "#9AC27B", marginTop: 12 }}>
          Recompensa actual: {recompensa}
        </p>
      )}
    </section>
  );
}
