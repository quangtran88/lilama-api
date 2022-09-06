import express from "express";
import dotenv from "dotenv";
import { initDB } from "./utils/mongodb";

export async function initApp() {
  dotenv.config();
  await initDB();
  const app = express();
  return app;
}
