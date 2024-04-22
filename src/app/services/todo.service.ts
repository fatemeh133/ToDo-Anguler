import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private fireService: AngularFirestore) {}

  createTodo(todo: any) {
    todo.id = this.fireService.createId();
    return this.fireService.collection('todos').add(todo);
  }
  deleteTodo(todo: any) {
    return this.fireService.collection('todos').doc(todo.id).delete();
  }
  fetchTodo() {
    return this.fireService.collection('todos').snapshotChanges();
  }
  fetchTodoById(todoId: number) {
    return this.fireService.collection('todos').snapshotChanges();
  }
  editTodo() {}
}
