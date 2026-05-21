import React, { useEffect, useRef, useState } from "react";

function App() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [mode, setMode] = useState("focus");
  const [isRunning, setIsRunning] = useState(false);
  const [history, setHistory] = useState([]);

  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  const focusTime = 25 * 60;
  const breakTime = 5 * 60;

  const playBeep = () => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
    oscillator.connect(audioCtx.destination);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.2);
  };

  const getTodayKey = () => {
    return new Date().toISOString().split("T")[0];
  };

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("pomodoro-history"));
    const today = getTodayKey();

    if (saved && saved.date === today) {
      setHistory(saved.history);
    } else {
      localStorage.removeItem("pomodoro-history");
    }
  }, []);

  const saveHistory = (updatedHistory) => {
    localStorage.setItem(
      "pomodoro-history",
      JSON.stringify({
        date: getTodayKey(),
        history: updatedHistory,
      })
    );
  };

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          playBeep();

          if (mode === "focus") {
            const newEntry = {
              id: Date.now(),
              duration: focusTime,
              time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            };

            setHistory((prevHistory) => {
              const updated = [...prevHistory, newEntry];
              saveHistory(updated);
              return updated;
            });
          }

          const nextMode = mode === "focus" ? "break" : "focus";
          setMode(nextMode);

          return nextMode === "focus" ? focusTime : breakTime;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isRunning, mode]);

  const handleStart = () => {
    if (isRunning) return;
    setIsRunning(true);
  };

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

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const isFocus = mode === "focus";

  const containerStyle = {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    textAlign: "center",
    padding: "20px",
    fontFamily: "system-ui, Arial, sans-serif",
    background: isFocus ? "#0f172a" : "#064e3b",
    color: "white",
    transition: "0.3s ease",
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
    opacity: 0.9,
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

  const disabledStyle = {
    ...buttonStyle,
    opacity: 0.5,
    cursor: "not-allowed",
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Pomodoro Timer</h1>

      <div style={timerStyle}>
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </div>

      <h2 style={modeStyle}>
        {mode.toUpperCase()} {isRunning ? "" : "(PAUSED)"}
      </h2>

      <div style={controlsStyle}>
        <button
          style={isRunning ? disabledStyle : buttonStyle}
          onClick={handleStart}
        >
          Start
        </button>

        <button style={buttonStyle} onClick={handlePause}>
          Pause
        </button>

        <button style={buttonStyle} onClick={handleReset}>
          Reset
        </button>
      </div>

      <div style={{ marginTop: "30px", textAlign: "left", maxWidth: "400px" }}>
        <h3 style={{ fontSize: "1.2rem" }}>Today's Focus Sessions</h3>

        {history.length === 0 ? (
          <p style={{ opacity: 0.6 }}>No sessions yet</p>
        ) : (
          history.map((item) => (
            <div key={item.id} style={{ marginTop: "8px", opacity: 0.9 }}>
              ✓ 25:00 focus — {item.time}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;