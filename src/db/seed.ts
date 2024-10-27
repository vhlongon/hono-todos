import { db } from './db';
import { type NewTodo, todos } from './schema';

const seed = async () => {
  await db.delete(todos);

  const todo: NewTodo = {
    title: 'Do the dishes',
    completed: false,
  };

  await db.insert(todos).values(todo);
  console.log('Seed data inserted');

  return db.select().from(todos);
};

seed().then(todos => {
  console.log(JSON.stringify(todos, null, 2));
});
