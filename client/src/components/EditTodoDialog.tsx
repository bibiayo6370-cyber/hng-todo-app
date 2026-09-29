import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { todoSchema, type TodoInput } from "@/lib/schemas";
import { api, type Todo } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Props = { todo: Todo; onSaved: (todo: Todo) => void };

export default function EditTodoDialog({ todo, onSaved }: Props) {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TodoInput>({
    resolver: zodResolver(todoSchema),
    defaultValues: { title: todo.title, description: todo.description },
  });

  const onSubmit = async (values: TodoInput) => {
    try {
      const updated = await api.updateTodo(todo._id, values);
      onSaved(updated);
      setOpen(false);
      toast.success("Todo updated");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not update todo");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next) reset({ title: todo.title, description: todo.description });
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit todo</DialogTitle>
          <DialogDescription>Update the title or description.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div className="space-y-2">
            <Label htmlFor={`edit-title-${todo._id}`}>Title</Label>
            <Input id={`edit-title-${todo._id}`} {...register("title")} />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor={`edit-desc-${todo._id}`}>Description</Label>
            <Textarea id={`edit-desc-${todo._id}`} rows={3} {...register("description")} />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description.message}</p>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
