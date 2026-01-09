import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TODO_DESCRIPTION = 'Test todo description';
const CURRENT_DATE = '2026-01-09T14:01:57.465Z';

let apiResponse;
let todoId;

const feature = loadFeature(path.resolve(__dirname, 'delete-todo-given-an-existing-todo-that-is-no-longer-needed-when-a-user.feature'));

defineFeature(feature, (test) => {
  test(
    'Given an existing todo that is no longer needed, when a user requests to delete it, then the todo is permanently removed from the system.',
    ({ given, when, then }) => {
      given('an existing todo that is no longer needed', async () => {
        const createResponse = await request(app).post('/api/v1/create-todo')
          .send({ "task": TODO_DESCRIPTION })
          .expect(200);
        todoId = createResponse.body.id;
      });

      when('a user requests to delete it', async () => {
        apiResponse = await request(app).post('/api/v1/delete-todo')
          .send({ "id": todoId });
      });

      then('the todo is permanently removed from the system', async () => {
        expect(apiResponse.status).toBe(200);
        expect(apiResponse.body).toHaveProperty('id', todoId);
        expect(apiResponse.body).toHaveProperty('task', TODO_DESCRIPTION);
      });
    }
  );
});