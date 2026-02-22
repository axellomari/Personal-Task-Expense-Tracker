import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get("/api/message", async (req, res) => {
    let msg = await storage.getMessage();
    if (!msg) {
      msg = await storage.createMessage({ content: "Hello World" });
    }
    res.json({ message: msg.content });
  });

  // Tasks API
  app.get("/api/tasks", async (req, res) => {
    const tasks = await storage.getTasks();
    res.json(tasks);
  });

  app.post("/api/tasks", async (req, res) => {
    const task = await storage.createTask(req.body);
    res.status(201).json(task);
  });

  // Expenses API
  app.get("/api/expenses", async (req, res) => {
    const expenses = await storage.getExpenses();
    res.json(expenses);
  });

  app.post("/api/expenses", async (req, res) => {
    const expense = await storage.createExpense(req.body);
    res.status(201).json(expense);
  });

  return httpServer;
}
