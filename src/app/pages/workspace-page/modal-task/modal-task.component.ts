import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChecklistService } from 'src/app/core/services/checklist.service';
import { TaskStateService } from 'src/app/core/services/task-state.service';
import { ColumnTaskService } from 'src/app/modules/column-task/column-task.service';
import { ColumnComponent } from 'src/app/modules/column-task/component/column/column.component';
import { IColumn } from 'src/app/modules/column-task/model/column.interface';
import { ITask } from 'src/app/modules/column-task/model/task.interface';
import { ICheckBox } from '../model/checkbox.interface';

@Component({
  selector: 'app-modal-task',
  templateUrl: './modal-task.component.html',
  styleUrls: ['./modal-task.component.scss'],
})
export class ModalTaskComponent implements OnInit {
  formTask: any;
  checklist: ICheckBox[] = [];
  calculated: number;
  isCreate: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { task: ITask; column: IColumn },
    public dialogRef: MatDialogRef<ColumnComponent>,
    private ColumnTaskService: ColumnTaskService,
    private ChecklistService: ChecklistService,
    private taskStateService: TaskStateService
  ) {}

  ngOnInit() {
    this.formTask = new FormGroup({
      nameTask: new FormControl(this.data.task.nameTask, [Validators.required]),
      descriptionTask: new FormControl(this.data.task.descriptionTask ||
        `description of ${this.data.task.nameTask}`, [
        Validators.required,
        Validators.minLength(5),
      ]),
      addCheckBox: new FormControl(null, [Validators.required]),
    });

    this.ChecklistService.getCheckList(this.data.task.idTask).subscribe((res) => {
      this.checklist = res;
      if (this.checklist.length) {
        this.updateCalculated();
      } else {
        this.calculated = 0;
      }
    });

    document.onkeydown = (e:KeyboardEvent) =>{
      if(e.code === "Escape"){
        this.closeModal();
        this.updateTask();
        this.updateChecklist();
      }
    }
  }

  updateIsChooseBlur(event: FocusEvent){
    if(!(event.relatedTarget instanceof HTMLInputElement)){
      this.isCreate = false;
    }

    const checkbox =  event.relatedTarget as HTMLInputElement;

    if(checkbox.type === "checkbox"){
      this.isCreate = false;
    }
  }

  updateCreateState(event:any) {
    this.isCreate = !this.isCreate;

    if(event?.target.classList.contains('delete-task')){
      this.formTask.controls["addCheckBox"].setValue(null);
    }

    const inputCreate = document.querySelector('.create-input') as HTMLInputElement;
    setTimeout(()=>{
      inputCreate?.focus();
    },0);
  }

  updateCalculated() {
    this.calculated = Math.round(
      (this.checklist.filter((item) => item.isChoose).length / this.checklist.length) * 100,
    );
  }

  updateCheckBox(checkbox: ICheckBox) {
    let index: any;
    this.checklist.forEach((item, i) => {
      if (item.idCheckBox === checkbox.idCheckBox) index = i;
    });
    let arr = [...this.checklist];
    arr[index] = checkbox;
    this.checklist = arr;
    this.updateCalculated();
  }
  updateChecklist() {
    this.ChecklistService.updateChecklist(this.data.task.idTask, this.checklist)
    .subscribe((res) =>{
      this.data.task.checkLists = res;
      this.taskStateService.setChecklist(this.checklist);
    });
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

  enterPressedInputAdd(event: Event){
    event.preventDefault();
    if(!this.formTask.controls['addCheckBox'].errors){
      this.createCheckBox();
    }
  }

  createCheckBox() {
    this.ChecklistService.createCheckbox(this.data.task.idTask, {
      nameCheckBox: this.formTask.get('addCheckBox').value,
      isChoose: false,
    }).subscribe((res) => {
      this.checklist.push(res);
      this.data.task.checkLists = this.checklist;
      this.updateCalculated();
      this.formTask.controls["addCheckBox"].setValue(null);
      this.taskStateService.setChecklist(this.checklist);
    });
  }

  closeModal() {
    if(!this.formTask.controls['nameTask'].errors &&
    !this.formTask.controls['descriptionTask'].errors){
      this.dialogRef.close();
    }else{
      const nameInput = document.querySelector('.name-task') as HTMLInputElement;
      const descriptionInput = document.querySelector('.description-task') as HTMLTextAreaElement;
      if(this.formTask.controls['nameTask'].errors){
        nameInput?.focus();
      }else{
        descriptionInput?.focus();
        console.log(descriptionInput);
      }


    }
  }

  updateTask() {
    if(!this.formTask.controls['nameTask'].errors &&
    !this.formTask.controls['descriptionTask'].errors){
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

  deleteCheckbox(idCheckBox: string) {
    this.ChecklistService.deleteCheckbox(idCheckBox).subscribe(() => {
      let index: number;
      this.checklist.forEach((item, i) => {
        if (item.idCheckBox === idCheckBox) {
          index = i;
          this.checklist.splice(index, 1);
          if(this.checklist.length){
            this.updateCalculated();
          }else {this.calculated = 0}
        }
      });
      this.data.task.checkLists = this.checklist;
      this.taskStateService.setChecklist(this.checklist);
    });
  }
}
