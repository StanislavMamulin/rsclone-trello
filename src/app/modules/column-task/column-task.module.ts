import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColumnComponent } from './component/column/column.component';
import { TaskComponent } from './component/task/task.component';
import { ColumnTaskService } from './column-task.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { AddControlsModule } from '../add-controls/add-controls.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ColumnDescriptionComponent } from './component/column/column-description/column-description.component';

@NgModule({
  declarations: [
    ColumnComponent,
    TaskComponent,
    ColumnDescriptionComponent,
  ],
  imports: [
    CommonModule,
    DragDropModule,
    FormsModule,
    AddControlsModule,
    SharedModule,
  ],
  exports: [ColumnComponent],
  providers: [ColumnTaskService],
})
export class ColumnTaskModule {}
