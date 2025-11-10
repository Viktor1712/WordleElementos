import React, { useEffect, useState } from "react";

export default function Registro() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("wordleRecords") || "[]");
    setRecords(history);
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="mb-3 text-center">📊 Historial de partidas</h3>
      {records.length === 0 ? (
        <p className="text-center text-secondary">Aún no hay registros</p>
      ) : (
        <table className="table table-dark table-striped text-center align-middle">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Longitud</th>
              <th>Resultado</th>
              <th>Intentos</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r, i) => (
              <tr key={i}>
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
