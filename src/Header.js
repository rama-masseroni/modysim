import { Help } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import "./App.css";

export default function Header() {
  return (
    <div className="App-header">
      <h2 style={{ gridColumn: 1 }}>Modelado y Simulación</h2>
      <h1 style={{ gridColumn: 2 }}>Análisis de Sistemas 2Ds Acoplados Homogéneos</h1>
      <div style={{ width: "fit-content", justifySelf: "center" }}>
        <Button variant="contained" href="https://github.com/MelodRAMAtick/modysim" target="_blank" rel="noopener noreferrer">
          <Help />
          <h2 style={{ gridColumn: 1 }}>Acerca de</h2>
        </Button>
      </div>
    </div>
  );
}
