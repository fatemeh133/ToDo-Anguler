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
  categoryName: string = '';
  categoryId: string = '';
  ispost: boolean = true;

  ngOnInit() {
    this.categoryService.fetchCategories().subscribe((category) => {
      this.categories = category;
      console.log(this.categories);
    });
  }

  onsubmit(form: NgForm) {
    const catName = form.value.categoryName;
    if (this.ispost) {
      this.categoryService.addCategories(catName);
    } else {
      this.categoryService.editCategory(this.categoryId, catName);
      this.ispost = true;
    }

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
    const catId = event.dataTransfer?.getData('text/plain');
    const cName = this.categories.filter((categ) => {
      return categ.id === catId;
    });
    this.categoryName = cName[0].category;
    this.categoryId = catId!;

    console.log(cName[0].category);
    this.ispost = false;
  }

  onDelete(categoryId: string) {
    this.categoryService.deleteCategory(categoryId);
  }
}
