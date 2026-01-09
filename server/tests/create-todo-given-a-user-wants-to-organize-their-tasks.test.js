import path from 'path';
import { fileURLToPath } from 'url';
import { loadFeature, defineFeature } from 'jest-cucumber';
import request from 'supertest';
import app from '../src/bootstrap/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TODO_DESCRIPTION = 'Test todo description';
const CURRENT_DATE = '2026-01-09T14:01:57.461Z';

let apiResponse;

const feature = loadFeature(path.resolve(__dirname, 'create-todo-given-a-user-wants-to-organize-their-tasks.feature'));

defineFeature(feature, (test) => {
  test(
    'Given a user wants to organize their tasks, when they provide a task description, then a new todo is created with the provided task.',
    ({ given, when, then }) => {
      given('a user wants to organize their tasks', async () => {});

      when('they provide a task description', async () => {
        apiResponse = await request(app)
          .post('/api/v1/create-todo')
          .send({ "task": TODO_DESCRIPTION });
      });

      then('a new todo is created with the provided task', async () => {
        expect(apiResponse.status).toBe(200);
        expect(apiResponse.body).toHaveProperty('id');
        expect(typeof apiResponse.body.id).toBe('string');
        expect(apiResponse.body).toHaveProperty('task', TODO_DESCRIPTION);
        expect(apiResponse.body).toHaveProperty('createdAt');
        expect(typeof apiResponse.body.createdAt).toBe('string');
        expect(apiResponse.body).toHaveProperty('updatedAt');
        expect(typeof apiResponse.body.updatedAt).toBe('string');
      });
    }
  );
});