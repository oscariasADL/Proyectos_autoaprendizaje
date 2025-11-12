import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Todo } from '../models/todo.model';
import { AppState } from 'src/app/app.reducer';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styles: [
  ]
})
export class TodoListComponent implements OnInit {

  todos: Todo[] = [];

  constructor( private store: Store<AppState> ) { }

  ngOnInit(): void {

    this.store.select('todos').subscribe( todos => this.todos = todos );
  }

}
