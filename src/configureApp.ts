import { swaggerUI } from '@hono/swagger-ui';
import packageJSON from '../package.json';
import {
  addHandler,
  deleteHandler,
  getOneHandler,
  listHandler,
  patchHandler,
} from './handlers';
import {
  addRoute,
  deleteRoute,
  getOneRoute,
  listRoute,
  patchRoute,
} from './routes';
import type { TodoStore } from './store';
import type { AppOpenAPI } from './types';

export const configureApp = (app: AppOpenAPI, store: TodoStore) => {
  // The OpenAPI documentation will be available at /doc
  app.doc('/doc', {
    openapi: '3.0.0',
    info: {
      version: packageJSON.version,
      title: 'Todos API',
      description: 'A simple API to manage todos using Hono and Zod',
    },
  });

  app.get('/swagger', swaggerUI({ url: '/doc' }));

  app.openapi(listRoute, listHandler(store));
  app.openapi(getOneRoute, getOneHandler(store));
  app.openapi(addRoute, addHandler(store));
  app.openapi(deleteRoute, deleteHandler(store));
  app.openapi(patchRoute, patchHandler(store));

  return app;
};
