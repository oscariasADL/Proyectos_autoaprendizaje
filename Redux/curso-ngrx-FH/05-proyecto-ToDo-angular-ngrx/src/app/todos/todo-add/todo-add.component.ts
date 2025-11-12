import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Actions } from '@ngrx/effects/src/actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import  * as actions from '../todos.actions';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styles: [
  ]
})
export class TodoAddComponent implements OnInit {

  public txtInput: FormControl;

  constructor( private store: Store<AppState> ) { 
    this.txtInput = new FormControl('', Validators.required);
  }
  

  ngOnInit(): void {
  }

  agregarTodo() {

    if ( this.txtInput.invalid ) {
      console.log(this.txtInput.valid);
      return;
    }

    console.log(this.txtInput.value);
    this.store.dispatch( actions.crearTodo({ texto: this.txtInput.value }) );

    this.txtInput.reset();

    
    
  }

}
