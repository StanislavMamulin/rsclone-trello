import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.scss'],
})
export class SuccessModalComponent implements OnInit {
  @Input() isLoading:boolean;

  @Output() onCloseModal = new EventEmitter<boolean>();

  ngOnInit() {

  }

  closeModal() {
    this.onCloseModal.emit(false);
  }
}
