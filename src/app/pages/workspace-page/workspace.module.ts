import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkspaceRoutingModule } from './workspace-routing.module';
import { WorkspaceComponent } from './workspace/workspace.component';
import { ColumnTaskModule } from 'src/app/modules/column-task/column-task.module';


@NgModule({
  declarations: [
    WorkspaceComponent
  ],
  imports: [
    CommonModule,
    WorkspaceRoutingModule,
    ColumnTaskModule
  ],
  exports:[
    WorkspaceComponent
  ]
})
export class WorkspaceModule { }
