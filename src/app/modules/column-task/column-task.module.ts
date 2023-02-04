import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColumnComponent } from './component/column/column.component';
import { TaskComponent } from './component/task/task.component';
import { ColumnTaskService } from './column-task.service';


@NgModule({
  declarations: [
    ColumnComponent,
    TaskComponent
  ],
  imports: [
    CommonModule,
  ],
  exports:[
    ColumnComponent,
  ],
  providers:[
    ColumnTaskService
  ]
})
export class ColumnTaskModule { }
