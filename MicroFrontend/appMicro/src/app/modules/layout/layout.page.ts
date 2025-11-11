import { Component } from '@angular/core';
import { LayoutFacade } from './layout.facade';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.page.html',
  styleUrls: ['./layout.page.sass']
})
export class LayoutPage {
  constructor(private facade: LayoutFacade) {}

  public logout(): void {
    this.facade.logout();
  }
}
