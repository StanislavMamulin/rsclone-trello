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
  submitted:boolean = false;
  constructor(private boardService: BoardService){}

  ngOnInit(): void {

    this.createFormModal = new FormGroup({
      name: new FormControl(null,[Validators.required, Validators.minLength(3)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(10)]),
      path: new FormControl('')
    })

    this.boardService.getBoards()
    .subscribe(res=>{this.boards = res});
  }
  toUpperFirstLetter = (str:string) => str[0].toUpperCase()+str.toLowerCase().substring(1);

  openCreateModal(event:any){
    if(event.currentTarget.className === "board-page__create"){
      this.isCreateModal=!this.isCreateModal;
    }
    this.isOpenModal=!this.isOpenModal;
    document.body.style.overflow = 'hidden';
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
    this.submitted = false;
    this.createFormModal.reset();
    document.body.style.overflow = 'auto';
  }

  createBoard(){
    this.submitted = true;
    this.boardService.createNewBoard(
      this.toUpperFirstLetter(this.createFormModal.get('name').value),
      this.toUpperFirstLetter(this.createFormModal.get('description').value),
      new Date().toLocaleDateString()
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
    document.body.style.overflow = 'hidden';
  }

  updateBoard(){
    const nameBoard = this.toUpperFirstLetter(this.createFormModal.get('name').value);
    const descriptionBoard = this.toUpperFirstLetter(this.createFormModal.get('description').value);
    this.boardService.updateBoard( this.updateBoardId,{
      nameBoard,
      descriptionBoard,
      dateBoard: new Date().toLocaleDateString()
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
        this.boards[indexUpdatedBoard].dateBoard = res.dateBoard;
      }
      this.defaultModal();
    })
  }

  updateStar(b:IBoard){
    let {idBoard,nameBoard,descriptionBoard,isChosen} = b;
    this.boardService.updateBoard(idBoard,{
      nameBoard,descriptionBoard,
      dateBoard: new Date().toLocaleDateString(),
      isChosen: !isChosen
    }).subscribe((res:IBoardUpdateResponse)=>{
      let indexUpdatedBoard:number = -1;
      this.boards.find((board,i)=>{
        if(board.idBoard === idBoard)
        indexUpdatedBoard = i;
      });
      if(indexUpdatedBoard>=0){
        this.boards[indexUpdatedBoard].isChosen = !isChosen;
        this.boards[indexUpdatedBoard].dateBoard = res.dateBoard;
      }
    })
  }
}
