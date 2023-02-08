import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkspaceRoutingModule } from './workspace-routing.module';
import { WorkspaceComponent } from './workspace/workspace.component';
import { ColumnTaskModule } from 'src/app/modules/column-task/column-task.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ColumnTaskService } from 'src/app/modules/column-task/column-task.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AddControlsModule } from 'src/app/modules/add-controls/add-controls.module';


@NgModule({
  declarations: [
    WorkspaceComponent
  ],
  imports: [
    CommonModule,
    WorkspaceRoutingModule,
    ColumnTaskModule,
    SharedModule,
    DragDropModule,
    AddControlsModule
  ],
  exports:[
    WorkspaceComponent
  ],
  providers:[
    ColumnTaskService
  ]
})
export class WorkspaceModule { }
