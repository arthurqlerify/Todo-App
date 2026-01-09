import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, PlusCircle } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { CreateTodoRequest, createTodoRequestSchema } from "@/lib/validators";
import { useCreateTodo } from "@/api/todos";

interface CreateTodoFormProps {
  onOpenChange: (open: boolean) => void;
  open: boolean;
}

const CreateTodoForm: React.FC<CreateTodoFormProps> = ({ onOpenChange, open }) => {
  const form = useForm<CreateTodoRequest>({
    resolver: zodResolver(createTodoRequestSchema),
    defaultValues: {
      task: "",
    },
  });

  const createTodoMutation = useCreateTodo();

  const onSubmit = (values: CreateTodoRequest) => {
    createTodoMutation.mutate(values, {
      onSuccess: () => {
        toast({
          title: "Todo Created",
          description: "Your new todo has been successfully created.",
        });
        form.reset();
        onOpenChange(false);
      },
      onError: (error) => {
        toast({
          title: "Failed to create todo",
          description: error.message || "An unexpected error occurred.",
          variant: "destructive",
        });
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Create New Todo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Todo</DialogTitle>
          <DialogDescription>
            Enter the details for your new todo. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="task"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Buy groceries" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={createTodoMutation.isPending}>
              {createTodoMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Todo
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTodoForm;