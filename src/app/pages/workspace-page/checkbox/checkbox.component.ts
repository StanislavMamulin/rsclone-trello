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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { task: ITask; column: IColumn },
    private ChecklistService: ChecklistService,
  ) {}

  ngOnInit() {
    this.checkboxValue = this.checkbox.isChoose;
    this.inputValue = this.checkbox.nameCheckBox;
  }

  updateIsChoose() {
    this.isChoose = !this.isChoose;
  }

  updateName() {
    this.checkbox = {
      ...this.checkbox,
      nameCheckBox: this.inputValue,
    };
    this.onUpdateInput.emit(this.checkbox);
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
