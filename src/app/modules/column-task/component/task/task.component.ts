import { Component, Input } from '@angular/core';
import { ITask } from '../../model/task.interface';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() taskInfo: ITask;
}
