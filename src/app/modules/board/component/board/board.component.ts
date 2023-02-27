import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AppStateService } from 'src/app/core/services/app-state.service';
import { BoardsStateService } from 'src/app/core/services/boardsState.service';
import { IColumn } from 'src/app/modules/column-task/model/column.interface';
import { AudioServiceService } from 'src/app/shared/audio-service.service';
import { IBoard } from '../../model/Board.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  @Input() board: IBoard;

  @Input() submitted: boolean;

  @Output() onDelete = new EventEmitter<string>();

  @Output() onUpdate = new EventEmitter<string>();

  @Output() onUpdateStar = new EventEmitter<IBoard>();

  isOfferOpenBoard = false;

  isOpenDescription = false;

  isDelete = false;

  constructor(
    private router: Router,
    private boardsStateService: BoardsStateService,
    private audioService: AudioServiceService,
    private appStateService: AppStateService,
  ) {}

  ngOnInit() {
    this.isOpenDescription = false;
  }

  deleteBoard(id: string) {
    this.audioService.playAudio('../../../../assets/sounds/audio-delete.mp3');
    this.onDelete.emit(id);
  }

  openBoard(event: any) {
    this.audioService.playAudio('../../../../assets/sounds/audio-board.mp3');
    if (event.currentTarget.classList.contains('board__offer-open')) {
      this.boardsStateService.setCurrentBoard(this.board);
      this.router.navigate(['/board', this.board.idBoard]);
    }
  }

  updateBoard(id: string) {
    this.onUpdate.emit(id);
    this.isOpenDescription = false;
  }

  offerOpenBoard(event: any) {
    const elClass = event.currentTarget.className;
    if (
      elClass === 'board' ||
      elClass === 'board__wrapper' ||
      elClass === 'board__wrapper__title' ||
      elClass === 'board__offer-open'
    ) {
      this.isOfferOpenBoard = true;
    } else {
      this.isOfferOpenBoard = false;
    }
  }

  leaveBoard() {
    this.isOfferOpenBoard = false;
  }

  amountTasks(arr: IColumn[]) {
    return arr.reduce((start, item) => {
      if (item.tasks instanceof Array) {
        return start + item.tasks.length;
      }
      return start + 0;
    }, 0);
  }

  showDescription() {
    this.isOpenDescription = !this.isOpenDescription;
    this.appStateService.setIsItemEdit(true);
  }

  closeDescription = () => {
    this.isOpenDescription = false;
    this.isOfferOpenBoard = false;
    this.appStateService.setIsItemEdit(false);
  };

  updateFavorite(board: IBoard) {
    this.onUpdateStar.emit(board);
  }
}
