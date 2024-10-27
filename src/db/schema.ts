import { z } from '@hono/zod-openapi';
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const todos = sqliteTable('todos_table', {
  id: int().primaryKey({ autoIncrement: true }).notNull(),
  title: text().notNull(),
  completed: int({ mode: 'boolean' }).notNull(),
});

export const todoSchema = createSelectSchema(todos);
export const todosSchema = z.array(todoSchema);
export const insertTodoSchema = createInsertSchema(todos);

export type Todo = typeof todos.$inferSelect;
export type NewTodo = typeof todos.$inferInsert;
