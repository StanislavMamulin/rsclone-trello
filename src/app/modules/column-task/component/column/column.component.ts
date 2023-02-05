import { Component, OnInit, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ColumnTaskService } from '../../column-task.service';
import { IColumn } from '../../model/column.interface';
import { IMovedTask, ITask } from '../../model/task.interface';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit {
  @Input() column: IColumn;
  tasks: ITask[];

  constructor(private columnTaskService: ColumnTaskService) {}

  ngOnInit() {
    this.tasks = this.column.tasks;
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

    this.columnTaskService.moveTask(droppedTask.idTask, {
      toColumnId: newColumn.idColumn,
      newPosition: event.currentIndex,
    }).subscribe(res => console.log('res', res))
  }
}
