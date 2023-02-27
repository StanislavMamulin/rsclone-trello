import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { BoardService } from 'src/app/modules/board/board-service.service';
import {
  IBoard,
  IBoardCreateResponse,
  IBoardUpdateResponse,
} from 'src/app/modules/board/model/Board.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BoardsStateService } from 'src/app/core/services/boardsState.service';
import { Router } from '@angular/router';
import { CloseComponent } from 'src/app/shared/components/close/close.component';
import { MatDialog } from '@angular/material/dialog';
import { AppStateService } from 'src/app/core/services/app-state.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit, OnDestroy {
  boards: IBoard[] = [];

  isOpenModal = false;

  isCreateModal = false;

  isUpdateModal = false;

  updateBoardId: string;

  createFormModal: FormGroup;

  submitted = false;

  whatSort = true;

  showFavorite = false;

  showDate = false;

  selectValue = '';

  isLoading = false;

  isEnter = false;

  indexBoard = -1;

  isItemEdit = false;

  subscription: Subscription;

  constructor(
    private boardService: BoardService,
    private boardStateService: BoardsStateService,
    public dialog: MatDialog,
    private router: Router,
    private appStateService: AppStateService,
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

    this.subscription = this.appStateService.isItemEdit$.subscribe((itemEdit) => this.isItemEdit = itemEdit);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  @HostListener('window:keyup', ['$event'])
  hotkeyHandler(e: KeyboardEvent) {
    if (e.code === 'ArrowRight' && !this.isItemEdit) {
      e.preventDefault();
      const boards = document.querySelectorAll('app-board');
      if (this.indexBoard < boards.length - 1 && e.code === 'ArrowRight') {
        ++this.indexBoard;
      }
      boards.forEach((item) => {
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
    if (e.code === 'ArrowLeft' && !this.isItemEdit) {
      e.preventDefault();
      const boards = document.querySelectorAll('app-board');

      if (this.indexBoard > 0 && e.code === 'ArrowLeft') {
        --this.indexBoard;
      }
      boards.forEach((item) => {
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

    if (e.code === 'Escape') {
      const boards = document.querySelectorAll('app-board');
      this.indexBoard = -1;
      boards.forEach(item => {
        if (item.classList.contains('active')) {
          item.classList.remove('active');
        }
      });

      if ( this.isUpdateModal || this.isCreateModal) {
        this.defaultModal();
      }
    }

    if (e.code === 'Enter') {
      if (this.boards[this.indexBoard]) {
        this.router.navigate([`/board/${this.boards[this.indexBoard].idBoard}`]);
      }
    }

    if (e.key === '+' && !this.isItemEdit) {
      this.isCreateModal = !this.isCreateModal;
      this.isOpenModal = !this.isOpenModal;
    }
  }

  enteredForm(event: KeyboardEvent) {
    if (event.code  === 'Enter' && !this.createFormModal.invalid) {
      if (this.isCreateModal) this.createBoard();
      if (this.isUpdateModal) this.updateBoard();
    }
  }

  updateShowDate = (showDate: boolean) => {
    this.showDate = showDate;
  };

  updateShowFavorite = (showFavorite: boolean) => {
    this.showFavorite = showFavorite;
  };

  updateSelectValue = (selectValue: string) => { this.selectValue = selectValue; };

  toUpperFirstLetter = (str: string) => str[0].toUpperCase() + str.toLowerCase().substring(1);

  openCreateModal(event: MouseEvent) {
    const el = <HTMLElement>event.currentTarget;
    if (el.classList.contains('board-page__create')) {
      this.isCreateModal = !this.isCreateModal;
    }
    this.isOpenModal = !this.isOpenModal;
    document.body.style.overflow = 'hidden';

    this.appStateService.setIsItemEdit(true);
  }

  closeModal(event: MouseEvent) {
    const el = <HTMLElement>event.target
    if (el.classList.contains('modal')) {
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

    this.appStateService.setIsItemEdit(false);
  }

  createBoard() {
    this.submitted = true;
    this.boardService
      .createNewBoard(
        this.toUpperFirstLetter(this.createFormModal.get('name')?.value),
        this.toUpperFirstLetter(this.createFormModal.get('description')?.value),
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

  openDialogDeleteBoard(id:string){
    const board = this.boards.find(item=>item.idBoard === id);
    const dialogRef = this.dialog.open(CloseComponent,{
      data: {name:'board', objName: board?.nameBoard }
    });

    dialogRef.afterClosed().subscribe((res)=>{
      if (res === 'yes')
        this.deleteBoard(id);
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
    this.appStateService.setIsItemEdit(true);
  }

  updateBoard() {
    this.submitted = true;
    const nameBoard = this.toUpperFirstLetter(this.createFormModal.get('name')?.value);
    const descriptionBoard = this.toUpperFirstLetter(this.createFormModal.get('description')?.value);
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
