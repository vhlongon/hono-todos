import { configureApp } from './configureApp';
import { createApp } from './createApp';
import { TodoStore } from './store';

const store = new TodoStore();
const app = createApp();

configureApp(app, store);

export default app;
