import React from "react";
import { Link } from "react-router-dom";

export default function Header({ onLengthChange, nickname, setNickname }) {
  return (
    <header className="bg-dark text-light p-3 d-flex justify-content-between align-items-center">
      {/* Logo como botón */}
      <div>
        <Link to="/" className="text-light text-decoration-none">
          <h3 className="mb-0" style={{ cursor: "pointer" }}>
            WordleTEC
          </h3>
        </Link>
      </div>

      <div className="d-flex align-items-center">
        <select
          className="form-select me-3"
          style={{ width: "150px", backgroundColor: "#1c1c1c", color: "#fff", border: "1px solid #3a3a3c" }}
          onChange={(e) => onLengthChange(Number(e.target.value))}
        >
          <option value="5">Modo 5 letras</option>
          <option value="6">Modo 6 letras</option>
          <option value="7">Modo 7 letras</option>
        </select>

        <input
          type="text"
          placeholder="Nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="form-control me-3"
          style={{ width: "160px", backgroundColor: "#1c1c1c", color: "#fff", border: "1px solid #3a3a3c" }}
        />

        <Link to="/" className="btn btn-secondary me-2">
          Jugar
        </Link>
        <Link to="/stats" className="btn btn-secondary">
          Stats
        </Link>
      </div>
    </header>
  );
}
