import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Search, PencilLine, Trash2 } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { GetTodoByIdRequest, getTodoByIdRequestSchema, Todo } from '@/lib/validators';
import { useGetTodoById } from '@/api/todos';
import TodoDetailsCard from '@/components/shared/TodoDetailsCard';
import { toast } from '@/hooks/use-toast';
import UpdateTodoForm from './UpdateTodoForm';
import DeleteTodoDialog from './DeleteTodoDialog';

const ManageTodoById: React.FC = () => {
  const [currentTodoId, setCurrentTodoId] = useState<string | null>(null);
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedTodoForActions, setSelectedTodoForActions] = useState<Todo | null>(null);

  const form = useForm<GetTodoByIdRequest>({
    resolver: zodResolver(getTodoByIdRequestSchema),
    defaultValues: {
      id: "",
    },
  });

  const { data: todo, isLoading, isError, error } = useGetTodoById(currentTodoId);

  // Effect to update selectedTodoForActions when todo data changes from query
  useEffect(() => {
    if (todo) {
      setSelectedTodoForActions(todo);
    } else if (isError) {
      setSelectedTodoForActions(null); // Clear data if error occurs
    }
  }, [todo, isError]);

  // Effect to show toast messages for errors
  useEffect(() => {
    if (isError && currentTodoId) { // Only show error if an ID was actually submitted
      toast({
        title: "Error fetching todo",
        description: error?.message || "Could not find todo with the provided ID.",
        variant: "destructive",
      });
    }
  }, [isError, error, currentTodoId]);


  const onSubmit = (values: GetTodoByIdRequest) => {
    setCurrentTodoId(values.id);
  };

  const handleUpdateClick = () => {
    if (selectedTodoForActions) {
      setIsUpdateFormOpen(true);
    }
  };

  const handleDeleteClick = () => {
    if (selectedTodoForActions) {
      setIsDeleteConfirmOpen(true);
    }
  };

  const handleTodoDeleted = () => {
    // After successful deletion, clear the displayed todo and ID
    setCurrentTodoId(null);
    setSelectedTodoForActions(null);
    form.reset({ id: "" }); // Reset the input field
  };


  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Manage Todo by ID</CardTitle>
        <CardDescription>Enter a Todo ID to view, update, or delete it.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-2 mb-6">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="sr-only">Todo ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Todo ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              <span className="sr-only sm:not-sr-only sm:ml-2">Search</span>
            </Button>
          </form>
        </Form>

        {isLoading && currentTodoId && (
          <div className="flex items-center justify-center p-8 text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin mr-2" /> Loading todo...
          </div>
        )}

        {selectedTodoForActions && (
          <div className="space-y-4">
            <TodoDetailsCard todo={selectedTodoForActions} />
            <Separator />
            <div className="flex space-x-2 justify-end">
              <Button variant="outline" onClick={handleUpdateClick} className="flex items-center gap-2">
                <PencilLine className="h-4 w-4" /> Edit
              </Button>
              <Button variant="destructive" onClick={handleDeleteClick} className="flex items-center gap-2">
                <Trash2 className="h-4 w-4" /> Delete
              </Button>
            </div>
          </div>
        )}

        {!currentTodoId && !isLoading && !isError && (
            <p className="text-center text-muted-foreground p-8">Enter a Todo ID above to view its details.</p>
        )}

        {/* Update and Delete Dialogs */}
        {selectedTodoForActions && (
          <>
            <UpdateTodoForm
              todo={selectedTodoForActions}
              open={isUpdateFormOpen}
              onOpenChange={setIsUpdateFormOpen}
            />
            <DeleteTodoDialog
              todo={selectedTodoForActions}
              open={isDeleteConfirmOpen}
              onOpenChange={setIsDeleteConfirmOpen}
              onDeleteSuccess={handleTodoDeleted}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ManageTodoById;