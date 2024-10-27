import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

if (!process.env.DB_FILE_NAME) {
  throw new Error('DB_FILE_NAME environment variable is not defined');
}

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'sqlite',
  dbCredentials: {
    url: process.env.DB_FILE_NAME,
  },
});
