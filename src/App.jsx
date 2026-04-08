import React, { useState } from "react";
import "./App.css";

const choices = ["rock", "paper", "scissors"];

function App() {
  const [userChoice, setUserChoice] = useState("");
  const [computerChoice, setComputerChoice] = useState("");
  const [result, setResult] = useState("");
  const [score, setScore] = useState({ user: 0, computer: 0 });
  const [streak, setStreak] = useState(0);
  const [history, setHistory] = useState([]);

  const getComputerChoice = () =>
    choices[Math.floor(Math.random() * choices.length)];

  const determineWinner = (user, computer) => {
    if (user === computer) return "Draw";
    if (
      (user === "rock" && computer === "scissors") ||
      (user === "paper" && computer === "rock") ||
      (user === "scissors" && computer === "paper")
    ) {
      setScore((prev) => ({ ...prev, user: prev.user + 1 }));
      setStreak((prev) => prev + 1);
      return "You Win 🎉";
    } else {
      setScore((prev) => ({ ...prev, computer: prev.computer + 1 }));
      setStreak(0);
      return "Computer Wins 🤖";
    }
  };

  const handleClick = (choice) => {
    const compChoice = getComputerChoice();
    const gameResult = determineWinner(choice, compChoice);
    setUserChoice(choice);
    setComputerChoice(compChoice);
    setResult(gameResult);
    setHistory((prev) => [
      { user: choice, computer: compChoice, result: gameResult },
      ...prev,
    ]);
  };

  const handleReset = () => {
    setUserChoice("");
    setComputerChoice("");
    setResult("");
    setScore({ user: 0, computer: 0 });
    setStreak(0);
    setHistory([]);
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

      <div className="streak">
        Win Streak: <strong>{streak}</strong>
        {streak >= 3 && " 🔥"}
      </div>

      <button className="reset-btn" onClick={handleReset}>
        Reset Game
      </button>

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
