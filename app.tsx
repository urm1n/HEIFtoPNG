import React from "react";
import ReactDOM from "react-dom";
import FileConverter from "./FileConverter";

const App: React.FC = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>HEIF to PNG Converter</h1>
      <p style={styles.description}>
        Convert your HEIF images to PNG format with ease
      </p>
      <FileConverter />
    </div>
  );
};

const styles = {
  container: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
    maxWidth: "800px",
    margin: "0 auto",
    padding: "40px 20px",
    backgroundColor: "#f5f5f7",
    color: "#1d1d1f",
    lineHeight: 1.5,
  },
  title: {
    fontSize: "48px",
    fontWeight: 700,
    textAlign: "center" as const,
    marginBottom: "20px",
  },
  description: {
    fontSize: "18px",
    textAlign: "center" as const,
    marginBottom: "40px",
  },
};

ReactDOM.render(<App />, document.getElementById("root"));
