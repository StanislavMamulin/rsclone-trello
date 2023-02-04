import { Component, Input,Output, OnInit,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BoardService } from '../../board-service.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  @Input() board:any;
  @Output() onDelete = new EventEmitter<string>();

  constructor(
    private boardService: BoardService,
    private router:Router
  ) {}

  ngOnInit() {

  }

  // showIdBoard(id:string){
  //   this.boardService.getBoardByID(id)
  //   .subscribe(res=>console.log(res));
  // }

  deleteBoard(id:string){
    this.boardService.deleteBoard(id)
    .subscribe(()=>{
      this.onDelete.emit(id);
    });
  }

  openBoard(){
    this.router.navigate(['/board',this.board.idBoard])
  }

}
