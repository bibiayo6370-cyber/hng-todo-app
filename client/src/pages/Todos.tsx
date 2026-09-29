import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { api, type Todo } from "@/lib/api";
import { clearUser, getUser } from "@/lib/user";
import { Button } from "@/components/ui/button";
import TodoForm from "@/components/TodoForm";
import TodoItem from "@/components/TodoItem";

export default function Todos() {
  const navigate = useNavigate();
  const user = getUser();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    api
      .listTodos()
      .then(setTodos)
      .catch((e) => toast.error(e instanceof Error ? e.message : "Could not load todos"))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user) return <Navigate to="/" replace />;

  const replaceTodo = (updated: Todo) =>
    setTodos((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));

  const handleToggle = async (todo: Todo, completed: boolean) => {
    try {
      replaceTodo(await api.updateTodo(todo._id, { completed }));
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not update todo");
    }
  };

  return (
    <main className="mx-auto max-w-2xl space-y-6 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Hi, {user.name}</h1>
        <Button
          variant="outline"
          onClick={() => {
            clearUser();
            navigate("/");
          }}
        >
          Switch user
        </Button>
      </div>

      <TodoForm onCreated={(todo) => setTodos((prev) => [todo, ...prev])} />

      <section className="space-y-3">
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : todos.length === 0 ? (
          <p className="text-sm text-muted-foreground">No todos yet. Add your first one above.</p>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onToggle={handleToggle}
              onSaved={replaceTodo}
              onDeleted={(id) => setTodos((prev) => prev.filter((t) => t._id !== id))}
            />
          ))
        )}
      </section>
    </main>
  );
}
