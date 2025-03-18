import { configureApp } from './configureApp';
import { createApp } from './createApp';

const app = createApp();

configureApp(app);

export default {
  port: process.env.PORT || 3000,
  fetch: app.fetch,
};
