import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ColumnTaskService } from 'src/app/modules/column-task/column-task.service';
import { IColumn } from 'src/app/modules/column-task/model/column.interface';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {
  currentBoardId: string;
  columns: IColumn[] = [];

  constructor(
    private columnTaskService:ColumnTaskService,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    const {
      snapshot: {
        params: { id },
      },
    } = this.activatedRoute;

    this.columnTaskService.getColumns(id)
    .subscribe(res=>{
      console.log(res);
      this.columns = res;
      this.currentBoardId = id;
    })
  }

  addNewColumn() { 
    this.columnTaskService.createColumn(this.currentBoardId, {
      nameColumn: 'Column',
      descriptionColumn: ''
    }).subscribe((newColumn: IColumn) => {
      this.columns.push(newColumn);
    })
  }
}
