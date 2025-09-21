import express from "express";
import cors from "cors";

const app = express();

app
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(
    cors({
      origin: ["http://localhost:4000", "http://localhost:5173"],
    }),
  );

export default app;
