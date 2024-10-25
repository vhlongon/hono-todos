import type { AppRouteHandler } from './types';
import type {
  AddRoute,
  GetOneRoute,
  ListRoute,
  PatchRoute,
  RemoveRoute,
} from './routes';

export const listHandler: AppRouteHandler<ListRoute> = store => c => {
  return c.json(store.getAll(), 200);
};

export const getOneHandler: AppRouteHandler<GetOneRoute> = store => c => {
  const { id } = c.req.valid('param');
  const todo = store.getById(Number(id));

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

export const addHandler: AppRouteHandler<AddRoute> = store => c => {
  const input = c.req.valid('json');
  const todo = store.create(input);
  return c.json(todo, 200);
};

export const deleteHandler: AppRouteHandler<RemoveRoute> = store => c => {
  const { id } = c.req.valid('param');

  if (!store.exists(Number(id))) {
    return c.json(
      {
        code: 404,
        message: 'Not found error',
      },
      404
    );
  }
  store.delete(Number(id));

  return c.json({ ok: true }, 200);
};

export const patchHandler: AppRouteHandler<PatchRoute> = store => c => {
  const { id } = c.req.valid('param');
  const input = c.req.valid('json');
  const todo = store.update(Number(id), input);

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
