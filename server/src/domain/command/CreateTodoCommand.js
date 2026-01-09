import { v4 as uuidv4 } from 'uuid';
import db from '../../infrastructure/db/index.js';
import Todo from '../entity/Todo.js';

class CreateTodoCommand {
  static async execute({ task }) {
    const id = uuidv4();
    const now = new Date().toISOString();
    const todo = new Todo({ id, task, createdAt: now, updatedAt: now });
    await db.insert('Todo', todo);
    return todo;
  }
}

export default CreateTodoCommand;