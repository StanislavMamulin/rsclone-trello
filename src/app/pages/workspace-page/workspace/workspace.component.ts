import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ColumnTaskService } from 'src/app/modules/column-task/column-task.service';
import { IColumn } from 'src/app/modules/column-task/model/column.interface';
import { ITask } from 'src/app/modules/column-task/model/task.interface';
import { ModalTaskComponent } from '../modal-task/modal-task.component';
import { MatDialog } from '@angular/material/dialog';

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

  isWorkHotKeys = true;
  indexColumn = -1;
  indexTask = 0;

  @ViewChild('workspaceElement') workspaceElement: ElementRef;

  constructor(
    private columnTaskService: ColumnTaskService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
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

    document.onkeyup = (e: KeyboardEvent) => {
      e.preventDefault();
      const columns = document.querySelectorAll('app-column');
      const tasks = document.querySelectorAll('app-task');

      if (e.ctrlKey && e.code === "ArrowRight" && this.isWorkHotKeys) {
        e.preventDefault();
        if (this.indexColumn < columns.length - 1 && e.code === 'ArrowRight') {
          ++this.indexColumn;
        }
        columns.forEach(item => {
          if (item.classList.contains('active')) {
            item.classList.remove("active")
          }
        })
        tasks.forEach(item=>{
          if(item.classList.contains('active')){
            item.classList.remove('active');
          }
        })

        columns.forEach((item, i) => {
          if (i === this.indexColumn) {
            item.classList.add("active");
            const tasks = item.querySelectorAll('app-task');
            if(this.indexTask > tasks.length-1){
              this.indexTask = tasks.length-1;
            }
            tasks.forEach((item,i)=>{
              if(i === this.indexTask){
                item.classList.add('active');
              }
            })
          }
        })
      }
      if (e.ctrlKey && e.code === "ArrowLeft" && this.isWorkHotKeys) {
        e.preventDefault();
        if (this.indexColumn > 0 && e.code === 'ArrowLeft') {
          --this.indexColumn;
        }
        columns.forEach((item, i) => {
          if (item.classList.contains('active')) {
            item.classList.remove("active")
          }
        })
        tasks.forEach(item=>{
          if(item.classList.contains('active')){
            item.classList.remove('active');
          }
        })

        columns.forEach((item, i) => {
          if (i === this.indexColumn) {
            item.classList.add("active");
            const tasks = item.querySelectorAll('app-task');
            if(this.indexTask > tasks.length-1){
              this.indexTask = tasks.length-1;
            }
            tasks.forEach((item,i)=>{
              if(i === this.indexTask){
                item.classList.add('active');
              }
            })
          }
        })
      }
      if (e.ctrlKey && e.code === "ArrowDown" && this.isWorkHotKeys) {
        e.preventDefault();
        let activeColumn = columns[0];
        columns.forEach(item=>{
          if(item.classList.contains('active')){
            activeColumn = item;
          }
        })
        const tasks = activeColumn.querySelectorAll('app-task');

        if (this.indexTask < tasks.length - 1 && e.code === 'ArrowDown') {
          this.indexTask++;
        }

        tasks.forEach(item=>{
          if(item.classList.contains('active')){
            item.classList.remove('active');
          }
        })
        tasks.forEach((item,i)=>{
          if(i === this.indexTask){
            item.classList.add('active');
          }
        })
      }
      if (e.ctrlKey && e.code === "ArrowUp" && this.isWorkHotKeys) {
        e.preventDefault();
        let activeColumn = columns[0];
        columns.forEach(item=>{
          if(item.classList.contains('active')){
            activeColumn = item;
          }
        })
        const tasks = activeColumn.querySelectorAll('app-task');

        if (this.indexTask > 0 && e.code === 'ArrowUp') {
          this.indexTask--;
        }

        tasks.forEach(item=>{
          if(item.classList.contains('active')){
            item.classList.remove('active');
          }
        })
        tasks.forEach((item,i)=>{
          if(i === this.indexTask){
            item.classList.add('active');
          }
        })
      }

      if (e.code === 'Enter') {
        if (this.columns[this.indexColumn]) {
          const tasksInColumn = this.columns[this.indexColumn].tasks;
          this.isWorkHotKeys = false;
          this.openModal(tasksInColumn[this.indexTask],this.columns[this.indexColumn]);
          this.indexColumn = -1;
          this.indexTask = 0;
          columns.forEach(item => {
            if (item.classList.contains('active')) {
              item.classList.remove("active")
            }
          })
          tasks.forEach(item => {
            if (item.classList.contains('active')) {
              item.classList.remove("active")
            }
          })
        }
      }

      if (e.code === 'Escape') {
        this.indexColumn = -1;
        this.indexTask = 0;
        columns.forEach(item => {
          if (item.classList.contains('active')) {
            item.classList.remove("active")
          }
        })
        tasks.forEach(item => {
          if (item.classList.contains('active')) {
            item.classList.remove("active")
          }
        })
      }

    }
  }

  openModal(task: ITask, column: IColumn): void {
    const dialogRef = this.dialog.open(ModalTaskComponent, {
      data: { task, column },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(()=>{
      this.isWorkHotKeys = true;
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
        this.setColumnsIds();
        this.hideAddColumn();
      });
  }

  showAddColumn() {
    this.showAddControl = true;
    this.workspaceElement.nativeElement.scrollLeft = this.workspaceElement.nativeElement.scrollWidth;
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
