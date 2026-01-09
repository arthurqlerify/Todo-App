import express from 'express';
import UpdateTodoCommand from '../../../domain/command/UpdateTodoCommand.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { id, task } = req.body;

  if (!id) return res.status(400).json({ message: 'id is required.' });
  if (!task) return res.status(400).json({ message: 'task is required.' });

  try {
    const result = await UpdateTodoCommand.execute({ id, task });

    if (!result) {
      return res.status(404).json({ message: 'Todo not found.' });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default {
  routeBase: '/update-todo',
  router,
};