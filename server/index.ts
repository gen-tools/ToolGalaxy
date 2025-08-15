import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  enhanceImage,
  compressPDF,
  extractPDFText,
  analyzeImage,
  processText,
  generateDocument
} from "./routes/documents";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Document processing API routes
  app.post("/api/documents/enhance-image", enhanceImage);
  app.post("/api/documents/compress-pdf", compressPDF);
  app.post("/api/documents/extract-pdf-text", extractPDFText);
  app.post("/api/documents/analyze-image", analyzeImage);
  app.post("/api/documents/process-text", processText);
  app.post("/api/documents/generate-document", generateDocument);

  return app;
}
