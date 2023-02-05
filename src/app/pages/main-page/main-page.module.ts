import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPageRoutingModule } from './main-page-routing.module';
import { MainComponent } from './main/main.component';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, MainPageRoutingModule, CoreModule],
})
export class MainPageModule {}
