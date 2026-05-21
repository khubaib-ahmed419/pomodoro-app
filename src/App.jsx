import React, { useEffect, useRef, useState } from "react";

function App() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [mode, setMode] = useState("focus");
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef(null);

  const focusTime = 25 * 60;
  const breakTime = 5 * 60;

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          const nextMode = mode === "focus" ? "break" : "focus";
          setMode(nextMode);
          return nextMode === "focus" ? focusTime : breakTime;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isRunning, mode]);

  const handleStart = () => setIsRunning(true);

  const handlePause = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const handleReset = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setMode("focus");
    setTimeLeft(focusTime);
  };

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
  };

  const timerStyle = {
    fontSize: "6rem",
    fontWeight: "700",
  };

  const modeStyle = {
    fontSize: "1.5rem",
    opacity: 0.8,
  };

  const controlsStyle = {
    display: "flex",
    gap: "12px",
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

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Pomodoro Timer</h1>

      <div style={timerStyle}>
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </div>

      <h2 style={modeStyle}>{mode.toUpperCase()}</h2>

      <div style={controlsStyle}>
        <button style={buttonStyle} onClick={handleStart}>
          Start
        </button>
        <button style={buttonStyle} onClick={handlePause}>
          Pause
        </button>
        <button style={buttonStyle} onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;