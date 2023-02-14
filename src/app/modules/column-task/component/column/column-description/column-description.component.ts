import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ColumnTaskService } from '../../../column-task.service';
import { IColumn } from '../../../model/column.interface';

export interface DialogData {
  text: string;
  column: IColumn;
}

@Component({
  selector: 'app-column-description',
  templateUrl: './column-description.component.html',
  styleUrls: ['./column-description.component.scss'],
})
export class ColumnDescriptionComponent {
  editDescription = false;

  descrText: string;

  constructor(
    public dialogRef: MatDialogRef<ColumnDescriptionComponent>,
    @Inject(MAT_DIALOG_DATA) public description: DialogData,
    public columnTaskService: ColumnTaskService,
  ) {
    this.descrText = description.text;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  showEditDescription() {
    this.editDescription = true;
  }

  saveDescription() {
    this.dialogRef.close();
    this.description.column.descriptionColumn = this.descrText;
    this.columnTaskService.updateColumn(this.description.column.idColumn, {
      descriptionColumn: this.descrText,
    }).subscribe(res => console.log(res));
  }
}
