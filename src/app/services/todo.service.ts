import { Todo } from './../models/todo.model';
import { Injectable } from '@angular/core';
import { observable, computed } from 'mobx-angular';
import * as firebase from 'firebase';
import Datasnapshot = firebase.database.DataSnapshot;
import { serialize } from 'serializr';

@Injectable()
export class TodoService {

  // posts : todoList
  // post : todo
  // Post : TodoList
  @observable todoList: Todo[] = [];

  // Pour la TODOLIST il nous faut 2 computed avec 2 filter
  // 1 qui observe l'état des todo et les chargent, un autre qui observe les done
  constructor() {
    this.getTodoList();
  }
  createNewTodoList(newToDoList) {
    this.todoList.push(newToDoList);
    const newToDoListId = firebase.database().ref('/TodoList').push(newToDoList).key;
    newToDoList.id = newToDoListId;
    firebase.database().ref('/TodoList/' + newToDoListId).set(newToDoList);
  }

  getTodoList() {
    firebase.database().ref('/TodoList')
      .on('value', (data: Datasnapshot) => {
        this.todoList = data.val()
          ? Object.values(data.val()).map(todo => new Todo(todo))
          : [];
      });
  }
  updateTodoList(todo: Todo) {
    firebase.database().ref('/TodoList/' + todo.id).update(serialize(todo));
  }
  removeToDoList(todo: Todo) {
    const todoIndexToRemove = this.todoList.findIndex(
      (todoEl) => {
        if (todoEl === todo) {
          return true;
        }
      }
    );
    firebase.database().ref('/TodoList/' + todo.id).remove();
    this.todoList.splice(todoIndexToRemove, 1);
  }

  // @computed get sortedadresses() {
  //   if (this.adressService.adress) {
  //     return Array.from(
  //       this.adressService.adress).slice().sort((a: Adress, b: Adress) => {
  //         if (a.order < b.order) {
  //           return -1;
  //         }
  //         if (a.order > b.order) {
  //           return 1;
  //         } else {
  //           return 0;
  //         }
  //       });
  //   }
  //   return [];
  // }
}
