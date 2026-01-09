import express from 'express';
import DeleteTodoCommand from '../../../domain/command/DeleteTodoCommand.js';

const router = express.Router();
const routeBase = '/delete-todo';

router.post('/', async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: 'id is required.' });
  }

  try {
    const result = await DeleteTodoCommand.execute({ id });
    res.status(200).json(result);
  } catch (err) {
    if (err.message === 'Todo not found.') {
      res.status(404).json({ message: err.message });
    } else {
      res.status(400).json({ message: err.message });
    }
  }
});

export default {
  routeBase,
  router,
};