import React, { useState } from "react";
import "./App.css";

const choices = ["rock", "paper", "scissors"];

function App() {
  const [userChoice, setUserChoice] = useState("");
  const [computerChoice, setComputerChoice] = useState("");
  const [result, setResult] = useState("");
  const [score, setScore] = useState({ user: 0, computer: 0 });

  const [history, setHistory] = useState([]);

  const getComputerChoice = () => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  };

  const determineWinner = (user, computer) => {
    if (user === computer) return "Draw";

    if (
      (user === "rock" && computer === "scissors") ||
      (user === "paper" && computer === "rock") ||
      (user === "scissors" && computer === "paper")
    ) {
      setScore((prev) => ({ ...prev, user: prev.user + 1 }));
      return "You Win 🎉";
    } else {
      setScore((prev) => ({ ...prev, computer: prev.computer + 1 }));
      return "Computer Wins 🤖";
    }
  };

  const handleClick = (choice) => {
    const compChoice = getComputerChoice();
    const gameResult = determineWinner(choice, compChoice);

    setUserChoice(choice);
    setComputerChoice(compChoice);
    setResult(gameResult);

    // ✅ NEW: save move to history
    setHistory((prev) => [
      ...prev,
      {
        user: choice,
        computer: compChoice,
        result: gameResult,
      },
    ]);
  };

  return (
    <div className="app">
      <h1>Rock Paper Scissors</h1>

      <div className="buttons">
        {choices.map((choice) => (
          <button key={choice} onClick={() => handleClick(choice)}>
            {choice.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="results">
        <p>Your Choice: {userChoice}</p>
        <p>Computer Choice: {computerChoice}</p>
        <h2>{result}</h2>
      </div>

      <div className="score">
        <p>You: {score.user}</p>
        <p>Computer: {score.computer}</p>
      </div>

      {/* ✅ NEW: History Section */}
      <div className="history">
        <h2>Previous Moves</h2>
        {history.length === 0 ? (
          <p>No moves yet</p>
        ) : (
          <ul>
            {history.map((move, index) => (
              <li key={index}>
                You: {move.user} | Computer: {move.computer} → {move.result}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
