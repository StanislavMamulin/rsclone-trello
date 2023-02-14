import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChecklistService } from 'src/app/core/services/checklist.service';
import { ColumnTaskService } from 'src/app/modules/column-task/column-task.service';
import { ColumnComponent } from 'src/app/modules/column-task/component/column/column.component';
import { IColumn } from 'src/app/modules/column-task/model/column.interface';
import { ITask } from 'src/app/modules/column-task/model/task.interface';
import { ICheckBox, ICheckBoxCreateResponse } from '../model/checkbox.interface';

@Component({
  selector: 'app-modal-task',
  templateUrl: './modal-task.component.html',
  styleUrls: ['./modal-task.component.scss'],
})
export class ModalTaskComponent implements OnInit {
  formTask: any;
  checklist: ICheckBox[] = [];
  calculated: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { task: ITask; column: IColumn },
    public dialogRef: MatDialogRef<ColumnComponent>,
    private ColumnTaskService: ColumnTaskService,
    private ChecklistService: ChecklistService,
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

    this.ChecklistService.getCheckList(this.data.task.idTask).subscribe((res) => {
      this.checklist = res;
      this.calculated = Math.round((res.filter((item) => item.isChoose).length / res.length) * 100);
    });
  }

  updateCheckBox(checkbox: ICheckBox) {
    let index:any;
    this.checklist.forEach((item,i) => {
      if (item.idCheckBox === checkbox.idCheckBox) index = i;
    });
    let arr = [...this.checklist];
    arr[index] = checkbox;
    this.checklist = arr;
    this.calculated =
      Math.round((this.checklist.filter((item) => item.isChoose).length / this.checklist.length) * 100);
  }
  updateChecklist(){
    this.ChecklistService.updateChecklist(this.data.task.idTask,this.checklist)
    .subscribe(res=>console.log(res));
  }

  updateInput(checkbox: ICheckBox) {
    const { nameCheckBox, idCheckBox } = checkbox;
    this.ChecklistService.updateCheckBox(idCheckBox, {
      ...checkbox,
      nameCheckBox,
    }).subscribe((res) => {
      this.checklist.forEach((item) => {
        if (item.idCheckBox === res.idCheckBox) {
          item = res;
        }
      });
    });
  }

  createCheckBox() {
    this.ChecklistService.createCheckbox(this.data.task.idTask, {
      nameCheckBox: 'test!!!',
      isChoose: true,
    }).subscribe((res) => {
      this.checklist.push(res);
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

  deleteTask() {
    this.ColumnTaskService.deleteTask(this.data.task.idTask).subscribe(() => {
      this.closeModal();
      let index: number;
      this.data.column.tasks.find((task, i) => {
        if (task.idTask === this.data.task.idTask) {
          index = i;
          console.log(task.idTask);
          console.log(this.data.task.idTask);
          this.data.column.tasks.splice(index, 1);
        }
      });
    });
  }
}
