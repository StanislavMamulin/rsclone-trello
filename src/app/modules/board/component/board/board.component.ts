import { Component, Input,Output, OnInit,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { IColumn } from 'src/app/modules/column-task/model/column.interface';
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
  @Output() onUpdateStar = new EventEmitter<IBoard>();

  isOfferOpenBoard:boolean = false;
  isOpenDescription:boolean = false;
  isHover:boolean = false;
  constructor(
    private boardService: BoardService,
    private router:Router
  ) {}

  ngOnInit() {
    this.isOpenDescription=false;
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
    this.isOpenDescription=false;
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

  amountTasks(arr:IColumn[]){
    return arr.reduce((start,item)=>{
      if(item.tasks instanceof Array){
        return start + item.tasks.length;
      }
      return start + 0;
    },0)
  }

  showDescription(event:any){
    this.isOpenDescription = !this.isOpenDescription;
  }

  closeDescription = () => {this.isOpenDescription=false;}

  updateFavorite(board:IBoard){
    this.onUpdateStar.emit(board);
  }

}
