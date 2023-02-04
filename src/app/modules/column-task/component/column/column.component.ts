import { Component, OnInit } from '@angular/core';
import { ColumnTaskService } from '../../column-task.service';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit {

  constructor(private ColumnTaskService: ColumnTaskService) {}

  ngOnInit(){
    this.ColumnTaskService.getColumns('9e67fcee-8b69-40cd-a335-5c506655cf9c')
    .subscribe((res) => {console.log(res)});
  }
}
