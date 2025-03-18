import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { todosDb } from './schema';

if (!process.env.DB_FILE_NAME) {
  throw new Error('DB_FILE_NAME environment variable is not defined');
}

export const db = drizzle({
  connection: {
    url: process.env.DB_FILE_NAME,
  },
  schema: { todos: todosDb },
});
