import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.messages.get.path, async (req, res) => {
    let msg = await storage.getMessage();
    
    // Seed message if it doesn't exist
    if (!msg) {
      msg = await storage.createMessage({ content: "Hello World" });
    }
    
    res.json({ message: msg.content });
  });

  return httpServer;
}