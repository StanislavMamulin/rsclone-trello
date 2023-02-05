import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColumnComponent } from './component/column/column.component';
import { TaskComponent } from './component/task/task.component';
import { ColumnTaskService } from './column-task.service';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [
    ColumnComponent,
    TaskComponent
  ],
  imports: [
    CommonModule,
    DragDropModule
  ],
  exports:[
    ColumnComponent,
  ],
  providers:[
    ColumnTaskService
  ]
})
export class ColumnTaskModule { }
