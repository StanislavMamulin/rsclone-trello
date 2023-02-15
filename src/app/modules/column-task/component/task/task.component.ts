import { Component, Input, OnInit } from '@angular/core';
import { ITask } from '../../model/task.interface';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit{
  @Input() taskInfo: ITask;
  checked:number = 0;
  allChecked: number = 0;
  isDone: boolean = false;

  ngOnInit(){
    this.checked = this.taskInfo.checkLists.filter(item=>item.isChoose).length;
    this.allChecked = this.taskInfo.checkLists.length;
    this.isDone = this.checked === this.allChecked && this.checked !=0;
  }

}

