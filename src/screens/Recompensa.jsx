import React, { useState, useEffect } from "react";
import Card from "../dino/components/Card";
import Button from "../dino/components/Button";

export default function Recompensa() {
  const [recompensa, setRecompensa] = useState(
    localStorage.getItem("recompensa") || ""
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setRecompensa(value);
    localStorage.setItem("recompensa", value);
  };

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        textAlign: "center",
      }}
    >
      <h2 style={{ fontFamily: "Poppins", fontSize: 20 }}>Tu recompensa 🎯</h2>

      <Card style={{ width: 300 }}>
        <textarea
          placeholder="Escribí tu recompensa..."
          value={recompensa}
          onChange={handleChange}
          rows={4}
          style={{
            width: "100%",
            padding: 8,
            borderRadius: 8,
            border: "1px solid #E5E5EA",
            fontFamily: "Inter",
            resize: "none",
          }}
        />
        <Button style={{ marginTop: 12 }}>Guardar</Button>
      </Card>

      {recompensa && (
        <p style={{ fontSize: 14, color: "#3E7C59" }}>
          Recompensa actual: {recompensa}
        </p>
      )}
    </section>
  );
}
