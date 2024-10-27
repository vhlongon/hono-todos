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
import type { AppOpenAPI } from './types';
import { apiReference } from '@scalar/hono-api-reference';

export const configureApp = (app: AppOpenAPI) => {
  // The OpenAPI raw json will be available at /doc
  app.doc('/doc', {
    openapi: '3.0.0',
    info: {
      version: packageJSON.version,
      title: 'Todos API',
      description: 'A simple API to manage todos using Hono and Zod',
    },
  });

  // the scalar ui api reference will be available at /reference
  app.get(
    '/reference',
    apiReference({
      theme: 'solarized',
      layout: 'classic',
      defaultHttpClient: {
        targetKey: 'javascript',
        clientKey: 'fetch',
      },
      spec: {
        url: '/doc',
      },
    })
  );

  // The Swagger UI will be available at /swagger
  app.get('/swagger', swaggerUI({ url: '/doc' }));

  app.openapi(listRoute, listHandler);
  app.openapi(getOneRoute, getOneHandler);
  app.openapi(addRoute, addHandler);
  app.openapi(deleteRoute, deleteHandler);
  app.openapi(patchRoute, patchHandler);

  return app;
};
