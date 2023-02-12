import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-modal-log-out',
  templateUrl: './modal-log-out.component.html',
  styleUrls: ['./modal-log-out.component.scss']
})
export class ModalLogOutComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalLogOutComponent>,
    private auth: AuthService
    ) {}
  logOut(){
    this.auth.logout();
  }
}
