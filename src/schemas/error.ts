import { z } from '@hono/zod-openapi';
import * as HttpStatusCodes from 'stoker/http-status-codes';

export const ErrorNotFoundSchema = z.object({
  code: z.number().openapi({
    example: HttpStatusCodes.NOT_FOUND,
  }),
  message: z.string().openapi({
    example: 'not found',
  }),
});

export const ErrorBadRequestSchema = z.object({
  code: z.number().openapi({
    example: HttpStatusCodes.BAD_REQUEST,
  }),
  message: z.string().openapi({
    example: 'bad request',
  }),
});

export const DbErrorSchema = z.object({
  code: z.number().openapi({
    example: HttpStatusCodes.INTERNAL_SERVER_ERROR,
  }),
  message: z.string().openapi({
    example: 'database error',
  }),
});
