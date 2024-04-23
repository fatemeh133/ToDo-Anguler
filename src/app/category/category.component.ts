import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { CategoryModel } from '../models/category.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent implements OnInit {
  constructor(private categoryService: CategoryService) {}

  categories: Array<CategoryModel> = [];

  ngOnInit() {
    this.categoryService.fetchCategories().subscribe((category) => {
      this.categories = category;
      console.log(this.categories);
    });
  }

  onsubmit(form: NgForm) {
    this.categoryService.addCategories(form.value.categoryName);
    form.reset();
  }
  onDragStart(event: DragEvent, id: string) {
    console.log(event);
    event.dataTransfer?.setData('text/plain', id);
  }

  onDragOver(event: Event) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    const data = event.dataTransfer?.getData('text/plain');
    console.log('drop......', data);
  }
}
