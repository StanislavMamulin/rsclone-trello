import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { BoardPageComponent } from './board/board-page.component';
import { BoardModule } from 'src/app/modules/board/board.module';


@NgModule({
  declarations: [
    BoardPageComponent
  ],
  imports: [
    CommonModule,
    BoardRoutingModule,
    BoardModule
  ]
})
export class BoardPageModule { }
