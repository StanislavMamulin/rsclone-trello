import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './component/board/board.component';
import { BoardService } from './board-service.service';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [BoardComponent],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [BoardComponent, SharedModule],
  providers: [BoardService],
})
export class BoardModule {}
