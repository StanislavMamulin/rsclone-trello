import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ColumnComponent } from 'src/app/modules/column-task/component/column/column.component';
import { IColumn } from 'src/app/modules/column-task/model/column.interface';
import { ITask } from 'src/app/modules/column-task/model/task.interface';
import { WorkspaceComponent } from '../workspace/workspace.component';

@Component({
  selector: 'app-modal-task',
  templateUrl: './modal-task.component.html',
  styleUrls: ['./modal-task.component.scss'],
})
export class ModalTaskComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { task: ITask; column: IColumn },
    public dialogRef: MatDialogRef<ColumnComponent>,
  ) {}

  closeModal() {
    this.dialogRef.close();
  }
}
