import {
  Component,
  OnInit,
  Input,
  ViewChildren,
  QueryList,
  ElementRef,
  AfterViewInit,
  EventEmitter,
  Output,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ColumnTaskService } from '../../column-task.service';
import { IColumn } from '../../model/column.interface';
import { IMovedTask, ITask } from '../../model/task.interface';
import { IBoard } from 'src/app/modules/board/model/Board.model';
import { MatDialog } from '@angular/material/dialog';
import { ModalTaskComponent } from 'src/app/pages/workspace-page/modal-task/modal-task.component';
import { ColumnDescriptionComponent } from './column-description/column-description.component';
import { BoardsStateService } from 'src/app/core/services/boardsState.service';
import { Subscription } from 'rxjs';
import { AppStateService } from 'src/app/core/services/app-state.service';
import { AudioServiceService } from 'src/app/shared/audio-service.service';
import { CloseComponent } from 'src/app/shared/components/close/close.component';
import { ScrollStrategy, ScrollStrategyOptions } from '@angular/cdk/overlay';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() column: IColumn;

  @Input() columnsInBoard: IColumn[];

  @Input() getConnectedList: () => string[];

  @Output() deletedTask = new EventEmitter();

  @ViewChildren('titleInput') private titleInput: QueryList<ElementRef>;


  tasks: ITask[];

  currentBoard: IBoard;

  allBoards: IBoard[];

  directionColumns: IColumn[];

  showAddTaskControl = false;

  isShowEditColumnTitle = false;

  subscriptions: Subscription[] = [];

  isEditActive = false;

  scrollStrategy: ScrollStrategy;

  language:string = localStorage.getItem('language') || 'en';

  addButtonText: string;

  newColumnTitle: string;

  isSubmitting = false;

  @ViewChild('taskListEl') taskListEl: ElementRef;

  constructor(
    private columnTaskService: ColumnTaskService,
    public dialog: MatDialog,
    private boardsStateService: BoardsStateService,
    private appStateService: AppStateService,
    private audioService: AudioServiceService,
    private readonly sso: ScrollStrategyOptions,
  ) {
    this.scrollStrategy = this.sso.noop();
  }

  ngOnInit() {
    this.tasks = this.column.tasks;
    this.setDirectionColumns();
    this.addBoardSubscribers();
  }

  ngAfterViewInit(): void {
    this.titleInput.changes.subscribe(() => this.focusTitleInput());
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subs) => subs.unsubscribe());
  }

  drop(event: CdkDragDrop<IMovedTask>) {
    this.audioService.playAudio('../../../../assets/sounds/audio-task.mp3');
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

    this.setSubmitting(true);
    this.columnTaskService
      .moveTask(droppedTask.idTask, {
        toColumnId: newColumn.idColumn,
        newPosition: event.currentIndex,
      })
      .subscribe(() => {this.setSubmitting(false);});
  }

  showAddTask() {
    const lang = localStorage.getItem('language');
    lang === 'ru' ? this.addButtonText = 'Добавить задачу' : this.addButtonText = 'Add task';

    this.showAddTaskControl = true;
    this.appStateService.setIsItemEdit(true);
  }

  cancelTaskCreation() {
    this.appStateService.setIsItemEdit(false);
    this.showAddTaskControl = false;
  }

  addNewTaskHandler(title: string) {
    this.setSubmitting(true);
    this.appStateService.setIsItemEdit(false);
    this.columnTaskService
      .createTaskByColumnId(this.column.idColumn, {
        nameTask: title,
        descriptionTask: '',
        checkLists: [],
      })
      .subscribe((newTask: ITask) => {
        this.tasks.push(newTask);
        this.setSubmitting(false);

        setTimeout(() => {
          this.taskListEl.nativeElement.scrollTop = this.taskListEl.nativeElement.scrollHeight;
        }, 0);
      });
  }

  getConnectedToList(currentColumnId: string): string[] {
    const possibleConnectionIds = this.getConnectedList();

    return possibleConnectionIds.filter((id) => id !== currentColumnId);
  }

  openModal(event: Event, task: ITask): void {
    const elTarget = event.target as HTMLTemplateElement;
    if (!elTarget?.classList.contains('delete-button')) {
      this.appStateService.setIsItemEdit(true);
      const dialogRef = this.dialog.open(ModalTaskComponent, {
        data: { task: task, column: this.column },
        disableClose: true,
        id:'modal-id',
        scrollStrategy: this.scrollStrategy,
      });
      dialogRef.afterClosed().subscribe((result) => {
        this.appStateService.setIsItemEdit(false);
        
        if (result) {
          this.tasks.forEach((taskItem) => {
            if (taskItem.idTask == result.task.idTask) {
              taskItem = result.task;
            }
          });
        }
      });
    }
  }

  focusTitleInput() {
    if (this.titleInput.length > 0) {
      this.titleInput.first.nativeElement.focus();
    }
  }

  showEditColumnTitle() {
    this.newColumnTitle = this.column.nameColumn;
    this.isShowEditColumnTitle = true;
    this.appStateService.setIsItemEdit(true);
  }

  hideEditColumnTitle(editedColumn: IColumn) {   
    this.isShowEditColumnTitle = false;
    this.appStateService.setIsItemEdit(false);  

    if (this.newColumnTitle.length >= 1) {
      this.column.nameColumn = this.newColumnTitle;
      this.columnTaskService
        .updateColumn(editedColumn.idColumn, {
          nameColumn: this.newColumnTitle,
        })
        .subscribe();
    }
  }

  deleteColumn(column: IColumn) {
    this.setSubmitting(true);
    this.columnTaskService.deleteColumn(column.idColumn).subscribe(() => { this.setSubmitting(false); });
    this.deletedTask.emit(column);
  }

  openDialogDeleteColumn(column: IColumn) {
    const dialogRef = this.dialog.open(CloseComponent, {
      data: { name: 'column', objName: column.nameColumn },
    });

    dialogRef.afterClosed().subscribe((res)=>{
      if (res === 'yes')
        this.deleteColumn(column);
    });
  }

  moveTaskToNewColumn(newColumn: IColumn): void {
    this.setSubmitting(true);
    const copyTasks = [...this.column.tasks];
    copyTasks.reverse().forEach((task: ITask) =>
      this.columnTaskService
        .moveTask(task.idTask, {
          toColumnId: newColumn.idColumn,
          newPosition: newColumn.tasks.length,
        })
        .subscribe(() => {
          this.setSubmitting(false);
          const length = this.column.tasks.length;
          for (let i = 0; i < length; i += 1) {
            newColumn.tasks.push(this.column.tasks.shift() as ITask);
          }
        }),
    );
  }

  showedColumnMenu() {
    this.setDirectionColumns();
    this.setDirectionBoards();
  }

  setDirectionColumns() {
    this.directionColumns = this.columnsInBoard.filter(
      (columnItem: IColumn) => columnItem.idColumn !== this.column.idColumn,
    );
  }

  showColumnInfo(): void {
    const dialogRef = this.dialog.open(ColumnDescriptionComponent, {
      data: { text: this.column.descriptionColumn, column: this.column },
    });

    dialogRef.afterClosed().subscribe();
  }

  deleteTask(idTask: string) {
    this.setSubmitting(true);
    this.columnTaskService.deleteTask(idTask).subscribe(() => {
      this.setSubmitting(false);
      this.tasks.forEach((task, i) => {
        if (task.idTask === idTask) {
          this.tasks.splice(i, 1);
        }
      });
    });
  }

  openDialogDeleteTask(id:string) {
    const task = this.tasks.find(item=>item.idTask === id);
    const dialogRef = this.dialog.open(CloseComponent, {
      data: { name: 'task', objName: task?.nameTask },
    });

    dialogRef.afterClosed().subscribe(res=>{
      if (res === 'yes') {
        this.deleteTask(id);
      }
    });
  }

  addBoardSubscribers() {
    this.subscriptions.push(
      this.boardsStateService.boards$.subscribe((boards: IBoard[]) => {
        this.allBoards = boards;
      }),
    );
    this.subscriptions.push(
      this.boardsStateService.currentBoard$.subscribe((board) => {
        this.currentBoard = board;
      }),
    );

    this.subscriptions.push(this.appStateService.isItemEdit$.subscribe(editState => this.isEditActive = editState));
  }

  setDirectionBoards() {
    this.allBoards = this.allBoards.filter((board) => board.idBoard !== this.currentBoard.idBoard);
  }

  moveColumnToOtherBoard(destBoard: IBoard) {
    this.setSubmitting(true);
    this.deletedTask.emit(this.column);
    this.columnTaskService
      .moveColumn(this.column.idColumn, {
        toBoardId: destBoard.idBoard,
        newPosition: 0,
      })
      .subscribe(() => { this.setSubmitting(false); } );
  }

  private setSubmitting(state: boolean) {
    this.isSubmitting = state;
    this.appStateService.setIsSubmitting(state);
  }
}
