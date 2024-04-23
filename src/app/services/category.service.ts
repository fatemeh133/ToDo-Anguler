import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { CategoryModel } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private fireService: AngularFirestore) {}

  fetchCategories(): Observable<CategoryModel[]> {
    return this.fireService
      .collection('todos')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((action) => {
            const id = action.payload.doc.id;
            const data: any = action.payload.doc.data();
            const category: CategoryModel = {
              id: id,
              category: data.category,
              colorCode: data.colorCode,
              todoCount: data.todoCount,
            };
            return category;
          });
        })
      );
  }

  addCategories(categoryName: string) {
    let newCategory: CategoryModel = {
      category: categoryName,
      colorCode: this.generateColor(),
      todoCount: 0,
    };
    this.fireService.collection('todos').add(newCategory);
  }

  editCategory(categoryId: string, categoryName: string) {
    this.fireService
      .doc('todos/' + categoryId)
      .update({ category: categoryName });
  }

  deleteCategory(categoryId: string) {
    this.fireService.doc('todos/' + categoryId).delete();
  }

  private generateColor() {
    const colorArray = [
      '#eb8634',
      '#d3eb34',
      '#34eb89',
      '#34e8eb',
      '#346eeb',
      '#6834eb',
      '#eb344c',
      '#eb3434',
      '#ff9169',
      '#697aff',
    ];
    const randomNumber = Math.floor(Math.random() * colorArray.length);
    return colorArray[randomNumber];
  }
}
