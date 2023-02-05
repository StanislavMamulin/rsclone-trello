import { Component, OnInit } from '@angular/core';
import { BoardService } from 'src/app/modules/board/board-service.service';
import { IBoard, IBoardCreateResponse, IBoardUpdateResponse } from 'src/app/modules/board/model/Board.model';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss']
})
export class BoardPageComponent implements OnInit {
  boards: IBoard[] = [];
  nameBoard:string = '';
  descriptionBoard:string = '';
  isOpenModal: boolean = false;
  isCreateModal:boolean = false;
  isUpdateModal:boolean = false;
  updateBoardId:string;
  constructor(private boardService: BoardService){}

  ngOnInit(): void {
    this.boardService.getBoards()
    .subscribe(res=>{this.boards = res});
  }

  openCreateModal(event:any){
    if(event.srcElement.className === "board-page__create"){
      this.isCreateModal=!this.isCreateModal;
    }
    this.isOpenModal=!this.isOpenModal;
  }

  closeModal(event:any){
    if(event.srcElement.className === "modal"){
      this.defaultModal();
    }
  }

  defaultModal() {
    this.isOpenModal = !this.isOpenModal;
    this.isCreateModal = false;
    this.isUpdateModal = false;
    this.nameBoard="";
    this.descriptionBoard="";
  }

  createBoard(){
    this.boardService.createNewBoard(this.nameBoard, this.descriptionBoard)
    .subscribe((res:IBoardCreateResponse)=>{
      console.log(res);
      this.boards.push(res);
      this.defaultModal();
    });
  }

  deleteBoard(id:string){
    this.boards = this.boards.filter(board=>board.idBoard !== id);
  }

  openUpdateModal(id:string){
    this.isUpdateModal=!this.isUpdateModal;
    this.isOpenModal=!this.isOpenModal;
    this.updateBoardId=id;
  }

  updateBoard(){
    this.boardService.updateBoard( this.updateBoardId,{
      nameBoard: this.nameBoard,
      descriptionBoard: this.descriptionBoard
    })
    .subscribe((res:IBoardUpdateResponse)=>{
      let indexUpdatedBoard:number = -1;
      this.boards.find((board,i)=>{
        if(board.idBoard === this.updateBoardId)
        indexUpdatedBoard = i;
      });
      if(indexUpdatedBoard>=0){
        this.boards[indexUpdatedBoard].nameBoard = res.nameBoard;
        this.boards[indexUpdatedBoard].descriptionBoard = res.descriptionBoard;
      }
      this.defaultModal();
    })
  }
}
