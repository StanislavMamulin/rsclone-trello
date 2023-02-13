import { Component, OnInit, Input, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ColumnTaskService } from '../../column-task.service';
import { IColumn } from '../../model/column.interface';
import { IMovedTask, ITask } from '../../model/task.interface';
import { IBoard } from 'src/app/modules/board/model/Board.model';
import { MatDialog } from '@angular/material/dialog';
import { ModalTaskComponent } from 'src/app/pages/workspace-page/modal-task/modal-task.component';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit, AfterViewInit {
  @Input() column: IColumn;

  @Input() currentBoard: IBoard;

  @Input() getConnectedList: () => string[];

  @ViewChildren('titleInput') private titleInput: QueryList<ElementRef>;

  tasks: ITask[];

  showAddTaskControl = false;

  isShowEditColumnTitle = false;

  constructor(private columnTaskService: ColumnTaskService, public dialog: MatDialog) {}

  ngOnInit() {
    this.tasks = this.column.tasks;
  }

  ngAfterViewInit(): void {
    this.titleInput.changes.subscribe(() => this.focusTitleInput());
  }

  drop(event: CdkDragDrop<IMovedTask>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data.tasks, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data.tasks,
        event.container.data.tasks,
        event.previousIndex,
        event.currentIndex,
      );
    }

    const droppedTask: ITask = event.container.data.tasks[event.currentIndex];
    const newColumn = event.container.data.column;

    this.columnTaskService
      .moveTask(droppedTask.idTask, {
        toColumnId: newColumn.idColumn,
        newPosition: event.currentIndex,
      })
      .subscribe((res) => console.log('res', res));
  }

  showAddTask() {
    this.showAddTaskControl = true;
  }

  cancelTaskCreation() {
    this.showAddTaskControl = false;
  }

  addNewTaskHandler(title: string) {
    this.columnTaskService
      .createTaskByColumnId(this.column.idColumn, { nameTask: title, descriptionTask: '' })
      .subscribe((newTask: ITask) => {
        this.tasks.push(newTask);
      });
  }

  getConnectedToList(currentColumnId: string): string[] {
    const possibleConnectionIds = this.getConnectedList();

    return possibleConnectionIds.filter((id) => id !== currentColumnId);
  }

  openModal(task: ITask): void {
    const dialogRef = this.dialog.open(ModalTaskComponent, {
      data: { task: task, column: this.column },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.tasks.forEach((taskItem) => {
          if (taskItem.idTask == result.task.idTask) {
            taskItem = result.task;
          }
        });
      }
    });
  }

  focusTitleInput() {
    if (this.titleInput.length > 0) {
      this.titleInput.first.nativeElement.focus();
    }
  }

  showEditColumnTitle() {
    this.isShowEditColumnTitle = true;

  }

  hideEditColumnTitle(newColumn: IColumn) {
    this.isShowEditColumnTitle = false;
    console.log(newColumn);
  }
}
