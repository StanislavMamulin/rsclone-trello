import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { BoardPageComponent } from './board/board-page.component';
import { BoardModule } from 'src/app/modules/board/board.module';
import { BoardService } from 'src/app/modules/board/board-service.service';
import { WorkspaceModule } from '../workspace-page/workspace.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    BoardPageComponent
  ],
  imports: [
    CommonModule,
    BoardRoutingModule,
    BoardModule,
    WorkspaceModule,
    SharedModule
  ],
  providers:[
    BoardService
  ]
})
export class BoardPageModule { }
