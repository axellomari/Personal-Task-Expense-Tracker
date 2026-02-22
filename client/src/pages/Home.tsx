import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus, ListTodo, Wallet } from "lucide-react";
import type { Task, Expense } from "@shared/schema";

export default function Home() {
  const [taskText, setTaskText] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");

  const { data: tasks = [], isLoading: loadingTasks } = useQuery<Task[]>({
    queryKey: ["/api/tasks"],
  });

  const { data: expenses = [], isLoading: loadingExpenses } = useQuery<Expense[]>({
    queryKey: ["/api/expenses"],
  });

  const addTaskMutation = useMutation({
    mutationFn: async (text: string) => {
      const res = await apiRequest("POST", "/api/tasks", { text });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
      setTaskText("");
    },
  });

  const addExpenseMutation = useMutation({
    mutationFn: async (amount: string) => {
      const res = await apiRequest("POST", "/api/expenses", { amount });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/expenses"] });
      setExpenseAmount("");
    },
  });

  const totalSpent = expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0);

  return (
    <div className="min-h-screen bg-background p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold tracking-tight text-center mb-12">Tracker Dashboard</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Tasks Section */}
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center space-x-2">
              <ListTodo className="w-5 h-5 text-primary" />
              <CardTitle>Tasks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter task..."
                  value={taskText}
                  onChange={(e) => setTaskText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && taskText && addTaskMutation.mutate(taskText)}
                />
                <Button 
                  onClick={() => taskText && addTaskMutation.mutate(taskText)}
                  disabled={addTaskMutation.isPending}
                >
                  {addTaskMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                </Button>
              </div>
              <ul className="space-y-2">
                {loadingTasks ? (
                  <li className="text-muted-foreground italic">Loading tasks...</li>
                ) : tasks.length === 0 ? (
                  <li className="text-muted-foreground italic">No tasks yet</li>
                ) : (
                  tasks.map((task) => (
                    <li key={task.id} className="p-3 bg-muted/50 rounded-md border text-sm">
                      {task.text}
                    </li>
                  ))
                )}
              </ul>
            </CardContent>
          </Card>

          {/* Expenses Section */}
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center space-x-2">
              <Wallet className="w-5 h-5 text-primary" />
              <CardTitle>Expenses</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  type="number"
                  placeholder="0.00"
                  value={expenseAmount}
                  onChange={(e) => setExpenseAmount(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && expenseAmount && addExpenseMutation.mutate(expenseAmount)}
                />
                <Button 
                  onClick={() => expenseAmount && addExpenseMutation.mutate(expenseAmount)}
                  disabled={addExpenseMutation.isPending}
                >
                  {addExpenseMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                </Button>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg border-2 border-primary/20 text-center">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Total Spent</Label>
                <div className="text-3xl font-bold text-primary">${totalSpent.toFixed(2)}</div>
              </div>
              <ul className="space-y-2">
                {loadingExpenses ? (
                  <li className="text-muted-foreground italic text-sm">Loading...</li>
                ) : expenses.map((expense) => (
                  <li key={expense.id} className="flex justify-between p-2 text-sm border-b last:border-0">
                    <span>Expense</span>
                    <span className="font-medium">${parseFloat(expense.amount).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
