import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ColumnTaskService } from 'src/app/modules/column-task/column-task.service';
import { IColumn } from 'src/app/modules/column-task/model/column.interface';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
})
export class WorkspaceComponent implements OnInit {
  currentBoardId: string;

  columns: IColumn[] = [];

  showAddControl = false;

  columnsIds: string[];

  constructor(
    private columnTaskService: ColumnTaskService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const {
      snapshot: {
        params: { id },
      },
    } = this.activatedRoute;

    this.columnTaskService.getColumns(id).subscribe((res) => {
      this.columns = res;
      this.currentBoardId = id;
      this.setColumnsIds();
    });
  }

  addNewColumn(columnName: string) {
    this.columnTaskService
      .createColumn(this.currentBoardId, {
        nameColumn: columnName,
        descriptionColumn: '',
      })
      .subscribe((newColumn: IColumn) => {
        this.columns.push(newColumn);
        this.hideAddColumn();
      });
  }

  showAddColumn() {
    this.showAddControl = true;
  }

  hideAddColumn() {
    this.showAddControl = false;
  }

  drop(event: CdkDragDrop<IColumn[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.setColumnsIds();

    const droppedColumn: IColumn = event.container.data[event.currentIndex];
    console.log(droppedColumn.idColumn, event.currentIndex, this.currentBoardId);
    this.columnTaskService
      .moveColumn(droppedColumn.idColumn, {
        newPosition: event.currentIndex,
        toBoardId: this.currentBoardId,
      })
      .subscribe((res) => console.log(res));
  }

  get columnsIdsFunc() {
    return this.getColumnsIds.bind(this);
  }

  private getColumnsIds(): string[] {
    return this.columnsIds;
  }

  private setColumnsIds(): void {
    this.columnsIds = this.columns.map((column: IColumn) => column.idColumn);
  }

  deleteColumn(column: IColumn): void {
    this.columns = this.columns.filter((columnItem) => columnItem.idColumn !== column.idColumn);
  }
}
