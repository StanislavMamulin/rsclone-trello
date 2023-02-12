import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ColumnTaskService } from 'src/app/modules/column-task/column-task.service';
import { ColumnComponent } from 'src/app/modules/column-task/component/column/column.component';
import { IColumn } from 'src/app/modules/column-task/model/column.interface';
import { ITask } from 'src/app/modules/column-task/model/task.interface';

@Component({
  selector: 'app-modal-task',
  templateUrl: './modal-task.component.html',
  styleUrls: ['./modal-task.component.scss'],
})
export class ModalTaskComponent implements OnInit {
  formTask: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { task: ITask; column: IColumn },
    public dialogRef: MatDialogRef<ColumnComponent>,
    private ColumnTaskService: ColumnTaskService,
  ) {}

  ngOnInit() {
    this.formTask = new FormGroup({
      nameTask: new FormControl(this.data.task.nameTask, [
        Validators.required,
        Validators.minLength(5),
      ]),
      descriptionTask: new FormControl(this.data.task.descriptionTask, [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  closeModal() {
    this.dialogRef.close();
  }

  updateTask() {
    this.ColumnTaskService.updateTask(this.data.task.idTask, {
      nameTask: this.formTask.get('nameTask').value,
      descriptionTask: this.formTask.get('descriptionTask').value,
    }).subscribe((res) => {
      const { nameTask, descriptionTask } = res;
      this.data.task.nameTask = nameTask;
      this.data.task.descriptionTask = descriptionTask;
    });
  }
}
