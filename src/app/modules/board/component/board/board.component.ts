import { Component, Input,Output, OnInit,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BoardService } from '../../board-service.service';
import { IBoard } from '../../model/Board.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  @Input() board:IBoard;
  @Output() onDelete = new EventEmitter<string>();
  @Output() onUpdate = new EventEmitter<string>();

  isOfferOpenBoard:boolean = false;

  constructor(
    private boardService: BoardService,
    private router:Router
  ) {}

  ngOnInit() {

  }

  deleteBoard(id:string){
    this.boardService.deleteBoard(id)
    .subscribe(()=>{
      this.onDelete.emit(id);
    });
  }

  openBoard(event:any){
    if(event.srcElement.className === 'board__offer-open')
    this.router.navigate(['/board',this.board.idBoard])
  }

  updateBoard(id:string){
    this.onUpdate.emit(id);
  }

  offerOpenBoard(event:any){
    const elClass = event.srcElement.className;
    if(elClass === 'board' || elClass === 'board__wrapper'
      || elClass === 'board__wrapper__title' || elClass === 'board__offer-open'){
      this.isOfferOpenBoard = true;
    } else{
      this.isOfferOpenBoard = false;
    }
  }
  leaveBoard(){
    this.isOfferOpenBoard = false;
  }

}
