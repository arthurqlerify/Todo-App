import React from "react";
import { Loader2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useDeleteTodo } from "@/api/todos";
import { Todo } from "@/lib/validators";

interface DeleteTodoDialogProps {
  todo: Todo;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  onDeleteSuccess?: () => void; // Callback for when a todo is successfully deleted
}

const DeleteTodoDialog: React.FC<DeleteTodoDialogProps> = ({ todo, onOpenChange, open, onDeleteSuccess }) => {
  const deleteTodoMutation = useDeleteTodo();

  const handleDelete = () => {
    deleteTodoMutation.mutate({ id: todo.id }, {
      onSuccess: () => {
        toast({
          title: "Todo Deleted",
          description: "The todo has been successfully deleted.",
        });
        onDeleteSuccess?.(); // Invoke callback
        onOpenChange(false);
      },
      onError: (error) => {
        toast({
          title: "Failed to delete todo",
          description: error.message || "An unexpected error occurred.",
          variant: "destructive",
        });
      },
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the todo
            "<span className="font-medium">{todo.task}</span>" (ID: <span className="font-mono text-xs">{todo.id}</span>).
        </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteTodoMutation.isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteTodoMutation.isPending}
            >
              {deleteTodoMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Continue
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTodoDialog;