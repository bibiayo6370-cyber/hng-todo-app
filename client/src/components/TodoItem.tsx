import type { Todo } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import EditTodoDialog from "@/components/EditTodoDialog";
import DeleteTodoDialog from "@/components/DeleteTodoDialog";

type Props = {
  todo: Todo;
  onToggle: (todo: Todo, completed: boolean) => void;
  onSaved: (todo: Todo) => void;
  onDeleted: (id: string) => void;
};

export default function TodoItem({ todo, onToggle, onSaved, onDeleted }: Props) {
  return (
    <Card className={cn(todo.completed && "bg-muted/50")}>
      <CardContent className="flex items-start gap-3 pt-6">
        <Checkbox
          className="mt-1"
          checked={todo.completed}
          onCheckedChange={(checked) => onToggle(todo, checked === true)}
          aria-label="Mark complete"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p
              className={cn(
                "font-medium break-words",
                todo.completed && "text-muted-foreground line-through"
              )}
            >
              {todo.title}
            </p>
            {todo.completed && <Badge variant="secondary">Done</Badge>}
          </div>
          {todo.description && (
            <p
              className={cn(
                "mt-1 text-sm text-muted-foreground break-words",
                todo.completed && "line-through"
              )}
            >
              {todo.description}
            </p>
          )}
          <div className="mt-3 flex gap-2">
            <EditTodoDialog todo={todo} onSaved={onSaved} />
            <DeleteTodoDialog todo={todo} onDeleted={onDeleted} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
