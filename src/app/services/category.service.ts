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
}
