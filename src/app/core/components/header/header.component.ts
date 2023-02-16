import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IBoard } from 'src/app/modules/board/model/Board.model';
import { BoardService } from 'src/app/modules/board/board-service.service';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalLogOutComponent } from '../modal-log-out/modal-log-out.component';
import { TranslocoService } from '@ngneat/transloco';
import { ModalHotkeysComponent } from '../modal-hotkeys/modal-hotkeys.component';

interface ILanguage {
  value: string;
  img: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  boards: IBoard[] = [];
  selectedLanguage: string;
  selectedFlag: string = localStorage.getItem('flag') || '../../../../assets/images/en.svg';
  isAuth = false;
  indexBoard = -1;

  searchStr = '';

  languages: ILanguage[] = [
    {value: 'en', img: '../../../../assets/images/en.svg'},
    {value: 'ru', img: '../../../../assets/images/ru.svg'},
  ];

  constructor(
    private router: Router,
    private boardService: BoardService,
    public auth: AuthService,
    public dialog: MatDialog,
    private translocoService: TranslocoService
  ) {}

  ngOnInit(): void {
    this.isAuth = this.auth.isAuthenticated();

  }

  switchLang(){
    this.selectedFlag = `../../../../assets/images/${this.selectedLanguage}.svg`
    this.translocoService.setActiveLang(this.selectedLanguage);
    localStorage.setItem('language',this.selectedLanguage);
    localStorage.setItem('flag',this.selectedFlag);
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ModalLogOutComponent, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openDialogHotFix(enterAnimationDuration:string, exitAnimationDuration: string) {
    this.dialog.open(ModalHotkeysComponent, {
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openBoards(): void {
    this.router.navigate(['/board']);
  }

  openMainPage(): void {
    this.router.navigate(['/main']);
  }

  openRegistrationPage() {
    this.router.navigate(['/registration']);
  }

  openLoginPage() {
    this.router.navigate(['/login']);
  }

  updateBoards() {
    this.getBoards();
  }

  getBoards(): void {
    this.boardService.getBoards().subscribe((res) => {
      this.boards = res;
    });
  }

  openBoard(board: IBoard): void {
    this.router.navigate(['main']).then(() => {
      this.router.navigate(['/board', board.idBoard]);
    });
  }
}
