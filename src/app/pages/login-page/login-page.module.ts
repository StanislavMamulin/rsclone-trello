import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginPageRoutingModule } from './login-page-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FooterComponent } from 'src/app/core/components/footer/footer.component';

@NgModule({
  declarations: [
    LoginComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    LoginPageRoutingModule,
    SharedModule,
  ]
})
export class LoginPageModule { }
