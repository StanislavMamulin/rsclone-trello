import { Component, OnInit } from '@angular/core';
import { BoardService } from 'src/app/modules/board/board-service.service';
import {
  IBoard,
  IBoardCreateResponse,
  IBoardUpdateResponse,
} from 'src/app/modules/board/model/Board.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BoardsStateService } from 'src/app/core/services/boardsState.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit {
  boards: IBoard[] = [];

  isOpenModal = false;

  isCreateModal = false;

  isUpdateModal = false;

  updateBoardId: string;

  createFormModal: any;

  submitted = false;

  whatSort = true;

  showFavorite = false;

  showDate = false;

  selectValue = '';

  isLoading = false;

  isEnter = false;

  indexBoard = -1;

  constructor(
    private boardService: BoardService,
    private boardStateService: BoardsStateService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.createFormModal = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(10)]),
      path: new FormControl(''),
    });

    this.isLoading = true;
    this.boardService.getBoards()
      .subscribe(res => {
        this.boards = res;
        this.isLoading = false;
        this.boardStateService.setBoards(res);
      });

    document.onkeyup = (e: KeyboardEvent) => {

      if (e.code === 'ArrowRight') {
        e.preventDefault();
        const boards = document.querySelectorAll('app-board');
        if (this.indexBoard < boards.length - 1 && e.code === 'ArrowRight') {
          ++this.indexBoard;
        }
        boards.forEach((item, i) => {
          if (item.classList.contains('active')) {
            item.classList.remove('active');
          }
        });

        boards.forEach((item, i) => {
          if (i === this.indexBoard) {
            item.classList.add('active');
          }
        });
      }
      if (e.code === 'ArrowLeft') {
        e.preventDefault();
        const boards = document.querySelectorAll('app-board');

        if (this.indexBoard > 0 && e.code === 'ArrowLeft') {
          --this.indexBoard;
        }
        boards.forEach((item, i) => {
          if (item.classList.contains('active')) {
            item.classList.remove('active');
          }
        });

        boards.forEach((item, i) => {
          if (i === this.indexBoard) {
            item.classList.add('active');
          }
        });
      }

      if (e.code === 'Enter') {
        if (this.boards[this.indexBoard]) {
          this.router.navigate([`/board/${this.boards[this.indexBoard].idBoard}`]);
        }
      }

      if (e.code === 'Escape') {
        const boards = document.querySelectorAll('app-board');
        this.indexBoard = -1;
        boards.forEach(item => {
          if (item.classList.contains('active')) {
            item.classList.remove('active');
          }
        });
      }

      if (e.key === '+') {
        this.isCreateModal = !this.isCreateModal;
        this.isOpenModal = !this.isOpenModal;
      }

    };
  }

  updateShowDate = (showDate: boolean) => {
    this.showDate = showDate;
  };

  updateShowFavorite = (showFavorite: boolean) => {
    this.showFavorite = showFavorite;
  };

  updateSelectValue = (selectValue: string) => { this.selectValue = selectValue; };

  toUpperFirstLetter = (str: string) => str[0].toUpperCase() + str.toLowerCase().substring(1);

  openCreateModal(event: any) {
    if (event.currentTarget.classList.contains('board-page__create')) {
      this.isCreateModal = !this.isCreateModal;
    }
    this.isOpenModal = !this.isOpenModal;
    document.body.style.overflow = 'hidden';
  }

  closeModal(event: any) {
    if (event.target.classList.contains('modal')) {
      this.defaultModal();
    }
  }

  defaultModal() {
    this.isOpenModal = !this.isOpenModal;
    this.isCreateModal = false;
    this.isUpdateModal = false;
    this.submitted = false;
    this.isLoading = false;
    this.isEnter = false;
    this.createFormModal.reset();
    document.body.style.overflow = 'auto';
  }

  createBoard() {
    this.submitted = true;
    this.boardService
      .createNewBoard(
        this.toUpperFirstLetter(this.createFormModal.get('name').value),
        this.toUpperFirstLetter(this.createFormModal.get('description').value),
        new Date(),
      )
      .subscribe((res: IBoardCreateResponse) => {
        this.boards.push(res);
        this.defaultModal();
        this.boardStateService.setBoards(this.boards);
      });
  }

  deleteBoard(id: string) {
    this.boardService.deleteBoard(id)
      .subscribe(() => {
        this.boards = this.boards.filter((board) => board.idBoard !== id);
        this.boardStateService.setBoards(this.boards);
      });
  }

  openUpdateModal(id: string) {
    const [board] = this.boards.filter(item=>item.idBoard === id);
    this.createFormModal.controls.name.setValue(board.nameBoard);
    this.createFormModal.controls.description.setValue(board.descriptionBoard);
    this.isUpdateModal = !this.isUpdateModal;
    this.isOpenModal = !this.isOpenModal;
    this.updateBoardId = id;
    document.body.style.overflow = 'hidden';
  }

  updateBoard() {
    this.submitted = true;
    const nameBoard = this.toUpperFirstLetter(this.createFormModal.get('name').value);
    const descriptionBoard = this.toUpperFirstLetter(this.createFormModal.get('description').value);
    this.boardService
      .updateBoard(this.updateBoardId, {
        nameBoard,
        descriptionBoard,
        dateBoard: new Date(),
      })
      .subscribe((res: IBoardUpdateResponse) => {
        let indexUpdatedBoard = -1;
        this.boards.find((board, i) => {
          if (board.idBoard === this.updateBoardId) indexUpdatedBoard = i;
        });
        if (indexUpdatedBoard >= 0) {
          this.boards[indexUpdatedBoard].nameBoard = res.nameBoard;
          this.boards[indexUpdatedBoard].descriptionBoard = res.descriptionBoard;
          this.boards[indexUpdatedBoard].dateBoard = res.dateBoard;
        }
        this.boardStateService.setBoards(this.boards);
        this.defaultModal();
      });
  }

  updateStar(b: IBoard) {
    const { idBoard, nameBoard, descriptionBoard, isChosen, dateBoard } = b;
    this.boardService
      .updateBoard(idBoard, {
        nameBoard,
        descriptionBoard,
        dateBoard,
        isChosen: !isChosen,
      })
      .subscribe((res: IBoardUpdateResponse) => {
        let indexUpdatedBoard = -1;
        this.boards.find((board, i) => {
          if (board.idBoard === idBoard) indexUpdatedBoard = i;
        });
        if (indexUpdatedBoard >= 0) {
          this.boards[indexUpdatedBoard].isChosen = !isChosen;
          this.boards[indexUpdatedBoard].dateBoard = res.dateBoard;
        }
      });
  }
}
