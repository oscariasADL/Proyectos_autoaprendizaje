import { Component, Input } from '@angular/core';
import { Adviser } from '../../entities/adviser.interface';

@Component({
  selector: 'app-preferred-customer',
  templateUrl: './preferred-customer.component.html',
  styleUrls: ['./preferred-customer.component.sass']
})
export class PreferredCustomerComponent {
  @Input()
  public adviser: Adviser;
  @Input()
  public working: boolean;
}
