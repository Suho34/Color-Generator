import { useState, useEffect } from "react";

function RandomColor() {
  const [color, setColor] = useState("#000000");
  const [colorType, setColorType] = useState("hex");
  const [colorHistory, setColorHistory] = useState([]);
  const [copyStatus, setCopyStatus] = useState("");

  const generateRandomColor = () => {
    let newColor;
    if (colorType === "hex") {
      newColor = `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")}`;
    } else if (colorType === "rgb") {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      newColor = `rgb(${r}, ${g}, ${b})`;
    } else {
      const h = Math.floor(Math.random() * 360);
      const s = Math.floor(Math.random() * 100);
      const l = Math.floor(Math.random() * 100);
      newColor = `hsl(${h}, ${s}%, ${l}%)`;
    }
    setColor(newColor);
    setColorHistory((prevHistory) => [newColor, ...prevHistory.slice(0, 9)]);
  };

  useEffect(() => {
    setColorHistory([]);
  }, []);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(color);
      setCopyStatus("Copied!");
      setTimeout(() => setCopyStatus(""), 2000); // Clear the status after 2 seconds
    } catch (err) {
      console.error("Failed to copy: ", err);
      setCopyStatus("Failed to copy");
    }
  };

  return (
    <>
      <h1>Random Color Generator</h1>
      <div className="container">
        <div className="modes">
          <h3>Color Mode:</h3>
          <button onClick={() => setColorType("hex")}>HEX</button>
          <button onClick={() => setColorType("rgb")}>RGB</button>
          <button onClick={() => setColorType("hsl")}>HSL</button>
        </div>
        <div className="main-buttons">
          <button onClick={generateRandomColor}>Generate Random Color</button>
          <button onClick={copyToClipboard}>
            {copyStatus === "Copied!" ? "Copied!" : "Copy to Clipboard"}
          </button>
        </div>
        <div className="color-wrapper">
          <p
            style={{
              backgroundColor: color,
              textAlign: "center",
              marginTop: "20px",
              padding: "20px",
              color: "white",
              fontSize: "24px",
            }}
          >
            Current Color: {color}
          </p>
          <div>
            <h2>Color History</h2>
            <div className="color-history">
              {colorHistory.map((historyColor, index) => (
                <div
                  key={index}
                  className="color-box"
                  style={{ backgroundColor: historyColor }}
                  onClick={() => setColor(historyColor)}
                  title={historyColor}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RandomColor;
