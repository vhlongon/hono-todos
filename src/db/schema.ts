import { z } from '@hono/zod-openapi';
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const todosDb = sqliteTable('todos_table', {
  id: int().primaryKey({ autoIncrement: true }).notNull(),
  title: text().notNull(),
  completed: int({ mode: 'boolean' }).notNull(),
});

const TodoInDb = createSelectSchema(todosDb);

export const TodoSchema = z.object(TodoInDb.shape).openapi('Todo', {
  description: 'A single todo',
  additionalProperties: true,
  example: {
    id: 1,
    title: 'Buy groceries',
    completed: false,
  },
});

export const TodosSchema = z.array(TodoSchema).openapi('Todos list', {
  description: 'A list of todos',
  example: [
    { id: 1, title: 'Buy milk', completed: false },
    { id: 2, title: 'Buy  bread', completed: true },
    { id: 3, title: 'Buy eggs', completed: false },
  ],
});

export const InsertSchema = createInsertSchema(todosDb);
export type Todo = typeof todosDb.$inferSelect;
export type NewTodo = typeof todosDb.$inferInsert;
