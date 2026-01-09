import express from 'express';
import CreateTodoCommand from '../../../domain/command/CreateTodoCommand.js';

const router = express.Router();
const routeBase = '/create-todo';

router.post('/', async (req, res) => {
  const { task } = req.body;

  if (!task) return res.status(400).json({ message: 'Task is required.' });

  try {
    const result = await CreateTodoCommand.execute({ task });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default {
  routeBase,
  router,
};