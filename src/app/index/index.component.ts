import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../services/todo.service';
import { TodoModel } from '../models/todo.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export class IndexComponent implements OnInit {
  categoryId = '';
  todoName: string = '';
  todos: Array<TodoModel> = [];
  ispost: boolean = true;
  todoId: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private todoService: TodoService
  ) {}

  ngOnInit() {
    this.categoryId = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.todoService.fetchTodo(this.categoryId).subscribe((todos) => {
      this.todos = todos;
      console.log(this.todos);
    });
  }

  onsubmit(form: NgForm) {
    const todoName = form.value.todoName;

    if (this.ispost) {
      this.todoService.addTodo(todoName, this.categoryId);
    } else {
      this.todoService.editTodo(this.categoryId, this.todoId, todoName);
      this.ispost = true;
    }

    form.reset();
  }

  onDelete(todoId: string, categoryId: string) {
    this.todoService.deleteTodo(todoId, categoryId);
  }

  onUpdate(todoId: string, todoTitle: string) {
    this.todoId = todoId;
    this.todoName = todoTitle;
    this.ispost = false;
  }

  compeleteTodo(todoId: string) {
    this.todoService.markCompelete(this.categoryId, todoId);
    
  }

  uncompeleteTodo(todoId: string) {
    this.todoService.markUncompelete(this.categoryId, todoId);
  }
}
