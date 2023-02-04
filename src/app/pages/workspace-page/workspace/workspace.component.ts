import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ColumnTaskService } from 'src/app/modules/column-task/column-task.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {

  columns: any[]=[];

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
    })
  }
}
