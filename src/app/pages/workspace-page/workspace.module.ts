import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkspaceRoutingModule } from './workspace-routing.module';
import { WorkspaceComponent } from './workspace/workspace.component';
import { ColumnTaskModule } from 'src/app/modules/column-task/column-task.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ColumnTaskService } from 'src/app/modules/column-task/column-task.service';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [
    WorkspaceComponent
  ],
  imports: [
    CommonModule,
    WorkspaceRoutingModule,
    ColumnTaskModule,
    SharedModule,
    DragDropModule
  ],
  exports:[
    WorkspaceComponent
  ],
  providers:[
    ColumnTaskService
  ]
})
export class WorkspaceModule { }
