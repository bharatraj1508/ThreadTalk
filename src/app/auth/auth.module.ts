import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [AuthComponent, RegisterComponent, LoginComponent],
  imports: [CommonModule, AuthRoutingModule, FormsModule, SharedModule],
})
export class AuthModule {}
