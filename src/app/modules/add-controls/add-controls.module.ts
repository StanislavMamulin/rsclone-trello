import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddControlsComponent } from './Component/add-controls.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [AddControlsComponent],
  imports: [CommonModule, SharedModule],
  exports: [AddControlsComponent],
})
export class AddControlsModule {}
