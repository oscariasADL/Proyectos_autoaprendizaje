import { Component, OnInit } from '@angular/core';
import { PasswordBaseComponent } from '@modules/security/security-media-activation/components/password-base/password-base.component';

@Component({
  selector: 'app-unblock-product',
  templateUrl: './unblock-product.component.html',
  styleUrls: ['./unblock-product.component.sass']
})
export class UnblockProductComponent
  extends PasswordBaseComponent
  implements OnInit
{
  ngOnInit(): void {
    this.initForm();
  }
}
