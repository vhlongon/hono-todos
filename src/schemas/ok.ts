import { z } from '@hono/zod-openapi';

export const OkSchema = z.object({
  ok: z.boolean().openapi({
    example: true,
  }),
});
