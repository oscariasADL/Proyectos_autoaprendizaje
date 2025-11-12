import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Todo } from '../models/todo.model';
import { AppState } from 'src/app/app.reducer';


@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styles: [
  ]
})
export class TodoItemComponent implements OnInit {

  @Input() todo!: Todo;
  @ViewChild('inputFisico') txtInputFisico!: ElementRef;

  chkCompleted!: FormControl;
  txtInput!: FormControl;

  editando: boolean = false;

  constructor() { }

  ngOnInit(): void {

    //this.todo.completed=true;

    this.chkCompleted = new FormControl(this.todo.completed)
    this.txtInput = new FormControl(this.todo.title, Validators.required)

  }

  editar() {

    this.editando = true;
    this.txtInput.setValue( this.todo.title );
    
    setTimeout(() => {
       this.txtInputFisico.nativeElement.select();
    }, 1);

  }

  terminarEdicion() {
    this.editando = false;

    if( this.txtInput.invalid ) { return; }
    if( this.txtInput.value === this.todo.title ) { return; }

    /*
    this.store.dispatch( 
      actions.editar({
        id: this.todo.id,
        texto: this.txtInput.value
      })
    );*/
  }

}
