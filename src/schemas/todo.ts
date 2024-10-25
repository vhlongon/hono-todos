import { z } from '@hono/zod-openapi';

export const TodoSchema = z
  .object({
    id: z.number().openapi({
      example: 1,
    }),
    title: z.string().openapi({
      example: 'Buy milk',
    }),
    completed: z.boolean().openapi({
      example: false,
    }),
  })
  .openapi('Todo');

export const TodoWithoutIdSchema = TodoSchema.omit({ id: true });

export const PartialTodoSchema = TodoWithoutIdSchema.partial();

export const TodosSchema = z.array(TodoSchema).openapi('Todos');
