import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { BoardPageComponent } from './board/board-page.component';
import { BoardModule } from 'src/app/modules/board/board.module';
import { BoardService } from 'src/app/modules/board/board-service.service';
import { WorkspaceModule } from '../workspace-page/workspace.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FiltersComponent } from './filters/filters.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

@NgModule({
  declarations: [
    BoardPageComponent,
    FiltersComponent,
  ],
  imports: [
    CommonModule,
    BoardRoutingModule,
    BoardModule,
    WorkspaceModule,
    SharedModule,
    NgxSliderModule
  ],
  providers: [BoardService],
})
export class BoardPageModule {}
