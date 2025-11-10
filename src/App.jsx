import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// ---------------------------
// CONFIG
// ---------------------------
const STORAGE_KEY = "wordle_local_records";

// Helper para cargar la lista de palabras
async function loadWordList(length) {
  try {
    const res = await fetch(`/words${length}.json`);
    if (!res.ok) throw new Error("not found");
    const arr = await res.json();
    return arr.map((w) => w.trim().toLowerCase()).filter((w) => w.length === length);
  } catch (e) {
    // Fallback si no encuentra el JSON
    const fallback = {
      5: ["cofre", "raton", "cobre", "perro", "gatos"],
      6: ["banana", "puerta", "paloma"],
      7: ["avioneta", "cohetez"],
    };
    return fallback[length] || [];
  }
}

// ---------------------------
// Función que evalúa una palabra
// ---------------------------
function evaluateGuess(guess, target) {
  guess = guess.toLowerCase();
  target = target.toLowerCase();
  const n = guess.length;
  const status = new Array(n).fill("absent");
  const targetChars = target.split("");

  // Letras correctas
  for (let i = 0; i < n; i++) {
    if (guess[i] === target[i]) {
      status[i] = "correct";
      targetChars[i] = null;
    }
  }

  // Letras presentes
  for (let i = 0; i < n; i++) {
    if (status[i] === "correct") continue;
    const idx = targetChars.indexOf(guess[i]);
    if (idx !== -1) {
      status[i] = "present";
      targetChars[idx] = null;
    }
  }

  return status;
}

// ---------------------------
// Teclado visual
// ---------------------------
const KEY_LAYOUT = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];

