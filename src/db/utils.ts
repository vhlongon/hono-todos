import { eq } from 'drizzle-orm';
import { db } from './db';
import { type NewTodo, todosDb } from './schema';

export const getTodoById = async (id: number) => {
  return await db.query.todos.findFirst({
    where: eq(todosDb.id, id),
  });
};

export const addTodo = async (input: NewTodo) => {
  const [newTodo] = await db.insert(todosDb).values(input).returning();
  return newTodo;
};

export const deleteTodo = async (id: number) => {
  await db.delete(todosDb).where(eq(todosDb.id, id));
};

export const updateTodo = async (id: number, input: NewTodo) => {
  const [updatedTodo] = await db
    .update(todosDb)
    .set(input)
    .where(eq(todosDb.id, id))
    .returning();
  return updatedTodo;
};
