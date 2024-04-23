import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { CategoryModel } from '../models/category.model';

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
}
