import { createRoute } from '@hono/zod-openapi';
import { DbErrorSchema, ErrorNotFoundSchema } from './schemas/error';
import { OkSchema } from './schemas/ok';
import { ParamsSchema } from './schemas/params';
import { insertTodoSchema, todoSchema, todosSchema } from './db/schema';
import * as HttpStatusCodes from 'stoker/http-status-codes';
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers';

const Todo = todoSchema.openapi('Todo');
const Todos = todosSchema.openapi('Todos');
const DbError = DbErrorSchema.openapi('DataBaseError');
const OkResponse = OkSchema.openapi('OkResponse');

export const listRoute = createRoute({
  method: 'get',
  path: '/todos',
  tags: ['Get all todos'],
  request: {},
  responses: {
    [HttpStatusCodes.OK]: jsonContent(Todos, 'Retrieve all todos'),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      DbError,
      'Database error'
    ),
  },
});

export const getOneRoute = createRoute({
  method: 'get',
  path: '/todos/{id}',
  tags: ['Get a specific todo by id'],
  request: {
    params: ParamsSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(Todo, 'Retrieve the todo'),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      ErrorNotFoundSchema,
      'Todo not found'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      DbError,
      'Database error'
    ),
  },
});

export const addRoute = createRoute({
  method: 'post',
  path: '/add',
  tags: ['Add a new todo'],
  request: {
    body: jsonContentRequired(insertTodoSchema, 'The todo to add'),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(Todo, 'The added todo'),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      DbError,
      'Database error'
    ),
  },
});

export const patchRoute = createRoute({
  method: 'patch',
  path: '/todos/{id}',
  tags: ['Update a todo by id'],
  request: {
    params: ParamsSchema,
    body: jsonContentRequired(insertTodoSchema, 'The todo to update'),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(Todo, 'The updated todo'),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      ErrorNotFoundSchema,
      'Todo not found'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      DbError,
      'Database error'
    ),
  },
});

export const deleteRoute = createRoute({
  method: 'delete',
  path: '/todos/{id}',
  tags: ['Delete a todo by id'],
  request: {
    params: ParamsSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(OkResponse, 'The todo was deleted'),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      ErrorNotFoundSchema,
      'Todo not found'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      DbError,
      'Database error'
    ),
  },
});

export type ListRoute = typeof listRoute;
export type GetOneRoute = typeof getOneRoute;
export type AddRoute = typeof addRoute;
export type PatchRoute = typeof patchRoute;
export type RemoveRoute = typeof deleteRoute;
