import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import GameBoard from "./components/GameBoard";
import Registro from "./components/Registro";
import "./styles.css";

export default function App() {
  return (
    <Router>
      <div className="app-container bg-dark text-light min-vh-100">
        <Header />
        <div className="container py-4">
          <Routes>
            <Route path="/" element={<GameBoard length={5} />} />
            <Route path="/wordle6" element={<GameBoard length={6} />} />
            <Route path="/wordle7" element={<GameBoard length={7} />} />
            <Route path="/registro" element={<Registro />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
