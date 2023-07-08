import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-hotkeys',
  templateUrl: './modal-hotkeys.component.html',
  styleUrls: ['./modal-hotkeys.component.scss']
})
export class ModalHotkeysComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalHotkeysComponent>,
  ){}
}
