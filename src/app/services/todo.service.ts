import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private fireService: AngularFirestore) {}

  fetchTodo(categoryId: string) {
    return this.fireService
      .collection('todos')
      .doc(categoryId)
      .collection('todo')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((action) => {
            const id = action.payload.doc.id;
            const data: any = action.payload.doc.data();
            const todos: any = {
              id: id,
              title: data.title,
              isCompeleted: data.isCompeleted,
            };
            return todos;
          });
        })
      );
  }
  createTodo(todo: any) {
    todo.id = this.fireService.createId();
    return this.fireService.collection('todos').add(todo);
  }
  deleteTodo(todo: any) {
    return this.fireService.collection('todos').doc(todo.id).delete();
  }
  fetchTodoById(todoId: number) {
    return this.fireService.collection('todos').snapshotChanges();
  }
  editTodo() {}
}
