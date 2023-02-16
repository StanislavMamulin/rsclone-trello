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

  addNewTaskHandler(event: Event) {
    event.preventDefault();
    this.addTask();
  }

  enterPressed(event: Event) {
    event.preventDefault();
    this.addTask();
  }

  private addTask() {
    if (this.newElementTitle) {
      this.addButtonPressed.emit(this.newElementTitle.trim());
      this.newElementTitle = '';
    }
  }

  cancelTaskCreation() {
    this.newElementTitle = '';
    this.cancelButtonPressed.emit();
  }

  blurHandler(event: FocusEvent) {
    const target = event.relatedTarget as HTMLElement;

    if (target
      && !(target instanceof HTMLButtonElement)
    ) {      
      event.preventDefault();
      if (event.target instanceof HTMLTextAreaElement) {
        event.target.focus();
      }
    } else {
      // hide control
      if (this.newElementTitle) {
        this.addTask();
      }
      this.cancelButtonPressed.emit();
    }
  }
}
