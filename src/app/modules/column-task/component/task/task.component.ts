import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TaskStateService } from 'src/app/core/services/task-state.service';
import { ICheckBox } from 'src/app/pages/workspace-page/model/checkbox.interface';
import { ITask } from '../../model/task.interface';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit{
  @Input() taskInfo: ITask;
  @Output() onDeleteTask = new EventEmitter<string>();
  checked:number;
  allChecked: number = 0;
  isDone: boolean = false;

  constructor(
    private taskStateService: TaskStateService
  ){}

  ngOnInit(){

    this.taskStateService.checklist$.subscribe((checklist: ICheckBox[])=>{
      this.checked = this.taskInfo.checkLists.filter(item => item.isChoose).length;
      this.allChecked = this.taskInfo.checkLists.length;
      this.isDone = this.checked === this.allChecked && this.checked != 0;
    })
  }

  deleteTask(idTask:string){
    this.onDeleteTask.emit(idTask);
  }

}

