import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import usersRouter from "./routes/users";
import todosRouter from "./routes/todos";

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    db: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});
app.use("/api/users", usersRouter);
app.use("/api/todos", todosRouter);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "Server error" });
});

const port = Number(process.env.PORT) || 5000;

async function start() {
  if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is not set");
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("MongoDB connected");
  app.listen(port, () => console.log(`Server running on port ${port}`));
}

start().catch((e) => {
  console.error(e);
  process.exit(1);
});
