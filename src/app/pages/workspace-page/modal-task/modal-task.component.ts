import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChecklistService } from 'src/app/core/services/checklist.service';
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
    private ChecklistService: ChecklistService
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

    // this.ChecklistService.getCheckList(this.data.task.idTask)
    // .subscribe(res=>console.log(res));

    // this.ChecklistService.getCheckBox('9468b8cd-771d-443e-96c4-8dbf90afc26c')
    // .subscribe(res=>console.log(res));

    // this.ChecklistService.createCheckbox(this.data.task.idTask,{
    //   nameCheckBox: 'asdasdasdasda'
    // }).subscribe(res=>{
    //   console.log(res);
    // })

    // this.ChecklistService.delteCheckbox("d90c0e4a-afe5-4557-ad0d-b70b3134e903")
    //   .subscribe();

    // this.ChecklistService.updateCheckBox("23474998-d132-42a8-8cdb-56a559f631df",{
    //   idCheckBox: "23474998-d132-42a8-8cdb-56a559f631df",
    //   nameCheckBox: "updating checkbox..."
    // }).subscribe(res=>{
    //   console.log(res);
    // })

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
