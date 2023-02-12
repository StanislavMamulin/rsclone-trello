import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationPageRoutingModule } from './registration-page-routing.module';
import { RegistrationComponent } from './registration/registration.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SuccessModalComponent } from './success-modal/success-modal.component';
import { SnackComponent } from './snack/snack.component';

@NgModule({
  declarations: [RegistrationComponent, SuccessModalComponent, SnackComponent],
  imports: [
    CommonModule,
    RegistrationPageRoutingModule,
    CoreModule,
    SharedModule,
  ],
})
export class RegistrationPageModule { }
