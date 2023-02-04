import { Component, OnInit } from '@angular/core';
import { BoardService } from 'src/app/modules/board/board-service.service';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss']
})
export class BoardPageComponent implements OnInit {
  boards: any[] = [];
  nameBoard:string = '';
  descriptionBoard:string = '';
  constructor(private boardService: BoardService){}

  ngOnInit(): void {
    this.boardService.getBoards()
    .subscribe(res=>{this.boards = res});
  }

  createBoard(){
    this.boardService.createNewBoard(this.nameBoard, this.descriptionBoard)
    .subscribe(res=>this.boards.push(res));
  }

  deleteBoard(id:string){
    this.boards = this.boards.filter(board=>board.idBoard !== id);
  }
}
