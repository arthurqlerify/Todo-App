import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Todo, CreateTodoRequest, UpdateTodoRequest, DeleteTodoRequest } from "@/lib/validators";

// Query to get a single Todo by ID
// Assumes GET /api/v1/get-todo-by-id?id={id}
export const useGetTodoById = (id: string | null) => {
  return useQuery<Todo, Error>({
    queryKey: ["todo", id],
    queryFn: () => api.get<Todo>("/get-todo-by-id", { id: id! }),
    enabled: !!id, // Only run the query if an ID is provided
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false, // Prevents aggressive refetching
  });
};

// Mutation to create a new Todo
export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation<Todo, Error, CreateTodoRequest>({
    mutationFn: (newTodo: CreateTodoRequest) => api.post<Todo>("/create-todo", newTodo),
    onSuccess: (data) => {
      // Invalidate the specific todo if it's being tracked by its ID
      queryClient.invalidateQueries({ queryKey: ["todo", data.id] });
      // Note: No "list all todos" endpoint, so no list query to invalidate.
    },
  });
};

// Mutation to update an existing Todo
export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation<Todo, Error, UpdateTodoRequest>({
    mutationFn: (updatedTodo: UpdateTodoRequest) => api.post<Todo>("/update-todo", updatedTodo),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["todo", data.id] });
    },
  });
};

// Mutation to delete a Todo
export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation<Todo, Error, DeleteTodoRequest>({
    mutationFn: (todoToDelete: DeleteTodoRequest) => api.post<Todo>("/delete-todo", todoToDelete),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["todo", data.id] });
    },
  });
};