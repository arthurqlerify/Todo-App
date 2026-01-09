import express from 'express';
import GetTodoByIDReadModel from '../../../domain/readmodel/GetTodoByIDReadModel.js';

const router = express.Router();
const routeBase = '/get-todo-by-id';

router.get('/', async (req, res) => {
  try {
    res.status(400).json({ "message": 'Todo ID is required but not provided in the path.' });
  } catch (err) {
    res.status(500).json({ "message": err.message });
  }
});

export default {
  routeBase,
  router,
};