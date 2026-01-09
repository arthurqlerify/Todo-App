import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TODO_DESCRIPTION = 'Test todo description';
const CURRENT_DATE = '2026-01-09T14:01:57.463Z';
const UPDATED_TODO_TASK = 'New task for todo';

let apiResponse;
let todoId;

const feature = loadFeature(path.resolve(__dirname, 'update-todo-given-an-existing-todo-with-a-specific-id-when-a-user-provides.feature'));

defineFeature(feature, (test) => {
  test(
    'Given an existing todo with a specific ID, when a user provides a new task for that todo, then the todo\'s task is updated in the system.',
    ({ given, when, then }) => {
      given('an existing todo with a specific ID', async () => {
        const createResponse = await request(app)
          .post('/api/v1/create-todo')
          .send({ "task": TODO_DESCRIPTION });

        expect(createResponse.status).toBe(200);
        expect(createResponse.body).toHaveProperty('id');
        todoId = createResponse.body.id;
      });

      when('a user provides a new task for that todo', async () => {
        apiResponse = await request(app)
          .post('/api/v1/update-todo')
          .send({ "id": todoId, "task": UPDATED_TODO_TASK });
      });

      then('the todo\'s task is updated in the system.', async () => {
        expect(apiResponse.status).toBe(200);
        expect(apiResponse.body.id).toBe(todoId);
        expect(apiResponse.body.task).toBe(UPDATED_TODO_TASK);
        expect(typeof apiResponse.body.createdAt).toBe('string');
        expect(typeof apiResponse.body.updatedAt).toBe('string');
      });
    }
  );
});