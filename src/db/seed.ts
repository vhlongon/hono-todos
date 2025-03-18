import { db } from './db';
import { type NewTodo, todosDb } from './schema';

const seed = async () => {
  await db.delete(todosDb);

  const todo: NewTodo = {
    title: 'Do the dishes',
    completed: false,
  };

  await db.insert(todosDb).values(todo);
  console.log('Seed data inserted');

  return db.select().from(todosDb);
};

seed().then(todos => {
  console.log(JSON.stringify(todos, null, 2));
});
