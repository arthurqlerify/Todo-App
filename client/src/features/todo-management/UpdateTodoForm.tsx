import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { UpdateTodoRequest, updateTodoRequestSchema, Todo } from "@/lib/validators";
import { useUpdateTodo } from "@/api/todos";

interface UpdateTodoFormProps {
  todo?: Todo | null; // The todo to be updated
  onOpenChange: (open: boolean) => void;
  open: boolean;
}

const UpdateTodoForm: React.FC<UpdateTodoFormProps> = ({ todo, onOpenChange, open }) => {
  const form = useForm<UpdateTodoRequest>({
    resolver: zodResolver(updateTodoRequestSchema),
    defaultValues: {
      id: todo?.id || "",
      task: todo?.task || "",
    },
  });

  useEffect(() => {
    if (todo) {
      form.reset({
        id: todo.id,
        task: todo.task,
      });
    }
  }, [todo, form]);

  const updateTodoMutation = useUpdateTodo();

  const onSubmit = (values: UpdateTodoRequest) => {
    updateTodoMutation.mutate(values, {
      onSuccess: () => {
        toast({
          title: "Todo Updated",
          description: "The todo has been successfully updated.",
        });
        onOpenChange(false);
      },
      onError: (error) => {
        toast({
          title: "Failed to update todo",
          description: error.message || "An unexpected error occurred.",
          variant: "destructive",
        });
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Todo</DialogTitle>
          <DialogDescription>
            Make changes to your todo here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Todo ID</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly className="sr-only" aria-hidden="true" /> {/* ID is necessary for API but hidden from user */}
                  </FormControl>
                  <FormDescription className="sr-only">This is the unique ID of the todo being updated.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="task"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Update project brief" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={updateTodoMutation.isPending}>
              {updateTodoMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateTodoForm;