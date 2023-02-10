import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-add-controls',
  templateUrl: './add-controls.component.html',
  styleUrls: ['./add-controls.component.scss'],
})
export class AddControlsComponent {
  @Input() addButtonText: string;

  @Output() addButtonPressed = new EventEmitter<string>();

  @Output() cancelButtonPressed = new EventEmitter();

  newElementTitle: string;

  addNewTaskHandler() {
    this.addTask();
  }

  enterPressed() {
    this.addTask();
  }

  private addTask() {
    this.addButtonPressed.emit(this.newElementTitle);
    this.newElementTitle = '';
  }

  cancelTaskCreation() {
    this.newElementTitle = '';
    this.cancelButtonPressed.emit();
  }
}
