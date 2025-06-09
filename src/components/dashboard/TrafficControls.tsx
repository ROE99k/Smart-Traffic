import { useState } from "react";
import axios from "axios";

function TrafficControls() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRequest = async (action) => {
    setLoading(true);
    try {
      await action();
      setError("");
    } catch (err) {
      console.error(err);
      setError("Oops! Something went wrong. Please try again.");
      setTimeout(() => setError(""), 5000); // Auto-hide after 5 seconds
    }
    setLoading(false);
  };

  const sendTrafficSignal = () => {
    handleRequest(() =>
      axios.post('http://localhost:5000/traffic-signal', { vehicle_count: 20 })
    );
  };

  const writeData = () => {
    handleRequest(() =>
      axios.post('http://localhost:5000/data', { data: "Sample data" })
    );
  };

  const readData = () => {
    handleRequest(() =>
      axios.get('http://localhost:5000/data')
    );
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <button onClick={sendTrafficSignal} style={loading ? loadingButtonStyle : buttonStyle}>
        🚦 {loading ? "Sending..." : "Send Traffic Signal"}
      </button>
      <button onClick={writeData} style={loading ? loadingButtonStyle : buttonStyle}>
        📝 {loading ? "Writing..." : "Write Data"}
      </button>
      <button onClick={readData} style={loading ? loadingButtonStyle : buttonStyle}>
        📖 {loading ? "Reading..." : "Read Data"}
      </button>

      {error && (
        <div style={errorStyle}>
          {error}
        </div>
      )}
    </div>
  );
}

// Normal Button Style
const buttonStyle = {
  backgroundColor: "#007BFF",
  color: "white",
  border: "none",
  padding: "12px 24px",
  margin: "8px",
  borderRadius: "8px",
  fontSize: "16px",
  cursor: "pointer",
  transition: "all 0.3s ease",
};

// Loading Button Style
const loadingButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#6c757d", // Grey when loading
  cursor: "not-allowed",
};

// Error Message Style
const errorStyle = {
  color: "#721c24",
  backgroundColor: "#f8d7da",
  padding: "10px",
  marginTop: "15px",
  borderRadius: "6px",
  display: "inline-block",
  maxWidth: "90%",
  fontSize: "14px",
};

export default TrafficControls;