import db from '../../infrastructure/db/index.js';
import Todo from '../entity/Todo.js';

class UpdateTodoCommand {
  static async execute({ id, task }) {
    const existingTodo = await db.findById('Todo', id);

    if (!existingTodo) {
      return null;
    }

    const updatedTodoData = {
      task: task,
      updatedAt: new Date().toISOString(),
    };

    const updatedTodo = await db.update('Todo', id, updatedTodoData);
    return updatedTodo;
  }
}

export default UpdateTodoCommand;