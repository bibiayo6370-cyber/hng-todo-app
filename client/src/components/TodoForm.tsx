import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { todoSchema, type TodoInput } from "@/lib/schemas";
import { api, type Todo } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export default function TodoForm({ onCreated }: { onCreated: (todo: Todo) => void }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TodoInput>({
    resolver: zodResolver(todoSchema),
    defaultValues: { title: "", description: "" },
  });

  const onSubmit = async (values: TodoInput) => {
    try {
      const todo = await api.createTodo(values);
      onCreated(todo);
      reset();
      toast.success("Todo added");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not add todo");
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="What needs doing?" {...register("title")} />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea id="description" rows={2} {...register("description")} />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description.message}</p>
            )}
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add todo"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
