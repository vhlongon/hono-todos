import type {
  OpenAPIHono,
  RouteConfig,
  RouteHandler,
  z,
} from '@hono/zod-openapi';
import type { Env } from 'hono';
import type { TodoSchema, TodoWithIdSchema } from './schemas/todo';
import type { TodoStore } from './store';

export type Todo = z.infer<typeof TodoSchema>;

export type TodoWithoutId = z.infer<typeof TodoWithIdSchema>;

export type AppBindings = Env;

export type AppOpenAPI = OpenAPIHono<Env>;

export type AppRouteHandler<R extends RouteConfig> = (
  store: TodoStore
) => RouteHandler<R, Env>;
