import db from '../../infrastructure/db/index.js';

class GetTodoByIDReadModel {
  static async query(id) {
    if (!id) {
      return null;
    }
    return await db.findById('Todo', id);
  }
}

export default GetTodoByIDReadModel;