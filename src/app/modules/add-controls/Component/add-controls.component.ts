import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppStateService } from 'src/app/core/services/app-state.service';

@Component({
  selector: 'app-add-controls',
  templateUrl: './add-controls.component.html',
  styleUrls: ['./add-controls.component.scss'],
})
export class AddControlsComponent implements OnInit, OnDestroy {
  @Input() addButtonText: string;

  @Output() addButtonPressed = new EventEmitter<string>();

  @Output() cancelButtonPressed = new EventEmitter();

  newElementTitle: string;

  isSubmitting = false;

  subscription = new Subscription();

  prevTitle = '';

  constructor(private appStateService: AppStateService) {}

  ngOnInit(): void {
    this.subscription = this.appStateService.isSubmitting$.subscribe(
      (submittingState) => this.isSubmitting = submittingState,
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addNewTaskHandler(event: Event) {
    event.preventDefault();
    this.addTask();
  }

  enterPressed(event: Event) {
    event.preventDefault();
    this.addTask();
  }

  private addTask() {
    this.prevTitle = this.newElementTitle;
    if (this.newElementTitle && !this.isSubmitting) {
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
