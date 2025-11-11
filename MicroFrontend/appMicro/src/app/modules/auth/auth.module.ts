import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from '@modules/auth/auth-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, AuthRoutingModule],
  exports: [FormsModule]
})
export class AuthModule {}
