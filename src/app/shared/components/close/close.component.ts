import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IBoard } from 'src/app/modules/board/model/Board.model';
import { IColumn } from 'src/app/modules/column-task/model/column.interface';
import { ITask } from 'src/app/modules/column-task/model/task.interface';
import { AudioServiceService } from '../../audio-service.service';

@Component({
  selector: 'app-close',
  templateUrl: './close.component.html',
  styleUrls: ['./close.component.scss']
})
export class CloseComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { name: string, objName:string },
    public dialogRef: MatDialogRef<CloseComponent>,
    private audioService: AudioServiceService,

  ) {}


  closeNo(){
    this.closeDialog('no');
  }
  closeYes(){
    this.closeDialog('yes');
    this.audioService.playAudio('../../../../assets/sounds/audio-delete.mp3');
  }

  closeDialog(button: 'no' | 'yes') {
    this.dialogRef.close(button);
  }
}

