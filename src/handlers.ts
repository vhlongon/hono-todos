import { db } from './db/db';
import { addTodo, deleteTodo, getTodoById, updateTodo } from './db/utils';
import type {
  AddRoute,
  GetOneRoute,
  ListRoute,
  PatchRoute,
  RemoveRoute,
} from './routes';
import type { AppRouteHandler } from './types';

export const listHandler: AppRouteHandler<ListRoute> = async c => {
  const todos = await db.query.todos.findMany();
  return c.json(todos, 200);
};

export const getOneHandler: AppRouteHandler<GetOneRoute> = async c => {
  const { id } = c.req.valid('param');
  const todo = await getTodoById(Number(id));

  if (!todo) {
    return c.json(
      {
        code: 404,
        message: 'Not found error',
      },
      404
    );
  }

  return c.json(todo, 200);
};

export const addHandler: AppRouteHandler<AddRoute> = async c => {
  const input = c.req.valid('json');
  const newTodo = await addTodo(input);
  return c.json(newTodo, 200);
};

export const deleteHandler: AppRouteHandler<RemoveRoute> = async c => {
  const { id } = c.req.valid('param');

  const todo = await getTodoById(Number(id));

  if (!todo) {
    return c.json(
      {
        code: 404,
        message: 'Not found error',
      },
      404
    );
  }
  await deleteTodo(Number(id));

  return c.json({ ok: true }, 200);
};

export const patchHandler: AppRouteHandler<PatchRoute> = async c => {
  const { id } = c.req.valid('param');
  const input = c.req.valid('json');
  const todo = await getTodoById(Number(id));

  if (!todo) {
    return c.json(
      {
        code: 404,
        message: 'Not found error',
      },
      404
    );
  }

  await updateTodo(Number(id), input);

  return c.json(todo, 200);
};
