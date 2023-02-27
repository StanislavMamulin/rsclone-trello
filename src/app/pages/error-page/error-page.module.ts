import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorPageRoutingModule } from './error-page-routing.module';
import { ErrorComponent } from './error/error.component';
import { CoreModule } from 'src/app/core/core.module';


@NgModule({
  declarations: [
    ErrorComponent
  ],
  imports: [
    CommonModule,
    ErrorPageRoutingModule,
    CoreModule
  ]
})
export class ErrorPageModule { }
