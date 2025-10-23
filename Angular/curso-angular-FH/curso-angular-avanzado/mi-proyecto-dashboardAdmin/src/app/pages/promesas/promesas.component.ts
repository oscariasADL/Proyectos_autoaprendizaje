import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  listaUsuarios: any[] = [];

  constructor() { }

  ngOnInit(): void {

    this.getUsuarios().then( usuarios => {
      console.log(usuarios);
      this.listaUsuarios = usuarios as any[];
      console.log("LISTA DE",this.listaUsuarios)
    });

    

    //this.getUsuarios();

    // const promesa = new Promise( (resolve, reject) => {

    //   if( true ){
    //     resolve('Hola Mundo');
    //   } else {
    //     reject('Algo salió mal');
    //   }

    // });

    // promesa.then( (mensaje) => {
    //   console.log(mensaje);
    // }).catch( (error) => {
    //   console.error(error);
    // });

    // console.log('Fin del Init');

  }

  getUsuarios(){
    
    /*
    let usuarios = fetch(
    'https://reqres.in/api/users', {
      headers: {
        'x-api-key': 'reqres-free-v1'
      }
    })
    .then(response => response.json())
    .then(data => console.log(data.data))

    /*.then(response => {
      response.json().then( data => console.log(data) )
    });
    */
    /*
     return usuarios;

    */
     
     /*FORMA MAS OPTIMA*/

     return new Promise( resolve => {

      fetch('https://reqres.in/api/users', {
        headers: {
          'x-api-key': 'reqres-free-v1'
        }
      })
      .then( resp => resp.json() )
      .then( body => resolve( body.data ) );

    });
  }

}
