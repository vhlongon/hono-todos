import type { Todo, TodoWithoutId } from './types';

export class TodoStore {
  private todos: Map<number, Todo>;
  private nextId: number;

  constructor() {
    this.todos = new Map();
    this.nextId = 1;
  }

  create(todo: TodoWithoutId) {
    const id = this.nextId++;
    const newTodo = { id, ...todo };
    this.todos.set(id, newTodo);
    return newTodo;
  }

  getAll() {
    return Array.from(this.todos.values());
  }

  getById(id: number) {
    return this.todos.get(id);
  }

  update(id: number, todo: Partial<TodoWithoutId>) {
    const existingTodo = this.todos.get(id);

    if (!existingTodo) {
      return;
    }

    const updatedTodo = {
      ...existingTodo,
      ...todo,
    };

    this.todos.set(id, updatedTodo);
    return updatedTodo;
  }

  delete(id: number) {
    return this.todos.delete(id);
  }

  exists(id: number) {
    return this.todos.has(id);
  }
}
