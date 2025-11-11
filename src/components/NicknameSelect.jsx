import React, { useState } from "react";

export default function NicknameSelect({ onStart }) {
  const [nickname, setNickname] = useState("");
  const [length, setLength] = useState(5);

  const handleSubmit = () => {
    if (!nickname.trim()) return alert("Por favor, ingresa un nickname.");
    onStart(nickname.trim(), length);
  };

  return (
    <div className="text-center text-light">
      <h3 className="mb-4">Bienvenido a WordleTEC</h3>

      <input
        className="form-control w-50 mx-auto mb-3 text-center"
        placeholder="Ingresa tu nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />

      <div className="mb-3">
        <label className="me-2">Selecciona modo:</label>
        <select
          className="form-select w-25 mx-auto"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
        >
          <option value={5}>5 letras</option>
          <option value={6}>6 letras</option>
          <option value={7}>7 letras</option>
        </select>
      </div>

      <button className="btn btn-success mt-2" onClick={handleSubmit}>
        Iniciar juego
      </button>
    </div>
  );
}
