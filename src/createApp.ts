import { OpenAPIHono } from '@hono/zod-openapi';
import { formatZodErrors } from './utils';

export const createApp = () => {
  const app = new OpenAPIHono({
    defaultHook: (result, c) => {
      if (!result.success) {
        return c.json(
          {
            ok: false,
            errors: formatZodErrors(result),
            source: 'validation error',
          },
          422
        );
      }
    },
  });

  return app;
};
