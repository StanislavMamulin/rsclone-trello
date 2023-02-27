import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChecklistService } from 'src/app/core/services/checklist.service';
import { TaskStateService } from 'src/app/core/services/task-state.service';
import { ColumnTaskService } from 'src/app/modules/column-task/column-task.service';
import { ColumnComponent } from 'src/app/modules/column-task/component/column/column.component';
import { IColumn } from 'src/app/modules/column-task/model/column.interface';
import { ITask } from 'src/app/modules/column-task/model/task.interface';
import { AudioServiceService } from 'src/app/shared/audio-service.service';
import { ICheckBox } from '../model/checkbox.interface';

@Component({
  selector: 'app-modal-task',
  templateUrl: './modal-task.component.html',
  styleUrls: ['./modal-task.component.scss'],
})
export class ModalTaskComponent implements OnInit {
  formTask: FormGroup;

  checklist: ICheckBox[] = [];

  calculated = 0;

  isCreate = false;

  isLoading = true;

  isCreating = false;

  @ViewChild('modalTaskWrapper') modalTaskWrapper: ElementRef;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { task: ITask; column: IColumn },
    public dialogRef: MatDialogRef<ColumnComponent>,
    private columnTaskService: ColumnTaskService,
    private checklistService: ChecklistService,
    private taskStateService: TaskStateService,
    private audioService: AudioServiceService,
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.formTask = new FormGroup({
      nameTask: new FormControl(this.data.task.nameTask, [Validators.required]),
      descriptionTask: new FormControl(
        this.data.task.descriptionTask || `description of ${this.data.task.nameTask}`,
        [Validators.required, Validators.minLength(5)],
      ),
      addCheckBox: new FormControl(null, [Validators.required]),
    });

    this.checklistService.getCheckList(this.data.task.idTask).subscribe((res) => {
      this.checklist = res;
      if (this.checklist.length) {
        this.updateCalculated();
      } else {
        this.calculated = 0;
      }
      this.isLoading = false;
    });

    document.onkeydown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        this.updateTask();
        this.updateChecklist();
      }
    };
  }

  updateIsChooseBlur(event: FocusEvent) {
    if (!(event.relatedTarget instanceof HTMLInputElement)) {
      this.isCreate = false;
    }

    const checkbox = event.relatedTarget as HTMLInputElement;

    if (checkbox.type === 'checkbox') {
      this.isCreate = false;
    }
  }

  updateCreateState(event: MouseEvent) {
    this.isCreate = !this.isCreate;
    const el = event.target as HTMLElement;
    if (el.classList.contains('delete-task')) {
      this.formTask.controls.addCheckBox.setValue(null);
    }

    const inputCreate = document.querySelector('.create-input') as HTMLInputElement;
    setTimeout(() => {
      inputCreate?.focus();
    }, 0);
  }

  updateCalculated() {
    this.calculated = Math.round(
      (this.checklist.filter((item) => item.isChoose).length / this.checklist.length) * 100,
    );
  }

  updateCheckBox(checkbox: ICheckBox) {
    let index = -1;
    this.checklist.forEach((item, i) => {
      if (item.idCheckBox === checkbox.idCheckBox) index = i;
    });
    const arr = [...this.checklist];
    arr[index] = checkbox;
    this.checklist = arr;
    this.updateCalculated();
  }

  updateChecklist() {
    this.checklistService.updateChecklist(this.data.task.idTask, this.checklist).subscribe(
      (res) => {
        this.data.task.checkLists = res;
        this.taskStateService.setChecklist(this.checklist);
      },
    );
  }

  updateInput(checkbox: ICheckBox) {
    this.isCreating = true;
    const { nameCheckBox, idCheckBox } = checkbox;
    this.checklistService.updateCheckBox(idCheckBox, {
      ...checkbox,
      nameCheckBox,
    }).subscribe((res) => {
      this.checklist.forEach((item) => {
        if (item.idCheckBox === res.idCheckBox) {
          item = res;
        }
        this.isCreating = false;
      });
    });
  }

  enterPressedInputAdd(event: Event) {
    event.preventDefault();
    if (!this.formTask.controls.addCheckBox.errors && !this.isCreating) {
      this.createCheckBox();
    }
  }

  createCheckBox() {
    this.isCreating = true;

    this.checklistService.createCheckbox(this.data.task.idTask, {
      nameCheckBox: this.formTask.get('addCheckBox')?.value,
      isChoose: false,
    }).subscribe((res) => {
      this.checklist.push(res);
      this.data.task.checkLists = this.checklist;
      this.updateCalculated();
      this.formTask.controls.addCheckBox.setValue(null);
      this.taskStateService.setChecklist(this.checklist);

      setTimeout(() => {
        this.modalTaskWrapper.nativeElement.scrollTop = this.modalTaskWrapper.nativeElement.scrollHeight;
      }, 0);
      this.isCreating = false;
    });
  }

  closeModal() {
    if (
      !this.formTask.controls.nameTask.errors &&
      !this.formTask.controls.descriptionTask.errors
    ) {
      this.dialogRef.close();
    } else {
      const nameInput = document.querySelector('.name-task') as HTMLInputElement;
      const descriptionInput = document.querySelector('.description-task') as HTMLTextAreaElement;
      if (this.formTask.controls.nameTask.errors) {
        nameInput?.focus();
      } else {
        descriptionInput?.focus();
      }
    }
  }

  updateTask() {
    if (
      !this.formTask.controls.nameTask.errors &&
      !this.formTask.controls.descriptionTask.errors
    ) {
      this.isCreating = true;
      this.columnTaskService.updateTask(this.data.task.idTask, {
        nameTask: this.formTask.get('nameTask')?.value,
        descriptionTask: this.formTask.get('descriptionTask')?.value,
      }).subscribe((res) => {
        const { nameTask, descriptionTask } = res;
        this.data.task.nameTask = nameTask;
        this.data.task.descriptionTask = descriptionTask;
        this.closeModal();
        this.isCreating = false;
      });
    } else {
      this.audioService.playAudio('../../../assets/sounds/audio-error.mp3');
    }
  }

  deleteCheckbox(idCheckBox: string) {
    this.isCreating = true;
    this.checklistService.deleteCheckbox(idCheckBox).subscribe(() => {
      let index: number;
      this.checklist.forEach((item, i) => {
        if (item.idCheckBox === idCheckBox) {
          index = i;
          this.checklist.splice(index, 1);
          if (this.checklist.length) {
            this.updateCalculated();
          } else {
            this.calculated = 0;
          }
        }
      });
      this.data.task.checkLists = this.checklist;
      this.taskStateService.setChecklist(this.checklist);
      this.isCreating = false;
    });
  }
}
