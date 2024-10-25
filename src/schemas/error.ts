import { z } from '@hono/zod-openapi';

export const ErrorNotFoundSchema = z.object({
  code: z.number().openapi({
    example: 404,
  }),
  message: z.string().openapi({
    example: 'not found',
  }),
});

export const ErrorBadRequestSchema = z.object({
  code: z.number().openapi({
    example: 400,
  }),
  message: z.string().openapi({
    example: 'bad request',
  }),
});
