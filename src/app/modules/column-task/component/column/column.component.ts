import { Component, OnInit, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ColumnTaskService } from '../../column-task.service';
import { IColumn } from '../../model/column.interface';
import { ITask } from '../../model/task.interface';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit {
  @Input() column: IColumn;
  tasks: ITask[];

  constructor(private ColumnTaskService: ColumnTaskService) {}

  ngOnInit() {
    this.tasks = this.column.tasks;
  }

  drop(event: CdkDragDrop<ITask[]>) {
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
  }
}
