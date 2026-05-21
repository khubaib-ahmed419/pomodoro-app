import React from "react";

function App() {
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
    marginBottom: "10px",
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
    marginTop: "10px",
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
    transition: "0.2s",
  };

  const buttonHover = {
    background: "#334155",
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Pomodoro Timer</h1>

      <div style={timerStyle}>25:00</div>

      <h2 style={modeStyle}>FOCUS</h2>

      <div style={controlsStyle}>
        <button style={buttonStyle}>Start</button>
        <button style={buttonStyle}>Pause</button>
        <button style={buttonStyle}>Reset</button>
      </div>
    </div>
  );
}

export default App;