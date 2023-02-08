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
  showAddControl = false;

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

  addNewColumn(columnName: string) { 
    this.columnTaskService.createColumn(this.currentBoardId, {
      nameColumn: columnName,
      descriptionColumn: ''
    }).subscribe((newColumn: IColumn) => {
      this.columns.push(newColumn);
      this.hideAddColumn();
    })
  }

  showAddColumn() {
    this.showAddControl = true;
  }

  hideAddColumn() {
    this.showAddControl = false;
  }
}
