import { Component } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mi-proyecto-angular16';

  constructor( private userService: UserService ) {

    this.userService.obtenerUsuarios()
      .subscribe(
        usuarios => {
          console.log(usuarios);
        }
      )

  }

}
