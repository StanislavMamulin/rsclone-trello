import { Component, OnInit } from '@angular/core';
import { BoardService } from 'src/app/modules/board/board-service.service';
import { IBoard, IBoardCreateResponse, IBoardUpdateResponse } from 'src/app/modules/board/model/Board.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss']
})
export class BoardPageComponent implements OnInit {
  boards: IBoard[] = [];
  isOpenModal: boolean = false;
  isCreateModal:boolean = false;
  isUpdateModal:boolean = false;
  updateBoardId:string;
  createFormModal:any;
  submited:boolean = false;
  constructor(private boardService: BoardService){}

  ngOnInit(): void {

    this.createFormModal = new FormGroup({
      name: new FormControl(null,[Validators.required, Validators.minLength(3)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(10)])
    })

    this.boardService.getBoards()
    .subscribe(res=>{this.boards = res});
  }
  toUpperFirstLetter = (str:string) => str[0].toUpperCase()+str.toLowerCase().substring(1);

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
    this.submited = false;
    this.createFormModal.reset();
  }

  createBoard(){
    this.submited = true;
    this.boardService.createNewBoard(
      this.toUpperFirstLetter(this.createFormModal.get('name').value),
      this.toUpperFirstLetter(this.createFormModal.get('description').value)
    )
    .subscribe((res:IBoardCreateResponse)=>{
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
    const nameBoard = this.toUpperFirstLetter(this.createFormModal.get('name').value);
    const descriptionBoard = this.toUpperFirstLetter(this.createFormModal.get('description').value);
    this.boardService.updateBoard( this.updateBoardId,{nameBoard,descriptionBoard})
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
