import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-close',
  templateUrl: './close.component.html',
  styleUrls: ['./close.component.scss']
})
export class CloseComponent {
  constructor(
    public dialogRef: MatDialogRef<CloseComponent>,
  ) {}

  close() {
  }
}

