import { createRoute } from '@hono/zod-openapi';
import { DbErrorSchema, ErrorNotFoundSchema } from './schemas/error';
import { OkSchema } from './schemas/ok';
import { ParamsSchema } from './schemas/params';
import { InsertSchema, TodoSchema, TodosSchema } from './db/schema';
import * as HttpStatusCodes from 'stoker/http-status-codes';
import { jsonContent, jsonContentRequired } from 'stoker/openapi/helpers';

export const listRoute = createRoute({
  method: 'get',
  path: '/todos',
  tags: ['Get all todos'],
  request: {},
  responses: {
    [HttpStatusCodes.OK]: jsonContent(TodosSchema, 'Retrieve all todos'),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      DbErrorSchema,
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
    [HttpStatusCodes.OK]: jsonContent(TodoSchema, 'Retrieve the todo'),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      ErrorNotFoundSchema,
      'Todo not found'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      DbErrorSchema,
      'Database error'
    ),
  },
});

export const addRoute = createRoute({
  method: 'post',
  path: '/add',
  tags: ['Add a new todo'],
  request: {
    body: jsonContentRequired(InsertSchema, 'The todo to add'),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(TodoSchema, 'The added todo'),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      DbErrorSchema,
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
    body: jsonContentRequired(InsertSchema, 'The todo to update'),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(TodoSchema, 'The updated todo'),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      ErrorNotFoundSchema,
      'Todo not found'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      DbErrorSchema,
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
    [HttpStatusCodes.OK]: jsonContent(OkSchema, 'The todo was deleted'),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      ErrorNotFoundSchema,
      'Todo not found'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      DbErrorSchema,
      'Database error'
    ),
  },
});

export type ListRoute = typeof listRoute;
export type GetOneRoute = typeof getOneRoute;
export type AddRoute = typeof addRoute;
export type PatchRoute = typeof patchRoute;
export type RemoveRoute = typeof deleteRoute;
