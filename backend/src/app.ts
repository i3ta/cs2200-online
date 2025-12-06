import express from "express";
import cors from "cors";
import path from "path";
import session from "express-session";
import { config } from "./config/config";

import "reflect-metadata";
import "@/types/session-data";
import "@/config/data-source";

import healthRoutes from "@/api/health/health.routes";
import authRoutes from "@/api/auth/auth.routes";

const app = express();

app
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(
    session({
      secret: config.sessionSecret,
      resave: false,
      saveUninitialized: true,
    }),
  )
  .use(express.json())
  .use(
    cors({
      origin: [
        "http://localhost:4000",
        "https://molevol.ibb.gatech.edu/api",
        "https://molevol.ibb.gatech.edu",
        "http://localhost:3000",
      ],
    }),
  );

app.use("/api/auth", healthRoutes);
app.use("/api/auth", authRoutes);

// Frontend
app.use(express.static(__dirname + "/build"));
app.get("/{*path}", function (_, res) {
  res.sendFile(path.resolve(__dirname, "..", "build", "index.html"));
});

export default app;
