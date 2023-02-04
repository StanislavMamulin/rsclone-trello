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
    // this.ColumnTaskService.getColumns('9e67fcee-8b69-40cd-a335-5c506655cf9c')
    // .subscribe((res) => {console.log(res)});

    // this.ColumnTaskService.getColumnById('082ad0bd-700f-4a80-9106-d57ccbe66424')
    // .subscribe((res) => {console.log(res)});

    // this.ColumnTaskService.createColumn('9e67fcee-8b69-40cd-a335-5c506655cf9c',{
    //   nameColumn: 'new Column...',
    //   descriptionColumn: 'new Description...'
    // }).subscribe((res) => {console.log(res)});

    // this.ColumnTaskService.deleteColumn('ecba094f-3aa7-4927-9ba0-bf4723d427d6')
    // .subscribe();

    // this.ColumnTaskService.updateColumn('222f177e-b179-45fc-b8a7-a46fd10e0826',{
    //   nameColumn: 'updating name...',
    //   descriptionColumn:'updating description...'
    // }).subscribe(res=>{
    //   console.log(res);
    //   this.ColumnTaskService.getColumns('9e67fcee-8b69-40cd-a335-5c506655cf9c')
    //   .subscribe((res) => {console.log(res)});
    // })

    // this.ColumnTaskService.moveColumn('1322df7e-c4c7-4ff9-a63e-b193851b5dac',{
    //   toBoardId:'9e67fcee-8b69-40cd-a335-5c506655cf9c',
    //   newPosition: 0
    // }).subscribe(res=>{
    //   console.log(res);
    //   this.ColumnTaskService.getColumns('9e67fcee-8b69-40cd-a335-5c506655cf9c')
    //   .subscribe((res) => { console.log(res) });
    // })

    // this.ColumnTaskService.getTasks('9e67fcee-8b69-40cd-a335-5c506655cf9c','082ad0bd-700f-4a80-9106-d57ccbe66424')
    // .subscribe(res=>{console.log(res)});

    // this.ColumnTaskService.getTaskById('1ca9c510-7110-45b5-90dc-adf5adf5d72c')
    // .subscribe(res=>{console.log(res)});

    // this.ColumnTaskService.createTask('9e67fcee-8b69-40cd-a335-5c506655cf9c','082ad0bd-700f-4a80-9106-d57ccbe66424',{
    //   nameTask: 'creating task...',
    //   descriptionTask: 'description task...'
    // }).subscribe(res=>{
    //   console.log(res);
    //   this.ColumnTaskService.getTasks('9e67fcee-8b69-40cd-a335-5c506655cf9c','082ad0bd-700f-4a80-9106-d57ccbe66424')
    //   .subscribe(res=>{console.log(res)});
    // })

    // this.ColumnTaskService.deleteTask('4df36467-294c-453b-b910-67975dd0ad1b')
    // .subscribe(res=>{
    //   this.ColumnTaskService.getTasks('9e67fcee-8b69-40cd-a335-5c506655cf9c','082ad0bd-700f-4a80-9106-d57ccbe66424')
    //   .subscribe(res=>{console.log(res)});
    // })

    // this.ColumnTaskService.updateTask('1ca9c510-7110-45b5-90dc-adf5adf5d72c',{
    //   nameTask:'updating...',
    //   descriptionTask:'updating...'
    // }).subscribe(res=>{
    //   console.log(res);
    //   this.ColumnTaskService.getTasks('9e67fcee-8b69-40cd-a335-5c506655cf9c','082ad0bd-700f-4a80-9106-d57ccbe66424')
    //   .subscribe(res=>{console.log(res)});
    // })

    // this.ColumnTaskService.moveTask('e1848e65-6631-4cc6-a4e5-5564ff1bf901',{
    //   toColumnId:'082ad0bd-700f-4a80-9106-d57ccbe66424',
    //   newPosition: 1
    // }).subscribe(res=>{
    //   console.log(res);
    //   this.ColumnTaskService.getTasks('9e67fcee-8b69-40cd-a335-5c506655cf9c','082ad0bd-700f-4a80-9106-d57ccbe66424')
    //   .subscribe(res=>{console.log(res)});
    // })
  }
}
