import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Todo } from '@/lib/validators';
import { format } from 'date-fns';

interface TodoDetailsCardProps {
  todo: Todo;
}

const TodoDetailsCard: React.FC<TodoDetailsCardProps> = ({ todo }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Todo Details</CardTitle>
        <CardDescription>Information about the selected todo.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className="flex items-center">
          <span className="font-semibold w-24">ID:</span>
          <span className="font-mono bg-muted px-2 py-1 rounded-sm text-xs break-all">{todo.id}</span>
        </div>
        <div className="flex items-center">
          <span className="font-semibold w-24">Task:</span>
          <span className="flex-1">{todo.task}</span>
        </div>
        <div className="flex items-center">
          <span className="font-semibold w-24">Created At:</span>
          <span>{format(new Date(todo.createdAt), 'MMM dd, yyyy HH:mm')}</span>
        </div>
        <div className="flex items-center">
          <span className="font-semibold w-24">Updated At:</span>
          <span>{format(new Date(todo.updatedAt), 'MMM dd, yyyy HH:mm')}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodoDetailsCard;