import React, { useState, useEffect } from "react";

export default function Registro() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wordleRecords") || "[]");
    setHistory(stored);
  }, []);

  return (
    <div className="text-light text-center">
      <h2 className="mb-4">Historial de Juegos</h2>
      {history.length === 0 ? (
        <p className="text-secondary">No hay registros aún.</p>
      ) : (
        <table className="table table-dark table-bordered text-center w-75 mx-auto">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Longitud</th>
              <th>Resultado</th>
              <th>Intentos</th>
            </tr>
          </thead>
          <tbody>
            {history.map((r, i) => (
              <tr key={i} style={{ fontWeight: "bold" }}>
                <td>{r.fecha}</td>
                <td>{r.longitud}</td>
                <td>{r.resultado}</td>
                <td>{r.intentos}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
