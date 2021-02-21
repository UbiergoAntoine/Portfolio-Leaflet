import { TodoService } from './../../services/todo.service';
import { Todo } from './../../models/todo.model';
import { AppComponent } from './../../app.component';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { computed } from 'mobx-angular';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todo = '';
  TodoListForm: FormGroup;
  constructor(
    public todoService: TodoService,
    private formBuilder: FormBuilder,
    private router: Router,
    public dialogRef: MatDialogRef<AppComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  @computed get todoListComputed() {
    if (this.todoService.todoList) {
      return this.todoService.todoList.filter(stilltodo => {
        return !stilltodo.done;
      });
    }
  }
  @computed get doneListComputed() {
    if (this.todoService.todoList) {
      return this.todoService.todoList.filter(donechecked => {
        return donechecked.done;
      });
    }
  }
  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.TodoListForm = this.formBuilder.group({
      todo: ['', Validators.required],
      done: false,
    });
  }
  onSaveTodoList() {
    const newToDoList = new Todo({
      todo: this.TodoListForm.get('todo').value,
      done: this.TodoListForm.get('done').value
    });
    this.todoService.createNewTodoList(newToDoList);
    this.TodoListForm.reset();
  }
  onEnter(todo: string) {
    this.todo = todo;
    this.onSaveTodoList();
    this.TodoListForm.reset();
  }
  onDeleteTodoItem(todo: Todo) {
    this.todoService.removeToDoList(todo);
  }
}
