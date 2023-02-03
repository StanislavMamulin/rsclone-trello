import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './component/board/board.component';
import { BoardService } from './board-service.service';



@NgModule({
  declarations: [
    BoardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BoardComponent
  ],
  providers: [
    BoardService,
  ]
})
export class BoardModule { }
