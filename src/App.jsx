import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import GameBoard from "./components/GameBoard";
import Registro from "./components/Registro";
import StatsPage from "./components/StatsPage";

export default function App() {
  const [length, setLength] = useState(5);
  const [nickname, setNickname] = useState("");

  // 🔹 Aseguramos que todo el body tenga fondo oscuro
  useEffect(() => {
    document.body.style.backgroundColor = "#121213";
    document.body.style.color = "#fff";
    document.body.style.fontFamily = '"Segoe UI", sans-serif';
  }, []);

  return (
    <Router>
      <Header
        onLengthChange={setLength}
        nickname={nickname}
        setNickname={setNickname}
      />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<GameBoard length={length} nickname={nickname} />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/stats" element={<StatsPage />} />
        </Routes>
      </div>
    </Router>
  );
}
