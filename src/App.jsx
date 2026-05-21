import React, { useState } from "react";

function App() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [mode, setMode] = useState("focus");

  const focusTime = 25 * 60;
  const breakTime = 5 * 60;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const containerStyle = {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    textAlign: "center",
    padding: "20px",
    background: "#0f172a",
    color: "white",
    fontFamily: "system-ui, Arial, sans-serif",
  };

  const titleStyle = {
    fontSize: "2.5rem",
    fontWeight: "700",
    letterSpacing: "1px",
  };

  const timerStyle = {
    fontSize: "6rem",
    fontWeight: "700",
    letterSpacing: "2px",
  };

  const modeStyle = {
    fontSize: "1.5rem",
    opacity: 0.8,
  };

  const controlsStyle = {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    justifyContent: "center",
  };

  const buttonStyle = {
    padding: "12px 20px",
    fontSize: "1rem",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    background: "#1e293b",
    color: "white",
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Pomodoro Timer</h1>

      <div style={timerStyle}>
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </div>

      <h2 style={modeStyle}>{mode.toUpperCase()}</h2>

      <div style={controlsStyle}>
        <button style={buttonStyle}>Start</button>
        <button style={buttonStyle}>Pause</button>
        <button style={buttonStyle}>Reset</button>
      </div>
    </div>
  );
}

export default App;