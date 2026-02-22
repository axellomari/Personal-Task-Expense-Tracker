import { db } from "./db";
import { messages, tasks, expenses, type InsertMessage, type Message, type Task, type InsertTask, type Expense, type InsertExpense } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getMessage(): Promise<Message | undefined>;
  createMessage(msg: InsertMessage): Promise<Message>;
  
  // Tasks
  getTasks(): Promise<Task[]>;
  createTask(task: InsertTask): Promise<Task>;
  
  // Expenses
  getExpenses(): Promise<Expense[]>;
  createExpense(expense: InsertExpense): Promise<Expense>;
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

  async getTasks(): Promise<Task[]> {
    return await db.select().from(tasks);
  }

  async createTask(task: InsertTask): Promise<Task> {
    const [inserted] = await db.insert(tasks).values(task).returning();
    return inserted;
  }

  async getExpenses(): Promise<Expense[]> {
    return await db.select().from(expenses);
  }

  async createExpense(expense: InsertExpense): Promise<Expense> {
    const [inserted] = await db.insert(expenses).values(expense).returning();
    return inserted;
  }
}

export const storage = new DatabaseStorage();
