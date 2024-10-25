import { createRoute } from '@hono/zod-openapi';
import { ErrorNotFound } from './schemas/error';
import { OkSchema } from './schemas/ok';
import { ParamsSchema } from './schemas/params';
import {
  PartialTodoSchema,
  TodoSchema,
  TodoWithIdSchema,
  TodosSchema,
} from './schemas/todo';

export const listRoute = createRoute({
  method: 'get',
  path: '/todos',
  tags: ['Get all todos'],
  request: {},
  responses: {
    200: {
      content: {
        'application/json': {
          schema: TodosSchema,
        },
      },
      description: 'Retrieve all todos',
    },
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
    200: {
      content: {
        'application/json': {
          schema: TodoSchema,
        },
      },
      description: 'Retrieve the todo',
    },
    404: {
      content: {
        'application/json': {
          schema: ErrorNotFound,
        },
      },
      description: 'Todo not found',
    },
  },
});

export const addRoute = createRoute({
  method: 'post',
  path: '/add',
  tags: ['Add a new todo'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: TodoWithIdSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: TodoSchema,
        },
      },
      description: 'Add a new todo',
    },
  },
});

export const patchRoute = createRoute({
  method: 'patch',
  path: '/todos/{id}',
  tags: ['Update a todo by id'],
  request: {
    params: ParamsSchema,
    body: {
      content: {
        'application/json': {
          schema: PartialTodoSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: TodoSchema,
        },
      },
      description: 'Update the todo',
    },
    404: {
      content: {
        'application/json': {
          schema: ErrorNotFound,
        },
      },
      description: 'Todo not found',
    },
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
    200: {
      content: {
        'application/json': {
          schema: OkSchema,
        },
      },
      description: 'Delete the todo',
    },
    404: {
      content: {
        'application/json': {
          schema: ErrorNotFound,
        },
      },
      description: 'Todo not found',
    },
  },
});

export type ListRoute = typeof listRoute;
export type GetOneRoute = typeof getOneRoute;
export type AddRoute = typeof addRoute;
export type PatchRoute = typeof patchRoute;
export type RemoveRoute = typeof deleteRoute;
