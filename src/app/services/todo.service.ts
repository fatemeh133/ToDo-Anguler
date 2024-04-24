import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { TodoModel } from '../models/todo.model';
import { increment } from '@angular/fire/firestore';

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
            const todos: TodoModel = {
              id: id,
              title: data.title,
              isCompeleted: data.isComoeleted,
            };
            return todos;
          });
        })
      );
  }

  deleteTodo(todoId: string, categoryId: string) {
    const todoPath = 'todos/' + categoryId + '/todo';
    return this.fireService
      .collection(todoPath)
      .doc(todoId)
      .delete()
      .then(() => {
        this.fireService
          .collection('todos')
          .doc(categoryId)
          .update({ todoCount: increment(-1) });
      });
  }

  addTodo(todoName: String, categoryId: string) {
    const NewTodo = {
      title: todoName,
      isComoeleted: false,
    };

    this.fireService
      .collection('todos')
      .doc(categoryId)
      .collection('todo')
      .add(NewTodo);
    this.fireService
      .collection('todos')
      .doc(categoryId)
      .update({ todoCount: increment(1) });
  }

  editTodo(categoryId: string, todoId: string, newTodoName: string) {
    const todoPath = 'todos/' + categoryId + '/todo';
    this.fireService
      .collection(todoPath)
      .doc(todoId)
      .update({ title: newTodoName });
  }

  markCompelete(categoryId: string, todoId: string) {
    const todoPath = 'todos/' + categoryId + '/todo';
    this.fireService
      .collection(todoPath)
      .doc(todoId)
      .update({ isComoeleted: true });
    console.log('markCompelete');
    console.log(categoryId);
    console.log(todoId);
  }

  markUncompelete(categoryId: string, todoId: string) {
    const todoPath = 'todos/' + categoryId + '/todo';
    this.fireService
      .collection(todoPath)
      .doc(todoId)
      .update({ isComoeleted: false });

    console.log('markCompelete');
    console.log(categoryId);
    console.log(todoId);
  }
}
