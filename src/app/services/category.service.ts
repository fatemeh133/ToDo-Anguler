import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { CategoryModel } from '../models/category.model';
import { ToatserService } from './toatser.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(
    private fireService: AngularFirestore,
    private toaster: ToatserService
  ) {}

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
    this.fireService
      .collection('todos')
      .add(newCategory)
      .then(() => {
        this.toaster.showSuccess('ارسال اطلاعات موفقیت آمیز بود', 'موفق');
      })
      .catch((err) => {
        this.toaster.showSuccess(err, 'خطا');
      });
  }

  editCategory(categoryId: string, categoryName: string) {
    this.fireService
      .doc('todos/' + categoryId)
      .update({ category: categoryName })
      .then(() => {
        this.toaster.showSuccess('ویرایش اطلاعات موفقیت آمیز بود', 'موفق');
      })
      .catch((err) => {
        this.toaster.showSuccess(err, 'خطا');
      });
  }

  deleteCategory(categoryId: string) {
    this.fireService
      .doc('todos/' + categoryId)
      .delete()
      .then(() => {
        this.toaster.showSuccess('حذف اطلاعات موفقیت آمیز بود', 'موفق');
      })
      .catch((err) => {
        this.toaster.showSuccess(err, 'خطا');
      });
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
