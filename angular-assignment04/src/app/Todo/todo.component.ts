import { Component, OnInit } from '@angular/core';

import { Todo } from './todo';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  providers: [TodoService]
})
export class TodoComponent implements OnInit {
  todos: Todo[];
  editTodo: Todo;

  constructor(private TodoService: TodoService) {}

  ngOnInit() {
    this.getTodo();
  }

  getTodo(): void {
    this.TodoService.getTodo()
      .subscribe(todos => (this.todos = todos));
  }

  add(name: string): void {
    this.editTodo = undefined;
    name = name.trim();
    if (!name) {
      return;
    }

    const newItem: Todo = { name } as Todo;
    this.TodoService
      .addTodo(newItem)
      .subscribe(item => this.todos.push(item));
  }

  delete(item: Todo): void {
    this.todos = this.todos.filter(h => h !== item);
    this.TodoService
      .deleteTodo(item.name)
      .subscribe();
  }
}