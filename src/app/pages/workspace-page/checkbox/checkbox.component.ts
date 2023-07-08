import { Component, Inject, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChecklistService } from 'src/app/core/services/checklist.service';
import { IColumn } from 'src/app/modules/column-task/model/column.interface';
import { ITask } from 'src/app/modules/column-task/model/task.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICheckBox } from '../model/checkbox.interface';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent implements OnInit {
  @Input() checkbox: ICheckBox;
  @Output() onUpdateInput = new EventEmitter<ICheckBox>();
  @Output() onUpdateCheckBox = new EventEmitter<ICheckBox>();
  @Output() onDeleteCheckBox = new EventEmitter<string>();
  isChoose = false;
  checkboxValue: boolean = false;
  inputValue: string;
  defaultValue: string;
  inputElement: HTMLInputElement;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { task: ITask; column: IColumn },
    private ChecklistService: ChecklistService,
  ) {}

  ngOnInit() {
    this.checkboxValue = this.checkbox.isChoose;
    this.inputValue = this.checkbox.nameCheckBox;
  }

  updateIsChooseBlur(event: FocusEvent){
    if(!(event.relatedTarget instanceof HTMLInputElement)){
      this.isChoose = false;
    }
  }

  updateIsChoose(event: MouseEvent) {
    this.isChoose = !this.isChoose;
    const el = <HTMLElement>event.target;
    const nextEL = <HTMLElement>el.nextElementSibling;
    const editInput = <HTMLInputElement>nextEL.querySelector('.edit-input');
    if(editInput){
      setTimeout(()=>{
        editInput.focus();
        editInput.setSelectionRange(0,editInput.value?.length);
      },0)
    }

    if(el?.classList.contains('no-edit')){
      this.defaultValue = el.innerHTML;
      this.inputElement = editInput;
    }
    if(el?.classList.contains('close')){
      this.inputElement.value = this.defaultValue;
    }
  }

  updateName() {
    this.checkbox = {
      ...this.checkbox,
      nameCheckBox: this.inputValue,
    };
    this.onUpdateInput.emit(this.checkbox);
  }

  enterPressedInputUpdate(event: Event){
    event.preventDefault();
    const input = event.target as HTMLInputElement;
    if(input?.value.length){
      this.updateName();
      this.updateCheckBox();
    }
  }


  updateCheckBox() {
    this.checkbox = {
      ...this.checkbox,
      isChoose: this.checkboxValue,
    };
    this.onUpdateCheckBox.emit(this.checkbox);
  }

  deleteCheckbox(idCheckBox: string){
    this.onDeleteCheckBox.emit(idCheckBox);
  }
}
