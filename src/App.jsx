import { useState } from "react";
import HariRayaCabaran from "./components/HariRayaCabaran.jsx";
import PokokHikmah from "./components/PokokHikmah.jsx";

const PAGES = [
  { id: "cabaran", label: "🎴 Cabaran Kad Hari Raya", Component: HariRayaCabaran },
  { id: "pokok", label: "🌳 Pokok Hikmah Hari Raya", Component: PokokHikmah },
];

export default function App() {
  const [page, setPage] = useState(null);

  if (page) {
    const { Component } = PAGES.find(p => p.id === page);
    return (
      <div>
        <button onClick={() => setPage(null)} style={{
          position: "fixed", top: 10, left: 10, zIndex: 100,
          background: "rgba(0,0,0,0.5)", color: "#FFF8E7",
          border: "1px solid rgba(201,168,76,0.4)", borderRadius: 8,
          padding: "6px 14px", fontSize: 13, cursor: "pointer",
        }}>← Menu</button>
        <Component />
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #071C12 0%, #0A2818 40%, #0C3020 100%)",
      color: "#FFF8E7",
      fontFamily: "'Segoe UI', Trebuchet MS, system-ui, sans-serif",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      gap: 24, padding: 40,
    }}>
      <h1 style={{
        fontSize: 36, fontWeight: 900, margin: 0,
        background: "linear-gradient(135deg, #C9A84C, #E6C55A)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
      }}>
        Aktiviti Pendidikan Islam — Hari Raya
      </h1>
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center" }}>
        {PAGES.map(p => (
          <button key={p.id} onClick={() => setPage(p.id)} style={{
            background: "rgba(201,168,76,0.1)",
            border: "2px solid rgba(201,168,76,0.45)",
            borderRadius: 16, padding: "28px 40px",
            color: "#FFF8E7", fontSize: 20, fontWeight: 700,
            cursor: "pointer",
          }}>
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}
