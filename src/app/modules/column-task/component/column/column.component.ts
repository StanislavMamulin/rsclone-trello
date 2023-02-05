import { Component, OnInit, Input } from '@angular/core';
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
}