// ---------------------------
// Tile (cuadro de letra)
// ---------------------------
function Tile({ letter = "", reveal = false, status = "", size = 56 }) {
  const statusColor = {
    correct: "#6aaa64",
    present: "#c9b458",
    absent: "#787c7e",
  }[status] || "#ffffff";

  const baseStyle = {
    width: size,
    height: size,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    margin: 4,
    fontWeight: 700,
    fontSize: Math.max(18, Math.floor(size / 2.5)),
    border: "2px solid #d1d5db",
    color: status ? "white" : "black",
    background: status ? statusColor : "white",
    boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
  };

  return (
    <motion.div
      style={baseStyle}
      animate={reveal ? { rotateX: [0, 180, 0] } : { rotateX: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {letter.toUpperCase()}
    </motion.div>
  );
}

// ---------------------------
// App principal
// ---------------------------
export default function App() {
  const [length, setLength] = useState(5);
  const [wordList, setWordList] = useState([]);
  const [target, setTarget] = useState("");
  const [board, setBoard] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [current, setCurrent] = useState("");
  const [message, setMessage] = useState("");
  const [revealedRows, setRevealedRows] = useState({});
  const [records, setRecords] = useState([]);

  // Cargar registros previos
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) setRecords(JSON.parse(raw));
  }, []);

  // Cargar palabras y seleccionar objetivo
  useEffect(() => {
    loadWordList(length).then((list) => {
      setWordList(list);
      if (list.length) setTarget(list[Math.floor(Math.random() * list.length)]);
    });
  }, [length]);

  const maxAttempts = length;

  function reset(newLength = length) {
    loadWordList(newLength).then((list) => {
      const t = list[Math.floor(Math.random() * list.length)];
      setLength(newLength);
      setWordList(list);
      setTarget(t || "");
      setBoard([]);
      setStatuses([]);
      setCurrent("");
      setMessage("");
      setRevealedRows({});
    });
  }

  function handleKey(key) {
    if (message) setMessage("");
    if (key === "Enter") return submitGuess();
    if (key === "Backspace") return setCurrent((c) => c.slice(0, -1));
    if (current.length >= length) return;
    if (!/^[a-z]$/.test(key.toLowerCase())) return;
    setCurrent((c) => (c + key).slice(0, length));
  }

  function submitGuess() {
    if (current.length !== length) {
      setMessage(`La palabra debe tener ${length} letras`);
      return;
    }
    if (!wordList.includes(current.toLowerCase())) {
      setMessage("Palabra no válida (no está en la lista)");
      return;
    }

    const statusRow = evaluateGuess(current, target);
    const newBoard = [...board, current];
    const newStatuses = [...statuses, statusRow];
    setBoard(newBoard);
    setStatuses(newStatuses);
    setCurrent("");

    const rowIndex = newBoard.length - 1;
    setTimeout(() => {
      setRevealedRows((r) => ({ ...r, [rowIndex]: true }));
    }, 100);

    const won = statusRow.every((s) => s === "correct");
    if (won) {
      setMessage(`¡Ganaste en ${newBoard.length} intentos!`);
      saveRecord({ date: new Date().toISOString(), length, attempts: newBoard.length, won: true });
      return;
    }
    if (newBoard.length >= maxAttempts) {
      setMessage(`Perdiste — la palabra era: ${target}`);
      saveRecord({ date: new Date().toISOString(), length, attempts: newBoard.length, won: false, target });
    }
  }

  function saveRecord(entry) {
    const next = [entry, ...records].slice(0, 200);
    setRecords(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  // Eventos del teclado físico
  useEffect(() => {
    function onKey(e) {
      const k = e.key;
      if (k === "Enter" || k === "Backspace") return handleKey(k);
      if (/^[a-zA-Z]$/.test(k)) return handleKey(k.toLowerCase());
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // Estados del teclado virtual
  function keyboardState() {
    const map = {};
    const order = { absent: 0, present: 1, correct: 2 };
    statuses.forEach((row, idx) => {
      row.forEach((s, j) => {
        const ch = board[idx][j];
        if (!ch) return;
        if (!map[ch] || order[s] > order[map[ch]]) map[ch] = s;
      });
    });
    return map;
  }

  const kstate = keyboardState();

  const rows = [];
  for (let i = 0; i < maxAttempts; i++) {
    if (i < board.length) {
      rows.push({ letters: board[i].split(""), status: statuses[i], reveal: !!revealedRows[i] });
    } else if (i === board.length) {
      const chars = current.split("");
      while (chars.length < length) chars.push("");
      rows.push({ letters: chars, status: new Array(length).fill("") });
    } else {
      rows.push({ letters: new Array(length).fill(""), status: new Array(length).fill("") });
    }
  }

  return (
    <div style={{ fontFamily: "Inter, system-ui, sans-serif", padding: 20, maxWidth: 760, margin: "0 auto" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontSize: 22 }}>Wordle (React + Framer Motion)</h1>
        <div>
          <label>Longitud: </label>
          <select value={length} onChange={(e) => reset(Number(e.target.value))}>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
          </select>
          <button onClick={() => reset(length)} style={{ marginLeft: 8 }}>Reiniciar</button>
        </div>
      </header>

      <main style={{ marginTop: 20 }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
          <div>
            {rows.map((r, ri) => (
              <div key={ri} style={{ display: "flex", justifyContent: "center" }}>
                {r.letters.map((ch, ci) => (
                  <Tile
                    key={`${ri}-${ci}`}
                    letter={ch}
                    reveal={!!r.reveal}
                    status={r.status[ci]}
                    size={56}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: "center", minHeight: 24 }}>{message}</div>

        <div style={{ marginTop: 12 }}>
          {KEY_LAYOUT.map((row, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
              {i === 2 && (
                <button onClick={() => handleKey("Enter")} style={{ width: 64, marginRight: 6 }}>Enter</button>
              )}
              {row.split("").map((k) => (
                <button
                  key={k}
                  onClick={() => handleKey(k)}
                  style={{
                    width: 40,
                    height: 48,
                    marginRight: 6,
                    textTransform: "uppercase",
                    background: kstate[k] === "correct" ? "#6aaa64" : kstate[k] === "present" ? "#c9b458" : kstate[k] === "absent" ? "#787c7e" : "white",
                    color: kstate[k] ? "white" : "black",
                    border: "none",
                    borderRadius: 6,
                    fontWeight: 700,
                  }}
                >
                  {k}
                </button>
              ))}
              {i === 2 && (
                <button onClick={() => handleKey("Backspace")} style={{ width: 64, marginLeft: 6 }}>⌫</button>
              )}
            </div>
          ))}
        </div>

        <section style={{ marginTop: 18 }}>
          <h3>Registro local</h3>
          <ul>
            {records.map((r, i) => (
              <li key={i}>
                {new Date(r.date).toLocaleString()} — {r.length} letras —{" "}
                {r.won
                  ? `Ganó en ${r.attempts}`
                  : `Perdió en ${r.attempts} (palabra: ${r.target || "-"})`}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
