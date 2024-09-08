import React, { useState, useRef } from "react";
import { convertHeicToPng } from "./utils";

const FileConverter: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [converting, setConverting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      setFile(event.dataTransfer.files[0]);
    }
  };

  const handleConvert = async () => {
    if (file) {
      setConverting(true);
      try {
        const pngBlob = await convertHeicToPng(file);
        const url = URL.createObjectURL(pngBlob);
        const link = document.createElement("a");
        link.href = url;
        link.download = file.name.replace(/\.(heic|heif)$/i, ".png");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Conversion failed:", error);
        alert("Conversion failed. Please try again.");
      }
      setConverting(false);
    }
  };

  return (
    <div style={styles.converterBox}>
      <div
        style={styles.uploadArea}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <p>Drag and drop your HEIF file here, or click to select</p>
      </div>
      <input
        type="file"
        accept="image/heif,image/heic"
        onChange={handleFileChange}
        style={{ display: "none" }}
        ref={fileInputRef}
      />
      <div style={styles.fileInfo}>
        {file ? `Selected file: ${file.name}` : "No file selected"}
      </div>
      <button
        style={styles.button}
        onClick={handleConvert}
        disabled={!file || converting}
      >
        {converting ? "Converting..." : "Convert to PNG"}
      </button>
    </div>
  );
};

const styles = {
  converterBox: {
    backgroundColor: "#ffffff",
    borderRadius: "18px",
    padding: "40px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center" as const,
  },
  uploadArea: {
    border: "2px dashed #c7c7cc",
    borderRadius: "12px",
    padding: "40px",
    marginBottom: "20px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  fileInfo: {
    marginTop: "20px",
    fontSize: "14px",
    color: "#86868b",
  },
  button: {
    backgroundColor: "#0071e3",
    color: "#ffffff",
    border: "none",
    borderRadius: "20px",
    padding: "12px 24px",
    fontSize: "16px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
};

export default FileConverter;
