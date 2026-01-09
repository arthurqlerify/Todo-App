import React, { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import CreateTodoForm from '@/features/todo-management/CreateTodoForm';
import ManageTodoById from '@/features/todo-management/ManageTodoById';

const TodosPage: React.FC = () => {
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <PageHeader
        title="Todo Manager"
        description="Create and manage your individual todo items using their unique IDs."
        actions={
          <CreateTodoForm onOpenChange={setIsCreateFormOpen} open={isCreateFormOpen} />
        }
      />
      <div className="mt-8">
        <ManageTodoById />
      </div>
    </div>
  );
};

export default TodosPage;