import { eq } from 'drizzle-orm';
import { db } from './db';
import { type NewTodo, todos } from './schema';

export const getTodoById = async (id: number) => {
  return await db.query.todos.findFirst({
    where: eq(todos.id, id),
  });
};

export const addTodo = async (input: NewTodo) => {
  const [newTodo] = await db.insert(todos).values(input).returning();
  return newTodo;
};

export const deleteTodo = async (id: number) => {
  await db.delete(todos).where(eq(todos.id, id));
};

export const updateTodo = async (id: number, input: NewTodo) => {
  const [updatedTodo] = await db
    .update(todos)
    .set(input)
    .where(eq(todos.id, id))
    .returning();
  return updatedTodo;
};
