import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryComponent } from '../category/category.component';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export class IndexComponent implements OnInit {
  categoryId = '';
  todos: Array<any> = [];

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
    alert(this.categoryId);
  }
}
