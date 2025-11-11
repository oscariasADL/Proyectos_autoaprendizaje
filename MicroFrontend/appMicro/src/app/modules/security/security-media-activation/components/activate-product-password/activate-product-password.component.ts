import { Component, Input, OnInit } from '@angular/core';
import { PasswordBaseComponent } from '@modules/security/security-media-activation/components/password-base/password-base.component';
import { ActivationProduct } from '../../entities/security-media.interface';

@Component({
  selector: 'app-activate-product-password',
  templateUrl: './activate-product-password.component.html',
  styleUrls: ['./activate-product-password.component.sass']
})
export class ActivateProductPasswordComponent
  extends PasswordBaseComponent
  implements OnInit
{
  @Input() product: ActivationProduct;
  ngOnInit(): void {
    this.initForm();
  }
}
