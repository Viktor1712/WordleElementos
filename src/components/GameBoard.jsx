import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function GameBoard({ length, nickname }) {
  const [wordList, setWordList] = useState([]);
  const [target, setTarget] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");

  const maxAttempts = 6; // 🔹 Ahora 6 intentos como dice la guía

  useEffect(() => {
    fetch(`/words${length}.json`)
      .then((r) => r.json())
      .then((data) => {
        setWordList(data);
        const randomWord = data[Math.floor(Math.random() * data.length)];
        setTarget(randomWord.toLowerCase());
      });
  }, [length]);

  useEffect(() => {
    const handleKey = (e) => {
      // --- Evitar interferir si el usuario está escribiendo en un input/textarea/contentEditable
      const active = document.activeElement;
      if (active) {
        const tag = active.tagName;
        const isEditable =
          tag === "INPUT" ||
          tag === "TEXTAREA" ||
          active.isContentEditable;
        if (isEditable) return; // no procesar teclas del juego mientras se escribe en un campo
      }
      // --- Fin de la protección contra inputs

      if (gameOver) return;
      if (e.key === "Enter") handleSubmit();
      else if (e.key === "Backspace")
        setCurrentGuess((prev) => prev.slice(0, -1));
      else if (/^[a-zA-Z]$/.test(e.key) && currentGuess.length < length)
        setCurrentGuess((prev) => prev + e.key.toLowerCase());
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentGuess, gameOver, length]);

  const handleSubmit = () => {
    if (gameOver || currentGuess.length !== length) return;

    const guessArray = currentGuess.split("");
    const targetArray = target.split("");
    const statuses = Array(length).fill("absent");
    const targetCopy = [...targetArray];

    // Letras correctas
    guessArray.forEach((letter, i) => {
      if (targetArray[i] === letter) {
        statuses[i] = "correct";
        targetCopy[i] = null;
      }
    });

    // Letras presentes
    guessArray.forEach((letter, i) => {
      if (statuses[i] === "correct") return;
      const idx = targetCopy.indexOf(letter);
      if (idx !== -1) {
        statuses[i] = "present";
        targetCopy[idx] = null;
      }
    });

    const newGuess = { word: currentGuess, result: statuses };
    const newGuesses = [...guesses, newGuess];
    setGuesses(newGuesses);
    setCurrentGuess("");

    if (currentGuess === target) {
      setMessage("🎉 ¡Ganaste!");
      setGameOver(true);
      saveRecord(true, newGuesses.length);
    } else if (newGuesses.length >= maxAttempts) {
      setMessage(`💀 Perdiste. Era "${target.toUpperCase()}"`);
      setGameOver(true);
      saveRecord(false, newGuesses.length);
    }
  };

  const saveRecord = (won, attempts) => {
    if (!nickname) return;
    const stats = JSON.parse(localStorage.getItem("wordleStats") || "{}");
    const userStats = stats[nickname] || {};
    userStats[length] = { won, attempts };
    stats[nickname] = userStats;
    localStorage.setItem("wordleStats", JSON.stringify(stats));
  };

  const startNewGame = () => {
    if (!gameOver) {
      alert("⚠️ Termina la partida antes de iniciar una nueva.");
      return;
    }
    if (!wordList.length) return;
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    setTarget(randomWord.toLowerCase());
    setGuesses([]);
    setCurrentGuess("");
    setGameOver(false);
    setMessage("");
  };

  return (
    <div className="gameboard-container text-center">
      <h3 className="mb-4">Wordle de {length} letras</h3>

      {/* 🔹 Mostrar siempre las 6 filas */}
      {Array.from({ length: maxAttempts }).map((_, rowIndex) => {
        const guess = guesses[rowIndex];
        const isCurrent = rowIndex === guesses.length && !gameOver;

        return (
          <div key={rowIndex} className="d-flex justify-content-center mb-2">
            {Array.from({ length }).map((_, i) => {
              const letter = guess
                ? guess.word[i]
                : isCurrent
                ? currentGuess[i] || ""
                : "";
              const status = guess
                ? guess.result[i]
                : isCurrent
                ? "typing"
                : "empty";
              return (
                <Tile
                  key={i}
                  letter={letter}
                  status={status}
                  reveal={!!guess}
                />
              );
            })}
          </div>
        );
      })}

      <div className="mt-3">
        {message && <h5 className="mb-3">{message}</h5>}
        <button
          className="btn btn-success me-2"
          onClick={handleSubmit}
          disabled={gameOver}
        >
          Enviar
        </button>
        <button className="btn btn-primary" onClick={startNewGame}>
          Nuevo Juego
        </button>
      </div>
    </div>
  );
}

function Tile({ letter, status, reveal }) {
  const colors = {
    correct: "#6aaa64",
    present: "#c9b458",
    absent: "#787c7e",
    typing: "#3a3a3c",
    empty: "#121213",
  };

  return (
    <motion.div
      className="tile"
      style={{
        width: 60,
        height: 60,
        margin: 4,
        borderRadius: 6,
        fontSize: 28,
        fontWeight: "bold",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        backgroundColor: colors[status],
        border: "2px solid #3a3a3c",
      }}
      animate={reveal ? { rotateX: [0, 180, 0] } : {}}
      transition={{ duration: 0.5 }}
    >
      {letter ? letter.toUpperCase() : ""}
    </motion.div>
  );
}
