import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IBoard } from 'src/app/modules/board/model/Board.model';
import { BoardService } from 'src/app/modules/board/board-service.service';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalLogOutComponent } from '../modal-log-out/modal-log-out.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit{
  boards: IBoard[] = [];
  isAuth: boolean = false;
  searchStr = '';

  constructor(
    private router: Router,
    private boardService: BoardService,
    public auth: AuthService,
    public dialog: MatDialog
  ) {}

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ModalLogOutComponent, {
      width: '250px',
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

  openLoginPage(){
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.isAuth = this.auth.isAuthenticated();
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
