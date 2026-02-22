import { db } from "./db";
import { messages, type InsertMessage, type Message } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getMessage(): Promise<Message | undefined>;
  createMessage(msg: InsertMessage): Promise<Message>;
}

export class DatabaseStorage implements IStorage {
  async getMessage(): Promise<Message | undefined> {
    const [msg] = await db.select().from(messages).limit(1);
    return msg;
  }

  async createMessage(msg: InsertMessage): Promise<Message> {
    const [inserted] = await db.insert(messages).values(msg).returning();
    return inserted;
  }
}

export const storage = new DatabaseStorage();