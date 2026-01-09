import db from '../../infrastructure/db/index.js';

class DeleteTodoCommand {
  static async execute({ id }) {
    const associatedEntityName = 'Todo';

    const todoToDelete = await db.findById(associatedEntityName, id);

    if (!todoToDelete) {
      throw new Error('Todo not found.');
    }

    await db.remove(associatedEntityName, id);
    return todoToDelete;
  }
}

export default DeleteTodoCommand;