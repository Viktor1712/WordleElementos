import React, { useState, useEffect } from "react";

export default function StatsPage() {
  const [stats, setStats] = useState({});
  const modes = [5, 6, 7];

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wordleStats") || "{}");
    setStats(stored);
  }, []);

  const buildTable = (mode) => {
    const modeData = Object.entries(stats)
      .filter(([_, data]) => data[mode])
      .map(([nick, data]) => ({
        nick,
        ...data[mode],
      }));

    if (modeData.length === 0)
      return (
        <p className="text-secondary">No hay registros para {mode} letras.</p>
      );

    // Ganadores primero por menos intentos, luego perdedores
    modeData.sort((a, b) => {
      if (a.won && !b.won) return -1;
      if (!a.won && b.won) return 1;
      if (a.won && b.won) return a.attempts - b.attempts;
      return 0;
    });

    return (
      <div key={mode} className="mb-5">
        <h4 className="text-light mb-3">
          Modo {mode} letras — Clasificación
        </h4>
        <table className="table table-dark table-bordered text-center w-75 mx-auto">
          <thead>
            <tr>
              <th>Jugador</th>
              <th>Intentos</th>
              <th>Resultado</th>
            </tr>
          </thead>
          <tbody>
            {modeData.map((r, i) => (
              <tr
                key={i}
                className={r.won ? "table-secondary" : "table-secondary"}
                style={{ fontWeight: "bold" }}
              >
                <td>{r.nick}</td>
                <td>{r.won ? r.attempts : "—"}</td>
                <td>{r.won ? "Ganó" : "Perdió"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="text-light text-center">
      <h2 className="mb-4">Tabla de Clasificación WordleTEC</h2>
      {modes.map((m) => buildTable(m))}
    </div>
  );
}
