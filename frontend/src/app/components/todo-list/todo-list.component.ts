import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos: Todo[] = [];
  newTodoTitle: string = '';
  editingTodo: Todo | null = null;

  get completedCount(): number {
    return this.todos.filter(t => t.completed).length;
  }

  get remainingCount(): number {
    return this.todos.filter(t => !t.completed).length;
  }

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.todoService.getAllTodos().subscribe({
      next: (todos) => this.todos = todos,
      error: (err) => console.error('Error loading todos:', err)
    });
  }

  addTodo(): void {
    if (!this.newTodoTitle.trim()) return;

    const todo: Todo = {
      title: this.newTodoTitle.trim(),
      completed: false
    };

    this.todoService.createTodo(todo).subscribe({
      next: (createdTodo) => {
        this.todos.unshift(createdTodo);
        this.newTodoTitle = '';
      },
      error: (err) => console.error('Error creating todo:', err)
    });
  }

  toggleComplete(todo: Todo): void {
    const updatedTodo = { ...todo, completed: !todo.completed };
    this.todoService.updateTodo(todo.id!, updatedTodo).subscribe({
      next: (result) => {
        const index = this.todos.findIndex(t => t.id === todo.id);
        if (index !== -1) {
          this.todos[index] = result;
        }
      },
      error: (err) => console.error('Error updating todo:', err)
    });
  }

  startEdit(todo: Todo): void {
    this.editingTodo = { ...todo };
  }

  saveEdit(): void {
    if (!this.editingTodo || !this.editingTodo.title.trim()) return;

    this.todoService.updateTodo(this.editingTodo.id!, this.editingTodo).subscribe({
      next: (result) => {
        const index = this.todos.findIndex(t => t.id === this.editingTodo!.id);
        if (index !== -1) {
          this.todos[index] = result;
        }
        this.editingTodo = null;
      },
      error: (err) => console.error('Error updating todo:', err)
    });
  }

  cancelEdit(): void {
    this.editingTodo = null;
  }

  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id).subscribe({
      next: () => {
        this.todos = this.todos.filter(t => t.id !== id);
      },
      error: (err) => console.error('Error deleting todo:', err)
    });
  }
}
